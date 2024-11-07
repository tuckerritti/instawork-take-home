  import React, {useEffect, useState} from "react";
  import {updateTeamMember, deleteTeamMember, getTeamMember} from "../lib/requests";
  import {useNavigate, useParams} from "react-router-dom";

  interface FormErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    role?: string;
  }

  function EditPage() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form, setForm] = useState({first_name: "", last_name: "", email: "", phone: "", role: "regular"});
    const [error, setError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    useEffect(() => {
      async function fetchMember() {
        if (!id) return;

        try {
          const member = await getTeamMember(Number(id));
          setForm(member);
        } catch (err) {
          setError("Failed to load team member details. Please try again.");
        }
      }
      fetchMember();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setFormErrors({ ...formErrors, [e.target.name]: undefined });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await updateTeamMember(Number(id), form);
        setError(null);
        setFormErrors({});
        navigate("/");
      } catch (err) {
        const errorMessage = (err as Error).message;
        try {
          const errorData = JSON.parse(errorMessage);
          setFormErrors(errorData);
        } catch {
          setError(errorMessage);
        }
      }
    };

    const handleDelete = async () => {
      try {
        await deleteTeamMember(Number(id));
        setError(null);
        navigate("/");
      } catch (err) {
        setError("Failed to delete team member. Please try again.");
      }
    };

    return (
      <div className="p-4 max-w-md mx-auto">
        <button onClick={() => {navigate(-1)}} className="text-blue-500 mb-4">← Back</button>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Edit Team Member</h1>
        <p className="text-gray-600 mb-4">Edit contact info, location, and role.</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name"
                   className="w-full border p-2 rounded" required/>
            {formErrors.first_name && <p className="text-red-500 text-sm">{formErrors.first_name}</p>}
          </div>
          <div>
            <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name"
                   className="w-full border p-2 rounded" required/>
            {formErrors.last_name && <p className="text-red-500 text-sm">{formErrors.last_name}</p>}
          </div>
          <div>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email"
                   className="w-full border p-2 rounded" required/>
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone"
                   className="w-full border p-2 rounded" required/>
            {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
          </div>

          <div className="mt-4">
            <p className="text-gray-700 font-semibold">Role</p>
            <label className="flex items-center mt-2">
              <input type="radio" name="role" value="regular" checked={form.role === "regular"} onChange={handleChange}/>
              <span className="ml-2 text-gray-600">Regular - Can’t delete members</span>
            </label>
            <label className="flex items-center mt-2">
              <input type="radio" name="role" value="admin" checked={form.role === "admin"} onChange={handleChange}/>
              <span className="ml-2 text-gray-600">Admin - Can delete members</span>
            </label>
            {formErrors.role && <p className="text-red-500 text-sm">{formErrors.role}</p>}
          </div>

          <div className="flex space-x-4 mt-4">
            <button type="button" onClick={handleDelete} className="bg-red-500 text-white w-full py-2 rounded">Delete
            </button>
            <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    );
  }

  export default EditPage;
