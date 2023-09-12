import md5 from 'md5';
import User from '../../models/user.model.js';
import { generateAuthTokens } from '../../services/auth.service.js';

export default {
  Mutation: {
    logIn: async (_, { input: { email, password }} ) => {
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
  },
};
