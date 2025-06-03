import React from 'react';
import styles from './NoteList.module.css';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <ul className={styles.list}>
      {notes.map((note) => (
        <li key={note.id} className={styles.note}>
          <h3 className={styles.title}>{note.title}</h3>
          <p className={styles.content}>{note.content}</p>
          <small className={styles.date}>
            Оновлено: {new Date(note.updatedAt).toLocaleString()}
          </small>
          <div className={styles.buttonGroup}>
            <button
              onClick={() => onEdit(note)}
              className={`${styles.button} ${styles.editButton}`}
            >
              Редагувати
            </button>
            <button
              onClick={() => onDelete(note.id)}
              className={`${styles.button} ${styles.deleteButton}`}
            >
              Видалити
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
