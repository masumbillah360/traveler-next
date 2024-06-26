"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );
  return (
    <CldUploadWidget
      uploadPreset="dl649jsz"
      onUpload={handleUpload}
      options={{
        maxFiles: 1,
        maxFileSize: 4 * 1024 * 1024, // 4MB
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="flex flex-col items-center justify-center gap-4 relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">Click To Upload</div>
            {value && (
              <div className="absolute w-full h-full inset-0">
                <Image
                  alt="Uploaded Thumb"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
