export class LongTxt extends React.Component {
    state = {
        isLongTxtShown: false
    }

    toggleIsLongTxtShown = () => {
        this.setState({ isLongTxtShown: !this.state.isLongTxtShown })
    }
    render() {
        const { txt,chars } = this.props;
        const { isLongTxtShown } = this.state;
        let txtShow;
        if (isLongTxtShown || !isLongTxtShown && txt.length < chars) {
            txtShow = txt;
        } else {
            txtShow = txt.substring(0, chars) + '...';
        }

        return (
            <div className="long-txt" >
                <p>{txtShow}</p>
            </div>
        )
    }
}