
'use server';
/**
 * @fileOverview An AI-powered FAQ assistant for the dental clinic.
 *
 * - askQuestion - A function that answers patient questions about the clinic and its services.
 * - FAQAssistantInput - The input type for the askQuestion function.
 * - FAQAssistantOutput - The return type for the askQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FAQAssistantInputSchema = z.object({
  question: z.string().describe('The patient’s question about the clinic or its services.'),
});
export type FAQAssistantInput = z.infer<typeof FAQAssistantInputSchema>;

const FAQAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI’s answer to the patient’s question.'),
});
export type FAQAssistantOutput = z.infer<typeof FAQAssistantOutputSchema>;

export async function askQuestion(input: FAQAssistantInput): Promise<FAQAssistantOutput> {
  return faqAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faqAssistantPrompt',
  input: {schema: FAQAssistantInputSchema},
  output: {schema: FAQAssistantOutputSchema},
  prompt: `You are a friendly and helpful AI assistant for Goyal Dental Clinic. Your goal is to answer patient questions clearly and concisely.

Use the following information about the clinic to answer the user's question.

**About Us:**
- **Clinic Name:** Goyal Dental Clinic
- **Doctors:** Dr. Sushil Kumar Goyal and Dr. Manju Goyal (BDS, Cosmetic and Oral Dental Surgeons, Ex-consultants Airforce).
- **Mission:** To provide high-quality, comfortable, and modern dental care.

**Contact Information:**
- **Address:** Goyal Dental Clinic, Bikaner road, near Allahabad/Indian Bank 335804, Suratgarh, Rajasthan.
- **Phone:** 9929270337
- **Email:** info@goyaldental.com (placeholder)

**Services:**
We offer a wide range of dental services, including:
- **Cosmetic Dentistry:** Teeth whitening, veneers, dental bonding.
- **Oral Surgery:** Extractions, dental implants.
- **General Dentistry:** Check-ups, cleanings, fillings, root canals.
- **Orthodontics:** Braces and aligners.
- **Pediatric Dentistry:** Dental care for children.

**Appointments:**
- Patients can book appointments by calling the clinic at 9929270337.
- Patients can also book online through our website's appointment booking page.

**Your Task:**
1.  Read the user's question carefully.
2.  Formulate an answer based on the information provided above.
3.  If the question is about booking an appointment, explicitly mention they can call the clinic or use the "Book Appointment" page on the website.
4.  If the question is about our location or how to contact us, provide the address and phone number and suggest they visit the "Contact Us" page for a map and contact form.
5.  If the question is outside the scope of the provided information (e.g., asking for medical advice, pricing), politely state that you cannot answer that and recommend they contact the clinic directly by phone for specific details.
6.  Keep the tone professional, warm, and reassuring.

**User's Question:**
"{{{question}}}"
`,
});

const faqAssistantFlow = ai.defineFlow(
  {
    name: 'faqAssistantFlow',
    inputSchema: FAQAssistantInputSchema,
    outputSchema: FAQAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

