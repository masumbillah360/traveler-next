"use server";

import db from "../libs/db";

interface IParams {
  listingId?: string;
}

export async function getListingById({ params }: { params: IParams }) {
  const { listingId } = params;
  try {
    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });
    if (!listing) {
      return {
        message: "Not Found",
        success: false,
        data: null,
      };
    }
    return {
      message: "",
      success: true,
      data: listing,
    };
  } catch (error: any) {
    return {
      message: "Something went wrong!",
      success: false,
      data: null,
    };
  }
}
