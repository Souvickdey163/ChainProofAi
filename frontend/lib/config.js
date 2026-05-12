const baseUrl = process.env.NEXT_PUBLIC_API || "http://localhost:5001";

export const API_BASE_URL = baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
