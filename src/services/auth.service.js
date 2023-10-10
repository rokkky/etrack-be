import Token from '../models/token.model.js';
import jwt from 'jsonwebtoken';
import skip from 'graphql-resolvers';
import User from '../models/user.model.js';
import { GraphQLError } from 'graphql';

const generateToken = async (user, options) => {
  const { id, email, username, registrationDate } = user;
  const payload = {
    sub: id,
    user: {
      email,
      username,
      registrationDate
    },
  };
  return jwt.sign(payload, process.env.SECRET, { ...options });
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
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.sub);
    if (!user) {
      generateUnauthErr();
    }
    return user;
  } catch (e) {
    throw e;
  }
};

export const isAuthenticated = async (_, args, { user }) => {
  if (!user) {
    generateUnauthErr();
  }
  skip; 
}

const generateUnauthErr = () => {
  const err = new GraphQLError('User not authorized', {
    extensions: {
      code: 'UNAUTHENTICATED',
      status: 401
    },
  });
  throw err;
}