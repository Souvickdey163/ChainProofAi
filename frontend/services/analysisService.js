import { api } from "@/lib/api";

export async function analyzeFile(payload) {
  return api.post("/analyze", payload);
}
