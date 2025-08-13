
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { Patient, Prescription } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, X, PlusCircle } from "lucide-react";


const medicationSchema = z.object({
    name: z.string().min(1, { message: "Medication name cannot be empty." }),
    dosage: z.string().min(1, { message: "Dosage is required." }),
    instructions: z.string().min(5, { message: "Instructions are required." }),
});

const diagnosisSchema = z.object({
    toothNumber: z.string().optional(),
    description: z.string().min(3, { message: "Description must be at least 3 characters." }),
})

const formSchema = z.object({
  patientName: z.string().min(1, { message: "Please select a patient." }),
  diagnoses: z.array(diagnosisSchema).optional(),
  treatmentPlan: z.string().optional(),
  medications: z.array(medicationSchema).min(1, { message: "At least one medication is required." }),
  advice: z.string().optional(),
});

const allMedicines = [
    { heading: "Analgesics (Pain Relievers)" },
    { value: 'ibuprofen', label: 'Ibuprofen (Advil, Motrin)' },
    { value: 'acetaminophen', label: 'Acetaminophen (Tylenol)' },
    { value: 'naproxen', label: 'Naproxen (Aleve)' },
    { value: 'aspirin', label: 'Aspirin' },
    { value: 'diclofenac', label: 'Diclofenac' },
    { value: 'ketorolac', label: 'Ketorolac (Toradol)' },
    { value: 'codeine-acetaminophen', label: 'Codeine/Acetaminophen (Tylenol #3)' },
    { value: 'hydrocodone-acetaminophen', label: 'Hydrocodone/Acetaminophen (Vicodin, Norco)' },
    { value: 'oxycodone-acetaminophen', label: 'Oxycodone/Acetaminophen (Percocet)' },
    { value: 'tramadol', label: 'Tramadol (Ultram)' },
    { heading: "Antibiotics" },
    { value: 'amoxicillin', label: 'Amoxicillin' },
    { value: 'penicillin-vk', label: 'Penicillin VK' },
    { value: 'clindamycin', label: 'Clindamycin' },
    { value: 'metronidazole', label: 'Metronidazole' },
    { value: 'azithromycin', label: 'Azithromycin (Z-Pak)' },
    { value: 'cephalexin', label: 'Cephalexin (Keflex)' },
    { value: 'doxycycline', label: 'Doxycycline' },
    { value: 'erythromycin', label: 'Erythromycin' },
    { value: 'amoxicillin-clavulanate', label: 'Amoxicillin/Clavulanate (Augmentin)'},
    { heading: "Antiseptic Rinses" },
    { value: 'chlorhexidine-gluconate', label: 'Chlorhexidine Gluconate Rinse (Peridex)' },
    { value: 'hydrogen-peroxide-rinse', label: 'Hydrogen Peroxide Rinse' },
    { value: 'listerine-antiseptic', label: 'Listerine Antiseptic' },
    { value: 'cetylpyridinium-chloride', label: 'Cetylpyridinium Chloride (CPC) Rinse'},
    { heading: "Antifungals" },
    { value: 'nystatin', label: 'Nystatin' },
    { value: 'clotrimazole', label: 'Clotrimazole Troches' },
    { value: 'fluconazole', label: 'Fluconazole (Diflucan)' },
    { value: 'miconazole', label: 'Miconazole Oral Gel'},
    { heading: "Antivirals" },
    { value: 'acyclovir', label: 'Acyclovir (Zovirax)' },
    { value: 'valacyclovir', label: 'Valacyclovir (Valtrex)' },
    { value: 'penciclovir', label: 'Penciclovir (Denavir)' },
    { heading: "Topical Anesthetics" },
    { value: 'lidocaine-viscous', label: 'Lidocaine (Viscous)' },
    { value: 'benzocaine', label: 'Benzocaine (Orajel)' },
    { value: 'tetracaine', label: 'Tetracaine'},
    { value: 'dyclonine', label: 'Dyclonine Rinse'},
    { heading: "Corticosteroids" },
    { value: 'dexamethasone', label: 'Dexamethasone' },
    { value: 'prednisolone', label: 'Prednisolone' },
    { value: 'triamcinolone-acetonide', label: 'Triamcinolone Acetonide (in Orabase)'},
    { value: 'hydrocortisone-cream', label: 'Hydrocortisone Cream'},
    { heading: "Fluoride Treatments" },
    { value: 'sodium-fluoride-rinse', label: 'Sodium Fluoride Rinse (Phos-Flur)' },
    { value: 'stannous-fluoride-gel', label: 'Stannous Fluoride Gel (Gel-Kam)' },
    { value: 'prevident-5000', label: 'Prevident 5000 Plus' },
    { value: 'fluoride-varnish', label: 'Fluoride Varnish'},
    { heading: "Sedatives (for Anxiety)" },
    { value: 'diazepam', label: 'Diazepam (Valium)' },
    { value: 'triazolam', label: 'Triazolam (Halcion)' },
    { value: 'lorazepam', label: 'Lorazepam (Ativan)' },
    { value: 'midazolam', label: 'Midazolam (Versed)'},
    { value: 'nitrous-oxide', label: 'Nitrous Oxide'},
];


