export interface User {
  id: string;
  email: string;
  nama: string;
  createdAt: string;
  updatedAt: string;
  roles: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  expiresIn: string;
}
