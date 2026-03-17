import { toast } from "sonner";

export function useErrorHandler() {
  const handleError = (error: unknown, fallbackMessage = "Algo deu errado") => {
    if (error instanceof Error) {
      toast.error(error.message);
    } else if (typeof error === 'string') {
      toast.error(error);
    } else {
      toast.error(fallbackMessage);
    }
  };

  const handleApiError = (response: any) => {
    if (response?.errors) {
      Object.values(response.errors).flat().forEach((msg: any) => {
        toast.error(msg);
      });
    } else if (response?.message) {
      toast.error(response.message);
    } else {
      toast.error("Erro na requisição");
    }
  };

  return { handleError, handleApiError };
}