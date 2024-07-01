// Server-side code
"use server";

// Importing Next.js functions
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Importing Supabase client creation function from utils
import { createClient } from "@/utils/supabase/server";

// Exporting the logout function
export async function logout() {
  // Creating a Supabase client instance
  const supabase = createClient();

  // Signing out of Supabase auth
  const { error } = await supabase.auth.signOut();

  // If there's an error, redirect to the error page
  if (error) {
    redirect("/error");
  }

  // Revalidate the "/" path for the "layout" cache
  revalidatePath("/", "layout");

  // Redirect to the homepage
  redirect("/");
}
