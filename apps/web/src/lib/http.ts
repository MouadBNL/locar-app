import api_client from "@locar/api-client";

export const http = api_client("http://localhost:3000", {
  headers() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    return headers;
  },
});
