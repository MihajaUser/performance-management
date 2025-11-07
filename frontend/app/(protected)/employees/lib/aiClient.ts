//frontend/app/(protected)/employees/lib/aiClient.ts
import axios from "axios";

export const aiApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_API_URL ?? "http://localhost:8001",
  headers: { "Content-Type": "application/json" },
});
