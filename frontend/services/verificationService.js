import { api } from "@/lib/api";

export async function fetchVerificationResult(id) {
  return api.get(`/verify/${id}`);
}
