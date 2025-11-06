'use server';

import { lucia } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { isRedirectError } from "next/dist/client/components/redirect";
import { generateIdFromEntropySize } from "lucia";

export async function demoLogin() {
  try {
    // Try to find or create a demo user
    let demoUser = await prisma.user.findFirst({
      where: {
        username: {
          equals: "demo",
          mode: "insensitive"
        }
      }
    });

    // If demo user doesn't exist, create it
    if (!demoUser) {
      const demoUserId = generateIdFromEntropySize(10);
      // Use a unique email to avoid conflicts
      const demoEmail = `demo_${Date.now()}@example.com`;
      try {
        demoUser = await prisma.user.create({
          data: {
            id: demoUserId,
            username: "demo",
            displayName: "Demo User",
            email: demoEmail,
          }
        });
      } catch (createError: any) {
        // If user creation fails, try to find existing demo user
        console.error("Error creating demo user:", createError);
        // Try to find by username (case insensitive)
        demoUser = await prisma.user.findFirst({
          where: {
            username: {
              equals: "demo",
              mode: "insensitive"
            }
          }
        });
        
        // If still not found, try to find any user with demo in email
        if (!demoUser) {
          demoUser = await prisma.user.findFirst({
            where: {
              email: {
                contains: "demo",
                mode: "insensitive"
              }
            }
          });
        }
      }
    }

    if (!demoUser) {
      return {
        error: "Failed to create or find demo user. Please try again.",
      };
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

