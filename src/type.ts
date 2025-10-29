export interface User {
  name: string;
  age: number;
  location: string;
  email: string;
  phone: string;
  cell: string;
  picture: string[];
}

export interface UserTableProps {
  users: User[];
  currentPage: number;
  search: string;
}

export interface SearchParams {
  q?: string;
  page?: string;
}
