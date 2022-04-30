export function DynamicNote({ noteType, handleInputSubmit, isExpanded,handleSubmit }) {
    // console.log(noteType)

    if (noteType === 'note-txt') {
        return (<p>

            <textarea name="text" id="text" rows={isExpanded ? 5 : 1} placeholder="Take a note..."  onKeyDown={handleInputSubmit}></textarea>
        </p>
        )
    }
    else if (noteType === 'note-todo') {
        return (
            <section className="note-todo">
                <textarea name="list" id="list" rows={isExpanded ? 5 : 1} placeholder="Enter List items seperated by a comma" onKeyDown={handleInputSubmit}></textarea>
            </section>

        )
    }

    else if (noteType === 'note-img') {
        return (
            <section className="note-img">
                <textarea name="img" id="img" rows={isExpanded ? 1 : 1} placeholder="Enter image url" onKeyDown={handleInputSubmit}></textarea>
            </section>
        )
    }

    else if (noteType === 'note-vid') {
        return (
            <section className="note-vid">
                <textarea name="vid" id="vid" rows={isExpanded ? 1 : 1} placeholder='Enter video url' onKeyDown={handleInputSubmit}></textarea>
            </section>
        )
    }
}
