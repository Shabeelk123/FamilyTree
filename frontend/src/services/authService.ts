// src/services/authService.ts
import axios from "../api/axios";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = async (data: RegisterData): Promise<string> => {
  try {
    const response = await axios.post("/auth/register",data)
    const result = await response.data;
    return result.token;
  } catch (error: any) {
    // Optional: Log error
    console.error("Register error:", error);
    throw new Error(error.message || "Something went wrong during registration");
  }
};

export const login = async (data: LoginData): Promise<string> => {
  try {
    const response = await axios.post("/auth/login", data)

    const result = await response.data;

    return result.token;
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error(error.message || "Something went wrong during login");
  }
};
