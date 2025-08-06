import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";

interface VoiceInterfaceProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  transcript: string;
  onVoiceCommand: (command: string) => void;
}

const VoiceInterface = ({
  isListening,
  onStartListening,
  onStopListening,
  transcript,
  onVoiceCommand
}: VoiceInterfaceProps) => {
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    if (transcript) {
      setShowTranscript(true);
      const timer = setTimeout(() => {
        onVoiceCommand(transcript);
        setShowTranscript(false);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [transcript, onVoiceCommand]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Slower speech for elderly users
      utterance.volume = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-card rounded-3xl p-8 max-w-md w-full space-y-6">
        {/* Voice indicator */}
        <div className="text-center">
          <div className={`w-32 h-32 rounded-full mx-auto flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-accent animate-pulse-gentle' 
              : 'bg-muted'
          }`}>
            {isListening ? (
              <Mic className="w-16 h-16 text-accent-foreground" />
            ) : (
              <MicOff className="w-16 h-16 text-muted-foreground" />
            )}
          </div>
        </div>

        {/* Status text */}
        <div className="text-center space-y-2">
          <h2 className="text-senior-xl text-foreground font-semibold">
            {isListening ? "I'm listening..." : "Voice Assistant"}
          </h2>
          <p className="text-senior-lg text-muted-foreground">
            {isListening 
              ? "Say what you need, like 'I need milk and bread'"
              : "Tap the microphone to start"
            }
          </p>
        </div>

        {/* Transcript display */}
        {showTranscript && transcript && (
          <div className="card-senior bg-primary/10 border-primary/20">
            <p className="text-senior-lg text-foreground">
              You said: "{transcript}"
            </p>
          </div>
        )}

        {/* Example commands */}
        {!isListening && (
          <div className="space-y-3">
            <h3 className="text-senior-lg text-foreground font-semibold text-center">
              Try saying:
            </h3>
            <div className="space-y-2">
              {[
                "I need milk and bread",
                "Show me fruits",
                "Add tomatoes to cart",
                "Help me order"
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    speakText(example);
                    onVoiceCommand(example);
                  }}
                  className="w-full p-3 text-left rounded-xl bg-muted hover:bg-muted/80 text-senior-lg text-foreground focus-senior flex items-center space-x-2"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>"{example}"</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Control buttons */}
        <div className="flex space-x-4">
          {isListening ? (
            <button
              onClick={onStopListening}
              className="button-secondary flex-1 flex items-center justify-center space-x-2 focus-senior"
            >
              <MicOff className="w-5 h-5" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              onClick={onStartListening}
              className="button-accent flex-1 flex items-center justify-center space-x-2 focus-senior"
            >
              <Mic className="w-5 h-5" />
              <span>Start Listening</span>
            </button>
          )}
          
          <button
            onClick={onStopListening}
            className="button-secondary px-6 focus-senior"
          >
            Close
          </button>
        </div>

        {/* Help text */}
        <p className="text-center text-sm text-muted-foreground">
          Voice recognition works best in a quiet environment
        </p>
      </div>
    </div>
  );
};

export default VoiceInterface;