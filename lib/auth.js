import bcrypt from "bcryptjs";

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: "myapp_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
    path: "/",
  },
};