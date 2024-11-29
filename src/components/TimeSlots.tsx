import React from 'react';
import { Doctor, TimeSlot } from '../types';

interface Props {
  doctor: Doctor;
  selectedSlot: TimeSlot | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

export default function TimeSlots({ doctor, selectedSlot, onSelectSlot }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Available Time Slots</h2>
      <div className="grid grid-cols-2 gap-3">
        {doctor.availableSlots.map((slot) => (
          <button
            key={slot.id}
            type="button"
            disabled={slot.isBooked}
            onClick={() => onSelectSlot(slot)}
            className={`p-4 text-sm rounded-md transition-colors duration-200 ${
              selectedSlot?.id === slot.id
                ? 'bg-blue-600 text-white shadow-md'
                : slot.isBooked
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow'
            }`}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
}