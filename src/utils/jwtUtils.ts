// lib/jwtUtils.ts
export async function verifyJwt(
  token: string,
  secret: string
): Promise<boolean> {
  try {
    // Decode the token
    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
      return false;
    }

    const encodedHeader = new TextEncoder().encode(header);
    const encodedPayload = new TextEncoder().encode(payload);
    const encodedSignature = Uint8Array.from(atob(signature), (c) =>
      c.charCodeAt(0)
    );

    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const isValid = await crypto.subtle.verify(
      "HMAC",
      cryptoKey,
      encodedSignature,
      new TextEncoder().encode(`${header}.${payload}`)
    );

    return isValid;
  } catch (error) {
    console.error("Token verification failed", error);
    return false;
  }
}
export function decodeJwt(token: string): any {
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) {
    throw new Error("Invalid token format");
  }

  // Decode the payload from base64
  const decodedPayload = atob(payload);
  return JSON.parse(decodedPayload);
}