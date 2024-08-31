import { api } from "@/lib/axios";

interface UserProfileQuery {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserProfileResponse {
  user: UserProfileQuery;
}

export async function GetUserProfile() {
  const response = await api.get<UserProfileResponse>("/profile");
  return response.data.user;
}
