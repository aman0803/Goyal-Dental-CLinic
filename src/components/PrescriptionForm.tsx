
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

const formSchema = z.object({
  patientName: z.string().min(1, { message: "Please select a patient." }),
  medications: z.array(medicationSchema).min(1, { message: "At least one medication is required." }),
});

const mockPatients = [
    // This will be empty now
];

const allMedicines = [
    { value: 'amoxicillin', label: 'Amoxicillin' },
    { value: 'ibuprofen', label: 'Ibuprofen' },
    { value: 'paracetamol', label: 'Paracetamol' },
    { value: 'chlorhexidine-mouthwash', label: 'Chlorhexidine Mouthwash' },
    { value: 'azithromycin', label: 'Azithromycin' },
    { value: 'metronidazole', label: 'Metronidazole' },
    { value: 'diclofenac', label: 'Diclofenac' },
    { value: 'ketorolac', label: 'Ketorolac' },
    { value: 'clindamycin', label: 'Clindamycin' },
    { value: 'prednisolone', label: 'Prednisolone' },
]

export function PrescriptionForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      medications: [{ name: "", dosage: "", instructions: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "medications",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={mockPatients.length === 0}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder={mockPatients.length > 0 ? "Select a patient" : "No patients available. Add a patient first."} />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {mockPatients.map(p => (
                            <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
            <FormLabel>Medications</FormLabel>
            <div className="space-y-4 mt-2">
                {fields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4 relative">
                         <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => remove(index)}
                            disabled={fields.length === 1}
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
                    onClick={() => append({ name: "", dosage: "", instructions: "" })}
                    >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Medication
                </Button>
                <FormMessage>{form.formState.errors.medications?.message}</FormMessage>
            </div>
        </div>
        
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
                <CommandItem
                  key={med.value}
                  value={med.label}
                  onSelect={(currentValue) => {
                    field.onChange(currentValue === field.value ? "" : allMedicines.find(m => m.label.toLowerCase() === currentValue.toLowerCase())?.label);
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
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
