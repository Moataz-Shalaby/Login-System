
// ======================== Signup ========================

var signupNameInput = document.getElementById("signupNameInput");
var signupEmailInput = document.getElementById("signupEmailInput");
var signupPasswordInput = document.getElementById("signupPasswordInput");

var userList;

if (localStorage.getItem("users") == null) {
  userList = [];
} else {
  userList = JSON.parse(localStorage.getItem("users"));
}

function addUser() {
  validation();

  emailExist();

  if (
    (validationName() == true && validationEmail() == true) ||
    emailExist() == false
  ) {
    var userId = {
      name: signupNameInput.value,
      email: signupEmailInput.value,
      password: signupPasswordInput.value,
    };

    userList.push(userId);
    localStorage.setItem("users", JSON.stringify(userList));

    var successMsg = document.getElementById("successMsg");
    successMsg.classList.remove("d-none");
  } else {
    var faildMessage = document.getElementById("faildMessage");
    faildMessage.classList.remove("d-none");
  }

  signupNameInput.classList.remove("is-valid");
  signupEmailInput.classList.remove("is-valid");

  clearInput();
}

function emailExist() {
  for (var i = 0; i < userList.length; i++) {
    if (
      userList[i].email.toLowerCase() == signupEmailInput.value.toLowerCase()
    ) {
      existMessage.classList.remove("d-none");
      return true;
    } else {
      return false;
    }
  }
}

function clearInput() {
  signupNameInput.value = "";
  signupEmailInput.value = "";
  signupPasswordInput.value = "";
}

function validation() {
  if (
    signupNameInput.value.length == 0 ||
    signupEmailInput.value.length == 0 ||
    signupPasswordInput.value.length == 0
  ) {
    requiredMessage.classList.remove("d-none");
  } else {
    requiredMessage.classList.add("d-none");
  }
}

var nameMessage = document.getElementById("nameMessage");

function validationName() {
  var text = signupNameInput.value;
  var regexName = /^([A-Z]|[a-z]){3,10}$/;

  if (regexName.test(text)) {
    signupNameInput.classList.add("is-valid");
    signupNameInput.classList.remove("is-invalid");

    nameMessage.classList.add("d-none");

    return true;
  } else {
    signupNameInput.classList.add("is-invalid");
    signupNameInput.classList.remove("is-valid");

    nameMessage.classList.add("d-none");

    return false;
  }
}

var emailMessage = document.getElementById("emailMessage");

function validationEmail() {
  var text = signupEmailInput.value;
  var regexName = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (regexName.test(text)) {
    signupEmailInput.classList.add("is-valid");
    signupEmailInput.classList.remove("is-invalid");

    emailMessage.classList.add("d-none");

    return true;
  } else {
    signupEmailInput.classList.add("is-invalid");
    signupEmailInput.classList.remove("is-valid");

    emailMessage.classList.remove("d-none");

    return false;
  }
}


// ======================== Login ========================

var username = localStorage.getItem("sessionUsername");

function logIn() {
  var logInEmailInput = document.getElementById("logInEmailInput");
  var logInPasswordInput = document.getElementById("logInPasswordInput");
  var loginBtn = document.getElementById("loginBtn");

  if (logInEmailInput.value == "" || logInPasswordInput.value == "") {
    requiredMessage.classList.remove("d-none");
    return false;
  }

  for (var i = 0; i < userList.length; i++) {
    if (
      userList[i].email.toLowerCase() == logInEmailInput.value.toLowerCase() &&
      userList[i].password.toLowerCase() ==
        logInPasswordInput.value.toLowerCase()
    ) {
      localStorage.setItem("sessionUsername", userList[i].name);

      loginBtn.setAttribute("href", "home.html");
    } else {
      eMsg.classList.remove("d-none");
    }
  }
}

function displayUser() {
  document.getElementById("userName").innerHTML = "Welcome " + username;
}

function logout() {
  localStorage.removeItem("sessionUsername");
}


// ======================== Sticky-notes ========================

const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Sticky Note";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Are you sure you wish to delete this sticky note?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "",
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
