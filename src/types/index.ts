export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  address: string;
  city: string;
  isActive: boolean;
  availableSlots: TimeSlot[];
  image: string;
  bio?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  isBooked: boolean;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export interface Appointment {
  id: string;
  patientInfo: Patient;
  date: string;
  timeSlot: TimeSlot;
  status: 'confirmed' | 'cancelled' | 'completed';
}