export function PrescriptionForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
        setPatients(JSON.parse(storedPatients));
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      diagnoses: [{ toothNumber: "", description: "" }],
      treatmentPlan: "",
      medications: [{ name: "", dosage: "", instructions: "" }],
      advice: "",
    },
  });

  const { fields: medicationFields, append: appendMedication, remove: removeMedication } = useFieldArray({
    control: form.control,
    name: "medications",
  });
  
  const { fields: diagnosisFields, append: appendDiagnosis, remove: removeDiagnosis } = useFieldArray({
    control: form.control,
    name: "diagnoses",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const storedPrescriptions = localStorage.getItem('prescriptions');
    const prescriptions: Prescription[] = storedPrescriptions ? JSON.parse(storedPrescriptions) : [];

    const newPrescription: Prescription = {
        id: new Date().getTime().toString(),
        ...values,
        doctorName: "Dr. Sushil Kumar Goyal", // Or make this selectable
        date: new Date().toLocaleDateString(),
    };

    const updatedPrescriptions = [...prescriptions, newPrescription];
    localStorage.setItem('prescriptions', JSON.stringify(updatedPrescriptions));

    toast({
      title: "Prescription Created",
      description: `A new prescription for ${values.patientName} has been saved.`,
    });
    router.push("/admin/prescriptions");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="patientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient Name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={patients.length === 0}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={patients.length > 0 ? "Select a patient" : "No patients available. Add a patient first."} />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {patients.map(p => (
                            <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
         <div>
            <FormLabel>Diagnosis</FormLabel>
            <div className="space-y-4 mt-2">
                {diagnosisFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                         <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeDiagnosis(index)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name={`diagnoses.${index}.toothNumber`}
                                render={({ field }) => (
                                    <FormItem className="w-1/4">
                                        <FormLabel>Tooth #</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., 14" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`diagnoses.${index}.description`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Acute Pulpitis" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                ))}
                 <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => appendDiagnosis({ toothNumber: "", description: "" })}
                    >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Diagnosis
                </Button>
                <FormMessage>{form.formState.errors.diagnoses?.root?.message}</FormMessage>
            </div>
        </div>

        
        <FormField
          control={form.control}
          name="treatmentPlan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan of Treatment (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Root Canal Treatment on #14, Scaling and Root Planing..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <div>
            <FormLabel>Medications</FormLabel>
            <div className="space-y-4 mt-2">
                {medicationFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                         <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => removeMedication(index)}
                            disabled={medicationFields.length === 1}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                        <FormField
                            control={form.control}
                            name={`medications.${index}.name`}
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Medication Name</FormLabel>
                                    <MedicationCombobox field={field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`medications.${index}.dosage`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dosage</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., 500mg" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`medications.${index}.instructions`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instructions</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="e.g., Take one tablet twice a day after meals for 5 days." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                ))}
                 <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => appendMedication({ name: "", dosage: "", instructions: "" })}
                    >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Medication
                </Button>
                <FormMessage>{form.formState.errors.medications?.root?.message}</FormMessage>
            </div>
        </div>

        <FormField
          control={form.control}
          name="advice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Advice (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Avoid hot and cold beverages for 24 hours. Follow-up in 1 week." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-2">
            <Button type="submit">Create Prescription</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
}


function MedicationCombobox({ field }: { field: any }) {
    const [open, setOpen] = useState(false)

    return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {field.value
            ? allMedicines.find((med) => med.label === field.value)?.label
            : "Select medicine..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search medicine..." />
          <CommandList>
            <CommandEmpty>No medicine found.</CommandEmpty>
            <CommandGroup>
              {allMedicines.map((med) => (
                med.heading ? (
                    <div key={med.heading} className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">{med.heading}</div>
                ) : (
                <CommandItem
                  key={med.value}
                  value={med.label}
                  onSelect={(currentValue) => {
                    field.onChange(currentValue === field.value ? "" : allMedicines.find(m => m.label?.toLowerCase() === currentValue.toLowerCase())?.label);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      field.value === med.label ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {med.label}
                </CommandItem>
                )
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
