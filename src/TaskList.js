import React, { useState } from 'react';

function TaskList() {
  //state for task lisk which has couple of preset data items
  const [inputValue, setInputValue] = useState('');
  // state to handle input box value
  const [taskList, setTaskList] = useState(['write a list', 'read a book', 'time to handle stuffs']);
  // state to handle delete status to display status
  const [deleteClicked, setDeleteclicked] = useState(false);

  //method to handle on change event for adding item
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  //method to handle submit click
  const handleSubmit = () => {
    if(inputValue){
      setTaskList([...taskList, inputValue]);
      setInputValue('');
    }
    
  };

  //method to handle delete
  // logic implemented as have taken an interval time to execute the line of code after 1 sec and simultaneously we are clearing of the interval so that it stop the execution once delete
  const handleDelete = (item) => {
    setDeleteclicked(true);
    var count = 0;
    var r = setInterval(() => {
      count = count + 1;
      let ind = taskList.indexOf(item);
      let arr1 = taskList.slice(0, ind);
      let arr2 = taskList.slice(ind + 1);
      setTaskList([...arr1, ...arr2]);
      setDeleteclicked(false);
      if (count > 0) {
        clearInterval(r);
      }
    }, 1000);
  };

  //method to handle sorting
  const handleSort = () => {
    let arr = taskList.sort();
    setTaskList([...arr]);
  };

  return (
    <div>
      <h2 style={{textAlign:"center"}}>Todo List</h2>
      <div className="header"><input type="text" onChange={handleInput} value={inputValue} />
      <button onClick={handleSubmit} className="headerbuttons">Submit</button>
      <button onClick={handleSort} className="headerbuttons">Sort</button></div>
      <div className="container">
      {/* iterating the items to display from the list */}
      {taskList.map((item, index) => {
        return (
          <div>
            {
              index % 2 === 0 ?  <div className= "evenRow" >
              <div style={{ marginRight: '10px', flex:1 }}>{item}</div>
              <div style={{flex:1}}><button onClick={() => handleDelete(item)}>Delete</button></div>
            </div> : 
              <div style={{ display: 'flex', alignItems: 'center', padding:"10px" }}>
              <div style={{ marginRight: '10px', flex:1 }}>{item}</div>
              <div style={{flex:1}}><button onClick={() => handleDelete(item)}>Delete</button></div>
              </div>
            }
          </div>
        );
      })}
      </div>
      {/* handles the message to show */}
      {deleteClicked ? <div style={{color:"red", textAlign:"center", padding:"10px"}}>deleting..</div> : null}
    </div>
  );
}

export default TaskList;
