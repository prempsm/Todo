import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify';
import { actionChannel } from 'redux-saga/effects';

export const initialState = {
  contents: [],
  isLoading: false,
  error: null,
}

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async () => {
    const res = await axios.get('https://660c365a3a0766e85dbda8c4.mockapi.io/todos/todos')
    const data = await res.data
    return data
  }
)

export const addContent = createAsyncThunk('content/addContent',
async (dat) => {

    const res = await axios.post('https://660c365a3a0766e85dbda8c4.mockapi.io/todos/todos',dat);
    const data = res.data;
    return data;
})

export const deleteTodo = createAsyncThunk('content/deleteTodo',
async (id) => {

    const res = await axios.delete(`https://660c365a3a0766e85dbda8c4.mockapi.io/todos/todos/${id}`);
    const data = res.data;
    return data;
})

export const updateTodo = createAsyncThunk('content/updateTodo',
async (val) => {
    const res = await axios.put(`https://660c365a3a0766e85dbda8c4.mockapi.io/todos/todos/${val.id}`,val);
    const data = res.data;
    return data;
})

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false
      state.contents = action.payload
    })
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(addContent.pending, (state)=>{
        state.isLoading = true;
    })
    builder.addCase(addContent.fulfilled, (state, action) =>{
        state.isLoading = false;
        state.contents.push(action.payload);
        toast.success("Added Successfully",{ theme: "colored" })
    })
    builder.addCase(addContent.rejected,(state, action) =>{
        state.isLoading = false;
        state.error = action.error.message;
    })
    builder.addCase(deleteTodo.pending, (state)=>{
        state.isLoading = true;
    })
    builder.addCase(deleteTodo.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.contents = state.contents.filter((data)=>data.id !== action.payload.id);
        toast.success("Deleted Successfully",{ theme: "colored" })
    })
    builder.addCase(deleteTodo.rejected, (state,action)=>{
        state.error = action.error.message;
    })
    builder.addCase(updateTodo.pending,(state)=>{
        state.isLoading = true;
    })
    builder.addCase(updateTodo.fulfilled,(state,action)=>{
        state.isLoading = false;
        const index = state.contents.findIndex((data) => data.id == action.payload.id);
        state.contents[index] = {...action.payload};
        toast.success('Updated data successfuly',{theme:'colored'});
    })
    builder.addCase(updateTodo.rejected,(state,action)=>{
        state.isLoading = false;
        state.error =action.error.message;
    })
  },
})

export default contentSlice.reducer