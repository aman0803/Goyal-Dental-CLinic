const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Goyal Dental Clinic Backend API');
});

// Prescription routes
app.get('/prescriptions', async (req, res) => {
  try {
    const prescriptions = await prisma.prescription.findMany();
    res.json(prescriptions);
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/prescriptions', async (req, res) => {
  const { patientId, medication, dosage, instructions, expiresAt } = req.body;
  try {
    const newPrescription = await prisma.prescription.create({
      data: {
        patientId,
        medication,
        dosage,
        instructions,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });
    res.status(201).json(newPrescription);
  } catch (error) {
    console.error('Error creating prescription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Patient routes (basic)
app.get('/patients', async (req, res) => {
  try {
    const patients = await prisma.patient.findMany();
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/patients', async (req, res) => {
  const { firstName, lastName, dateOfBirth, address, phone, email } = req.body;
  try {
    const newPatient = await prisma.patient.create({
      data: {
        firstName,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
        address,
        phone,
        email,
      },
    });
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Appointment routes
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/appointments', async (req, res) => {
  const { patientId, date, time, reason, status } = req.body;
  try {
    const newAppointment = await prisma.appointment.create({
      data: {
        patientId,
        date: new Date(date),
        time,
        reason,
        status,
      },
    });
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
