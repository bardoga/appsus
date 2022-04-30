// export function NoteTodo({ note }) {
import { noteService } from "../services/note.service"
export class NoteTodo extends React.Component {

    state = {
        note: this.props.note,
        currentToDoItem: null,
        strikeThrough: []
    }




    handleClick = (ev) => {
        let value = ev.target
        // console.log(this.state.note.info.todos)
        // let textlist = this.state.note.info.todos
        // console.log(idx)
        value.classList.toggle('crossed-line')
        // this.setState({this.state.note.info.todos[idx]})
        
    }

    render() {
        const { note, currentToDoItem, strikeThrough } = this.props
        return <section className="note-todo">
            <h1>{note.info.label}</h1>
            <br />
            <ul className="note-todo clean-list">
                {note.info.todos.map((todo, idx) => {
                    return (
                        <li key={idx} onClick={
                            this.handleClick}>

                            {todo.txt}
                        </li>

                    )
                })}
            </ul>
        </section>
    }
}
