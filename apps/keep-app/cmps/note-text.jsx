export function NoteText({ note }) {

    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    }
    const res = isValidURL(note.info.txt)

    if (res === true) {
        return (
            <h1 className="note-txt-link">
                <a href={note.info.txt} target="_blank" > { note.info.txt }</a >
            </h1>
            // <a href={note.info.txt} target="_blank" className="note-txt-link"> { note.info.txt }</a >
        )
}
    else {
    return (
        <section className="note-txt">
            <h1> {note.info.txt}</h1 >
        </section>
        // <h1> {note.info.txt}</h1 >
    )
}
}