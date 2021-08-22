import React, {useState, useEffect} from 'react'; 
import './App.css';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo.js';
import db from './firebase'
import firebase from 'firebase'


function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  // when the app loads, we need to listen to the database and fetch the new todos as they get added/remove

  useEffect(() => {
    // this code here.. fires when the app.js load
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      // console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo:doc.data().todo})));
    });
  }, []);

  const addTodo = (event) => {
    // this will fire off when we click the button
    event.preventDefault(); // will stop the refresh

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput(''); // clear up the input after click the button
  }

  return (
    <div className="App">
     <h1> Tsaqif in the cyber space yoo! </h1> 
     <form>
      <FormControl>
        <InputLabel>✅ Write a Todo</InputLabel>
        <Input value={input} onChange={event => setInput(event.target.value)}/>
      </FormControl>
      <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
        Add Todo
      </Button>
     </form>

      <ul>
          {todos.map(todo=> (
            <Todo todo={todo}/>
          ))}
      </ul>

    </div>
  );
}

export default App;
