import React, {useState} from 'react'
import { List, ListItem, Modal, Button, ListItemText, ListItemAvatar  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './Todo.css';
import db from './firebase';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState(props.todo.todo);

    const handleOpen = () => {
        setOpen(true);
    }    

    const updateTodo = () => {
        // update the todo
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true });
        setOpen(false);
    }

    return (
        <>
        <Modal 
            open={open}
            onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>I am a modal</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                <Button onClick={e => updateTodo()}>Update</Button>
            </div>
        </Modal>
        <List>  
            <ListItemAvatar>
            </ListItemAvatar>
            <ListItem>
                <ListItemText primary={props.todo.todo} secondary="Dummy deadline ⏰" />
            </ListItem>
            <button onClick={e => handleOpen()}>Edit</button>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
        </List>
        </>
    )
}

export default Todo
