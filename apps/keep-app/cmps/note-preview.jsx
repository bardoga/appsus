import { noteService } from '../services/note.service.js'
import { utilService } from '../services/util.service.js'
import { DynamicNote } from './DynamicCmps/dynamicNote.jsx'

export class NotePreview extends React.Component {

    state = {
        note: this.props.note
    }

    componentDidMount() {
        console.log(this.props)
        // console.log('props from note preview', this.props)
    }



    getColor(note) {
        let color = note.style
        if (color) return color.backgroundColor
    }



    hasImage = (note) => {
        if (note.type === 'note-img') return note.info.url
        else return ''
    }


    deleteNoteHandler = () => {
        this.props.onDeleteNote(this.state.note.id)
        // this.setState({ note: this.state.note })

    }



    handleColor = ({ target }, id = this.state.note.id) => {
        console.log('color changing to...', target.value)
        console.log('note - id', id)
        noteService.updateColor(target.value, id)
            .then(() => {
                this.props.loadNotes()
            })
    }


    // handlePin = ({this.state.note})

    render() {
        const { note } = this.state
        return (
            <section className="note-preview" style={{ backgroundColor: this.getColor(this.state.note) }}>
                {<DynamicNote note={note} />}


                <div className="edit-area">
                    {/* <i className='material-symbols-rounded'>pin_drop</i>
                     */}
                    <i className='material-icons' onClick={this.handlePin}>push_pin</i>

                    <input type="color" className='pick-color' onChange={this.handleColor} />
                    {/* <input type="color" className='pick-color' onChange={this.handleColor} /> */}
                    {/* <button onClick={this.deleteNoteHandler} className='trash'> */}
                    <i className='material-icons trash' onClick={this.deleteNoteHandler}>delete</i>
                    {/* </button> */}

                </div>
            </section>
        );
    }
}


