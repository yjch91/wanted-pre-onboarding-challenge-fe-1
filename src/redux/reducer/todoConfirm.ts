const SET_TODO_CONFIRM = 'confirm/SET_TODO_CONFIRM' as const;
const SET_OPEN_CREATE_TODO = 'confirm/SET_OPEN_CREATE_TODO' as const;
const SET_TODO_CREATE_DATA = 'confirm/SET_TODO_CREATE_DATA' as const;
const SET_TODO_REMOVE_DATA = 'confirm/SET_TODO_REMOVE_DATA' as const;
const SET_TODO_UPDATE_DATA = 'confirm/SET_TODO_UPDATE_DATA' as const;

interface confirmState {
    confirm_command: string,
    confirm_message: string,
    confirm_state: boolean,
    title: string,
    content: string,
    id: string,
    openCreateTodo: boolean,
};

const initialState: confirmState = {
    confirm_command: "",
    confirm_message: "",
    confirm_state: false,
    title: "",
    content: "",
    id: "",
    openCreateTodo: false,
};

export const setTodoConfirm = (command: string, message: string, state: boolean) => ({
    type: SET_TODO_CONFIRM,
    command,
    message,
    state,
});

export const setOpenCreateTodo = (isOpen: boolean) => ({
  type: SET_OPEN_CREATE_TODO,
  isOpen,
})

export const setTodoCreateData = (title: string, content: string) => ({
    type: SET_TODO_CREATE_DATA,
    title,
    content,
})

export const setTodoRemoveData = (id: string) => ({
  type: SET_TODO_REMOVE_DATA,
  id,
})

export const setTodoUpdateData = (title: string, content: string, id: string) => ({
  type: SET_TODO_UPDATE_DATA,
  title,
  content,
  id,
})

type confirmAction =
  | ReturnType<typeof setTodoConfirm>
  | ReturnType<typeof setTodoCreateData>
  | ReturnType<typeof setTodoRemoveData>
  | ReturnType<typeof setTodoUpdateData>
  | ReturnType<typeof setOpenCreateTodo>

export default function todoConfirmReducer(state = initialState, action: confirmAction) {
  switch (action.type) {
    case SET_TODO_CONFIRM:
      return {
        ...state,
        confirm_command: action.command,
        confirm_message: action.message,
        confirm_state: action.state
      };
    case SET_OPEN_CREATE_TODO:
      return {
        ...state,
        openCreateTodo: action.isOpen
      };
    case SET_TODO_CREATE_DATA:
      return {
        ...state,
        title: action.title,
        content: action.content
      };
    case SET_TODO_REMOVE_DATA:
      return {
        ...state,
        id: action.id
      };
    case SET_TODO_UPDATE_DATA:
      return {
        ...state,
        title: action.title,
        content: action.content,
        id: action.id
      };
    default:
      return state;
  }
}
