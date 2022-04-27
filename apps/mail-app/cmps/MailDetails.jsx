export function MailDetails({ mail }) {
    return (
        <div className="mail-mail-preview flex" >
            <div className="name">{mail.type === 'inbox' ? mail.from : mail.to}</div>
            <div className="mail-subject">{mail.subject}</div>
            <div className="mail-message">{mail.message}</div>
            <div className="mail-time">{mail.date}</div>
        </div>
    )
}
