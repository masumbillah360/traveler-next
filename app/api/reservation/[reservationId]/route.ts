import db from "@/app/libs/db";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { reservationId } = params;
  if (!reservationId || typeof reservationId !== "string") {
    return new NextResponse("Invalid reservation ID", { status: 400 });
  }
  const reservation = await db.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });
  return NextResponse.json(reservation);
}
