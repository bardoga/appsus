import { noteService } from '../services/note.service.js'

import { NoteList } from "../cmps/note-list.jsx"
// import { NoteFilter } from '../cmps/note-filter.jsx'
import { NoteAdd } from '../cmps/note-add.jsx'


const { Link } = ReactRouterDOM


export class NoteApp extends React.Component {

    state = {
        notes: [],
        filterBy: null,
    }
    componentDidMount() {
        this.loadNotes()
    }

    loadNotes = () => {
        noteService.query()
            .then((notes) => {
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
        console.log(noteId)
        noteService.deleteNote(noteId)
        this.loadNotes()
    }


    getPinnedNotes = () => {
        if (!this.state.notes) return;
        let pinnedNotes = this.state.notes.filter(note => {
            return note.isPinned;
        })
        return pinnedNotes
    }

    getUnPinnedNotes = () => {
        if (!this.state.notes) return;
        let UnPinnedNotes = this.state.notes.filter(note => {
            return !note.isPinned;
        })
        return UnPinnedNotes
    }


    // get notesToDisplay() {
    //     const { notes } = this.state
    //     const urlSrcPrm = new URLSearchParams(this.props.location.search)
    //     const ntg = urlSrcPrm.get('ntg')
    //     if (!ntg) return notes
    //     return notes.filter(note => (note.ntg === ntg))
    // }

    render() {
        const { notes } = this.state;
        const pinnedNotes = this.getPinnedNotes()
        const UnpinnedNotes = this.getUnPinnedNotes()
        return <section className="note-index">
            {/* <NoteFilter onSetFilter={this.onSetFilter} history={this.props.history} /> */}
            <NoteAdd loadNotes={this.loadNotes} />
            <NoteList notes={pinnedNotes} onDeleteNote={this.onDeleteNote} loadNotes={this.loadNotes} />
            <NoteList notes={UnpinnedNotes} onDeleteNote={this.onDeleteNote} loadNotes={this.loadNotes} />

        </section>
    }
}

