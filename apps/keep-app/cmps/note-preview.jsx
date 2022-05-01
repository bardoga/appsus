import { noteService } from '../services/note.service.js'
import { utilService } from '../services/util.service.js'
import { DynamicNote } from './DynamicCmps/dynamicNote.jsx'

export class NotePreview extends React.Component {

    state = {
        note: this.props.note,
        isMouseOver: false
    }

    componentDidMount() {
    }



    getColor(note) {
        let color = note.style
        if (color) return color.backgroundColor
    }

    deleteNoteHandler = () => {
        this.props.onDeleteNote(this.state.note.id)

    }



    handleColor = ({ target }, id = this.state.note.id) => {
        console.log('color changing to...', target.value)
        console.log('note - id', id)
        noteService.updateColor(target.value, id)
            .then(() => {
                this.props.loadNotes()
            })
    }


    HandleHover = () => {
        this.setState({
            isMouseOver: !this.state.isMouseOver
        })

    }

    handlePin = () => {
        this.setState({
            note: {
                ...this.state.note,
                isPinned: !this.state.note.isPinned
            }
        }, () => {
            noteService.update(this.state.note.id,
                this.state.note)
        });
        this.props.loadNotes();

    }

    render() {
        const { note, isMouseOver } = this.state
        return (
            <section onMouseEnter={this.HandleHover} onMouseLeave={this.HandleHover} className="note-preview" style={{ backgroundColor: this.getColor(this.state.note) }}>
                {<DynamicNote note={note} />}
                <section className={`edit area ${!isMouseOver && 'edit-off'}`}>
                    <div className="edit-area" >
                        <i className='material-icons' onClick={this.handlePin}>push_pin</i>
                        {/* <i className='material-icons'>palette</i> */}
                        <input type="color" className='pick-color' onChange={this.handleColor} />
                        <i className='material-icons trash' onClick={this.deleteNoteHandler}>delete</i>

                    </div>
                </section>
            </section>
        );
    }
}


