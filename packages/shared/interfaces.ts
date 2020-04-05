export interface ListItem {
  id?: string;
  title: string;
  checked: boolean;
}

export interface Member {
  id: string;
  name: string;
}

export interface Todo {
  id?: string,
  title?: string;
  timestamp?: number;
  content?: string | ListItem[];
  members?: Member[];
}
