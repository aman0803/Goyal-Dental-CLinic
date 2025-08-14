
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
    { heading: "Pain Relievers / NSAIDs / Analgesics" },
    { value: "ibuprofen", label: "Ibuprofen" },
    { value: "naproxen", label: "Naproxen" },
    { value: "diclofenac-sodium", label: "Diclofenac sodium" },
    { value: "diclofenac-potassium", label: "Diclofenac potassium" },
    { value: "ketorolac-tromethamine", label: "Ketorolac tromethamine" },
    { value: "etoricoxib", label: "Etoricoxib" },
    { value: "etodolac", label: "Etodolac" },
    { value: "aceclofenac", label: "Aceclofenac" },
    { value: "aceclofenac-paracetamol", label: "Aceclofenac + Paracetamol" },
    { value: "aceclofenac-paracetamol-serratiopeptidase", label: "Aceclofenac + Paracetamol + Serratiopeptidase" },
    { value: "paracetamol", label: "Paracetamol (Acetaminophen)" },
    { value: "paracetamol-ibuprofen", label: "Paracetamol + Ibuprofen" },
    { value: "paracetamol-tramadol", label: "Paracetamol + Tramadol" },
    { value: "paracetamol-codeine-phosphate", label: "Paracetamol + Codeine phosphate" },
    { value: "mefenamic-acid", label: "Mefenamic acid" },
    { value: "nimesulide", label: "Nimesulide (less preferred now)" },
    { value: "aspirin", label: "Aspirin (Acetylsalicylic acid)" },
    { value: "indomethacin", label: "Indomethacin" },
    { value: "meloxicam", label: "Meloxicam" },
    { value: "piroxicam", label: "Piroxicam" },
    { value: "flurbiprofen", label: "Flurbiprofen" },
    { heading: "Opioid Analgesics" },
    { value: "codeine-phosphate", label: "Codeine phosphate" },
    { value: "tramadol-hydrochloride", label: "Tramadol hydrochloride" },
    { value: "tapentadol", label: "Tapentadol" },
    { heading: "Antibiotics" },
    { value: "amoxicillin", label: "Amoxicillin" },
    { value: "amoxicillin-clavulanic-acid", label: "Amoxicillin + Clavulanic Acid" },
    { value: "ampicillin", label: "Ampicillin" },
    { value: "penicillin-v-potassium", label: "Penicillin V potassium" },
    { value: "benzathine-penicillin-g", label: "Benzathine penicillin G" },
    { value: "metronidazole", label: "Metronidazole" },
    { value: "tinidazole", label: "Tinidazole" },
    { value: "ornidazole", label: "Ornidazole" },
    { value: "ofloxacin-ornidazole", label: "Ofloxacin + Ornidazole" },
    { value: "azithromycin", label: "Azithromycin" },
    { value: "roxithromycin", label: "Roxithromycin" },
    { value: "clarithromycin", label: "Clarithromycin" },
    { value: "erythromycin", label: "Erythromycin" },
    { value: "clindamycin", label: "Clindamycin" },
    { value: "doxycycline", label: "Doxycycline" },
    { value: "minocycline", label: "Minocycline" },
    { value: "tetracycline", label: "Tetracycline" },
    { value: "ciprofloxacin", label: "Ciprofloxacin" },
    { value: "levofloxacin", label: "Levofloxacin" },
    { value: "moxifloxacin", label: "Moxifloxacin" },
    { value: "ofloxacin", label: "Ofloxacin" },
    { value: "cefalexin", label: "Cefalexin" },
    { value: "cefadroxil", label: "Cefadroxil" },
    { value: "cefuroxime-axetil", label: "Cefuroxime axetil" },
    { value: "cefixime", label: "Cefixime" },
    { value: "cefpodoxime-proxetil", label: "Cefpodoxime proxetil" },
    { value: "ceftriaxone", label: "Ceftriaxone" },
    { value: "linezolid", label: "Linezolid" },
    { heading: "Antiseptics / Disinfectants" },
    { value: "chlorhexidine-gluconate", label: "Chlorhexidine gluconate" },
    { value: "povidone-iodine", label: "Povidone-iodine" },
    { value: "hydrogen-peroxide", label: "Hydrogen peroxide" },
    { value: "benzydamine-hydrochloride", label: "Benzydamine hydrochloride" },
    { value: "hexetidine", label: "Hexetidine" },
    { value: "cetylpyridinium-chloride", label: "Cetylpyridinium chloride" },
    { value: "thymol", label: "Thymol" },
    { value: "eucalyptol", label: "Eucalyptol" },
    { value: "menthol", label: "Menthol" },
    { value: "sodium-hypochlorite", label: "Sodium hypochlorite (irrigant in root canal)" },
    { heading: "Anti-inflammatory & Steroids" },
    { value: "prednisolone", label: "Prednisolone" },
    { value: "methylprednisolone", label: "Methylprednisolone" },
    { value: "dexamethasone", label: "Dexamethasone" },
    { value: "hydrocortisone", label: "Hydrocortisone" },
    { value: "triamcinolone-acetonide", label: "Triamcinolone acetonide" },
    { value: "betamethasone", label: "Betamethasone" },
    { heading: "Enzymes" },
    { value: "serratiopeptidase", label: "Serratiopeptidase" },
    { value: "trypsin-chymotrypsin", label: "Trypsin-Chymotrypsin" },
    { heading: "Muscle Relaxants" },
    { value: "chlorzoxazone", label: "Chlorzoxazone" },
    { value: "diclofenac-chlorzoxazone", label: "Diclofenac + Paracetamol + Chlorzoxazone" },
    { heading: "Antifungals" },
    { value: "nystatin-oral-suspension", label: "Nystatin oral suspension" },
    { value: "clotrimazole-mouth-paint", label: "Clotrimazole mouth paint / lozenges" },
    { value: "miconazole-gel", label: "Miconazole gel" },
    { value: "fluconazole", label: "Fluconazole" },
    { value: "ketoconazole", label: "Ketoconazole" },
    { value: "itraconazole", label: "Itraconazole" },
    { value: "amphotericin-b", label: "Amphotericin B" },
    { value: "terbinafine", label: "Terbinafine" },
    { heading: "Local Anesthetics" },
    { value: "lidocaine-hydrochloride", label: "Lidocaine hydrochloride" },
    { value: "articaine-hydrochloride", label: "Articaine hydrochloride" },
    { value: "mepivacaine-hydrochloride", label: "Mepivacaine hydrochloride" },
    { value: "bupivacaine-hydrochloride", label: "Bupivacaine hydrochloride" },
    { value: "prilocaine-hydrochloride", label: "Prilocaine hydrochloride" },
    { value: "benzocaine-topical-gel", label: "Benzocaine topical gel" },
    { value: "tetracaine", label: "Tetracaine" },
    { heading: "Hemostatic Agents" },
    { value: "tranexamic-acid", label: "Tranexamic acid" },
    { value: "adrenaline", label: "Adrenaline (epinephrine) in LA" },
    { value: "ferric-sulfate", label: "Ferric sulfate" },
    { value: "aluminum-chloride", label: "Aluminum chloride" },
    { value: "monsels-solution", label: "Monsel’s solution" },
    { heading: "Antiviral Agents" },
    { value: "acyclovir", label: "Acyclovir" },
    { value: "valacyclovir", label: "Valacyclovir" },
    { value: "famciclovir", label: "Famciclovir" },
    { heading: "Antihistamines" },
    { value: "cetirizine", label: "Cetirizine" },
    { value: "loratadine", label: "Loratadine" },
    { value: "levocetirizine", label: "Levocetirizine" },
    { value: "chlorpheniramine-maleate", label: "Chlorpheniramine maleate" },
    { value: "diphenhydramine", label: "Diphenhydramine" },
    { value: "hydroxyzine", label: "Hydroxyzine" },
    { heading: "Oral Ulcer & Mucosal Care" },
    { value: "benzocaine-gel", label: "Benzocaine gel" },
    { value: "lidocaine-gel", label: "Lidocaine gel" },
    { value: "choline-salicylate-gel", label: "Choline salicylate gel" },
    { value: "triamcinolone-acetonide-paste", label: "Triamcinolone acetonide paste" },
    { value: "hyaluronic-acid-gel", label: "Hyaluronic acid gel" },
    { value: "sucralfate-oral-suspension", label: "Sucralfate oral suspension" },
    { heading: "Fluoride Preparations" },
    { value: "sodium-fluoride-varnish", label: "Sodium fluoride varnish" },
    { value: "stannous-fluoride-gel", label: "Stannous fluoride gel" },
    { value: "acidulated-phosphate-fluoride-gel", label: "Acidulated phosphate fluoride gel" },
    { value: "sodium-monofluorophosphate-toothpaste", label: "Sodium monofluorophosphate toothpaste" },
    { heading: "Saliva Substitutes / Xerostomia" },
    { value: "carboxymethylcellulose-mouth-spray", label: "Carboxymethylcellulose mouth spray" },
    { value: "glycerin-based-saliva-substitute", label: "Glycerin-based saliva substitute" },
    { value: "xylitol-lozenges", label: "Xylitol lozenges" },
    { value: "biotene-mouth-rinse", label: "Biotene mouth rinse" },
    { heading: "Anti-Anxiety / Sedatives" },
    { value: "diazepam", label: "Diazepam" },
    { value: "lorazepam", label: "Lorazepam" },
    { value: "midazolam", label: "Midazolam" },
    { value: "alprazolam", label: "Alprazolam" },
    { value: "nitrous-oxide", label: "Nitrous oxide (inhalation sedation)" },
    { heading: "Gastroprotectives (with NSAIDs)" },
    { value: "pantoprazole", label: "Pantoprazole" },
    { value: "omeprazole", label: "Omeprazole" },
    { value: "rabeprazole", label: "Rabeprazole" },
    { value: "esomeprazole", label: "Esomeprazole" },
    { value: "lansoprazole", label: "Lansoprazole" },
    { value: "famotidine", label: "Famotidine" },
    { heading: "Vitamins & Minerals" },
    { value: "vitamin-b-complex", label: "Vitamin B complex" },
    { value: "methylcobalamin", label: "Methylcobalamin" },
    { value: "folic-acid", label: "Folic acid" },
    { value: "pyridoxine", label: "Pyridoxine" },
    { value: "niacinamide", label: "Niacinamide" },
    { value: "ascorbic-acid", label: "Ascorbic acid (Vitamin C)" },
    { value: "vitamin-d3", label: "Vitamin D3" },
    { value: "calcium-carbonate", label: "Calcium carbonate" },
    { value: "calcium-citrate", label: "Calcium citrate" },
    { heading: "Immunosuppressants" },
    { value: "tacrolimus-ointment", label: "Tacrolimus ointment" },
    { value: "cyclosporine", label: "Cyclosporine" },
    { heading: "Antiemetics" },
    { value: "ondansetron", label: "Ondansetron" },
    { value: "domperidone", label: "Domperidone" },
    { value: "metoclopramide", label: "Metoclopramide" },
    { heading: "Dental Materials / Special Preparations" },
    { value: "calcium-hydroxide-paste", label: "Calcium hydroxide paste" },
    { value: "eugenol", label: "Eugenol" },
    { value: "formocresol", label: "Formocresol" },
    { value: "mineral-trioxide-aggregate", label: "Mineral trioxide aggregate (MTA)" },
    { value: "silver-diamine-fluoride", label: "Silver diamine fluoride" },
    { value: "calcium-phosphate-paste", label: "Calcium phosphate paste" },
    { heading: "Desensitizing Agents" },
    { value: "potassium-nitrate-toothpaste", label: "Potassium nitrate toothpaste" },
    { value: "arginine-based-toothpaste", label: "Arginine-based toothpaste" },
    { heading: "Herbal / Alternative Products" },
    { value: "aloe-vera-gel", label: "Aloe vera gel" },
    { value: "clove-oil", label: "Clove oil" },
    { value: "turmeric-oral-gel", label: "Turmeric oral gel" },
    { value: "neem-extract-mouthwash", label: "Neem extract mouthwash" },
    { value: "tulsi-extract-mouthwash", label: "Tulsi extract mouthwash" },
    { heading: "Pediatric Medicines" },
    { value: "pediatric-ibuprofen-suspension", label: "Pediatric ibuprofen suspension" },
    { value: "pediatric-paracetamol-suspension", label: "Pediatric paracetamol suspension" },
    { value: "amoxicillin-pediatric-suspension", label: "Amoxicillin pediatric suspension" },
    { value: "azithromycin-pediatric-suspension", label: "Azithromycin pediatric suspension" },
    { value: "clindamycin-pediatric-suspension", label: "Clindamycin pediatric suspension" },
    { value: "pediatric-chlorhexidine-mouthwash", label: "Pediatric chlorhexidine mouthwash" },
    { value: "fluoride-drops", label: "Fluoride drops" },
    { heading: "Emergency Drugs in Dental Office" },
    { value: "adrenaline-injection", label: "Adrenaline injection" },
    { value: "nitroglycerin-sublingual", label: "Nitroglycerin sublingual" },
    { value: "salbutamol-inhaler", label: "Salbutamol inhaler" },
    { value: "glucose-gel", label: "Glucose gel" },
    { value: "hydrocortisone-injection", label: "Hydrocortisone injection" },
    { value: "diphenhydramine-injection", label: "Diphenhydramine injection" },
    { value: "atropine-sulfate", label: "Atropine sulfate" },
    { value: "oxygen-inhalation", label: "Oxygen inhalation" },
    { value: "aspirin-chewable", label: "Aspirin chewable" },
    { value: "naloxone-injection", label: "Naloxone injection" },
    { heading: "Miscellaneous" },
    { value: "benzalkonium-chloride", label: "Benzalkonium chloride" },
    { value: "menthol-mouth-rinse", label: "Menthol mouth rinse" },
    { value: "thymol-containing-rinse", label: "Thymol-containing rinse" },
    { value: "eucalyptol-containing-rinse", label: "Eucalyptol-containing rinse" },
    { value: "methyl-salicylate-rinse", label: "Methyl salicylate rinse" },
    { value: "activated-charcoal-toothpaste", label: "Activated charcoal toothpaste" },
    { value: "baking-soda-rinse", label: "Baking soda rinse" },
    { value: "xylitol-gum", label: "Xylitol gum" },
    { value: "probiotic-oral-capsules", label: "Probiotic oral capsules" },
    { value: "herbal-lozenges-for-throat", label: "Herbal lozenges for throat" },
    { value: "isotretinoin", label: "Isotretinoin (for cystic lesions)" },
    { value: "allopurinol", label: "Allopurinol (if gout-related oral issue)" },
    { value: "methotrexate", label: "Methotrexate (rare autoimmune cases)" },
    { value: "azathioprine", label: "Azathioprine (severe lichen planus)" },
    { value: "chloral-hydrate", label: "Chloral hydrate (rare pediatric sedation)" },
    { value: "saline-gargle-solution", label: "Saline gargle solution" },
    { value: "tea-tree-oil-rinse", label: "Tea tree oil rinse" },
    { value: "eugenol-oil", label: "Eugenol oil for temporary filling" },
    { value: "polycarboxylate-cement-powder", label: "Polycarboxylate cement powder" },
    { value: "glass-ionomer-cement-powder", label: "Glass ionomer cement powder" },
    { value: "zinc-oxide-powder", label: "Zinc oxide powder" },
    { value: "edta-solution", label: "EDTA solution (root canal irrigation)" },
    { value: "sodium-hypochlorite-gel", label: "Sodium hypochlorite gel (irrigant)" },
    { value: "chlorhexidine-gel", label: "Chlorhexidine gel" },
    { value: "iodine-glycerin-paint", label: "Iodine glycerin paint" },
    { value: "phenol-compound-disinfectant", label: "Phenol compound disinfectant" },
    { value: "benzocaine-chlorhexidine-combo-gel", label: "Benzocaine + Chlorhexidine combo gel" },
    { value: "cetylpyridinium-sodium-fluoride-rinse", label: "Cetylpyridinium + Sodium fluoride rinse" },
    { value: "piperacillin-tazobactam", label: "Piperacillin-tazobactam (rare, severe infections)" },
    { value: "amikacin", label: "Amikacin (hospital dental infections)" },
    { value: "gentamicin", label: "Gentamicin (severe cases)" },
    { value: "daptomycin", label: "Daptomycin (rare, resistant cases)" },
    { value: "sucralfate-oxetacaine-oral-suspension", label: "Sucralfate + Oxetacaine oral suspension" },
    { value: "sodium-bicarbonate-mouthwash", label: "Sodium bicarbonate mouthwash" },
    { value: "camphorated-chlorophenol", label: "Camphorated chlorophenol" },
    { value: "hydrogen-peroxide-baking-soda-combo", label: "Hydrogen peroxide + baking soda combo" },
    { value: "polyvinyl-siloxane-impression-material", label: "Polyvinyl siloxane impression material (chairside use)" },
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
        doctorPhone: "9929270337",
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
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState(field.value || "");

    return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {field.value || "Select or type medicine..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput 
            placeholder="Search or type medicine..." 
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No medicine found.</CommandEmpty>
            <CommandGroup>
              {allMedicines.filter(med => !med.heading && med.label?.toLowerCase().includes(inputValue.toLowerCase())).map((med) => (
                <CommandItem
                  key={med.value}
                  value={med.label}
                  onSelect={(currentValue) => {
                    const label = allMedicines.find(m => m.label?.toLowerCase() === currentValue.toLowerCase())?.label || currentValue;
                    field.onChange(label);
                    setInputValue(label);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      field.value?.toLowerCase() === med.label?.toLowerCase() ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {med.label}
                </CommandItem>
              ))}
            </CommandGroup>
             <CommandItem
                onSelect={() => {
                  field.onChange(inputValue);
                  setOpen(false);
                }}
                className="[&[data-selected]]:bg-accent [&[data-selected]]:text-accent-foreground]"
              >
                Add "{inputValue}"
              </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
