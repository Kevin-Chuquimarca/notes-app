interface Note {
  title: string;
  text: string;
  priority_id: number;
  state_id: number;
}

interface NoteFull extends Note{
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}