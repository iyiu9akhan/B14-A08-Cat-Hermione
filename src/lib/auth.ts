import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db("b14-a08-cat-hermione");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
  plugins: [jwt()],
  session:{
    cookieCache:{
      enabled: true,
      strategy: 'jwt',
      maxAge: 3 * 24 * 60 * 60
    }
  }
});
