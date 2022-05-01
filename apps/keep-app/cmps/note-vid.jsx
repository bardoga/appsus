export function NoteVid({ note }) {
    return <section className="note-vid">
        <iframe width="267" height="150" src={note.info.url} frameBorder="0"
            allowFullScreen
            title="Embedded youtube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
    </section>
} 