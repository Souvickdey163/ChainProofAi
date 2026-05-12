import { api } from "@/lib/api";

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    return await api.post("/analyze", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  } catch (error) {
    if (error?.response?.status === 404) {
      return api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }

    throw error;
  }
}
