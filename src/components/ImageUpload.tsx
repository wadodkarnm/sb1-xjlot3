import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
}

export default function ImageUpload({ currentImage, onImageChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <img
        src={currentImage}
        alt="Doctor profile"
        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full text-white shadow-lg 
                 hover:bg-blue-700 transition-colors duration-200"
      >
        <Upload className="w-4 h-4" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
}