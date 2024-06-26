"use server";

import db from "../libs/db";

export async function getListings() {
  try {
    const listings = await db.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
