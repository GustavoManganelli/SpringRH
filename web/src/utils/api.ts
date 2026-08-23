type ApiMethods = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

export async function api<TResponse = unknown, TBody = unknown>(
  path: string,
  method: ApiMethods = "GET",
  body?: TBody,
): Promise<TResponse> {
  const BASE_URL = "http://localhost:8080";

  const res = await fetch(`${BASE_URL}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(`API Error ${res.status}: ${errorText || res.statusText}`);
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }

  const text = await res.text();
  return text as unknown as TResponse;
}
