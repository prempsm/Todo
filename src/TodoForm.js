import React, {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material'
import {useDispatch} from 'react-redux';
import { addContent } from './Redux/slices/contentSlice';
import {toast} from 'react-toastify';

function TodoForm() {
  const [text, setText] = useState({
    title: '',
    description: ''
  });
  const dispatch = useDispatch();
  const changeText = (e) =>{
    const {name, value} = e.target;
   setText({
    ...text,
    [name]: value.replace(/(<([^>]+)>)/gi, ''),
   }); 
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(text.title.trim()!='' && text.description.trim()!=''){
    dispatch(addContent(text));
    setText({
      title: '',
      description: ''
    })
  }else{
   toast.error('Please fill all the fields',{theme:'colored'})
  }

  }
  
  return (
    <div style={{padding:'20px'}}>
        <div style={{padding:'20px',background:'purple',borderRadius:'25px',maxWidth:'800px',margin:'auto'}}>
        <Box
      sx={{
        width: '100%',
        maxWidth: '800px',
        textAlign:'center'
      }}
    >
      <form onSubmit={handleSubmit}>
      <TextField
      onChange={changeText}
      value={text.title}
      name="title"
      sx={inputClr}
      fullWidth label="Add Your TODO title" id="fullWidth" />
      <div>&nbsp;</div>
      <TextField
       onChange={changeText}
      value={text.description}
      name="description"
      color="info"
      sx={inputClr}
      fullWidth label="Add Your TODO description" id="fullWidth" />
      <Button type='submit' size="large" variant="contained" 
      sx={{background:'white',color:'black',fontWeight:'bold', '&:hover': {
      backgroundColor: 'white', // Change to the desired hover color
    },marginTop: '20px'}}>Add Todo</Button>
      </form>
    </Box>
      </div>
    </div>
  )
}

export default TodoForm

const inputClr = {
  // Root class for the input field
  "& .MuiOutlinedInput-root": {
    color: "#ffffff",
    fontFamily: "Arial",
    fontWeight: "bold",
    // Class for the border around the input field
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff",
      borderWidth: "2px",
    },
  },
  // Class for the label of the input field
  "& .MuiInputLabel-outlined": {
    color: "#ffffff",
    fontWeight: "bold",
  },
  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused" :{
    color: 'white',
    borderColor: 'white'
  }
}