import React from "react";
import { T_Task } from "./models/@task";

export type TFormData = {
  email: string;
  password: string;
};

export type TCredentials = {
  email: string;
  password: string;
};

export type TUserContext = {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

export type TUser = {
  isActive: boolean;
  email: string;
  firstName: string;
  lastName: string;
  tasks?: Array<T_Task>;
}
