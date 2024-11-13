const Form = () => {
  return (
    <>
      <section className="formContainer">
        <form action="" id="form">
          <div className="formDetails">
            <div className="inputs">
              <p className="first-inputContainer">
                <input
                  type="text"
                  className="task-title"
                  placeholder="Type task title"
                />
              </p>
              <p className="second-inputContainer">
                <input
                  type="text"
                  className="description"
                  placeholder="Type description"
                />
              </p>
            </div>
            <div className="priorityDateContainer">
              <select name="" id="priority">
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
              />
            </div>
          </div>
          <div className="btnContainer">
            <div className="svg">
              <button className="cancel">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <title>cancel</title>
                  <path d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" />
                </svg>
              </button>
              <button id="submitBtn">Add</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Form;
