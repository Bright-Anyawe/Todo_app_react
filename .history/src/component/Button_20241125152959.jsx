import FormDialog from "./PopUp/Dialog";
import { useState } from "react";
import { useContext } from "react";
import { GeneralContext } from "./Layout/App";

export const FormButton = () => {
  const { open, setOpen } = useContext(GeneralContext);
  const [isClicked, setIsClicked] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <>
      <div id="taskBtnContainer">
        <button
          className={`taskBtn ${isClicked ? "clicked" : ""}`}
          onClick={handleOpen}
        >
          <svg
            className="addTask"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>plus</title>
            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
          </svg>
          Add task
        </button>
        <FormDialog />

        {/* <Form/> */}
      </div>
    </>
  );
};
