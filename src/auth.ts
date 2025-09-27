import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      authorize: async function (credentials) {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const payload = await res.json();
        console.log("API response:", payload);

        if (payload.message === "success") {
          const { id }: { id: string } = jwtDecode(payload.token);

          return {
            id: id,
           user: payload.user,
            token: payload.token,
          };
        }

        throw new Error(payload.message || "Wrong info");
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },
  //
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user?.user;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token?.user;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};





// import { AuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { jwtDecode } from "jwt-decode";

// export const authOptions: AuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//           placeholder: "jsmith@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },

//       // authorize لازم ترجع User | null
//       authorize: async (credentials): Promise<any> => {
//         const res = await fetch(`${process.env.API}/auth/signin`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//         });

//         const payload = await res.json();
//         console.log("API response:", payload);

//         if (payload.message === "success") {
//           const decoded: any = jwtDecode(payload.token);
//           console.log("Decoded token:", decoded);

//           return {
//             id: decoded.id || decoded._id || decoded.sub,
//             name: payload.user?.name,
//             email: payload.user?.email,
//             token: payload.token,
//           };
//         }

//         return null;
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/login",
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.token = user.token;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user = {
//           id: token.id as string,
//           name: token.name as string,
//           email: token.email as string,
//         };
//       }
//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };
