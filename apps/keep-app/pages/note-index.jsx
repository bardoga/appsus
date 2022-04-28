import { noteService } from '../services/note.service.js'


import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'


const { Link } = ReactRouterDOM


export class NoteApp extends React.Component {

    state = {
        notes: [],
        filterBy: null,
    }
    componentDidMount() {
        // console.log('Props from notesApp', notes)
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query(this.state.notes)
            .then(notes => {
                this.setState({ notes })
            })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes)
        const urlSrcPrm = new URLSearchParams(filterBy)
        const searchStr = urlSrcPrm.toString()
        this.props.history.push(`/keep?${searchStr}`)


    }

    onDeleteNote = (noteId) => {
        // console.log(noteId)
    this.setState({notes:this.state.notes.filter(note => note.id !== noteId)} )
        noteService.update(noteId)
        this.loadNotes()




    }



    get notesToDisplay() {
        const { notes } = this.state
        const urlSrcPrm = new URLSearchParams(this.props.location.search)
        const ntg = urlSrcPrm.get('ntg')
        if (!ntg) return notes
        return notes.filter(note => (note.ntg === ntg))
    }

    render() {
        const notes = this.state.notes
        // console.log(notes)
        return <section className="note-index">
            {/* <h2>Notes App</h2> */}
            <NoteFilter onSetFilter={this.onSetFilter} history={this.props.history} />
            <NoteAdd loadNotes={this.loadNotes} />
            <NoteList notes={this.notesToDisplay} onDeleteNote={this.onDeleteNote} />

        </section>
    }
}

