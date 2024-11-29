import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import { Doctor, Appointment, Patient } from './types';
import { dummyDoctor } from './data/dummy';
import DoctorProfile from './components/DoctorProfile';
import PatientProfile from './components/PatientProfile';
import TimeSlots from './components/TimeSlots';
import TodayAppointments from './components/TodayAppointments';

function App() {
  const [doctor, setDoctor] = useState<Doctor>(dummyDoctor);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const handleDoctorUpdate = (updatedDoctor: Doctor) => {
    setDoctor(updatedDoctor);
  };

  const handlePatientUpdate = (updatedPatient: Patient) => {
    setCurrentPatient(updatedPatient);
  };

  const handleBookAppointment = () => {
    if (!currentPatient || !selectedSlot) return;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      patientInfo: currentPatient,
      date: format(new Date(), 'yyyy-MM-dd'),
      timeSlot: selectedSlot,
      status: 'confirmed'
    };

    setAppointments([...appointments, newAppointment]);
    setDoctor((prev) => ({
      ...prev,
      availableSlots: prev.availableSlots.map((slot) =>
        slot.id === selectedSlot.id ? { ...slot, isBooked: true } : slot
      ),
    }));
    setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Doctor Appointment System</h1>
            <button
              onClick={() => setIsAdmin(!isAdmin)}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {isAdmin ? 'Switch to Patient View' : 'Switch to Admin View'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Section 1: Doctor Information */}
          <div className="lg:col-span-1">
            <DoctorProfile
              doctor={doctor}
              onUpdate={handleDoctorUpdate}
              isAdmin={isAdmin}
            />
          </div>

          {/* Section 2: Patient Registration */}
          <div className="lg:col-span-1">
            {!isAdmin && (
              <>
                <PatientProfile
                  patient={currentPatient}
                  onSave={handlePatientUpdate}
                />
                {currentPatient && doctor.isActive && (
                  <div className="mt-6">
                    <TimeSlots
                      doctor={doctor}
                      selectedSlot={selectedSlot}
                      onSelectSlot={setSelectedSlot}
                    />
                    {selectedSlot && (
                      <button
                        onClick={handleBookAppointment}
                        className="mt-4 w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Confirm Appointment
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Section 3: Today's Appointments */}
          <div className="lg:col-span-1">
            <TodayAppointments appointments={appointments} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;