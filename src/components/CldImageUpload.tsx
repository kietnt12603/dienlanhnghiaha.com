'use client';

import { CldUploadWidget } from "next-cloudinary";
import { Image as ImageIcon, Plus, X } from "lucide-react";
import Image from "next/image";

interface CldImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export default function CldImageUpload({ value, onChange, onRemove }: CldImageUploadProps) {
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default";

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap items-center gap-4">
        {value ? (
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 group">
            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={onRemove}
                className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition-colors shadow-lg"
              >
                <X size={16} />
              </button>
            </div>
            <Image
              fill
              src={value}
              alt="Uploaded image"
              className="object-cover"
            />
          </div>
        ) : (
          <CldUploadWidget 
            onSuccess={(result) => {
              onUpload(result);
              setTimeout(() => {
                document.body.style.setProperty("overflow", "auto", "important");
                document.documentElement.style.setProperty("overflow", "auto", "important");
              }, 100);
            }} 
            onClose={() => {
              setTimeout(() => {
                document.body.style.setProperty("overflow", "auto", "important");
                document.documentElement.style.setProperty("overflow", "auto", "important");
              }, 100);
            }}
            uploadPreset={uploadPreset}
          >
            {({ open }) => {
              return (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full aspect-video rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-white/5 transition-all group"
                >
                  <div className="bg-gray-100 dark:bg-white/5 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                    <ImageIcon className="text-gray-400 group-hover:text-primary transition-colors" size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Tải ảnh lên</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 italic">Click để chọn từ máy tính hoặc kéo thả</p>
                  </div>
                </button>
              );
            }}
          </CldUploadWidget>
        )}
      </div>
    </div>
  );
}
