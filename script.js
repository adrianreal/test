document.addEventListener('DOMContentLoaded', function () {
    displayNotes();
    populateCategoryFilter();

    // Event listener to close modal on 'Escape' key press
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeEditModal();
        }
    });

    // Zoom in/out functionality for mobile only
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('textarea, input[type="text"]');
        inputs.forEach(input => {
            input.addEventListener('focus', () => document.body.classList.add('zoomed'));
            input.addEventListener('blur', () => document.body.classList.remove('zoomed'));
        });
    }
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
            noteElement.dataset.index = index;
            noteElement.innerHTML = `
                <div class="note-content">
                    <input type="checkbox" class="note-checkbox" data-index="${index}" style="display:none;">
                    <span class="note-text" onclick="openEditModal(${index})">${note.text}</span>
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

function openEditModal(index) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const note = notes[index];
    const modal = document.getElementById('editModal');
    const editNoteText = document.getElementById('editNoteText');

    editNoteText.value = note.text;
    modal.style.display = 'block';

    // Save the current note index for reference in saveEditedNote function
    modal.setAttribute('data-index', index);
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

function saveEditedNote() {
    const modal = document.getElementById('editModal');
    const index = modal.getAttribute('data-index');
    const editNoteText = document.getElementById('editNoteText');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    if (index !== null) {
        notes[index].text = editNoteText.value;
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
        closeEditModal();
    }
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
        noteElement.dataset.index = index;
        noteElement.innerHTML = `
            <div class="note-content">
                <input type="checkbox" class="note-checkbox" data-index="${index}" style="display:none;">
                <span class="note-text" onclick="openEditModal(${index})">${note.text}</span>
                ${note.image ? `<img src="${note.image}" alt="Note Image" class="note-image" onclick="expandImage('${note.image}')">` : ''}
                <span class="note-category">${note.category}</span>
            </div>`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = function () { deleteNote(index); };
        noteElement.appendChild(noteButton);
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

function startDownloadProcess() {
    document.querySelectorAll('.note-checkbox').forEach(checkbox => {
        checkbox.style.display = 'inline-block';
    });
    document.getElementById('downloadControls').style.display = 'block';
    document.getElementById('startDownloadButton').style.display = 'none';
}

function exitSelectionMode() {
    document.querySelectorAll('.note-checkbox').forEach(checkbox => {
        checkbox.style.display = 'none';
        checkbox.checked = false;
    });
    document.getElementById('downloadControls').style.display = 'none';
    document.getElementById('startDownloadButton').style.display = 'block';
}

async function downloadSelectedNotes() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    const selectedCheckboxes = document.querySelectorAll('.note-checkbox:checked');
    const selectedIndexes = Array.from(selectedCheckboxes).map(checkbox => parseInt(checkbox.dataset.index));

    let yOffset = 10;
    const pageWidth = pdf.internal.pageSize.getWidth() - 20; // 20 for margins
    const pageHeight = pdf.internal.pageSize.getHeight() - 20; // 20 for bottom margins

    for (const index of selectedIndexes) {
        const note = notes[index];
        if (note.text) {
            const textLines = pdf.splitTextToSize(note.text, pageWidth);
            textLines.forEach(line => {
                if (yOffset > pageHeight - 10) { // Check if new page is needed
                    pdf.addPage();
                    yOffset = 10;
                }
                pdf.text(line, 10, yOffset);
                yOffset += 7; // Adjust line spacing
            });
        }
        if (note.category) {
            if (yOffset > pageHeight - 10) {
                pdf.addPage();
                yOffset = 10;
            }
            pdf.text(`Category: ${note.category}`, 10, yOffset);
            yOffset += 7; // Adjust line spacing
        }
        if (note.image) {
            const img = new Image();
            img.src = note.image;
            await new Promise((resolve) => {
                img.onload = () => {
                    const imgProps = pdf.getImageProperties(img);
                    const imgWidth = pageWidth; // Fit image to page width
                    const imgHeight = (imgProps.height * imgWidth) / imgProps.width; // Scale height to maintain aspect ratio
                    if (yOffset + imgHeight > pageHeight - 10) {
                        pdf.addPage();
                        yOffset = 10;
                    }
                    pdf.addImage(img, 'JPEG', 10, yOffset, imgWidth, imgHeight);
                    yOffset += imgHeight + 10; // Adjust space after image
                    resolve();
                };
            });
        }

        yOffset += 10; // Extra space before next note
        if (yOffset > pageHeight - 10) {
            pdf.addPage();
            yOffset = 10;
        }
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timestamp = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
    const fileName = `takenotesonline_${timestamp}.pdf`;

    pdf.save(fileName);

    // Reset the selection process
    exitSelectionMode();
}

// Reset the selection mode to normal view
function exitSelectionMode() {
    document.querySelectorAll('.note-checkbox').forEach(checkbox => {
        checkbox.style.display = 'none';
        checkbox.checked = false;
    });
    document.getElementById('downloadControls').style.display = 'none';
    document.getElementById('startDownloadButton').style.display = 'block';
}
