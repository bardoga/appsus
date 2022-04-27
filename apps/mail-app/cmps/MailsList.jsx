import { MailPreview } from "./MailPreview.jsx";
export function MailsList({ mails, setReadState, deleteEmail }) {
  return (
    <section className="mail-mails-container ">
      {mails.map((mail) => {
        return (
          <MailPreview
            mail={mail}
            key={mail.id}
            setReadState={setReadState}
            deleteEmail={deleteEmail}
          />
        );
      })}
    </section>
  );
}
