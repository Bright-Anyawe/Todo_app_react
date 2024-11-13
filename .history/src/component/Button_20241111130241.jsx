import FormDialog from "./PopUp/Dialog";
import { useState } from "react";
import { useContext } from "react";
import { GeneralContext } from "./Layout/App";

export const FormButton = ({onSave}) => {
     const {open, setOpen} = useContext(GeneralContext);

 const handleOpen = () => {
   setOpen(true);
 };

  return (
    <>
      <div id="taskBtnContainer">
        <svg
          className="addTask"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>plus</title>
          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
        <button
          className="taskBtn"
          onClick={() => {
            handleOpen();
          }}
        >
          Add task
        </button>
        <FormDialog onSave{} />

        {/* <Form/> */}
      </div>
    </>
  );
};
