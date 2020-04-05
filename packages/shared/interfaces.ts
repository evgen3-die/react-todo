export interface ListItem {
  title: string;
  checked: boolean;
}

export interface Todo {
  id?: string,
  title?: string;
  timestamp?: number;
  content?: string | ListItem[];
  members?: string[];
}
