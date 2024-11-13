const initialState = {
  taskTitle: "Buy blanket from market",
  description: "yellow blanket",
  priority: "important",
  date: "20/03/2020",
  count: "1",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "Update_form_inputs": {
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };
    }

    default: return state
  }
};

export { formReducer, initialState };
