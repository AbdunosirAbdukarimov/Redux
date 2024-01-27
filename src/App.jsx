import { Paper, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, checkedTodo, deleteTodo, editTodo } from "./todoSlice";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useState } from "react";
import { message } from "antd";

const App = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const state = useSelector((state) => state.todo.list);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    if(e.target[0].value == ''){
      message.info("Plese enter text...")
    }else{
      e.target[0].value = null
      const obj = {
        id: Date.now(),
        title: inputValue,
        checked: false,
      };
      dispatch(addTodo(obj));
    }
    
  };

  const editTodoFunct = (id) => {
    setSelectedId(id);
  };

  const saveTodo = (id , title) => {
    dispatch(editTodo({id, title}))
    setSelectedId(null);
  }

  return (
    <Stack
      sx={{
        width: "600px",
        height: "500px",
        margin: "70px auto",
        padding: "10px",
        border: "1px solid gray",
      }}
    >
      <Paper
        onSubmit={(e) => handleSubmit(e)}
        component={"form"}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",
        }}
      >
        <input
          style={{ width: "85%", padding: "10px 20px", outline:'none' }}
          type="text"
          placeholder="Enter some text..."
        />
        <button style={{ padding: "10px 30px" }} type="submit">
          Add
        </button>
      </Paper>
      <Stack>
        {state &&
          state.map((item) => (
            <Stack
              direction={"row"}
              alignItems={"center"}
              key={item.id}
              sx={{
                border: "1px solid gray",
                margin: "5px 0",
                padding: "5px 10px",
                filter: item.checked === true ? "grayscale(1)" : "",
              }}
            >
              <input
                style={{ transform: "scale(1.7)", marginRight: "10px" }}
                type="checkbox"
                onClick={() => dispatch(checkedTodo(item.id))}
              />
              {selectedId === item.id ? (
                <input
                  style={{ width: "80%", padding: "5px", fontSize: "18px" }}
                  type="text"
                  defaultValue={item.title}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              ) : (
                <Typography
                  sx={{
                    textDecoration: item.checked ? "line-through" : "none",
                  }}
                  width={"83%"}
                  variant="h6"
                  color={"rgb(128, 58, 0)"}
                >
                  {item.title}
                </Typography>
              )}
              {selectedId === item.id ? (
                <button onClick={() => saveTodo(item.id , newTitle)} style={{padding:'7px 10px', background:"green", color:'white'}}>Save</button>
              ) : (
                <ModeEditIcon
                  onClick={() => editTodoFunct(item.id)}
                  className="edit"
                />
              )}
              <DeleteForeverIcon
                className="delete"
                onClick={() => dispatch(deleteTodo(item.id))}
              />
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default App;
