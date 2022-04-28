import { MailPreview } from "./MailPreview.jsx";
export function MailsList({ mails, setReadState, deleteEmail }) {
  return (
    <div class="emailList">
      <div class="emailList__settings">
        <div class="emailList__settingsLeft">
          <input type="checkbox" />
          <span class="material-icons"> arrow_drop_down </span>
          <span class="material-icons"> redo </span>
          <span class="material-icons"> more_vert </span>
        </div>
        <div class="emailList__settingsRight">
          <span class="material-icons"> chevron_left </span>
          <span class="material-icons"> chevron_right </span>
          <span class="material-icons"> keyboard_hide </span>
          <span class="material-icons"> settings </span>
        </div>
      </div>
      <div class="emailList__sections">
        <div class="section section__selected">
          <span class="material-icons"> inbox </span>
          <h4>Primary</h4>
        </div>

        <div class="section">
          <span class="material-icons"> people </span>
          <h4>Social</h4>
        </div>

        <div class="section">
          <span class="material-icons"> local_offer </span>
          <h4>Promotions</h4>
        </div>
      </div>
      <section>
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
    </div>
  );
}
