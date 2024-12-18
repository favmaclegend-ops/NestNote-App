// Selectors
const noteInput = document.getElementById("note");
const categorySelect = document.getElementById("category");
const saveBtn = document.getElementById("save-btn");
const notesContainer = document.getElementById("notes-container");

const modal = document.getElementById("modal");
const noteNameInput = document.getElementById("note-name-input");
const modalSaveBtn = document.getElementById("modal-save-btn");
const modalCancelBtn = document.getElementById("modal-cancel-btn");

// Notes Array
let notes = [];
let editIndex = null; // Track the note being edited

// Show Modal to Enter Note Name
saveBtn.addEventListener("click", () => {
  if (noteInput.value.trim() === "") {
    alert("Note content cannot be empty!");
    return;
  }
  modal.style.display = "flex"; // Show the modal
  noteNameInput.value = ""; // Clear input
  noteNameInput.focus();
});

// Save Note after Entering Name
modalSaveBtn.addEventListener("click", () => {
  const noteName = noteNameInput.value.trim();
  if (!noteName) {
    alert("Please enter a name for your note.");
    return;
  }

  const noteText = noteInput.value.trim();
  const category = categorySelect.value;

  if (editIndex !== null) {
    // Update existing note
    notes[editIndex] = { name: noteName, text: noteText, category };
    editIndex = null;
  } else {
    // Add new note
    notes.push({ name: noteName, text: noteText, category });
  }

  modal.style.display = "none"; // Hide modal
  noteInput.value = "";
  renderNotes();
});

// Cancel Modal
modalCancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Render Notes
function renderNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteItem = document.createElement("div");
    noteItem.classList.add("note-item");

    noteItem.innerHTML = `
            <div class="note-name">${note.name}</div>
            <div class="note-buttons">
                <button onclick="editNote(${index})"><i class="fas fa-edit"></i></button>
                <button onclick="deleteNote(${index})"><i class="fas fa-trash"></i></button>
                <button onclick="downloadNote(${index})"><i class="fas fa-download"></i></button>
            </div>
        `;

    notesContainer.appendChild(noteItem);
  });
}

// Edit Note
function editNote(index) {
  const note = notes[index];
  noteInput.value = note.text;
  categorySelect.value = note.category;
  editIndex = index;
}

// Delete Note
function deleteNote(index) {
  notes.splice(index, 1);
  renderNotes();
}

// Download Note
function downloadNote(index) {
  const note = notes[index];
  const blob = new Blob([note.text], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${note.name}.txt`;
  a.click();
}
const searchInput = document.getElementById("search-input");

// Search Notes
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  renderNotes(searchTerm);
});

// Render Notes with Optional Filter
function renderNotes(searchTerm = "") {
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    if (note.name.toLowerCase().includes(searchTerm)) {
      const noteItem = document.createElement("div");
      noteItem.classList.add("note-item");

      noteItem.innerHTML = `
                <div class="note-name">${note.name}</div>
                <div class="note-buttons">
                    <button onclick="editNote(${index})"><i class="fas fa-edit"></i></button>
                    <button onclick="deleteNote(${index})"><i class="fas fa-trash"></i></button>
                    <button onclick="downloadNote(${index})"><i class="fas fa-download"></i></button>
                </div>
            `;

      notesContainer.appendChild(noteItem);
    }
  });
}

// Initial Render
renderNotes();
