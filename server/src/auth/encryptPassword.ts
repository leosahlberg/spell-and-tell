import * as bcrypt from "bcryptjs";

export async function encryptPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (err) {
    console.error("Cannot encrypt", err);
    throw new Error("Password encryption failed");
  }
}

export async function matchEncryptPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw new Error("Password comparison failed");
  }
}
