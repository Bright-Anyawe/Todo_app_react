import { useState } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import { useEffect, useRef } from "react";
import { AuthContext } from "../../Context/ContextProvider";
import { GeneralContext, ProjectContext } from "../../Context/ContextProvider";
import { db, doc, setDoc, getDoc, auth } from "../../FireBase/FireBase";
import { onAuthStateChanged } from "firebase/auth";

function Dashboard() {
  const [selectedTodo, setSelectedTodo] = useState(null);

  const [inboxCount, setInboxCount] = useState(0);
  const [sundayCount, setSundayCount] = useState(0);
  const [mondayCount, setMondayCount] = useState(0);
  const [tuesdayCount, setTuesdayCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [open, setOpen] = useState(false);
  const [OpenProjectForm, setOpenProjectForm] = useState(false);
  const [projects, setProjects] = useState(() => {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    return localProjects && localProjects.length > 0 ? localProjects : [
      { name: "Inbox", todos: [] },
      { name: "Sunday", todos: [] },
      { name: "Monday", todos: [] },
      { name: "Tuesday", todos: [] },
    ];
  });
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

  const syncLocalToFirestore = async (userId) => {
    const localProjects = JSON.parse(localStorage.getItem("projects"));
    if (localProjects) {
      const userDoc = doc(db, "users", userId);
      await setDoc(userDoc, { projects: localProjects }, { merge: true });
    }
  };

  const fetchFirestoreProjects = async (userId) => {
    const userDoc = doc(db, "users", userId);
    const userSnap = await getDoc(userDoc);
    console.log("Projects from Firestore:", userSnap.data().projects);

    if (userSnap.exists()) {
      setProjects(userSnap.data().projects || []);
    } else {
      // If userSnap doesn't exist, rely on local projects already synced or initial defaults.
      // Do not overwrite projects with an empty array here.
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
        await syncLocalToFirestore(currentUser.uid);
        await fetchFirestoreProjects(currentUser.uid);
      } else {
        setUser(null);
        const localProjects = JSON.parse(localStorage.getItem("projects"));
        setProjects(localProjects || []);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const saveProjects = async () => {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, { projects }, { merge: true });
        console.log("Projects in Dashboard (after save):", projects);
      };
      saveProjects();
    }
  }, [projects, user]);

  useEffect(() => {
    if (user) {
      const saveCounts = async () => {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(
          userDoc,
          {
            counts: {
              inboxCount,
              sundayCount,
              mondayCount,
              tuesdayCount,
              completedCount,
            },
          },
          { merge: true }
        );
      };
      saveCounts();
    }
  }, [
    inboxCount,
    sundayCount,
    mondayCount,
    tuesdayCount,
    completedCount,
    user,
  ]);

  return (
    <>
      <main>
        <GeneralContext.Provider
          value={{
            open,
            setOpen,
            inboxCount,
            setInboxCount,
            sundayCount,
            setSundayCount,
            mondayCount,
            setMondayCount,
            tuesdayCount,
            setTuesdayCount,
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
                user,
                setUser,
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
              <MainContent />
              {}
            </AuthContext.Provider>
          </ProjectContext.Provider>
        </GeneralContext.Provider>
      </main>
    </>
  );
}

export default Dashboard;
