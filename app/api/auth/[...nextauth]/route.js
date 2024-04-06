import User from '@models/user';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {

        await connectToDB();
        const userExist = await User.findOne({
          email: profile.email,
        });
        if (!userExist) {
          await User.create({
            name: profile.name,
            username: profile.email.replace('@gmail.com', ''),
            email: profile.email,
            image: profile.picture,
          });
        }
        return true;
      } catch (err) {
        console.log("Unable to Sign In : ", err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
