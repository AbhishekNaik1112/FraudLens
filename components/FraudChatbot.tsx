/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot } from 'lucide-react';
import OpenAI from 'openai';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Define the structure of your fraud data if needed (or keep as any)
type FraudData = any;

export default function FraudChatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am Grok, your fraud detection assistant. Ask me anything about our fraud data.',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [fraudData, setFraudData] = useState<FraudData | null>(null);

  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_GROK_API,
    baseURL: 'https://api.x.ai/v1/chat/completions',
  });

  // Fetch fraud data once when the component mounts
  useEffect(() => {
    async function loadFraudData() {
      try {
        const response = await fetch('/api/fraud-data');
        if (!response.ok) throw new Error('Failed to fetch fraud data');
        const data = await response.json();
        setFraudData(data);
      } catch (error) {
        console.error('Error fetching fraud data:', error);
      }
    }
    loadFraudData();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Append the user's question
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build a system prompt that includes the fraud data context
      const context = fraudData
        ? JSON.stringify(fraudData, null, 2) // Format nicely; adjust as needed
        : 'No fraud data available.';
      const systemPrompt = `You are Grok, a fraud detection assistant. Here is the fraud data available in the system:
${context}

Answer the following question accurately.`;

      // Call Grok using the OpenAI SDK
      const completion = await client.chat.completions.create({
        model: 'grok-2-latest',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input },
        ],
      });

      const grokResponse = completion.choices[0].message.content;

      const botMessage: Message = { role: 'assistant', content: grokResponse ?? 'Sorry, no response available.' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error with Grok:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry, I encountered an error processing your question. Please try again later.',
        },
      ]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const renderMessage = (message: Message, index: number) => {
    const alignment = message.role === 'user' ? 'justify-end' : 'justify-start';
    const bgColor = message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-slate-100';
    return (
      <div key={index} className={`flex ${alignment} mb-4`}>
        <div className={`${bgColor} rounded-lg py-2 px-4 max-w-[80%] whitespace-pre-wrap`}>
          {message.content}
        </div>
      </div>
    );
  };

  return (
    <Card className="border-none shadow-md h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
        <div className="flex items-center">
          <Bot className="mr-2 h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-semibold">Fraud Detection Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-[450px] p-4">
          {messages.map(renderMessage)}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="bg-slate-100 rounded-lg py-2 px-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full space-x-2"
        >
          <Input
            placeholder="Ask a question about fraud data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
