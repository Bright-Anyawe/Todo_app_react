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
          Add task
        </button>
        <FormDialog />

        {/* <Form/> */}
      </div>
    </>
  );
};
