const initialState = {
  taskTitle: "Buy tapetry from market",
  description: "yellow blanket",
  priority: "important",
  date: new Date(),
  projectName: ""
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "Update_form_inputs": {
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };
    }
    case "Clear_inputs_field": {
      return {
        taskTitle: "",
        description: "",
        priority: "",
        date: new Date(),
        projectName: ""
      };
    }

    default:
      return state;
  }
};

export { formReducer, initialState };
