import { api } from "@/lib/api";

export async function fetchBlockchainStatus(id) {
  return api.get(`/blockchain/${id}`);
}
