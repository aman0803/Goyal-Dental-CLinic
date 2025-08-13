
export type Medication = {
  name: string;
  dosage: string;
  instructions: string;
}

export type Appointment = {
  id: string;
  patientName: string;
  phone: string;
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
  medications: Medication[];
};

export type DayAvailability = {
  day: string;
  slots: string[];
};

export type DoctorAvailability = DayAvailability[];
