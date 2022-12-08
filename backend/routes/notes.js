const express = require('express');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
     

// Get all the notes using: GET "./api/notes/fetchallnotes"  login required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
        
        const notes = await Notes.find({user:req.user.id});
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error")
    }
})

// add a new note  using: POST "./api/notes/addnote"  login required
router.post('/addnote',fetchuser,[
    body('title', "Enter a valid title").isLength({ min: 3 }),
    body('description',"description lenght > 5").isLength({ min: 5 }),
], async (req,res)=>{
    try {
        
        const {title,description , tag} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title,description , tag , user:req.user.id  
        })
        const saveNote =await note.save()
        res.json(saveNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error")
    }
})


// Update existing note using: PUT "./api/notes/updatenote"  login required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    try {    
        const {title,description , tag} = req.body
    
        const newNote = {};
        if (title) { newNote.title= title  }
        if (description) { newNote.description= description  }
        if (tag) { newNote.tag= tag  }

        let note = await Notes.findById(req.params.id)
        if (!note) {
            res.status(404).send("note not found")
        }
        if (note.user.toString() !== req.user.id ) {
            res.status(404).send("you are trying to update someone else note")
        }
        note = await Notes.findByIdAndUpdate(req.params.id , {$set:newNote} , {new:true} )
        res.json({note})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error")
    }
})

// Deleting note using: DELETE "./api/notes/deletenote"  login required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try {    
        let note = await Notes.findById(req.params.id)
        if (!note) {
            res.status(404).send("note not found")
        }
        if (note.user.toString() !== req.user.id ) {
            res.status(404).send("you are trying to update someone else note")
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        // note = await Notes.findByIdAndUpdate(req.params.id , {$set:newNote} , {new:true} )
        res.json({"success":"your note is successfully deleted" , note : note})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("internal server error")
    }
})



module.exports = router;