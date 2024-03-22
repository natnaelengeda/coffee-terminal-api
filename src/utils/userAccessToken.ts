import jwt from 'jsonwebtoken';

export const generateUserAccessToken = (
  id: string,
  name: string,
  email: string,
) => {
  const data = {
    id,
    name,
    email
  };

  return jwt.sign(
    data,
    process.env.JWT_SECRET!,
    // { expiresIn: '15m' },
  );
}