import { noteService, utilService } from "../services/note.service.js"
import { DynamicNote } from "./dynamicNotes.jsx"


export class NoteAdd extends React.Component {


    state = {

        noteType: 'note-txt',
        isExpanded: false,
        setExpanded: false


    }

    componentDidMount() {
        this.setState({ noteType: 'note-txt' })
    }


    HandleChange({ target }) {
        const field = target.value
        console.log(field)
    }


    handleInputSubmit = (ev) => {
        if (ev.target.value.length === '') return
        if (ev.target.value.length < 1) return
        if (ev.keyCode === 13) {
            ev.preventDefault()
            noteService.createNote(ev.target.value, this.state.noteType)
            console.log(ev)
            this.props.loadNotes()
            this.clearFields(ev)
            this.setState({ setExpanded: false, isExpanded: false })
        }

    }


    clearFields({ target }) {
        console.log(target)
        target.value = ''
    }

    handleExpanded = () => {
        console.log(this.state)
        this.setState({ setExpanded: true, isExpanded: true })

    }

    handleType = (event) => {
        const type = event.target.value
        this.setState({ noteType: type })
        console.log(this.state.noteType)
    }

    render() {
        const { noteType } = this.state
        return <section className="note-add">
            {/* <button className="submit" onClick={this.handleSubmit}>
                <i className="material-icons">save</i>
            </button> */}
            <div className="create-note">
                <select className="type-selector" name="notes-type" id="notes-type" onChange={this.handleType}>
                    <option value="note-txt">Text</option>
                    <option value="note-img">Image</option>
                    <option value="note-vid">Video</option>
                    <option value="note-todo">List</option>
                </select>
                <div className="note-input" onClick={this.handleExpanded}>
                    {<DynamicNote noteType={noteType} handleInputSubmit={this.handleInputSubmit} isExpanded={this.state.isExpanded} handleSubmit={this.handleSubmit} />}
                </div>
            </div>

        </section>



    }


}