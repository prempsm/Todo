import React, {useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { fetchContent,deleteTodo } from './Redux/slices/contentSlice';
import { Box, Button} from '@mui/material';
import MyItem from './MyItem';

function List() {
    const dispatch = useDispatch();
    const {contents,isLoading,error} = useSelector((state) => state.content);
    
    useEffect(()=>{
        dispatch(fetchContent())
    },[dispatch]);

    const handleDelete = (val) =>{
        dispatch(deleteTodo(val));
      }
    
    const reversedContents = contents.slice().reverse();

    return (
    <div style={{maxWidth: '800px', margin: 'auto',padding:'20px'}}>
        <Box>
             {isLoading?<h2 style={{textAlign:'center'}}>Loading.....</h2>:reversedContents.map((item, index) => {
               return <div key={index} style={{background:'#ab47bc',padding:'20px',marginBottom:'20px',borderRadius:'15px'}}>
                    <span style={{background:'black',padding:'5px',borderRadius:'5px',color:'white',fontSize:'12px',marginRight:'5px'}}>{reversedContents.length - index}</span>
                    <MyItem des={item.description} title={item.title} id={item.id}/>
                    <Button onClick={()=>handleDelete(item.id)} variant='contained' sx={{background:'red',color:'white'}}>Delete</Button>
                </div>
            })}
        </Box>
    </div>
  )
}

export default List