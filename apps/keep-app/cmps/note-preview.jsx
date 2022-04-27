import { utilService } from '../services/util.service.js'



function getColor(note) {
    // debugger
    let color = note.style
    console.log(note.backgroundColor)
    if (color) return color.backgroundColor
    // else {
    //     note.style['backgroundColor'] =  utilService.getRandomLightColor()
    //     return note.style.backgroundColor
    // }
}
    


function hasImage(note) {
    if (note.type === 'note-img') return note.info.url
    else return ''
}


function handleType(note) {
    let type = note.type
    if (type === 'note-txt')
        return note.info.txt
    else if (type === 'note.todos') {
        let todos = note.info.todos
        let listItems = todos.map((todo) =>
            <li>{todo}</li>)
        return (
            <ul>{listItems} i'm here</ul>
        )
    }
   

 }



export function NotePreview({ note }) {
    return <section className="note-preview" style={{ backgroundColor: getColor(note) }}>

        {/* <h1>{note.id}</h1> */}
        <h2>{handleType(note)}</h2>

        {/* <h1>{note.type}</h1>
        <div className="img-container" style={{ backgroundImage: `url(${hasImage(note)})`, Width: '100%', Height: '100%'}}></div> */}


    </section>
}