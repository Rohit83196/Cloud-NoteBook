import noteContext from '../context/notes/noteContext';
import React, { useContext, useState } from 'react'
   

const AddNote = (props) => {
    const context = useContext(noteContext);
    // let {notes,setNotes} = context;
    let { addNote} = context;

    const [note,setNote] = useState({title:"",description:"" , tag:""}) 


    const handleClick =(e)=>{
        e.preventDefault()
        addNote(note.title , note.description , note.tag)
        setNote({title:"",description:"" , tag:""})
    props.showAlert("Added SuccessFully","success")

    }
    const onChange =(e)=>{
        // console.log([e.target.name]);
        // console.log({...note , [e.target.name] : e.target.value});
        setNote({...note , [e.target.name] : e.target.value})
    }

    return (
        <div className="container my-3">
            <h1>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input minLength={5} value={note.title} required type="text" name='title' onChange={onChange} className="form-control" id="title" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input minLength={5} value={note.description} required type="text" name='description' onChange={onChange} className="form-control" id="description" />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text"  value={note.tag} name='tag' onChange={onChange} className="form-control" id="tag" />
                </div>

                <button disabled={note.title.length<5 || note.description.length<5 } type="submit" onClick={handleClick} className="btn btn-primary">Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
