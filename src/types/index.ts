export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Checklist {
  id: string;
  name: string;
  createdAt: string;
  userId: string;
}

export interface ChecklistItem {
  id: string;
  itemName: string;
  status: boolean;
  checklistId: string;
  createdAt: string;
  updatedAt: string;
}