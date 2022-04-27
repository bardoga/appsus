import { noteService } from '../services/note.service.js'


import { NoteList } from "../cmps/note-list.jsx"







const { Link } = ReactRouterDOM





export class NoteApp extends React.Component {

    state = {
        notes: []
    }
    componentDidMount() {
        // console.log('Props from notesApp', this.state.notes)
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query(this.state.notes)
            .then(notes => {
                this.setState({ notes })
            })
    }


    render() {
        const notes = this.state.notes
        // console.log(notes)
        return <section className="note-index">
            <h2>Notes App</h2>
            <NoteList notes = {notes} />

        </section>
    }
}

