import { useState } from "react";

const Form = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");
  const [count, setCount] = useState("");

  const [toDoList, setToDoList] = useState([]);
  const [taskObj, setTaskObj] = useState({
    taskTitle: "",
    description: "",
    priority: "",
    date: "",
    count: "",
  });

  // const [toDoObject, setToDoObject] = useState({
  //   taskTitle: "",
  //   description: "",
  //   priority: "",
  //   date: "",
  //   count: "",
  // });

  function handleTaskTitle(e) {
    const updateTaskTitle = e.target.value;
    console.log(updateTaskTitle);
    setTaskTitle(updateTaskTitle);
    handleToDoObj(updateTaskTitle, description, priority, date, count);
  }

  function handleDescription(e) {
    const updateDescription = e.target.value;
    handleToDoObj(taskTitle, updateDescription, priority, date, count);
    console.log(updateDescription);

    setDescription(updateDescription);
  }

  function handlePriority(e) {
    const updatePriority = e.target.value;
    handleToDoObj(taskTitle, description, updatePriority, date, count);
    setPriority(updatePriority);
  }

  function handleDate(e) {
    const updateDate = e.target.value;
    handleToDoObj(taskTitle, description, priority, updateDate, count);
    setDate(updateDate);
  }

  function handleCount() {
    console.log(toDoList);
    const toDoLength = toDoList.length;
    setCount(toDoLength);
  }

  function handleToDoObj(
    updateTaskTitle,
    updateDescription,
    updatePriority,
    updateDate
  ) {
    const toDoObject = {
      ...taskObj,
      taskTitle: updateTaskTitle,
      description: updateDescription,
      priority: updatePriority,
      date: updateDate,
    };

    setTaskObj(toDoObject);

        setToDoList((prevState) => [...prevState, taskObj]);


    localStorage.setItem("Inbox", JSON.stringify(toDoList));
  }

  function handleSubmit() {
    console.log(toDoList);
    handleCount();
  }

  return (
    <>
      <section className="formContainer">
        <form action="" id="form" onSubmit={(e) => e.preventDefault()}>
          <div className="formDetails">
            <div className="inputs">
              <p className="titleContainer">
                <label htmlFor="task-title">Title</label>
                <input
                  type="text"
                  id="task-title"
                  placeholder="task title"
                  onChange={(e) => handleTaskTitle(e)}
                />
              </p>
              <p className="descriptionContainer">
                <label htmlFor="task-title">Description</label>
                <input
                  type="text"
                  className="description"
                  placeholder="task Description"
                  onChange={(e) => handleDescription(e)}
                />
              </p>
            </div>
            <div className="priorityDateContainer">
              <select name="" id="priority" onChange={(e) => handlePriority(e)}>
                <option value="Select Priority">Select Priority</option>
                <option value="Urgent">Urgent</option>
                <option value="Important">Important</option>
                <option value="Low priority"> Low priority</option>
              </select>
              <input
                type="date"
                id="datePicker"
                placeholder="dd/mm/yyy"
                min="1900-03-23"
                max="2090-18-23"
                onChange={(e) => handleDate(e)}
              />
            </div>
          </div>
        </form>
        <div className="btnContainer">
          <div className="svgControl">
            <button className="cancel">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <title>cancel</title>
                <path d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" />
              </svg>
            </button>
            <button id="submitBtn">
              <svg
                onClick={handleSubmit}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <title>check</title>
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Form;
