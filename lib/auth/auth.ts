
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initializeUserBoard } from "../init-user-board";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is missing. Add it to your .env.local file before starting the app."
  );
}

const mongoClient = new MongoClient(MONGODB_URI);
const mongoDb = mongoClient.db();

console.log("MongoDB database:", mongoDb.databaseName);
console.log("MongoDB host:", new URL(MONGODB_URI).hostname);

export const auth = betterAuth({
  database: mongodbAdapter(mongoDb, { client: mongoClient }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          if (user.id) {
            await initializeUserBoard(user.id);
          }
        },
      },
    },
  },
});

export async function getSession() {
  try {
    const result = await auth.api.getSession({
      headers: await headers(),
    });

    return result;
  } catch (error) {
    console.error("Failed to get session:", error);
    return null;
  }
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}

