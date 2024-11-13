import { useState } from "react";
import Header from "./Header";
import SideBar from "../SideBar";
import Display from "./Display";
import { createContext } from "react";

export const GeneralContext = createContext([])


function App() {
  const [displayForm, setDisplayForm] = useState(null);
  const [inboxToDos, setInboxToDos] = useState([])
  const [inboxCount, setinboxCount] = useState([]);

  const [todayToDos, setTodayToDos] = useState([]);
  const [inboxToDos, setInboxToDos] = useState([]);

   const [open, setOpen] = useState(false);


  return (
    <>
      <main>
        <GeneralContext.Provider value={{ inboxToDos, setInboxToDos,todayToDos, setTodayToDos,  open , setOpen}}>
          <Header />
          <SideBar />
          <Display />
        </GeneralContext.Provider>
        {/* <Form /> */}
      </main>
    </>
  );
}

export default App;
