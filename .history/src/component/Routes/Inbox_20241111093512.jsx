import { GeneralContext } from "../Layout/App";
import { useContext } from "react";

export function Inbox() {
const {inboxToDos} = useContext(GeneralContext)
console.log(inboxToDos)

  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>Inbox</h2>
      </div>

      <div className="taskContainer">
{inboxToDos.map((todo, index) => (
  <div key={index} className="taskItem">
    <div className="taskContent">
      
    </div>
  </div>
))}
      </div>
    </div>
  );
}
