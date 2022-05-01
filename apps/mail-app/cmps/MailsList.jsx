import { MailPreview } from "./MailPreview.jsx";

export function MailsList({
  mails,
  setReadState,
  checkMail,
  checkAll,
  moveToTrash,
  removeFromTrash,
  currentMailBox,
}) {
  const trashBtn =
    currentMailBox !== "trash" ? (
      <button onClick={moveToTrash}>
        <span className="material-icons"> delete </span>
      </button>
    ) : (
      <button onClick={removeFromTrash}>
        <span className="material-icons"> undo </span>
      </button>
    );

  return (
    <div className="emailList">
      <div className="emailList__settings">
        <div className="emailList__settingsLeft">
          <input type="checkbox" id="checkAll" onChange={checkAll} />
          {trashBtn}
        </div>
        <div className="emailList__settingsRight">
          <span className="material-icons"> chevron_left </span>
          <span className="material-icons"> chevron_right </span>
          <span className="material-icons"> keyboard_hide </span>
          <span className="material-icons"> settings </span>
        </div>
      </div>
      <div className="emailList__sections">
        <div className="section section__selected">
          <span className="material-icons"> inbox </span>
          <h4>Primary</h4>
        </div>
      </div>
      <section>
        {mails.map((mail) => {
          return (
            <MailPreview
              mail={mail}
              key={mail.id}
              setReadState={setReadState}
              checkMail={checkMail}
            />
          );
        })}
      </section>
    </div>
  );
}
