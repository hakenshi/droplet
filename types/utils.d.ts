// Tipos utilitários para a aplicação

// Tipo para IDs que podem ser string ou number
type ID = string | number;

// Tipo para timestamps do Laravel
type LaravelTimestamp = string;

// Tipo para respostas de like/unlike
type LikeResponse = {
  message: string;
  has_liked: boolean;
  likes_count: number;
};

// Tipo para upload de arquivos
type FileUploadResponse = {
  message: string;
  file_path: string;
};

// Tipo para validação de erros do Laravel
type ValidationErrors = Record<string, string[]>;

// Tipo para resposta de erro padrão
type StandardErrorResponse = {
  message: string;
  errors?: ValidationErrors;
};

// Tipo para resposta de sucesso padrão
type StandardSuccessResponse<T = any> = {
  message: string;
  data?: T;
};