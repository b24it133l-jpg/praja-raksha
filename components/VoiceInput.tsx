"use client";

import { useState, useCallback, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  lang?: string;
}

export default function VoiceInput({ onTranscript, lang = "en-IN" }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setError("Failed to capture audio. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, [onTranscript, lang]);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={startListening}
        disabled={isListening}
        className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all ${
          isListening 
            ? "bg-rose-500 text-white animate-pulse" 
            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
        }`}
        title={isListening ? "Listening..." : "Start Voice Input"}
      >
        {isListening ? <Loader2 className="animate-spin" size={24} /> : <Mic size={24} />}
      </button>
      {error && <p className="text-[10px] text-rose-500 font-bold uppercase">{error}</p>}
    </div>
  );
}
