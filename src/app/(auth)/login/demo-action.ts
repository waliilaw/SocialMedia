'use server';

import { lucia } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function demoLogin() {
  try {
    // Try to find or create a demo user
    let demoUser = await prisma.user.findFirst({
      where: {
        username: "demo"
      }
    });

    // If demo user doesn't exist, create it
    if (!demoUser) {
      // Use a fixed ID for demo user
      const demoUserId = "demo_user_001";
      demoUser = await prisma.user.create({
        data: {
          id: demoUserId,
          username: "demo",
          displayName: "Demo User",
          email: "demo@example.com",
        }
      });
    }

    // Create a session for the demo user
    const session = await lucia.createSession(demoUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    // Set the session cookie
    const cookieStore = await cookies();
    cookieStore.set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Demo login error:", error);
    return {
      error: "Something went wrong with demo login, please try again.",
    };
  }
}

