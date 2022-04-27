export class MailSideBar extends React.Component {


    render() {
        return (
            <section className="mail-side-bar flex column ">
                <button className="mail-compose-btn " onClick={() => this.props.toggleIsCompose()} >+ Compose</button>
                <ul>
                    <li className="mail-inbox-btn" onClick={() => this.props.setCurrentMailBox('inbox') }><a> Inbox({this.props.unReadCounter})</a></li>
                    <li className="mail-sent-btn" onClick={() => this.props.setCurrentMailBox('sent')}><a >Sent Mail </a></li>
                    <li><a className="mail-drafts-btn">Drafts </a></li>
                   
                </ul>

            </section>
        )
    }



}
