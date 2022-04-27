import { noteService } from '../services/note.service.js'


import { NoteList } from "../cmps/note-list.jsx"
import { NoteFilter } from '../cmps/note-filter.jsx'







const { Link } = ReactRouterDOM





export class NoteApp extends React.Component {

    state = {
        notes: [],
        filterBy:null,
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

    onSetFilter = (filterBy) => {
        this.setState({filterBy},this.loadNotes)
        const urlSrcPrm = new URLSearchParams(filterBy)
        const searchStr = urlSrcPrm.toString()
        this.props.history.push(`/keep?${searchStr}`)


    }



    get notesToDisplay(){
        const { notes} = this.state
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
            <NoteFilter onSetFilter={this.onSetFilter} history={this.props.history}/>
            <NoteList notes = {this.notesToDisplay} />

        </section>
    }
}

