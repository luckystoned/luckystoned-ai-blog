// Server-side code
"use server";

// Importing Supabase auth helpers and Next.js functions
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Exporting the addArticle function
export async function addArticle(formData: any) {
  // Extracting form data
  const title = formData.get("title");
  const content = formData.get("content");
  const slug = formData
    .get("title")
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, ""); // Generating a slug from the title
  const created_at = formData.get(new Date().toDateString()); // Getting the current date

  // Creating a cookie store
  const cookieStore = cookies();

  // Creating a Supabase client instance with cookie store
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Inserting data into the "articles" table
  const { data, error } = await supabase.from("articles").insert([
    {
      title,
      content,
      slug,
      created_at,
    },
  ]);

  // Handling errors
  if (error) {
    console.error("Error inserting data", error);
    return;
  }

  // Redirecting to the homepage
  redirect("/");

  // Returning a success message
  return { message: "Success" };
}
