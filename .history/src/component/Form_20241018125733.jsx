const Form = () => {
  return (
    <>
      <section className="formContainer">
        <form action="" id="form">
          <div className="formDetails">
            <div className="inputs">
              <p className="titleContainer">
                <label htmlFor="task-title">Title</label>
                <input
                  type="text"
                  id="task-title"
                  placeholder="Type task title"
                />
              </p>
              <p className="descriptionContainer">
                <label htmlFor="task-title">Description</label>
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
          
        </form>
      </section>
    </>
  );
};

export default Form;
