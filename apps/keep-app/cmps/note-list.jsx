import {NotePreview} from './note-preview.jsx'




export function NoteList ({notes,onDeleteNote,loadNotes})  {

        return <section className="note-list">

            {notes.map(note => <NotePreview note={note} key={note.id} onDeleteNote={onDeleteNote} loadNotes={loadNotes} />)}

        </section>
    
}