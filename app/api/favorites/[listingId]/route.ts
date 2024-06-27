import getCurrentUser from "@/app/actions/getCurrentUser";
import db from "@/app/libs/db";
import { NextResponse } from "next/server";

interface IParams {
  listingId?: string;
}
export default async function POST(
  req: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return new Response("Invalid listing ID", { status: 400 });
  }
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds.push(listingId);
  const user = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(user, { status: 201 });
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { listingId } = params;
  if (!listingId || typeof listingId !== "string") {
    return new Response("Invalid listing ID", { status: 400 });
  }
  let favoriteIds = [...(currentUser.favoriteIds || [])];
  favoriteIds = favoriteIds.filter((id) => id !== listingId);
  const user = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });
  return NextResponse.json(user);
}
