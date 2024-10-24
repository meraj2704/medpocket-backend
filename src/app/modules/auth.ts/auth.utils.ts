// auth.utils.ts
import bcrypt from 'bcrypt';

 const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

 const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};


export const AuthUtils = {
    hashPassword,
    comparePassword,
}