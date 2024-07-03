import getCurrentUser from "@/app/actions/getCurrentUser";
import db from "@/app/libs/db";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return new NextResponse("Invalid listing ID", { status: 400 });
  }
  const listing = await db.listing.deleteMany({
    where: {
      id: listingId,
      userId: currentUser.id,
    },
  });
  return NextResponse.json(listing);
}
