import { useState } from "react";
import Header from "./component/Header";
import SideBar from "./component/SideBar";
import Display from "./component/Display";
import Form from "./component/Form";
import "./styles/style.css";

function App() {

  const [displayForm, setDisplayForm] = use


  return (
    <>
      <main>
        <Header />
        <SideBar />
        <Display />
        <Form />
      </main>
    </>
  );
}

export default App;