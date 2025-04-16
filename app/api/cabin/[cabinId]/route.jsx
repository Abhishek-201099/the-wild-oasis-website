import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// Can't create a page.jsx in the same dir. Only route.jsx.
export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export  async function POST(){}
