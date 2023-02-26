import { TodoPriority } from "../@todoType"

export type T_Task = {
  id          : string;
  createdAt   : string;
  updatedAt   : string;
  title       : string;
  isDone      : boolean;
  isImportant : boolean;
  isTrashed   : boolean;
  priority    : TodoPriority;
  description : string;
  userId      : string;
}