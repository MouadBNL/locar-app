import api_client from "@locar/api-client";

export const http = api_client("http://localhost:5173", {
  headers() {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    return headers;
  },
  fetch: ((input, init) => {
    return fetch(input, {
      ...init,
      credentials: "include", // Required for sending cookies cross-origin
    }).then(async (res) => {
      // console.log({ res });
      if (res.status >= 400) {
        const err = await res.json();
        throw new Error(res.statusText, { cause: err });
      }

      return res;
    });
  }) satisfies typeof fetch,
});
