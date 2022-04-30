export class NoteFilter extends React.Component {
    state = {
        filterBy: {
            text: 'note-txt',
            img: '',
            vid: '',
            todo: '',

        }
    }


    inputRef = React.createRef()

    componentDidMount() {
        // console.log('Filter props', this.props)
        // console.log('input ref', this.inputRef)
        // this.inputRef.current.focus()
    }




    handleChange = ({ target }) => {
        console.log('target', target.value)
        const value = (target.type === 'text') ? target.value : target.value
        const field = target.name
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => {
        })
    }


    onFilter = (ev) => {
        ev.preventDefault()
        this.props.onSetFilter(this.state.filterBy)
    }

    render() {
        const { img, text, vid, todo } = this.state.filterBy
        return <section className="note-filter">
            <form className="keepForm" onSubmit={this.onFilter}>
                <label htmlFor="by-text"></label>
                <input type="text" id="by-text" placeholder="Search..." name="text" autoComplete="off"
                    value={text} onChange={this.handleChange} ref={this.inputRef} />
                <label htmlFor="notes">
                    <select name="notes" id="notes" onChange={this.handleChange}>
                        <option value={text}>Text</option>
                        <option value={img}>Image</option>
                        <option value={vid}>Video</option>
                        <option value={todo}>List</option>
                    </select>
                </label>
            </form>


        </section>
    }
}