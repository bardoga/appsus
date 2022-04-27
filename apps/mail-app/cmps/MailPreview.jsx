import { MailDetails } from "../cmps/MailDetails.jsx";
import { LongTxt } from "../cmps/LongTxt.jsx";
export class MailPreview extends React.Component {
  state = {
    isOpen: false,
    mailClass: "mail-mail-preview flex space-between",
  };

  ondeleteEmail = (event) => {
    const { mail } = this.props;
    event.cancelBubble = true;
    this.props.deleteEmail(mail.id);
  };
  render() {
    const { mail } = this.props;
    const mailClass =
      mail.type === "inbox" && mail.isRead
        ? "mail-mail-preview flex space-between read"
        : "mail-mail-preview flex space-between";
    return (
      <React.Fragment>
        <div
          className={mailClass}
          onClick={() => {
            this.setState({ isOpen: !this.state.isOpen }, () => {
              this.props.setReadState(mail.id, true);
            });
          }}
        >
          <div className="name">
            {mail.type === "inbox" ? mail.from : mail.to}
          </div>
          <div className="mail-subject">
            <LongTxt txt={mail.subject} chars={30} />
          </div>
          <div className="mail-message">
            <LongTxt txt={mail.message} chars={60} />
          </div>
          <button className="mail-preview-btn" onClick={this.ondeleteEmail}>
            <i className="fas fa-trash"></i>
          </button>
          <div className="mail-time">{mail.date}</div>
        </div>

        {this.state.isOpen && <MailDetails mail={mail} />}
      </React.Fragment>
    );
  }
}
