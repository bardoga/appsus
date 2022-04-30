export function NoteText({ note }) {

    function isValidURL(string) {
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return (res !== null)
    }
    const res = isValidURL(note.info.txt)

    // console.log(note)
    if (res === true) {
        return (
            <a href={note.info.txt} target="_blank">{note.info.txt}</a>
        )
    }
    else {
        return (
            <h1> {note.info.txt}</h1 >
        )
    }
}