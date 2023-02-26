import { Skeleton } from "@mui/material";
import React from "react";
import { v4 as uuid } from "uuid";

type Props = {
  key?: React.Key | null | undefined;
};

const TodoItemLoader: React.FC<Props> = () => {
  
  return (
    <div className="todo-item all-list" key={uuid()}>
      <div className="todo-item-inner">
        <div className="n-chk text-center">
          <div
            className="form-check form-check-primary form-check-inline mt-2 me-0"
            data-bs-toggle="collapse"
            // data-bs-target
          >
            <Skeleton
              variant={"rounded"}
              animation={"pulse"}
              width={18}
              height={18}
            />
          </div>
        </div>

        <div className="todo-content">
          <h5 className="todo-heading">
            <Skeleton
              variant={"text"}
              animation={"pulse"}
              sx={{ fontSize: "32px" }}
              // width={24}
              // height={24}
            />
          </h5>
          {/* <p className="todo-text">{""}</p> */}
        </div>

        <div className="priority-dropdown custom-dropdown-icon mt-2">
          <div className="dropdown p-dropdown">
            <a
              className={`dropdown-toggle`}
              href="#"
            >
              <Skeleton
              variant={"rounded"}
              animation={"pulse"}
              width={24}
              height={24}
            />
            </a>
          </div>
        </div>

        <div className="action-dropdown custom-dropdown-icon mt-2">
          <div className="dropdown">
            <a
              className="dropdown-toggle"
              href="#"
            >
              <Skeleton
              variant={"rectangular"}
              animation={"pulse"}
              width={15}
              height={24}
            />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItemLoader;
