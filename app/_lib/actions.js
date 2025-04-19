"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

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

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // @@@ Any guest with the curl request of POST can delete booking other than its own.
  // @@@ To avoid that we check whether the bookingId that is to be deleted is related to the bookings/reservations made by the authenticated guest.
  // @@@ If not that means the guest is trying to delete a booking other than its own.
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations");
  const id = Number(formData.get("bookingId"));

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(Number(id)))
    throw new Error("You are not allowed to update this booking");

  const updatedFields = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", id);

  if (error) {
    throw new Error("Booking could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${id}`);
  revalidatePath("/account/reservations");
  redirect("/account/reservations");
}
