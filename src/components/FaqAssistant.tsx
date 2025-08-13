
"use client";

import { useState } from "react";
import { askQuestion } from "@/ai/flows/faq-assistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, User, Sparkles, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FaqAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState(false);

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");
    setAsked(true);

    try {
      const result = await askQuestion({ question });
      setAnswer(result.answer);
    } catch (error) {
      console.error(error);
      setAnswer("I'm sorry, but I encountered an error. Please try asking again or contact the clinic directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center">
        <div className="mx-auto bg-accent/20 p-3 rounded-full w-fit mb-2">
            <Sparkles className="h-8 w-8 text-accent"/>
        </div>
        <CardTitle className="text-2xl font-headline">AI-Powered FAQ Assistant</CardTitle>
        <CardDescription>Have a question? Ask our assistant for a quick answer.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <Input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What are your clinic hours?"
            aria-label="Your question"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !question.trim()}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Ask"}
          </Button>
        </form>

        {asked && (
          <div className="space-y-4 pt-4 border-t">
             <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-200 rounded-full"><User className="h-5 w-5 text-gray-600"/></div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-md">
                    <p className="font-semibold text-sm">You asked:</p>
                    <p className="text-muted-foreground">{question}</p>
                </div>
            </div>
            
            <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/20 rounded-full"><Bot className="h-5 w-5 text-primary"/></div>
                <div className="bg-blue-50 rounded-lg p-3 max-w-md">
                <p className="font-semibold text-sm text-primary">Answer:</p>
                    {loading ? (
                       <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Thinking...</span>
                        </div>
                    ) : (
                        <p className="text-muted-foreground whitespace-pre-wrap">{answer}</p>
                    )}
                </div>
            </div>
          </div>
        )}
      </CardContent>
       <CardFooter className="flex justify-between items-center bg-gray-50 p-4 rounded-b-lg">
           <p className="text-sm text-muted-foreground">Need more help?</p>
            <Button asChild variant="outline">
                <Link href="/contact">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
            </Button>
       </CardFooter>
    </Card>
  );
}

