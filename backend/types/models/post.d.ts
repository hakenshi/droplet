interface Post {
  id: number;
  user_id: number;
  content: string;
  donation: {
    goal: number | null;
    total_value: number;
  };
  created_at: string;
  updated_at: string;
}
