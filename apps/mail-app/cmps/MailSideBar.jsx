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
          <div
            class={
              this.props.currentMailBox === "inbox"
                ? "sidebarOption sidebarOption__active"
                : "sidebarOption"
            }
          >
            <span class="material-icons"> inbox </span>
            <h3 onClick={() => this.props.setCurrentMailBox("inbox")}>
              Inbox({this.props.unReadCounter})
            </h3>
          </div>
          <div
            class={
              this.props.currentMailBox === "sent"
                ? "sidebarOption sidebarOption__active"
                : "sidebarOption"
            }
          >
            <span class="material-icons"> near_me </span>
            <h3 onClick={() => this.props.setCurrentMailBox("sent")}>Sent</h3>
          </div>
          <div
            class={
              this.props.currentMailBox === "trash"
                ? "sidebarOption sidebarOption__active"
                : "sidebarOption"
            }
          >
            <span class="material-icons"> deleted </span>
            <h3 onClick={() => this.props.setCurrentMailBox("trash")}>Trash</h3>
          </div>
        </section>
      </div>
    );
  }
}
