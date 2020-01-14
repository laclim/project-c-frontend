import * as React from "react";
import { axiosInstance as axios } from "../../axios/index";
import { useEffect, useState } from "react";
import { AddNewTask } from "./AddNewTask";

export const Task = () => {
  const initialState = {
    _id: "",
    title: "",
    content: "",
    createdBy: { name: "" },
    createdAt: ""
  };

  const toggleAddNewTask = () => {
    setHidden(!hidden);
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await axios.delete("task/" + _id);
      if (response.status == 200) {
        console.log("deleted");
        isUpdate(!update);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [state, setState] = useState([initialState]);
  const [hidden, setHidden] = useState(false);
  const [update, isUpdate] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/tasks");
        setState(response.data.data);
      } catch (error) {
        console.log(error);
      }

      //   console.log(response);
    };
    fetchData();
  }, [update]);
  console.log(state);

  return (
    <div>
      <h1>Task</h1>
      <button onClick={toggleAddNewTask.bind(this)}>Add New Task</button>
      {hidden && <AddNewTask isUpdate={isUpdate} Update={update} />}
      {state.map((task, i) => (
        <div className="task" key={i}>
          <h1>{task.title}</h1>
          <h6>posted by - {task.createdBy.name}</h6>
          <p>{task.content}</p>
          <button onClick={() => handleDelete(task._id)}>delete</button>
        </div>
      ))}
    </div>
  );
};
