export function NoteTodo({note}){
    console.log(note)
    return <section className="note-todo">
        <h1>{note.info.label}</h1>
        <br />
        <ul className="note-todo clean-list">
            {note.info.todos.map((todo,idx) =>{
                return (
                    <li key={idx} >
                        {todo.txt}
                    </li>
                )
            })}
        </ul>
    </section>
}