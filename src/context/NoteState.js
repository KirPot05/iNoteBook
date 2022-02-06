import { useState } from "react";
import NoteContext from "./noteContext";



const NoteState = ({children, showAlert}) => {

	const host = 'http://localhost:5000';
	const notesInitial = [];
	const [notes, setNotes] = useState(notesInitial);


	// GET all Notes
	const getNotes = async () => {
		const response = await fetch(`${host}/api/notes/fetchNotes`, {
			method: "GET", 
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem('token')
			}
		});

		const data = await response.json();
		console.log(data);
		setNotes(data);
	} 


	// ADD a note functionality
	const addNote = async (title, description, tag) => {

		
		const response = await fetch(`${host}/api/notes/addNotes`, {
			method: 'POST',
			headers: {
				"Content-Type": 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, description, tag })
		});

		const note = await response.json();

		setNotes(notes.concat(note));
		showAlert("Note Added Successfully", "success");
	}

	// Edit Note Functionality
	const editNote = async (id, title, description, tag) => {

		const response = await fetch(`${host}/api/notes/updateNotes/${id}`, {
			method: 'PUT',
			headers: {
				"Content-Type": 'application/json',
				"auth-token": localStorage.getItem('token')
			},
			body: JSON.stringify({ title, description, tag })
		})

		const json = await response.json();
		console.log(json);

		let newNote = JSON.parse(JSON.stringify(notes));

		for (let index = 0; index < newNote.length; index++) {
			const element = newNote[index];
			if (element._id === id) {
				element.title = title;
				element.description = description;
				element.tag = tag;
				break;
			}

		}
		setNotes(newNote);
		showAlert("Note Updated Successfully", 'success');
	}

	// Delete Note Functionality
	const deleteNote = async (id) => {

		const response = await fetch(`${host}/api/notes/deleteNotes/${id}`, {
			method: 'DELETE',
			headers: {
				"Content-Type": 'application/json',
				"auth-token": localStorage.getItem('token')
			}
		})
		const data = await response.json();

		const newNotes = notes.filter((note) => {return note._id !== id});
		setNotes(newNotes);
		showAlert("Note Deleted Successfully", 'danger');

	}


	return (

		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
			{children}
		</NoteContext.Provider>
	)

}

export default NoteState;