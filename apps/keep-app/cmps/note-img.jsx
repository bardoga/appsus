export function NoteImg({note}){
    return (
        <section className="note-img">
        <img src={note.info.url}/>
        <br />
        <h1>{note.info.title}</h1>
        </section>
    )
}

// width={230} height={240}