import md5 from 'md5';
import User from '../../models/user.model.js';
import { generateAuthTokens, verifyToken } from '../../services/auth.service.js';
import Token from '../../models/token.model.js';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from '../../services/auth.service.js';
import { generateError } from '../../utils/graphql-errors.js';

export default {
  Query: {
    getUser: combineResolvers(isAuthenticated, async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (e) {
        return e;
      }
    }),
  },
  Mutation: {
    logIn: async (_, { input: { email, password } }) => {
      try {
        const hashedPass = md5(password + process.env.PASSWORD_SALT);
        const user = await User.findOne({ password: hashedPass, email });
        if (!user) {
          throw new Error('Incorrect email or password.');
        }
        const tokens = await generateAuthTokens(user);
        return tokens;
      } catch (e) {
        return e;
      }
    },
    signUp: async (_, { input: { username, email, password } }) => {
      try {
        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) throw new Error('User with the same email already exist!');
        await User.create({
          username: username || 'Unknown',
          email,
          password: md5(password + process.env.PASSWORD_SALT),
          registrationDate: new Date(),
        });
        return true;
      } catch (e) {
        return e;
      }
    },
    changeUsername: combineResolvers(isAuthenticated, async (_, { id, username }) => {
      try {
        const user = await User.findByIdAndUpdate(id, { username }, {new: true});
        return user;
      } catch (e) {
        return e;
      }
    }),
    refreshToken: async (_, { token }) => {
      try {
        const user = await verifyToken(token);
        const refreshToken = await Token.findOne({
          token,
          user: user.id,
        });
        if (!refreshToken) {
          generateError('User with this token not found', 'TOKEN_NOT_FOUND', 404);
        } else {
          await Token.deleteOne({ id: refreshToken.id });
          const tokens = await generateAuthTokens(user);
          return tokens;
        }
      } catch (e) {
        return e;
      }
    },
  },
};
