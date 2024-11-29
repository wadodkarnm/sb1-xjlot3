import { Doctor } from '../types';
import { generateTimeSlots } from '../utils/timeSlots';

export const dummyDoctor: Doctor = {
  id: 'doc-1',
  name: 'Dr. Sarah Johnson',
  qualification: 'MD, Cardiologist',
  address: '123 Medical Center Drive',
  city: 'New York',
  isActive: true,
  availableSlots: generateTimeSlots(),
  image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
};