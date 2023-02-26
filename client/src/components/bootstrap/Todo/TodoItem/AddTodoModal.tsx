import React from "react";
import { initActionModal, TActionModal } from "../../../../pages/Todos";
import { priorityColor } from "../../../../types/@todoType";
import { T_Task } from "../../../../types/models/@task";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UseMutationResult } from "@tanstack/react-query";
import { modalBackdrop } from "../../../../utils/todo";

type Props = {
  params: {
    todo: T_Task | null;
    action: string;
  };
  setActionModal: React.Dispatch<React.SetStateAction<TActionModal>>;
  createMutation: UseMutationResult<
    {
      data: T_Task;
    },
    unknown,
    T_Task,
    {
      previousTodos: [] | T_Task[] | undefined;
    }
  >;
  updateMutation: UseMutationResult<
    {
      data: T_Task;
    },
    unknown,
    T_Task,
    {
      previousTodos: [] | T_Task[] | undefined;
    }
  >;
};

// YUP schema for the form constraint validation
const taskSchema = yup
  .object({
    title: yup
      .string()
      .required("The task title is required, please fill it in !")
      .min(3, `The task title must be at least 3 characters long !`)
      .max(100, `The task title must be at most 3 characters long !`),
    priority: yup
      .string()
      .oneOf(
        ["HIGH", "MIDDLE", "LOW"],
        "The priority of the task possible values are HIGH, MIDDLE, LOW"
      ),
    isImportant: yup.boolean().notRequired(),
    isDone: yup.boolean().notRequired(),
    isTrashed: yup.boolean().notRequired(),
    description: yup
      .string()
      .max(500, "Not more than 500 characters for this field")
      .notRequired(),
  })
  .required();

type FormData = yup.InferType<typeof taskSchema>;

const initValues = {
  title: "",
  description: "",
  //userId: "",
  priority: "HIGH",
  isImportant: false,
  isDone: false,
  isTrashed: false,
};

