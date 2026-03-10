'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChatMessage } from '@/components/chatbot/chatbot-messages';

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const setEndEl = (el: HTMLDivElement | null) => {
    endRef.current = el;
  };

  const sendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;
    const history = messages.slice();

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...history, { role: 'user', content: userText }] }),
      });
      if (!res.ok) throw new Error('Request failed');
      const data = (await res.json().catch(() => ({ text: '' }))) as { text?: string };
      setMessages((prev) => [...prev, { role: 'model', content: data.text || 'Sorry, I could not generate a response.' }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'model', content: 'Oops! Something went wrong. Please check if the API key is configured.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return { messages, input, setInput, isLoading, setEndEl, sendMessage, handleSubmit };
}
