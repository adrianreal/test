// script.js
document.addEventListener('DOMContentLoaded', function () {
    displayNotes();
    populateCategoryFilter();
});

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const categoryInput = document.getElementById('categoryInput');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const note = {
        text: noteInput.value,
        category: categoryInput.value.trim()
    };
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    populateCategoryFilter();  // Refresh the category dropdown
    noteInput.value = '';
    categoryInput.value = '';
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    populateCategoryFilter();  // Refresh the category dropdown
}

function displayNotes() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.forEach((note, index) => {
        if (categoryFilter === "" || note.category === categoryFilter) {
            const noteElement = document.createElement('li');
            noteElement.innerHTML = `${note.text} <span class="note-category">- ${note.category}</span>`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.className = 'delete-btn';
            deleteButton.onclick = function () { deleteNote(index); };
            noteElement.appendChild(deleteButton);
            notesList.appendChild(noteElement);
        }
    });
}

function populateCategoryFilter() {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const categories = [...new Set(notes.map(note => note.category).filter(category => category))];
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = '<option value="">All Categories</option>';
    categories.forEach(category => {
        const option = new Option(category, category);
        categoryFilter.add(option);
    });
}

function filterNotesByCategory() {
    displayNotes();
}

function searchNotes() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const filteredNotes = notes.filter(note => note.text.toLowerCase().includes(searchTerm));
    
    filteredNotes.forEach((note, index) => {
        const noteElement = document.createElement('li');
        noteElement.innerHTML = `${note.text} <span class="note-category">- ${note.category}</span>`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function () { deleteNote(index); };
        noteElement.appendChild(deleteButton);
        notesList.appendChild(noteElement);
    });
}

