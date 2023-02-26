import React, { ReactNode } from "react";
import { UseFormRegister, FormState } from "react-hook-form";
import { Path } from "react-hook-form/dist/types";
import { TCredentials } from "../../types/@userType";

type Props<T> = {
  type?: "text" | "email" | "password" | "number";
  label?: string;
  name_?: string;
  register?: UseFormRegister<T>;
  formState?: FormState<T>;
  placeholder?: string;
  className?: string;
  // children?: ReactNode;
  // otherProps?: object;
};

const Input = <T,>(props: Props<T>) => {
  const { type, label, name_, register, formState, placeholder, className } =
    props;

  return (
    <>
      {label && <label className="form-label">{label}</label>}
      {register ? (
        <>
          <input
            type={type || "text"}
            // name={name || ""}
            placeholder={placeholder || label || ""}
            {...register(name_ as Path<T>)}
            className={`form-control ${className ? className : ""} ${
              formState.errors[name_ as keyof T] ? "form-error" : ""
            }`}
          />
          {formState ? (
            Object.keys(formState.errors).includes(name_!) && (
              <div className="invalid-feedback d-block">
                {formState.errors[name_ as keyof T]?.message as string}
              </div>
            )
          ) : (
            <></>
          )}
        </>
      ) : (
        <input
          type={type || "text"}
          name={name_ || ""}
          className={`form-control ${className ? className : ""}`}
        />
      )}
    </>
  );
};

export default Input;
