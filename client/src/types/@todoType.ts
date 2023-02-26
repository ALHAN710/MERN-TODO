export type TodoPriority = "HIGH" | "MIDDLE" | "LOW";

export const priorityColor: { [name: string]: "primary" | "warning" | "danger" } = {
  HIGH: "danger",
  MIDDLE: "warning",
  LOW: "primary",
};

export type T_TodosToDisplay = "all list" | "isImportant" | "isDone" | "isTrashed";
