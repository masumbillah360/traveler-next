import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import useLoginModal from "./useLoginModal";

interface IUserFavorites {
  listingId: string;
  currentUser: User | null | undefined;
}

const useFavorite = ({ listingId, currentUser }: IUserFavorites) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        loginModal.onOpen();
        return;
      }
      try {
        let request;

        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success(
          hasFavorite ? "Removed from favorites" : "Added to favorites"
        );
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    },
    [currentUser, hasFavorite, loginModal, router, listingId]
  );
  return {
    hasFavorite,
    toggleFavorite,
  };
};


export default useFavorite;