import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Appointment } from '../types';

interface Props {
  appointments: Appointment[];
  currentMonth: Date;
}

export default function Calendar({ appointments, currentMonth }: Props) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(
      (apt) => apt.date === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {days.map((day) => {
          const dayAppointments = getAppointmentsForDay(day);
          return (
            <div
              key={day.toString()}
              className="bg-white p-2 min-h-[100px] relative"
            >
              <span className="text-sm text-gray-500">{format(day, 'd')}</span>
              <div className="mt-1 space-y-1">
                {dayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="text-xs p-1 rounded bg-blue-100 text-blue-700"
                  >
                    {apt.timeSlot.time} - {apt.patientInfo.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}