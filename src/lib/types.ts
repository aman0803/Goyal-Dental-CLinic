
export type Medication = {
  name: string;
  dosage: string;
  instructions: string;
}

export type Diagnosis = {
  toothNumber?: string;
  description: string;
};

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
  medicalHistory?: string;
  xrayImage?: string; // a base64 data URI
};

export type Prescription = {
  id: string;
  patientName: string;
  doctorName: string;
  doctorPhone: string;
  date: string;
  medications: Medication[];
  diagnoses?: Diagnosis[];
  treatmentPlan?: string;
  advice?: string;
};

export type DayAvailability = {
  day: string;
  slots: string[];
};

export type DoctorAvailability = DayAvailability[];
