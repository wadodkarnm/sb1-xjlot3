import React from 'react';
import { format } from 'date-fns';
import { Clock, Users } from 'lucide-react';
import { Appointment } from '../types';

interface Props {
  appointments: Appointment[];
}

export default function TodayAppointments({ appointments }: Props) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todayAppointments = appointments.filter(apt => apt.date === today);

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Hospital Timing Banner */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Hospital Hours: 9:00 AM - 5:00 PM</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Today's Appointments: {todayAppointments.length}</span>
          </div>
        </div>
      </div>

      {/* Today's Date and Time */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </h2>
        <p className="text-gray-600">Current Time: {format(new Date(), 'h:mm a')}</p>
      </div>

      {/* Today's Appointments List */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>
        {todayAppointments.length > 0 ? (
          <div className="space-y-4">
            {todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {apt.timeSlot.time}
                    </p>
                    <h4 className="text-lg font-medium">{apt.patientInfo.name}</h4>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {apt.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <p>📱 {apt.patientInfo.phone}</p>
                  <p>📍 {apt.patientInfo.address}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">No appointments scheduled for today</p>
        )}
      </div>
    </div>
  );
}