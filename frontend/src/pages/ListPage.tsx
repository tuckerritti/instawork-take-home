import React, {useEffect, useState} from "react";
import {getTeamMembers, TeamMember} from "../lib/requests";
import {Link} from "react-router-dom";
import {ReactComponent as PersonIcon} from "../assets/person.svg";

function ListPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        setError(null);
        const data = await getTeamMembers();
        setMembers(data);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError("Failed to load team members. Please try again later.");
      }
    }

    void fetchMembers();
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Team Members</h1>
        <Link to="/add" className="text-blue-500 text-3xl font-bold">+</Link>
      </div>
      <p className="text-gray-600 mb-4">You have {members.length} team members.</p>
      <div className="space-y-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {members.map((member) => (
          <div key={member.id}>
            <Link to={`/edit/${member.id}`}>
              <div
                className="p-4 bg-white shadow rounded flex items-center space-x-4 cursor-pointer hover:bg-gray-100 transition">
                <PersonIcon className="w-12 h-12 rounded-full"/>
                <div>
                  <p className="font-semibold text-gray-900">
                    {member.first_name} {member.last_name} <span className="text-gray-500">({member.role})</span>
                  </p>
                  <p className="text-gray-600">{member.phone}</p>
                  <p className="text-gray-600">{member.email}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListPage;
