import * as React from "react";
import { axiosInstance as axios } from "../../axios/index";
import { useEffect, useState } from "react";

export const AddNewTask = (props: any) => {
  const [state, setstate] = useState({ title: "", content: "" });
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setstate({ ...state, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post("/task", state);
      if (response.status == 200) {
        console.log("posted");
        props.isUpdate(!props.update);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={state.title}
        onChange={handleChange}
      />
      <textarea name="content" value={state.content} onChange={handleChange} />
      <input type="submit" value="Add" onClick={handleAddTask} />
    </form>
  );
};
