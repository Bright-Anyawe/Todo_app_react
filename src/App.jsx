import { useState } from "react";
import Header from "./component/Layout/Header";
import SideBar from "./component/Layout/SideBar";
import Display from "./component/Layout/Display";
import { useEffect, useRef } from "react";
import { AuthContext } from "./Context/ContextProvider";
import { GeneralContext , ProjectContext} from "./Context/ContextProvider";
import { db,  doc, setDoc, getDoc } from "./FireBase/FireBase";


function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);

  const [inboxCount, setInboxCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [tomorrowCount, setTomorrowCount] = useState(0);
  const [thisWeekCount, setThisWeekCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [OpenProjectForm, setOpenProjectForm] = useState(false);
  const [projects, setProjects] = useState([
    { name: "Inbox", todos: [] },
    { name: "Today", todos: [] },
    { name: "Tomorrow", todos: [] },
    { name: "Weekly", todos: [] },
  ]);
  const [projectName, setProjectName] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  const [completedToDos, setCompletedToDos] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (completedToDos && Array.isArray(completedToDos)) {
      localStorage.setItem("completedToDos", JSON.stringify(completedToDos));
    }
  }, [completedToDos]);

  useEffect(() => {
    const storedCompletedToDos =
      JSON.parse(localStorage.getItem("completedToDos")) || [];
    setCompletedToDos(storedCompletedToDos);
  }, []);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  

  const markTodoAsCompleted = (todo) => {
    setCompletedToDos((prevCompletedToDos) => {
      const updatedTodos = [...prevCompletedToDos, todo];
      localStorage.setItem("completedToDos", JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setCompletedCount((prevCount) => prevCount + 1);
  };

  const arrowRef = useRef(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "green";
      case "normal":
        return "blue";
      case "important":
        return "orange";
      case "urgent":
        return "red";
      default:
        return "black";
    }
  };

  useEffect(() => {
    if (user) {
      const saveProjects = async () => {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, { projects }, { merge: true });
      };
      saveProjects();
    }
  }, [projects, user]);

  useEffect(() => {
    if (user) {
      const fetchProjects = async () => {
        const userDoc = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setProjects(userSnap.data().projects);
        }
      };
      fetchProjects();
    }
  }, [user]);

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
            tomorrowCount,
            setTomorrowCount,
            thisWeekCount,
            setThisWeekCount,
            completedCount,
            setCompletedCount,
            selectedTodo,
            setSelectedTodo,
            completedToDos,
            setCompletedToDos,
            isCollapsed,
            setIsCollapsed,
            toggleSidebar,
            arrowRef,
            getPriorityColor,
            markTodoAsCompleted,
            setSelectedProjectName,
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
            <AuthContext.Provider
              value={{
                user, setUser,
                userEmail,
                setUserEmail,
                password,
                setPassword,
                error,
                setError,

                isAuthenticated,
                setIsAuthenticated,
              }}
            >
              <Header
                toggleSidebar={toggleSidebar}
                isCollapsed={isCollapsed}
                arrowRef={arrowRef}
              />
              <SideBar />
              <Display />
            </AuthContext.Provider>
          </ProjectContext.Provider>
        </GeneralContext.Provider>
      </main>
    </>
  );
}

export default App;
