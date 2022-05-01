import { NoteText } from "../note-text.jsx"
import { NoteImg } from "../note-img.jsx"
import { NoteTodo } from "../note-todo.jsx"
import { NoteVid } from "../note-vid.jsx"

export function DynamicNote({ note }) {
    // console.log(note.type)
    switch (note.type) {
        case 'note-txt':
            return <NoteText note={note} />
        case 'note-img':
            return <NoteImg note={note} />
        case 'note-todo':
            return <NoteTodo note={note} />
        case 'note-vid':
            return <NoteVid note={note} />
    }
}