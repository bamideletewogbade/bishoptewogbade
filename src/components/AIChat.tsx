
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, MessageCircle, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Bamidele's AI assistant. I can answer questions about his experience, skills, projects, or anything you'd like to know from his portfolio. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log('Sending message to AI chat function:', currentInput);
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: currentInput }
      });

      console.log('Response from AI chat function:', data, error);

      if (error) {
        throw new Error(error.message || 'Failed to get AI response');
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "I'm sorry, I couldn't process your request at the moment. Please try again.",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing some technical difficulties. Please try again in a moment or contact Bamidele directly through the contact information above.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to connect to AI assistant. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 bg-gradient-to-r from-gold to-gold/80 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
        >
          <MessageCircle size={24} className="text-gold-foreground" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]">
      <div className="glass rounded-2xl border border-border/20 shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 p-4 border-b border-border/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gold to-gold/80 rounded-full flex items-center justify-center">
                <Bot size={20} className="text-gold-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles size={12} />
                  Powered by Gemini
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMinimized(true)}
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background/50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-r from-gold/20 to-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-gold" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-gold text-gold-foreground'
                    : 'glass border border-border/20'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
              {message.sender === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-r from-gold to-gold/80 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-gold-foreground" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-r from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-gold" />
              </div>
              <div className="glass border border-border/20 px-4 py-2 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border/20 bg-card/50">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Bamidele..."
              className="flex-1 px-4 py-2 bg-accent/30 border border-border/20 rounded-full focus:ring-2 focus:ring-gold/50 focus:border-gold/50 transition-all duration-200 text-foreground placeholder-muted-foreground text-sm"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="w-10 h-10 bg-gold text-gold-foreground rounded-full flex items-center justify-center hover:bg-gold/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
