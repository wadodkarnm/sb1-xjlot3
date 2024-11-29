import React, { useState } from 'react';
import { format } from 'date-fns';
import { Doctor, TimeSlot, Appointment } from '../types';
import toast from 'react-hot-toast';

interface Props {
  doctor: Doctor;
  onBookAppointment: (appointment: Appointment) => void;
}

export default function AppointmentForm({ doctor, onBookAppointment }: Props) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    selectedSlot: null as TimeSlot | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.selectedSlot) {
      toast.error('Please select a time slot');
      return;
    }

    const appointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientName: formData.patientName,
      patientEmail: formData.patientEmail,
      patientPhone: formData.patientPhone,
      date: formData.date,
      timeSlot: formData.selectedSlot,
      status: 'confirmed',
    };

    onBookAppointment(appointment);
    toast.success('Appointment booked successfully!');
    setFormData({
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      selectedSlot: null,
    });
  };

  if (!doctor.isActive) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">
          The doctor is currently not accepting appointments.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          required
          value={formData.patientName}
          onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          required
          value={formData.patientEmail}
          onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          required
          value={formData.patientPhone}
          onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          required
          min={format(new Date(), 'yyyy-MM-dd')}
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
        <div className="grid grid-cols-3 gap-2">
          {doctor.availableSlots.map((slot) => (
            <button
              key={slot.id}
              type="button"
              disabled={slot.isBooked}
              onClick={() => setFormData({ ...formData, selectedSlot: slot })}
              className={`p-2 text-sm rounded-md ${
                formData.selectedSlot?.id === slot.id
                  ? 'bg-blue-600 text-white'
                  : slot.isBooked
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Book Appointment
      </button>
    </form>
  );
}