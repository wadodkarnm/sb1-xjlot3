import React, { useState } from 'react';
import { Edit2, Share2 } from 'lucide-react';
import { Doctor } from '../types';
import toast from 'react-hot-toast';
import ImageUpload from './ImageUpload';

interface Props {
  doctor: Doctor;
  onUpdate: (doctor: Doctor) => void;
  isAdmin: boolean;
}

export default function DoctorProfile({ doctor, onUpdate, isAdmin }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(doctor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleShare = () => {
    navigator.share({
      title: `Book appointment with ${doctor.name}`,
      text: `Book your appointment with ${doctor.name} - ${doctor.qualification}`,
      url: window.location.href,
    }).catch(() => {
      toast.error('Sharing failed. Please try again.');
    });
  };

  if (isEditing && isAdmin) {
    return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <div className="flex justify-center mb-6">
          <ImageUpload
            currentImage={formData.image}
            onImageChange={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Qualification</label>
            <input
              type="text"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Active for Appointments</span>
            </label>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
            <p className="text-gray-600">{doctor.qualification}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {isAdmin && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-600 hover:text-blue-600"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={handleShare}
            className="p-2 text-gray-600 hover:text-blue-600"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      {doctor.bio && (
        <div className="mt-4">
          <p className="text-gray-600">{doctor.bio}</p>
        </div>
      )}
      <div className="mt-6 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Address</h3>
          <p className="mt-1 text-gray-900">{doctor.address}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">City</h3>
          <p className="mt-1 text-gray-900">{doctor.city}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Appointment Status</h3>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              doctor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {doctor.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </div>
  );
}