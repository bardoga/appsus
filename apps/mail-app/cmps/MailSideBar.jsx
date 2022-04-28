export class MailSideBar extends React.Component {
  render() {
    return (
      <div class="main__body">
        <section className="sidebar">
          <button
            className="sidebar__compose"
            onClick={() => this.props.toggleIsCompose()}
          >
            <span class="material-icons"> add </span> Compose
          </button>
          <div class="sidebarOption sidebarOption__active">
            <span class="material-icons"> inbox </span>
            <h3 onClick={() => this.props.setCurrentMailBox("inbox")}>
              Inbox({this.props.unReadCounter})
            </h3>
          </div>
          <div class="sidebarOption" >
          <span class="material-icons"> near_me </span>
          <h3 onClick={() => this.props.setCurrentMailBox("sent")}>Sent</h3>
        </div>
        <div class="sidebarOption">
          <span class="material-icons"> note </span>
          <h3>Drafts</h3>
        </div>
        </section>
      </div>
    );
  }
}
