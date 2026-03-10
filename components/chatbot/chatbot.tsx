'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { ChatbotWindow } from '@/components/chatbot/chatbot-window';
import { useChatbot } from '@/hooks/use-chatbot';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { messages, input, setInput, isLoading, setEndEl, sendMessage, handleSubmit } = useChatbot();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <ChatbotWindow
            isExpanded={isExpanded}
            messages={messages}
            input={input}
            isLoading={isLoading}
            endRef={setEndEl}
            onAsk={sendMessage}
            onInput={setInput}
            onSubmit={handleSubmit}
            onToggleExpanded={() => setIsExpanded((v) => !v)}
            onClose={() => setIsOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((v) => !v)}
        className="w-14 h-14 bg-zinc-900 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-zinc-800 transition-colors"
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
