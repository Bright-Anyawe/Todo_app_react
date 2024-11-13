import { GeneralContext } from "../Layout/App";
import { useContext } from "react";

export function Inbox() {
const [inboxToDos] = useContext(GeneralContext)
console.log(inbox)

  return (
    <div className="inboxTaskContainer">
      <div className="taskTitle">
        <h2>Inbox</h2>
      </div>

      <div className="taskContainer">

      </div>
    </div>
  );
}
