import bcrypt from "bcrypt";

async function hashPassword(password: string) {
  const saltRounds: number = 10;
  const salt: string = await bcrypt.genSalt(saltRounds);
  const hash: string = await bcrypt.hash(password, salt);
  return hash;
}

async function verifyPassword(password: string, hashedPassword: string) {
  const match: boolean = await bcrypt.compare(password, hashedPassword);
  return match;
}

export { hashPassword, verifyPassword };
