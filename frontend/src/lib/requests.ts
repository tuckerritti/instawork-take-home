const API_BASE_URL = "http://localhost:8000/api";

export interface TeamMember {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || JSON.stringify(errorData));
  }
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const response = await fetch(`${API_BASE_URL}/members/`);
  await handleResponse(response);
  return await response.json();
}

export async function getTeamMember(id: number): Promise<TeamMember> {
  const response = await fetch(`${API_BASE_URL}/members/${id}/`);
  await handleResponse(response);
  return await response.json();
}

export async function addTeamMember(data: TeamMember) {
  const response = await fetch(`${API_BASE_URL}/members/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  await handleResponse(response);
}

export async function updateTeamMember(id: number, data: TeamMember) {
  const response = await fetch(`${API_BASE_URL}/members/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  await handleResponse(response);
}

export async function deleteTeamMember(id: number) {
  const response = await fetch(`${API_BASE_URL}/members/${id}/`, {
    method: "DELETE",
  });
  await handleResponse(response);
}
