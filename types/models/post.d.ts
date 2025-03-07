interface Post {
  id: int;
  user_id: int;
  content: string;
  donation: {
    goal: number;
    total_value: number;
  };
  created_at: Date;
  updated_at: Date;
}
