import { useState } from 'react';
import NoteContext from './noteContext';


const NoteState = (props) => {
  const host = 'http://localhost:5000'
  const notesInitial = [
  ]
  const [notes, setNotes] = useState(notesInitial)
 
  // Get all note
  const getNotes = async () => {  
    // API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        // "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    // console.log(json);
    setNotes(json)
   


}
   

  // Add a note
  const addNote = async (title, description, tag) => {
      // API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const note = await response.json()
      // setNotes(notes.push(note));
      setNotes(notes.concat(note));
     // console.log(note);

  
  }

  // Delete a note
  const deleteNote = async (id) => {
     // API call
    //  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
     fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    // const json = response.json()
    // console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  // edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    // const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    // const json = await response.json()
    // console.log(json);
    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      if (notes[index]._id === id) {
        // console.log("GOT IT");
        notes[index].title = title;
        notes[index].description = description;
        notes[index].tag = tag;
        break;
      }
    }
    // notes[4].title = title;
    // notes[4].description = description;
    // notes[4].tag = tag;
    // console.log("EDITED NOTES...",notes);
    let nnNotes = JSON.parse(JSON.stringify(notes))
    setNotes(nnNotes)
    // console.log("EDITED NOTES...",notes);
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes }} >
      {/* <NoteContext.Provider value={{state , update}} > */}
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;