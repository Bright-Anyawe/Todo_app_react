

const Form = () => {


     return (
       <>
         <form action="" id="form">
           <div className="formDetails">
             <div className="inputs">
               <p className="first-inputContainer">
                 <input
                   type="text"
                   className="task-title"
                   placeholder="Type task title"
                 />
               </p>
               <p className="second-inputContainer">
                 <input
                   type="text"
                   className="description"
                   placeholder="Type description"
                 />
               </p>
             </div>
             <div
               class="priorityDateOnLargeScreen"
               id="configPriorityDateOnMobile"
             >
               <select name="" id="priority">
                 <option value="Select Priority">Select Priority</option>
                 <option value="Urgent">Urgent</option>
                 <option value="Important">Important</option>
                 <option value="Low priority"> Low priority</option>
               </select>
               <input
                 type="date"
                 id="datePicker"
                 placeholder="dd/mm/yyy"
                 min="1900-03-23"
                 max="2090-18-23"
               />
             </div>
           </div>
           <section className="other-options-on-forms" id="formFooterOnMobile">
             <div className="buttons">
               <button className="cancel">Cancel</button>
               <button id="submitBtn">Add</button>
             </div>
           </section>
         </form>
       </>
     );
}

export default Form;