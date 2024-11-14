


export function Completed() {

     return (
       <div className="inboxTaskContainer">
         <div className="taskTitle">
           <h2>Tomorrow</h2>
         </div>

         <div className="taskContainer">
           {tomorrowToDos.map((todo, index) => {
             const isCompleted = completedToDos.includes(todo);

             return (
               <div key={index} className="taskItem">
                 <div className="taskContent">
                   <Checkbox
                     onClick={() => handleCheckBoxChange(index, todo)}
                     checked={isCompleted}
                     disabled={isCompleted}
                     style={{ float: "left" }}
                   />

                   <span
                     style={{
                       textDecoration: isCompleted ? "line-through" : "none",
                       color: isCompleted ? "grey" : "black",
                     }}
                   >
                     {todo.taskTitle}
                   </span>
                   <span> - {todo.priority}</span>
                   {isCompleted && (
                     <span style={{ color: "green", marginLeft: "10px" }}>
                       Task completed!
                     </span>
                   )}

                   <IconButton
                     onClick={() => handleOptionsClick(index)}
                     style={{ marginLeft: "auto" }}
                   >
                     <MoreVertIcon />
                   </IconButton>

                   <Snackbar
                     open={snackbarOpen}
                     onClose={handleCloseSnackbar}
                     message="Task marked as completed!"
                     autoHideDuration={3000}
                   />

                   {showOptions === index && (
                     <div className="taskOptions">
                       <IconButton onClick={() => handleEditClick(todo)}>
                         <EditIcon /> Edit
                       </IconButton>
                       <IconButton onClick={() => handleDelete(index)}>
                         <DeleteIcon /> Delete
                       </IconButton>
                       <IconButton onClick={() => handleToDoDetails(todo)}>
                         <InfoIcon /> Details
                       </IconButton>
                     </div>
                   )}
                 </div>
               </div>
             );
           })}
         </div>

         {
           <TodoDetails
             open={detailsOpen}
             onClose={handleCloseDetails}
             todo={todoDetails}
           />
         }
       </div>
     );
}