export const generateTimeSlots = () => {
  const slots = [];
  const startHour = 9; // 9 AM
  
  // Generate exactly 10 slots of 30 minutes each
  for (let i = 0; i < 10; i++) {
    const currentSlotMinutes = i * 30;
    const hour = Math.floor(startHour + currentSlotMinutes / 60);
    const minutes = currentSlotMinutes % 60;
    
    const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const displayTime = `${displayHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    
    slots.push({
      id: `slot-${hour}-${minutes}`,
      time: displayTime,
      isBooked: false,
    });
  }

  return slots;
};