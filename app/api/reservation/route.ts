import getCurrentUser from "@/app/actions/getCurrentUser";
import db from "@/app/libs/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;
  if (!listingId || !startDate || !endDate || !totalPrice) {
    return new NextResponse("Please provide all required fields", {
      status: 400,
    });
  }

  const listingAndReservation = await db.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          startDate,
          endDate,
          totalPrice,
          userId: currentUser.id,
        },
      },
    },
  });
  return NextResponse.json(listingAndReservation);
}
