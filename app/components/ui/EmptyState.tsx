"use client";

import { useRouter } from "next/navigation";

import Heading from "./Heading";
import Button from "./Button";

interface Props {
  title?: string;
  subTitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = "No exact matches found",
  subTitle = "Try adjusting your search criteria or explore other options.",
  showReset,
}: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-2 h-[60vh]">
      <Heading title={title} subtitle={subTitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            type="button"
            outline
            onClick={() => router.push("/")}
            label="Remove All Filters"
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
