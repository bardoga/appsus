import { mailService } from "../services/mail-service.js";
import { MailsList } from "../cmps/MailsList.jsx";
import { ComposeMail } from "./compose-mail.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailSideBar } from "../cmps/MailSideBar.jsx";
import { msgModal } from "../../../cmps/msg-modal.jsx";

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
    console.log("here");
    const mails = this.state.mailsToShow.map((mail) => {
      if (mail.checked) {
        mail.trash = true;
      }
    });

    this.setState((prevState) => ({ ...prevState, mailsToShow: mails }));
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

  deleteEmail = (id) => {
    return mailService.deleteEmail(id).then(() => {
      this.showModal("Mail Deleted", 3000);
      return this.refreshMailBox();
    });
  };

  createEmail = (mail) => {
    return mailService.createEmail(mail).then(() => {
      this.showModal("Mail Sent", 3000);
      return this.refreshMailBox();
    });
  };

  render() {
    const { mailBox, isCompose } = this.state;
    if (mailBox.length === 0) return <div>Loading...</div>;

    const mails = this.filteredMailBox();
    mails.sort((a, b) => {
      return b.date - a.date;
    });

    this.state.mailsToShow = mails;

    return (
      <section className="mail-app flex">
        {this.state.modal.isShow && <msgModal msg={this.state.modal.msg} />}

        <MailSideBar
          setCurrentMailBox={this.setCurrentMailBox}
          currentMailBox={this.state.currentMailBox}
          toggleIsCompose={this.toggleIsCompose}
          unReadCounter={this.state.unReadCounter}
        />

        <section className="mail-main-container flex column">
          <MailFilter setFilter={this.setFilter} />

          <MailsList
            moveToTrash={this.moveToTrash}
            checkAll={this.checkAll}
            mails={this.state.mailsToShow}
            setReadState={this.setReadState}
            deleteEmail={this.deleteEmail}
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
