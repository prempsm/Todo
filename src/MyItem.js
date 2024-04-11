import React,{useState, useEffect} from 'react';
import {TextField, Button} from '@mui/material';
import { updateTodo } from './Redux/slices/contentSlice';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';

function MyItem({des,title,id}) {
    const [edit, setEdit] = useState(true);
    const [ttl, setTtl] = useState('');
    const [description, setDescription] = useState('');
    const [ttl1, setTtl1] = useState('');
    const [des1, setDes1] = useState('');
    const dispatch = useDispatch();
    
    useEffect(() => {
        setTtl(title)
        setDescription(des)
        setTtl1(title)
        setDes1(des)
    }, [title, des]);

    const submitData = ()=>{
        if(ttl.trim()!='' && description.trim()!=''){
        dispatch(updateTodo({title:ttl,description:description,id:id}));
        }else{
        setTtl(ttl1)
        setDescription(des1)   
         toast('Fields cannot be empty');
        }

    }

  return (
    <div>
    <div style={{paddingTop:'10px'}}><TextField disabled={edit} fullWidth multiline 
    sx={inputStyle}
    value={ttl}
    onChange={(e)=>setTtl(e.target.value.replace(/(<([^>]+)>)/gi, ''))} /></div>

    <div style={{padding:'20px 0px'}}><TextField fullWidth multiline 
    value={description}
    sx={inputStyle}
    disabled={edit}
    onChange={(e)=>setDescription(e.target.value.replace(/(<([^>]+)>)/gi, ''))} /></div>
    <Button 
    onClick={() => { 
        !edit && submitData() 
        setEdit(prev => !prev);
    }}
    variant='contained'
    sx={{background:'blue', color:'white', marginBottom:'10px'}}>{edit ? "Edit" : 'Update'}</Button>
    </div>)
}

export default MyItem

const inputStyle ={
'& .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled':{
    WebkitTextFillColor:'white',
    color:'white'
},
'& .css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root':{
    color: 'yellow',
}
}