import { utilService } from '../services/util.service.js'



function getColor(note){
    if (note.hasOwnProperty('style')) return note.style.backgroundColor
    else return ''

}

function hasImage(note){
    if (note.type === 'note-img') return note.info.url
    else return ''
}


// function handleType(note){
    
// }



export function NotePreview({ note }) {
    return <section className="note-preview" style={{ backgroundColor: getColor(note) }}>

        <h1>{note.id}</h1>
        <h1>{note.type}</h1>
        <div className="img-container" style={{ backgroundImage: `url(${hasImage(note)})`, Width: '100%', Height: '100%'}}></div>


    </section>
}