import { noteService } from '../services/note.service.js'
import { utilService } from '../services/util.service.js'
import { DynamicNote } from './DynamicCmps/dynamicNote.jsx'

export class NotePreview extends React.Component {

    state = {
        note: this.props.note,
        isMouseOver: false
    }

    componentDidMount() {
        console.log('component mounted from preview...')
    }

    getColor(note) {
        let color = note.style
        if (color) return color.backgroundColor
    }

    deleteNoteHandler = () => {
        this.props.onDeleteNote(this.state.note.id)

    }

    handleColor = ({ target }, noteid = this.state.note.id) => {
        this.setState({
            note: {
                ...this.state.note,
                style: {
                    backgroundColor: target
                }
            }
        }, () => {
            noteService.updateColor(target.value, noteid)
                .then(() => {
                    this.props.loadNotes()
                })

        });
        this.setState({
            isMouseOver: false
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
            console.log(this.state.note)
            noteService.updateNote(this.state.note.id,
                this.state.note).then(() => {
                    this.props.loadNotes()
                })
        });
        this.setState({
            isMouseOver: false
        })
    }


    handleCopy = () => {
        console.log(this.state.note)
        noteService.copyNote(this.state.note)
        this.props.loadNotes()
        
    }

    render() {
        const { note, isMouseOver } = this.state
        return (
            <section onMouseEnter={this.HandleHover} onMouseLeave={this.HandleHover} className="note-preview" style={{ backgroundColor: this.getColor(this.state.note) }}>
                <DynamicNote note={note} />
                <section className={`edit area ${!isMouseOver && 'edit-off'}`}>
                    <div className="edit-area" >
                        <i className='material-icons' onClick={this.handlePin}>push_pin</i>
                        <input type="color" className='pick-color' onChange={this.handleColor} />
                        <span className="material-symbols-outlined" onClick={this.handleCopy}>
                            content_copy
                        </span>
                        <i className='material-icons trash' onClick={this.deleteNoteHandler}>delete</i>

                    </div>
                </section>
            </section>
        );
    }
}


