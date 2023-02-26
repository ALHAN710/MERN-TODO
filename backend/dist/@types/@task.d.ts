export type T_Task_Priority = "HIGH" | "MIDDLE" | "LOW";
export type T_Task = {
    title: string;
    isDone: boolean;
    isImportant: boolean;
    isTrashed: boolean;
    priority: T_Task_Priority;
    description: string;
    userId: string;
};
