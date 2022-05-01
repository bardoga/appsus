import { noteService } from '../services/note.service.js'
import { DynamicNote } from './dynamicCmps/DynamicNote.jsx'

export class NotePreview extends React.Component {
    mouseMoveRef = React.createRef()
    state = {
        note: this.props.note,
        isHovering: false
    }

    componentDidMount() {
        console.log('component mounted from preview...')
        window.addEventListener("mousemove", this.checkHover, true);
    }

    componentWillUnmount(){
        window.removeEventListener('mousemove', this.checkHover,true)
    }
    setHover = () => this.setState({ isHovering: true });
    setUnhover = () => this.setState({ isHovering: false });
    checkHover = e => {
        if (this.mouseMoveRef.current) {
          const { isHovering } = this.state;
          const mouseOver = this.mouseMoveRef.current.contains(e.target);
          if (!isHovering && mouseOver) {
            this.setHover();
          }
    
          if (isHovering && !mouseOver) {
            this.setUnhover();
          }
        }
      };
  

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
    }

    handlePin = (ev) => {
        ev.stopPropagation()
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
    }


    handleCopy = () => {
        console.log(this.state.note)
        noteService.copyNote(this.state.note)
        this.props.loadNotes()

    }

    render() {
        const { note, isHovering } = this.state
        return (
            <section ref={this.mouseMoveRef}  onMouseEnter={this.setHover} onMouseLeave={this.setUnhover} className="note-preview" style={{ backgroundColor: this.getColor(this.state.note) }}>
                <DynamicNote note={note} />
                <section className={`edit area ${!isHovering && 'edit-off'}`}>
                    <div className="edit-area" >
                        <i className='material-icons' onClick={this.handlePin}>push_pin</i>
                        <input type="color" className='pick-color' onChange={this.handleColor} />
                        <span className="material-icons" onClick={this.handleCopy}>
                            file_copy
                        </span>

                        <i className='material-icons trash' onClick={this.deleteNoteHandler}>delete</i>

                    </div>
                </section>
            </section>
        );
    }
}


