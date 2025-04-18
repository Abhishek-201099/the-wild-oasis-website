"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  // Since this is backend we need to treat every input as unsafe and so we need to authenticate and authorize.
  // @@@ It's a convention to not use try catch inside server actions. Instead we throw error in the server action body and the closest error boundary is going to catch it.

  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // As input is assumed to be unsafe we need to validate nationalID
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("You must provide valid nationalID");

  const updateData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  // After updation we see that the UI doesn't update immediately.
  // This is because of browser cache, which stays stale for 30 seconds for dynamic pages.
  // So we need to revalidate this cache to get the fresh data immediately after updation.
  // We use revalidatePath('path') method from next/cache to manually revalidate it.
  revalidatePath("account/profile");
}
