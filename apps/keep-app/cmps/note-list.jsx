import { NotePreview } from './note-preview.jsx'




export function NoteList({ notes, onDeleteNote, loadNotes }) {
    if (notes.length === 0) return null
    let isPinned = notes[0].isPinned
    return <section className="note-list-container">
        <h1>{isPinned && 'Your pinned notes' || !isPinned && 'Unpinned notes'}</h1>
        <br />
        <div className="note-list">
            {notes.map(note => <NotePreview note={note} key={note.id} onDeleteNote={onDeleteNote} loadNotes={loadNotes} />)}
        </div>

    </section>

}