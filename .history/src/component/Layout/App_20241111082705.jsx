import { useState } from "react";
import Header from "./Header";
import SideBar from "../SideBar";
import Display from "./Display";
import { createContext } from "react";
import { useState } from "react";

const GeneralContext = 


function App() {
  const [displayForm, setDisplayForm] = useState(null);
  const [inboxToDos, setInboxToDos] = useState([])

  return (
    <>
      <main>
        <Header />
        <SideBar />
        <Display />
          
        {/* <Form /> */}
      </main>
    </>
  );
}

export default App;
