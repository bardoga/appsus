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
        // console.log(field)
    }


    handleInputSubmit = (ev) => {
        if (ev.target.value.length === '') return
        if (ev.target.value.length < 1) return
        if (ev.keyCode === 13) {
            ev.preventDefault()
            noteService.createNote(ev.target.value, this.state.noteType)
            // console.log(ev)
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
        this.setState({ setExpanded: true, isExpanded: true })

    }

    handleType = (event) => {
        const type = event.target.value
        this.setState({ noteType: type })
    }

    setText = () => {
        this.setState({ noteType: 'note-txt' })
    }
    setImg = () => {
        this.setState({ noteType: 'note-img' })
    }
    setList = () => {
        this.setState({ noteType: 'note-todo' })
    }
    setVid = () => {
        this.setState({ noteType: 'note-vid' })
    }
    render() {
        const { noteType } = this.state
        return <section className="note-add">
            <div className="create-note">
                <div className="types-selector">
                    <span className="material-symbols-outlined puki" onClick={this.setText}>   {/* BAD WAY - FIND A BETTER WAY TO GET SPANS VALUE */}
                        text_fields
                    </span>
                    <span className="material-symbols-outlined puki" onClick={this.setImg}>
                        image
                    </span>
                    <span className="material-symbols-outlined puki" onClick={this.setList}>
                        list
                    </span>
                    <span className="material-symbols-outlined puki" onClick={this.setVid}>
                        youtube_tv
                    </span>
                </div>
                <div className="note-input" onClick={this.handleExpanded}>
                    {<DynamicNote noteType={noteType} handleInputSubmit={this.handleInputSubmit} isExpanded={this.state.isExpanded} handleSubmit={this.handleSubmit} />}
                </div>
            </div>
        </section>
    }
}