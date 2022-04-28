import { noteService, utilService } from "../services/note.service.js"
import { DynamicNote } from "./dynamicNotes.jsx"


export class NoteAdd extends React.Component {


    state = {

        noteType: 'note-txt'

    }






    componentDidMount() {
        // console.log('component mounted from note-add', this.props)
        this.setState({noteType:'note-txt'})
    }


    HandleChange({ target }) {
        // ev.preventDefault()
        const field = target.value
        console.log(field)
    }


    handleInputSubmit = (ev) => {
        if (ev.keyCode === 13) {
            noteService.createNote(ev.target.value, this.state.noteType)
            this.props.loadNotes()
            this.clearFields(ev.target)
        }
    }


    clearFields(target) {
        target.value = ''
    }

    render() {
        const { nodeType } = this.state
        console.log(nodeType)
        return <section className="note-add">
            {/* <form className="newnote">
                <input type="text" placeholder="Title" name="title" onSubmit={this.HandleChange} />
                <p>
                    <textarea name="text" id="text" rows="3" placeholder="type your note..." onChange={this.HandleChange}></textarea>
                </p>
            </form> */}
            <div className="create-note">
                <div className="note-input">
                    {<DynamicNote noteType={nodeType} handleInputSubmit={this.handleInputSubmit} />}
                </div>
            </div>

        </section>



    }


}