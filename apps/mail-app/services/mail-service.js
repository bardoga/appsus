import { utilService } from "../../../services/util-service.js";
export const mailService = {
  loadIEmail,
  countEmail,
  createEmail,
  updateEmail,
  deleteEmail,
};

function createEmail(newEmail) {
  const email = newEmail;
  email.type = "sent";
  email.date = new Date().toLocaleDateString();
  const id = utilService.makeId();
  email.id = id;
  mailList.push(email);
  return Promise.resolve(id);
}

function deleteEmail(id) {
  const emailIdx = mailList.findIndex((email) => {
    return email.id === id;
  });
  mailList.splice(emailIdx, 1);
  return Promise.resolve();
}

function loadIEmail(type) {
  if (type !== "trash")
    return Promise.resolve(
      mailList.filter((email) => email.type === type && !email.trash)
    );

  return Promise.resolve(mailList.filter((email) => email.trash));
}

function updateEmail(id, updateEmail) {
  const emailIdx = mailList.findIndex((email) => {
    return email.id === id;
  });
  mailList[emailIdx] = updateEmail;
  return Promise.resolve(mailList[emailIdx]);
}

function countEmail() {
  const counter = mailList.filter((mail) => {
    return mail.type === "inbox" && !mail.isRead;
  });
  return Promise.resolve(counter.length);
}

const mailList = [
  {
    from: "YonatanSH",
    subject: "Lorem ipsum dolor sit amet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: new Date().toLocaleDateString(),
    isRead: false,
    id: utilService.makeId(),
    type: "inbox",
  },
  {
    from: "NataliAV",
    subject: "Lorem ipsum dolor sit amet",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: new Date().toLocaleDateString(),
    isRead: false,
    id: utilService.makeId(),
    type: "inbox",
  },
  {
    to: "NataliAV",
    subject: "SENT",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: new Date().toLocaleDateString(),
    id: utilService.makeId(),
    type: "sent",
  },
  {
    to: "YonatanSH",
    subject: "SENT TO",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: new Date().toLocaleDateString(),
    id: utilService.makeId(),
    type: "sent",
  },
  {
    to: "YonatanSH",
    subject: "SENT TO",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    date: new Date().toLocaleDateString(),
    id: utilService.makeId(),
    type: "sent",
    trash: true,
  },
];
