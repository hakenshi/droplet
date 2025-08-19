import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error?: string;
  errors?: Record<string, string[]>;
  className?: string;
}

export function ErrorDisplay({ error, errors, className = "" }: ErrorDisplayProps) {
  if (!error && !errors) return null;

  return (
    <div className={`flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-md ${className}`}>
      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-red-700">
        {error && <p>{error}</p>}
        {errors && Object.entries(errors).map(([field, messages]) => (
          <div key={field}>
            {messages.map((msg, i) => <p key={i}>{msg}</p>)}
          </div>
        ))}
      </div>
    </div>
  );
}