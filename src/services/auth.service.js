import Token from '../models/token.model.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const generateToken = async (user, options) => {
  const { id, email, username } = user;
  const payload = {
    sub: id,
    user: {
      email,
      username,
    },
  };
  return jwt.sign(payload, process.env.SECRET, { ...options, algorithm: 'HS256' });
};

const saveToken = async (token, id) => {
  await Token.create({
    user: id,
    token,
  });
};

export const generateAuthTokens = async (user) => {
  const accessToken = await generateToken(user, {
    expiresIn: `${process.env.JWT_ACCESS_EXPIRATION_MINUTES}m`,
  });
  const refreshToken = await generateToken(user, {
    expiresIn: `${process.env.JWT_REFRESH_EXPIRATION_DAYS}d`,
  });
  await saveToken(refreshToken, user.id);
  return { accessToken, refreshToken };
};

export const verifyToken = async (token) => {
  const decoded = jwt.verify(token, process.env.SECRET, { algorithms: ['HS256'] });
  const user = await User.findById(decoded.sub);
  if (!user) {
    throw new Error('Not authorized as user');
  }
  return user;
};
