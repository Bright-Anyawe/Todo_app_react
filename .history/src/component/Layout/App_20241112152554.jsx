import { useState } from "react";
import Header from "./Header";
import SideBar from "../SideBar";
import Display from "./Display";
import { createContext } from "react";

export const GeneralContext = createContext([]);
export const ProjectContext = createContext([]);

function App() {
  const [displayForm, setDisplayForm] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);

  // const [inboxToDos, setInboxToDos] = useState([]);
  const [todayToDos, setTodayToDos] = useState([]);
  const [inboxCount, setInboxCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [OpenProjectForm, setOpenProjectForm] = useState(false);
  const [projects, setProjects] = useState([
    { name: "Inbox", todos: [] },
    { name: "Today", todos: [] },
    { name: "Tomorrow", todos: [] },
    { name: "ThisWeek", todos: [] },
    { name: "Completed", todos: [] },
  ]);
    const [projectName, setProjectName] = useState("");
      const [completedToDos, setCompletedToDos] = useState([]);



  return (
    <>
      <main>
        <GeneralContext.Provider
          value={{
            // inboxToDos,
            // setInboxToDos,
            todayToDos,
            setTodayToDos,
            open,
            setOpen,
            inboxCount,
            setInboxCount,
            todayCount,
            setTodayCount,
            selectedTodo,
            setSelectedTodo,
            
          }}
        >
          <ProjectContext.Provider
            value={{
              OpenProjectForm,
              setOpenProjectForm,
              projects,
              setProjects,
              projectName,
              setProjectName,
            }}
          >
            <Header />
            <SideBar />
            <Display />
          </ProjectContext.Provider>
        </GeneralContext.Provider>
        {/* <Form /> */}
      </main>
    </>
  );
}

export default App;
