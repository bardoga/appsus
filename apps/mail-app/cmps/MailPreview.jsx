import { MailDetails } from "../cmps/MailDetails.jsx";
import { MailContent } from "../cmps/MailContent.jsx";
import { utilService } from "../../../services/util-service.js";

export class MailPreview extends React.Component {
  state = {
    isOpen: false,
    mailClass: "mail-mail-preview flex space-between",
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  checkMail = () => {
    const { mail } = this.props;
    this.props.checkMail(mail.id);
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
          <div className="emailRow">
            <div className="emailRow__options">
              <input
                type="checkbox"
                checked={mail.checked}
                onChange={this.checkMail}
              />
              <span className="material-icons"> star_border </span>
              <span className="material-icons"> label_important </span>
            </div>
            <h3 className="emailRow__title">
              {mail.type === "inbox" ? mail.from : mail.to}
            </h3>
            <div className="emailRow__message">
              <h4>
                {utilService.formatTxt(mail.subject, 30)}
                <span className="emailRow__description">
                  {" "}
                  - {utilService.formatTxt(mail.message, 60)}
                </span>
              </h4>
            </div>

            <p className="emailRow__time">{mail.date}</p>
            {this.state.isOpen && (
              <MailContent mail={mail} closeModal={this.closeModal} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
