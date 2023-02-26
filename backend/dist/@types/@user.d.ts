import { T_Task } from "./@task";
export type TUser = {
    isActive: boolean;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    tasks?: Array<T_Task>;
};
