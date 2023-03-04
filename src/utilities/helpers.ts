import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const encrypt = async (text: string) => {
  const hash = await bcrypt.hash(text, 10);
  return hash;
};

export const compare = async (pass: string, hash: string) => {
  return await bcrypt.compare(pass, hash);
};

export const tokenSign = async (emptyTokenUser: String) => {
  return jwt.sign(
    { emptyTokenUser }, 
    String(process.env.JWT_KEY),
    {
      expiresIn: '5h'
    }
  );
};