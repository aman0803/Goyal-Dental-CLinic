
export type Appointment = {
  id: string;
  patientName: string;
  date: string;
  time: string;
  reason: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
};

export type Patient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
};

export type Prescription = {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  medication: string;
  dosage: string;
  instructions: string;
};

