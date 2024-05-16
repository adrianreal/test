document.addEventListener('DOMContentLoaded', function () {
    displayNotes();
    populateCategoryFilter();
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const categoryInput = document.getElementById('categoryInput');
    const imageInput = document.getElementById('imageInput');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    let imageUrl = '';
    if (imageInput.files && imageInput.files[0]) {
        const file = imageInput.files[0];
        if (file.size > 2048000) { // 2 MB
            alert("The image file size should not exceed 2 MB.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            imageUrl = e.target.result;
            saveNote();
        };
        reader.readAsDataURL(file);
    } else {
        saveNote();
    }

    function saveNote() {
        const note = {
            text: noteInput.value,
            category: categoryInput.value.trim(),
            image: imageUrl
        };
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
        populateCategoryFilter(); // Refresh the category dropdown
        noteInput.value = '';
        categoryInput.value = '';
        imageInput.value = '';
        document.getElementById('fileName').textContent = ''; // Clear the file name display
    }
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    populateCategoryFilter(); // Refresh the category dropdown
}

function displayNotes() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.forEach((note, index) => {
        if (categoryFilter === "" || note.category === categoryFilter) {
            const noteElement = document.createElement('li');
            noteElement.className = 'note-item';
            noteElement.innerHTML = `
                <div>
                    <span class="note-text">${note.text}</span>
                    ${note.image ? `<img src="${note.image}" alt="Note Image" class="note-image" onclick="expandImage('${note.image}')">` : ''}
                    <span class="note-category">${note.category}</span>
                </div>`;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.className = 'delete-btn';
            deleteButton.onclick = function () { deleteNote(index); };
            noteElement.appendChild(deleteButton);
            notesList.appendChild(noteElement);
        }
    });
}

function expandImage(imageUrl) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="image-modal-content">
            <span class="close-btn" onclick="closeModal()">&times;</span>
            <img src="${imageUrl}" alt="Expanded Image">
        </div>`;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
    }
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
        noteElement.className = 'note-item';
        noteElement.innerHTML = `
            <div>
                <span class="note-text">${note.text}</span>
                ${note.image ? `<img src="${note.image}" alt="Note Image" class="note-image" onclick="expandImage('${note.image}')">` : ''}
                <span class="note-category">${note.category}</span>
            </div>`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function () { deleteNote(index); };
        noteElement.appendChild(deleteButton);
        notesList.appendChild(noteElement);
    });
}

function displayFileName() {
    const imageInput = document.getElementById('imageInput');
    const fileNameDisplay = document.getElementById('fileName');
    if (imageInput.files && imageInput.files.length > 0) {
        fileNameDisplay.textContent = imageInput.files[0].name;
    } else {
        fileNameDisplay.textContent = '';
    }
}
