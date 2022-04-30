export class MailContent extends React.Component {
  render() {
    const { mail } = this.props;

    return (
      <section className="compose-page flex">
        <button onClick={() => this.props.closeModal()}>X</button>
        <form className="compose-form flex column">
          {/* <div className="compose-header">{mail.subject}</div> */}
          {mail.type === "inbox" ? "From" : "To"}
          <input
            type="email"
            value={mail.type === "inbox" ? mail.from : mail.to}
          />
          Subject: <input type="text" value={mail.subject} />
          Message: <textarea rows="20" value={mail.message}></textarea>
        </form>
      </section>
    );
  }
}
