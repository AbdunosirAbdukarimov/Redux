import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        list: [],
    },
    reducers: {
        addTodo:(state, action) => {
            state.list = [action.payload , ...state.list]
            message.info("Added Successfull")
        },
        deleteTodo:(state, action) => {
            state.list = state.list.filter((item) => item.id !== action.payload)
            message.warning("Deleted Successfull")
        },
        checkedTodo:(state, action) => {
            state.list = state.list.map((item) => (
                item.id === action.payload? {...item, checked:!item.checked} : item
            ))
        },
        editTodo:(state, action) => {
            state.list = state.list.map((item) => (
                item.id === action.payload.id? {...item, title: action.payload.title} : item
            )) 
        },
    }

})

export const {addTodo,  deleteTodo, checkedTodo, editTodo} = todoSlice.actions;
export default todoSlice.reducer