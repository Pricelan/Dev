export function getGastToken(): string {
  if (typeof window === "undefined") return "";

  let token = localStorage.getItem("gastToken");
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem("gastToken", token);
  }
  return token;
}