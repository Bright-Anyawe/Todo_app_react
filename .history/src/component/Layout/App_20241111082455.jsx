import { useState } from "react";
import Header from "./Header";
import SideBar from "../SideBar";
import Display from "./Display";
import createC


function App() {
  const [displayForm, setDisplayForm] = useState(null);

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
