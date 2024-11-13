

export function Today() {
  const { inboxToDos, setInboxToDos } = useContext(GeneralContext);


  return (
    <div className="tomorrowTaskContainer">
      <div className="taskTitle">
        <h2>Today</h2>
      </div>

      <div className="taskContainer"></div>
    </div>
  );
}
