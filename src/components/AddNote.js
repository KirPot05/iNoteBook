import React, { useContext, useState } from 'react';
import noteContext from "../context/noteContext";

const AddNote = () => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }


    return (
        <div className="container my-4">
            <h2>This is Home Page</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name='title'
                        aria-describedby="emailHelp"
                        onChange={onChange}
                        value={note.title}
                        minLength={5}
                        required

                    />

                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name='description'
                        onChange={onChange}
                        value={note.description}
                        minLength={5}
                        required
                    />

                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                        Tag
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name='tag'
                        onChange={onChange}
                        value={note.tag}
                        minLength={5}
                        required
                    />

                </div>


                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" >
                    Add Note
                </button>
            </form>
        </div>


    );
};

export default AddNote;
