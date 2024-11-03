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

function generateUniqueID(length: number) {
  const timestamp: string = Date.now().toString();
  const randomSuffix: string = Math.floor(Math.random() * 1000000).toString();
  const id = (timestamp + randomSuffix).substring(0, length);
  return id;
}

export { hashPassword, verifyPassword, generateUniqueID };
