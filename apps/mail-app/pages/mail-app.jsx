import { mailService } from "../services/mail-service.js";
import { MailsList } from "../cmps/MailsList.jsx";
import { ComposeMail } from "./compose-mail.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailSideBar } from "../cmps/MailSideBar.jsx";
import { MsgModal } from "../../../cmps/MsgModal.jsx";

export class MailApp extends React.Component {
  state = {
    mailBox: [],
    search: null,
    isCompose: false,
    unReadCounter: 0,
    currentMailBox: "inbox",
    modal: { isShow: false, msg: null },
    mailsToShow: [],
  };

  showModal = (msg = "Complete", time = 3000) => {
    this.setState({ modal: { isShow: true, msg } });
    setTimeout(() => {
      this.setState({ modal: { isShow: false, msg: null } });
    }, time);
  };

  componentDidMount() {
    this.refreshMailBox();
  }

  checkAll = () => {
    const mails = this.state.mailsToShow.map(
      (mail) => (mail.checked = !mail.checked)
    );

    this.setState((prevState) => ({ ...prevState, mailsToShow: mails }));
  };

  moveToTrash = () => {
    const mails = this.state.mailsToShow.map((mail) => {
      if (mail.checked) {
        mail.trash = true;
        mail.checked = false;
      }
      return mail;
    });

    this.setState((prevState) => ({ ...prevState, mailsToShow: mails }));
    this.refreshMailBox();
  };

  removeFromTrash = () => {
    const mails = this.state.mailsToShow.map((mail) => {
      if (mail.checked) {
        mail.trash = false;
        mail.checked = false;
      }
      return mail;
    });

    this.setState((prevState) => ({ ...prevState, mailsToShow: mails }));
    this.refreshMailBox();
  };

  refreshMailBox = () => {
    const { currentMailBox } = this.state;
    return Promise.all([
      mailService.loadIEmail(currentMailBox),
      mailService.countEmail(),
    ]).then(([items, unReadCounter]) => {
      this.setState({ mailBox: items, unReadCounter });
    });
  };

  mailsCounter = () => {
    return this.state.unReadCounter;
  };

  setCurrentMailBox = (type) => {
    this.setState({ currentMailBox: type }, () => {
      this.refreshMailBox();
    });
  };
  setFilter = (search) => {
    this.setState({ search });
  };

  filteredMailBox = () => {
    const { search, mailBox } = this.state;
    if (!search) return mailBox;
    const filteredList = mailBox.filter((item) => {
      return (
        item.subject.includes(search) ||
        item.message.includes(search) ||
        (item.from && item.from.includes(search)) ||
        (item.to && item.to.includes(search))
      );
    });
    return filteredList;
  };

  setReadState = (id, readState) => {
    const mailBox = this.state.mailBox;
    const idx = mailBox.findIndex((item) => item.id === id);
    if (idx > -1) {
      mailBox[idx].isRead = readState;
      return mailService.updateEmail(id, mailBox[idx]).then(() => {
        this.refreshMailBox();
      });
    }
  };

  toggleIsCompose = () => {
    this.setState({ isCompose: !this.state.isCompose });
  };

  checkMail = (id) => {
    const mails = this.state.mailsToShow.map((mail) => {
      if (mail.id === id) {
        mail.checked = !mail.checked;
      }
      return mail;
    });

    this.setState((prevState) => ({ ...prevState, mailsToShow: mails }));
  };

  createEmail = (mail) => {
    return mailService.createEmail(mail).then(() => {
      this.showModal("Mail Sent", 3000);
      return this.refreshMailBox();
    });
  };

  render() {
    const { mailBox, isCompose } = this.state;

    const mails = this.filteredMailBox();
    mails.sort((a, b) => {
      return b.date - a.date;
    });

    this.state.mailsToShow = mails;

    return (
      <section className="mail-app flex">
        {this.state.modal.isShow && <MsgModal msg={this.state.modal.msg} />}

        <MailSideBar
          setCurrentMailBox={this.setCurrentMailBox}
          currentMailBox={this.state.currentMailBox}
          toggleIsCompose={this.toggleIsCompose}
          unReadCounter={this.state.unReadCounter}
        />

        <section className="mail-main-container flex column">
          <MailFilter setFilter={this.setFilter} />

          <MailsList
            removeFromTrash={this.removeFromTrash}
            moveToTrash={this.moveToTrash}
            checkAll={this.checkAll}
            mails={this.state.mailsToShow}
            setReadState={this.setReadState}
            checkMail={this.checkMail}
            currentMailBox={this.state.currentMailBox}
          />
          {isCompose && (
            <ComposeMail
              toggleIsCompose={this.toggleIsCompose}
              createEmail={this.createEmail}
            />
          )}
        </section>
      </section>
    );
  }
}
