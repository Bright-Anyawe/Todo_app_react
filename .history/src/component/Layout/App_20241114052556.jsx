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


  const [inboxCount, setInboxCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [tomorrowCount, setTomorrowCount] = useState(0);
  const [thisWeekCount, setTodayCount] = useState(0);
  const [completedCount, setTodayCount] = useState(0);


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
    const [selectedProjectName, setSelectedProjectName] = useState("");
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

      const [completedToDos, setCompletedToDos] = useState([]);



  return (
    <>
      <main>
        <GeneralContext.Provider
          value={{
            
            open,
            setOpen,
            inboxCount,
            setInboxCount,
            todayCount,
            setTodayCount,
            
            selectedTodo,
            setSelectedTodo,
            completedToDos,
            setCompletedToDos,
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
              selectedProjectName,
              setSelectedProjectName,
              selectedProjectIndex,
              setSelectedProjectIndex,
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
