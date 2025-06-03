import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoteForm from '../components/NoteForm/NoteForm.jsx';
import NoteList from '../components/NoteList/NoteList.jsx';
import styles from './Home.module.css';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/notes');
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async (note) => {
    try {
      if (note.id) {
        await axios.put(`http://localhost:5000/notes/${note.id}`, note);
      } else {
        await axios.post('http://localhost:5000/notes', note);
      }
      fetchNotes();
      setEditNote(null);
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const finalFilteredNotes = filteredNotes.filter(note => {
    if (!selectedDate) return true;
    const noteDate = new Date(note.createdAt).toISOString().split('T')[0];
    return noteDate === selectedDate;
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Нотатки</h1>

      <NoteForm
        onSubmit={handleSave}
        initialData={editNote}
        onCancel={() => setEditNote(null)}
      />
        <div className={styles.search_con}>

      <input
        type="text"
        placeholder="Пошук за заголовком..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.inputSearch}
      />
        <div className={styles.data_con}>
            <p>Пошук за датою</p>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={styles.inputDate}
            />
        </div>
        </div>

      <NoteList
        notes={finalFilteredNotes}
        onEdit={setEditNote}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
