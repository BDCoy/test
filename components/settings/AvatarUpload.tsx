import React from 'react';
import { Upload } from 'lucide-react';

interface AvatarUploadProps {
  avatarPreview: string | null;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AvatarUpload({ avatarPreview, onAvatarChange }: AvatarUploadProps) {
  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
      <div className="mt-2 flex items-center space-x-4">
        <div className="relative">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center cursor-pointer hover:bg-green-700"
          >
            <Upload className="h-3 w-3" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onAvatarChange}
          />
        </div>
        <p className="text-xs text-gray-500">
          Recommended: Square image, max 2MB
        </p>
      </div>
    </div>
  );
}