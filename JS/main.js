let submit_btn = document.getElementById("submit-btn");
let notes_main = document.getElementById("notes-main");
let no_notes = document.getElementById("no-notes");
viewNotes();
let getNotes = () => {
  let noteInput = document.getElementById("user-input");
  let allNotes = localStorage.getItem("data");
  if (allNotes == null) {
    notes = [];
  } else {
    notes = JSON.parse(allNotes);
  }
  //if the note input is an empty string
  if (noteInput.value == "") {
    noteInput.placeholder = "The Note Cannot Be Empty!";

  } 
  //if the note input is an string with length greater than 300
  else if (noteInput.value.length > 300) {
    alert("Please Make The Note Shorter.. (280 letters)");
  } else {
    notes.push(noteInput.value);
    localStorage.setItem("data", JSON.stringify(notes));
    noteInput.value = "";
    noteInput.placeholder = "";
  }

  viewNotes();
};
//Show The Notes If Available
function viewNotes() {
  let allNotes = localStorage.getItem("data");
  if (allNotes == null) {
    notes = [];
  } else {
    notes = JSON.parse(allNotes);
  }

  let notesDes = " ";
  //adding the notes dynamically to html document
  notes.forEach(function (content, index) {
    notesDes += `
    <div class="notes-main" >
    <div>
     <h3> Note ${index + 1} </h3>
    </div>
    <div class="main-con">
  <p>${content}</p>
  </div>
    <div class="rm-btn">
    <button id="${index}" onclick="remove(this.id)">Remove<img src="./Images/remove.svg"></button>
    </div>
  </div> 
    `;
  });
//Replacing The Divs
  if (notes.length != 0) {
    notes_main.innerHTML = notesDes;
    no_notes.style.display = "none";
  }
}
//Remove notes functions
function remove(id) {
  let allNotes = localStorage.getItem("data");
  if (allNotes == null) {
    notes = [];
  } else {
    notes = JSON.parse(allNotes);
  }
//splice/remove the clicked item
  notes.splice(id, 1);
  localStorage.setItem("data", JSON.stringify(notes));
  viewNotes();
  //Reload if no notes found
  if (notes.length == 0) {
    window.location.reload();
  }
}

submit_btn.addEventListener("click", getNotes);
