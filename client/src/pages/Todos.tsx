import React from "react";
import Footer from "../components/bootstrap/Footer";
import NavBar from "../components/bootstrap/NavBar";
import TodoSideMenu from "../components/bootstrap/Todo/TodoSideMenu";
import InputSearch from "../components/bootstrap/Todo/InputSearch";
import TodoItem from "../components/bootstrap/Todo/TodoItem/TodoItem";
import TodoItemLoader from "../components/mui/Loader/Todo/TodoItemLoader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { T_Task } from "../types/models/@task";
import { fetcher } from "../services/api/api";
import { apiTodosUrl } from "../utils/config";
import { T_TodosToDisplay } from "../types/@todoType";
import { CRUD } from "../services/api/crud";
import ShowTodoModal from "../components/bootstrap/Todo/TodoItem/ShowTodoModal";
import AddTodoModal from "../components/bootstrap/Todo/TodoItem/AddTodoModal";
import { modalBackdrop } from "../utils/todo";
import { v4 as uuid } from "uuid";

export type TActionModal = {
  action: string;
  todo: T_Task | null;
};

export const initActionModal: TActionModal = {
  action: "",
  todo: null,
};

const Tasks = () => {
  // Local state variable to manage the responsive sm view of the todo menu displaying.
  const [showMenu, setShowMenu] = React.useState(false);

  // Local state variable searchFilter to filter the todos list acccording the search input value type by the user
  const [searchFilter, setSearchFilter] = React.useState("");

  // Local state variable typeFilter to specify the type ( All - Important - Done - Trash ) of todos list to display
  const [typeFilter, setTypeFilter] =
    React.useState<T_TodosToDisplay>("all list");

  // Local state variable that represents the id of the todo item to display in the modal
  const [todoToDisplay, setTodoToDisplay] = React.useState<T_Task | null>(null);

  // Local state variable to show/hide modal for creating/editing task
  const [actionModal, setActionModal] =
    React.useState<TActionModal>(initActionModal);

  const hideModal = () => {
    setTodoToDisplay(null);
    setActionModal(initActionModal);
    modalBackdrop(false);
  };
  
  const todosQueryKey = ["todos"];

  const {
    status,
    data: fetchingTodos,
    isRefetching,
  } = useQuery<any, Error, T_Task[], string[]>({
    queryKey: todosQueryKey,
    queryFn: async () => {
      return await fetcher<"GET", T_Task>(
        { url: apiTodosUrl },
        {
          method: "GET",
        }
      );
    },
    refetchOnWindowFocus: false,
    refetchInterval: 120000,
    onSuccess: (data) => {
      // console.log("fetching Todos", data);
      // !isRefetching &&
      //   toast.success("Successfully retrieving todos' list. 👌");
    },
    onError: (error) => {
      !isRefetching &&
        toast.error(
          "An unexpected error occurs when retrieving the todos list. 😭"
        );
      // console.log("Error getting TODOS");
      // console.log(error);
    },
  });

  // console.log("fetchingTodos", fetchingTodos);

  const queryClient = useQueryClient();

  const cachedTodos = queryClient.getQueryData<T_Task[] | []>(todosQueryKey);
  // console.log("fetchingTodos", fetchingTodos);
  // console.log("cachedTodos", cachedTodos);
  let todos = fetchingTodos || cachedTodos || []; //;

  // ========= React Query Mutation Initialize for create todo using optimist approch =========
  const createMutation = useMutation({
    mutationFn: async (createTodo: T_Task) => {
      return await CRUD.create(createTodo, apiTodosUrl);
    },
    onMutate: (createTodo: T_Task) => {
      console.log("============== START onMutate Creating ==============");
      // console.log("Todo Id = " + id);
      const previousTodos = queryClient.getQueryData<T_Task[] | []>(
        todosQueryKey
      );

      const todos = [...previousTodos];
      todos.unshift(createTodo);

      queryClient.setQueryData<T_Task[]>(todosQueryKey, (todos_) => todos);

      /*const todos_ = queryClient.getQueryData<T_Task[] | []>(todosQueryKey);*/

      // console.log(todos?.length, todos_?.length);
      // console.log("============== END onMutate ==============");

      return { previousTodos };
    },
    onError: (err, _, context) => {
      // console.log("onError update INVOICE Mutation");
      if(context.previousTodos)
        queryClient.setQueryData(todosQueryKey, context.previousTodos);

      toast.error("Failed to create the todo. 😭");
    },
    onSuccess: () => {
      hideModal();
      toast.success("Successfully creating the todo ! 😃");
    },
  });

  // ========= React Query Mutation Initialize for update todo using optimist approch =========
  const updateMutation = useMutation({
    mutationFn: async (updateTodo: T_Task) => {
      // console.log('updateTodo', updateTodo.id);
      return await CRUD.update(updateTodo, `${apiTodosUrl}/${updateTodo.id}`);
    },
    onMutate: (updateTodo: T_Task) => {
      console.log("============== START onMutate Updating ==============");
      // console.log("Todo Id = " + id);
      const previousTodos = queryClient.getQueryData<T_Task[] | []>(
        todosQueryKey
      );

      const todos = queryClient.setQueryData<T_Task[]>(
        todosQueryKey,
        (todos) => {
          // console.log("setQueryData onMutate", todos?.length);
          return todos?.map((todo) =>
            todo.id === updateTodo.id ? updateTodo : todo
          );
        }
      );

      // Invalidate every query with a key that starts with `todos`
      // queryClient.invalidateQueries();

      /*const todos_ = queryClient.getQueryData<T_Task[] | []>(todosQueryKey);*/

      // console.log(todos?.length, todos_?.length);
      // console.log("============== END onMutate ==============");

      return { previousTodos };
    },
    onError: (err, _, context) => {
      // console.log("onError update INVOICE Mutation");
      context?.previousTodos &&
        queryClient.setQueryData(todosQueryKey, context.previousTodos);

      toast.error("Failed to update the todo. 😭");
    },
    onSuccess: (data, variables, context) => {
      // fetchingTodos = undefined;
      // let updateTodos: T_Task[] = [];
      // if (context && context.previousTodos) {
      //   updateTodos = context?.previousTodos!.map(todo => todo.id === data.id ? data : todo);
      //   queryClient.setQueryData(todosQueryKey, updateTodos);
      // }

      hideModal();
      toast.success("Successfully updating the todo ! 😃");
    },
  });

  // ========= React Query Mutation Initialize for update todo using optimist approch =========
  const deleteMutation = useMutation({
    mutationFn: async (id: number | string) => {
      return await CRUD.delete(`${apiTodosUrl}/${id}`);
    },
    onMutate: (id: number | string) => {
      console.log("============== START onMutate Removing ==============");
      // console.log("Todo Id = " + id);
      const previousTodos = queryClient.getQueryData<T_Task[] | []>(
        todosQueryKey
      );

      const todos = queryClient.setQueryData<T_Task[]>(
        todosQueryKey,
        (todos) => {
          // console.log("setQueryData onMutate", todos?.length);
          return todos ? todos.filter((todo) => todo.id !== id) : [];
        }
      );

      /*const todos_ = queryClient.getQueryData<T_Task[] | []>(todosQueryKey);*/

      // console.log(todos?.length, todos_?.length);
      // console.log("============== END onMutate ==============");

      return { previousTodos };
    },
    onError: (err, _, context) => {
      // console.log("onError Remove INVOICE Mutation");
      context?.previousTodos &&
        queryClient.setQueryData(todosQueryKey, context.previousTodos);

      toast.error("Failed to remove the todo. 😭");
    },
    onSuccess: () => {
      hideModal();
      toast.success("Successfully removing the todo ! 😃");
    },
  });

  const filteredTodos =
    typeFilter === "all list"
      ? todos.filter((todo) => {
          if (
            todo.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
            todo.description.toLowerCase().includes(searchFilter.toLowerCase())
          ) {
            return todo;
          }
        })
      : todos.filter((todo) => {
          if (todo[typeFilter]) {
            if (
              todo.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
              todo.description
                .toLowerCase()
                .includes(searchFilter.toLowerCase())
            ) {
              return todo;
            }
          }
        });

  // console.log("filteredTodos", filteredTodos);
  
  // Modal Click listener event
  const modalClickListener = React.useCallback((e: Event) => {
    const el = e.target as HTMLElement;
    // console.log(el.classList);
    if (el.classList.contains("modal") && el.classList.contains("fade")) {
      const modalBackdrop = document.querySelector(
        ".modal-backdrop"
      ) as HTMLDivElement;
      document.body.removeChild(modalBackdrop);
      document.body.classList.remove("modal-open");
      document.body.style.cssText = "";
      setTodoToDisplay(null);
      setActionModal(initActionModal);
    }
  }, []);

  React.useEffect(() => {
    document.body.addEventListener("click", modalClickListener);

    return () => {
      document.body.removeEventListener("click", modalClickListener);
    };
  }, []);

  return (
    <>
      <NavBar />
      {/* <!--  BEGIN MAIN CONTAINER    --> */}
      <div
        className="min-h-full flex flex-row flex-wrap justify-start ml-0 main-container sidebar-closed"
        id="container"
      >
        <div className="overlay"></div>
        <div className="cs-overlay"></div>
        <div className="search-overlay"></div>

        {/* <!--  BEGIN CONTENT AREA id="content" --> */}
        <div className="main-content w-1/2 flex-grow-[8] mt-[70px] mb-0 transition-all duration-300 ease">
          <div className="layout-px-spacing">
            <div className="middle-content container-xxl p-0">
              <div className="row layout-top-spacing">
                <div className="col-xl-12 col-lg-12 col-md-12">
                  <div className="mail-box-container">
                    <div
                      className={`mail-overlay ${
                        showMenu ? "mail-overlay-show" : ""
                      }`}
                      onClick={() => setShowMenu(false)}
                    ></div>

                    <TodoSideMenu
                      show={showMenu}
                      status={status}
                      todos={todos}
                      setTypeFilter={setTypeFilter}
                      setActionModal={setActionModal}
                    />

                    <div id="todo-inbox" className="accordion todo-inbox">
                      <InputSearch
                        show={showMenu}
                        setShow={setShowMenu}
                        setSearchFilter={setSearchFilter}
                      />

                      <div className="todo-box">
                        <div id="ct" className="todo-box-scroll">
                          {status === "loading"
                            ? Array.from({ length: 10 }).map(
                                (loader, index) => (
                                  <TodoItemLoader
                                    key={`todo-item-loader-${index}`}
                                  />
                                )
                              )
                            : filteredTodos.map((todo) => (
                                <TodoItem
                                  key={uuid()}
                                  todo={todo}
                                  setTodoToDisplay={setTodoToDisplay}
                                  mutation={updateMutation}
                                  setActionModal={setActionModal}
                                />
                              ))}
                        </div>

                        {/* TODO: Insert Todo Show List Item Modal */}
                        <ShowTodoModal
                          todo={todoToDisplay}
                          setTodoToDisplay={setTodoToDisplay}
                        />
                      </div>
                    </div>
                  </div>

                  {/* TODO: Insert Add Todo Modal */}
                  <AddTodoModal
                    params={actionModal}
                    setActionModal={setActionModal}
                    createMutation={createMutation}
                    updateMutation={updateMutation}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <!--  BEGIN FOOTER  --> */}
          <Footer />
          {/* <!--  END FOOTER  --> */}
        </div>
        {/* <!--  END CONTENT AREA  --> */}
      </div>
      {/* <!-- END MAIN CONTAINER --> */}
    </>
  );
};

export default Tasks;
