import { User } from "@prisma/client";
import { create } from "zustand";

interface UserProps {
  user: User | null;
  setUser: (user: User) => void;
}

const useCurrentUser = create<UserProps>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
}));

export default useCurrentUser;
