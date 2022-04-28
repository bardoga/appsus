import { utilService } from '../services/util.service.js'

export class NotePreview extends React.Component {

    state = {
        note: this.props.note
    }

    componentDidMount() {
        console.log('props from note preview', this.props)
    }


    // console.log('props from preview',this.props)

    getColor(note) {
        let color = note.style
        // console.log(note.backgroundColor)
        if (color) return color.backgroundColor
        // else {
        //     note.style['backgroundColor'] =  utilService.getRandomLightColor()
        //     return note.style.backgroundColor
        // }
    }



    hasImage = (note) => {
        if(note.type === 'note-img') return note.info.url
        else return ''
    }


    handleType = (note) => {
        // console.log(note)
        let type = note.type
        if (type === 'note-txt')
            return note.info.txt
        // else if (type === 'note.todos') {
        //     let todos = note.info.todos
        //     let listItems = todos.map((todo) =>
        //         <li>{todo}</li>)
        //     return (
        //         <ul>{listItems} i'm here</ul>
        //     )
    }



    deleteNoteHandler = () => {
         this.props.onDeleteNote(this.state.note.id)
        // console.log('note clicked ', id)

    }


    render() {
        return (<section className="note-preview" style={{ backgroundColor: this.getColor(this.state) }}>
            {/* <h1>{note.id}</h1> */}
            <h2>{this.handleType(this.state.note)}</h2>
            {/* <h1>{note.type}</h1>
        <div className="img-container" style={{ backgroundImage: `url(${hasImage(note)})`, Width: '100%', Height: '100%'}}></div> */}
            <div className="edit-area">
                <input type="color" className='pick-color'/>
                <button onClick={this.deleteNoteHandler} className='trash'>X</button>

            </div>
        </section>
        )
    }
}


