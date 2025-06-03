// src/components/NoteForm.js
import React, { useState, useEffect } from 'react';
import styles from "./NoteForm.module.css"

const NoteForm = ({ onSubmit, initialData, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (title.trim().length < 3) {
      newErrors.title = 'Заголовок має містити щонайменше 3 символи';
    }
    if (content.trim().length < 5) {
      newErrors.content = 'Текст нотатки має бути не менше 5 символів';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit({ title, content });
    setTitle('');
    setContent('');
    setErrors({});
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
    setErrors({});
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      {errors.title && <div className={styles.error}>{errors.title}</div>}
      <textarea
        placeholder="Текст нотатки"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textarea}
      />
      {errors.content && <div className={styles.error}>{errors.content}</div>}
      <button type="submit" className={styles.button}>Зберегти</button>
      {onCancel && (
        <button
          type="button"
          onClick={handleCancel}
          className={`${styles.button} ${styles.cancelButton}`}
        >
          Скасувати
        </button>
      )}
    </form>
  );
};


export default NoteForm;
