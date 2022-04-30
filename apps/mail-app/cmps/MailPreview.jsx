import { MailDetails } from "../cmps/MailDetails.jsx";
import { MailContent } from "../cmps/MailContent.jsx";
import { utilService } from "../../../services/util-service.js";

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

  closeModal = () => {
    this.setState({ isOpen: false });
  };
  checkMail = (state) => {};

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
          <div class="emailRow">
            <div class="emailRow__options">
              <input
                type="checkbox"
                checked={mail.checked}
                onChange={this.checkMail(this.value)}
              />
              <span class="material-icons"> star_border </span>
              <span class="material-icons"> label_important </span>
            </div>
            <h3 class="emailRow__title">
              {mail.type === "inbox" ? mail.from : mail.to}
            </h3>
            <div class="emailRow__message">
              <h4>
                {utilService.formatTxt(mail.subject, 30)}
                <span class="emailRow__description">
                  {" "}
                  - {utilService.formatTxt(mail.message, 60)}
                </span>
              </h4>
            </div>
            {/* <button className="mail-preview-btn" onClick={this.ondeleteEmail}>
              <i className="fas fa-trash"></i>
            </button> */}
            <p class="emailRow__time">{mail.date}</p>
            {this.state.isOpen && (
              <MailContent mail={mail} closeModal={this.closeModal} />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
