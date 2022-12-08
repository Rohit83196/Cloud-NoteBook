import noteContext from '../context/notes/noteContext';
import React, { useContext } from 'react'

const NoteItem = (props) => {
    // // console.log(props);

    const context = useContext(noteContext);
    let { deleteNote} = context;
    const { note , updateNote} = props;

    return (
        <div className='col-md-3'>
            {/* <div className="card my-3" style={"Width": "18rem"}> */}
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <p className="card-text">Tag : {note.tag}</p>
                    <i onClick={()=>{deleteNote(note._id); props.showAlert("Deleted SuccessFully","success")}} className="fa-solid fa-trash mx-2"></i>
                    <i onClick={()=>{updateNote(note); }} className="far mx-2 fa-edit"></i>
                </div>
            </div>
        </div >
    )
}

export default NoteItem
    

