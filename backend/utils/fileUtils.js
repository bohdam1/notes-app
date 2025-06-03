const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'notes.json');

function loadNotes() {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

module.exports = { loadNotes, saveNotes };
