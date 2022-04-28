import {NotePreview} from './note-preview.jsx'




export function NoteList ({notes,onDeleteNote})  {

    
            // console.log(notes)
        return <section className="note-list">

            {notes.map(note => <NotePreview note={note} key={note.id} onDeleteNote={onDeleteNote} />)}

        </section>
    
}