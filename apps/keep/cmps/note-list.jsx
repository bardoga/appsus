import {NotePreview} from './note-preview.jsx'




export function NoteList ({notes})  {

    
            console.log(notes)
        return <section className="note-list">

            {notes.map(note => <NotePreview note={note} key={note.id} />)}

        </section>
    
}