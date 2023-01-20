const SET_ERROR = 'error/SET_ERROR' as const;

interface errorState {
    error_message: string,
    error_state: boolean,
};

const initialState: errorState = {
  error_message: "",
  error_state: false,
};

export const setError = (message: string, state: boolean) => ({
    type: SET_ERROR,
    message,
    state
});

type errorAction =
  | ReturnType<typeof setError>

export default function errorReducer(state = initialState, action: errorAction) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error_message: action.message,
        error_state: action.state
      };
    default:
      return state;
  }
}