const AddTodoModal: React.FC<Props> = ({
  params,
  setActionModal,
  createMutation,
  updateMutation,
}) => {
  const { action, todo } = params;
  const showModal = action !== "";
  // console.log("Edit ToDo", todo);
  // const [showModal, setShowModal] = React.useState(initialState);

  const defaultValues = React.useMemo(
    () => ({
      title: todo?.title || "",
      description: todo?.description || "",
      //userId: "",
      priority: todo?.priority || "HIGH",
      isImportant: todo?.isImportant || false,
      isDone: todo?.isDone || false,
      isTrashed: todo?.isTrashed || false,
    }),
    [todo]
  );

  // Initialize the react hook form to manage the task's creating/updating form
  // const { register, handleSubmit, formState, reset, watch } = React.useMemo(
  //   useForm<FormData>({
  //     defaultValues,
  //     resolver: yupResolver(taskSchema),
  //   }),
  //   [todo]
  // );
  const { register, handleSubmit, formState, reset, watch } = useForm<FormData>(
    {
      defaultValues,
      resolver: yupResolver(taskSchema),
    }
  );

  const priority = watch("priority");
  // console.log(priority);

  React.useEffect(() => {
    reset(defaultValues);
    // console.log("getvalues", getValues());

    return () => {
      reset(initValues);
      // Hide overlay
      modalBackdrop(false);
    };
  }, [todo]);

  const myDiv = React.useRef<HTMLDivElement>(null);
  if (myDiv.current) {
    myDiv.current.style.cssText = `display: ${showModal ? "block" : "none"} ;pointer-events: ${ formState.isSubmitting ? "none" : "auto"}`;
  }

  if (showModal) {
    modalBackdrop(true);
  }

  const closeModal = () => {
    // setShowModal(false);
    modalBackdrop(false);
    setActionModal(initActionModal);
  };

  const onSubmit = React.useCallback(
    async (data: FormData) => {
      try {
        if (!todo) {
          const createTask = { ...data };
          console.log("Create Task", createTask);
          await createMutation.mutateAsync(createTask as T_Task);
        } else {
          const updateTask = { ...todo, ...data };
          console.log("Update Task", updateTask);
          await updateMutation.mutateAsync(updateTask as T_Task);
        }
      } catch (e) {}
    },
    [todo]
  );



  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      id="addTaskModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="addTaskModalTitle"
      aria-hidden={showModal ? "false" : "true"}
      aria-modal={showModal ? "true" : "false"}
      ref={myDiv}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            {action === "createTask" && (
              <h5
                className="modal-title add-title"
                id="addTaskModalTitleLabel1"
              >
                Add Task
              </h5>
            )}
            {action === "editTask" && (
              <h5
                className="modal-title edit-title"
                id="addTaskModalTitleLabel2"
                // style={{ display: "none" }}
              >
                Edit Task
              </h5>
            )}
            <button
              type="button"
              className={`btn-close ${
                formState.isSubmitting ? "d-none" : ""
              }`}
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="modal-body">
            <div className="compose-box">
              <div className="compose-content" id="addTaskModalTitle">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex mail-to mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-edit-3 flaticon-notes"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        <div className="w-100">
                          {/* <Input type={"text"} register={register} name_={""} /> */}
                          <input
                            id="task"
                            type="text"
                            placeholder="Task"
                            className={`form-control ${
                              formState.errors.title ? "form-error" : ""
                            }`}
                            // name="title"
                            {...register("title")}
                            // defaultValue={defaultValues.title}
                          />
                          {
                            // invalid-feedback
                            formState.errors.title && (
                              <span className="invalid-feedback d-block">
                                {formState.errors.title.message!}
                              </span>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex mb-4 w-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`feather feather-alert-octagon text-${
                        priorityColor[priority!]
                      }`}
                    >
                      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12" y2="16"></line>
                    </svg>
                    <div className="w-100">
                      <select
                        className={`form-select ${
                          formState.errors.priority ? "form-error" : ""
                        }`}
                        id="exampleFormControlSelect1"
                        {...register("priority")}
                      >
                        <option value={"HIGH"}>HIGH</option>
                        <option value={"MIDDLE"}>MIDDLE</option>
                        <option value={"LOW"}>LOW</option>
                      </select>
                      {formState.errors.priority && (
                        <span className="invalid-feedback d-block">
                          {formState.errors.priority.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="d-flex mail-subject mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-file-text flaticon-menu-list"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    <div className="w-100">
                      {/* <div id="taskdescription" className=""></div> */}
                      {/* <div id="taskdescription" className="ql-container ql-snow"><div className="ql-editor ql-blank" data-gramm="false" data-placeholder="Compose an epic..." contentEditable="true"><p><br /></p></div><div className="ql-clipboard" tabIndex={-1} contentEditable="true"></div><div className="ql-tooltip ql-hidden"><a className="ql-preview" target="_blank" href="about:blank"></a><input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL" /><a className="ql-action"></a><a className="ql-remove"></a></div></div> */}
                      <textarea
                        className={`form-control w-full ${
                          formState.errors.description ? "form-error" : ""
                        }`}
                        rows={3}
                        {...register("description")}
                      ></textarea>
                      {formState.errors.description && (
                        <span className="invalid-feedback d-block">
                          {formState.errors.description.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-center form-check gap-1 w-100">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="importantCheck"
                      {...register("isImportant")}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="importantCheck"
                    >
                      Is important?
                    </label>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className={`btn ${
                formState.isSubmitting ? "disabled" : ""
              }`}
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              <i className="flaticon-cancel-12"></i> Discard
            </button>
            {action === "createTask" && (
              <button
                className={`btn add-tsk btn-primary ${
                  formState.isSubmitting ? "disabled" : ""
                }`}
                type={"submit"}
                onClick={handleSubmit(onSubmit)}
              >
                <span
                  className={`spinner-border text-white me-2 align-self-center loader-sm ${
                    !formState.isSubmitting ? "d-none" : ""
                  }`}
                ></span>
                Add Task
              </button>
            )}
            {action === "editTask" && (
              <button
                className={`btn edit-tsk btn-success ${
                  formState.isSubmitting ? "disabled" : ""
                }`}
                type={"submit"}
                onClick={handleSubmit(onSubmit)}
              >
                <div
                  className={`spinner-border text-white me-2 align-self-center loader-sm ${
                    !formState.isSubmitting ? "d-none" : ""
                  }`}
                ></div>
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
