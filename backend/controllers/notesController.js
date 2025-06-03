const { v4: uuidv4 } = require('uuid');
const { loadNotes, saveNotes } = require('../utils/fileUtils');

const getNotes = (req, res) => {
  const notes = loadNotes();
  res.json(notes);
};

const createNote = (req, res) => {
  const notes = loadNotes();
  const { title, content } = req.body;
  const newNote = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  notes.push(newNote);
  saveNotes(notes);
  res.status(201).json(newNote);
};

const updateNote = (req, res) => {
  const notes = loadNotes();
  const { id } = req.params;
  const { title, content } = req.body;
  const note = notes.find((n) => n.id === id);
  if (!note) return res.status(404).json({ error: 'Note not found' });

  note.title = title;
  note.content = content;
  note.updatedAt = new Date();
  saveNotes(notes);
  res.json(note);
};

const deleteNote = (req, res) => {
  let notes = loadNotes();
  const { id } = req.params;
  notes = notes.filter((n) => n.id !== id);
  saveNotes(notes);
  res.status(204).end();
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
