"use client"

import Image from 'next/image'
import styles from './page.module.css'
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Suspense, useState } from 'react';
import { Book, deleteBook } from '@/redux/features/booksSlice';
import AddBookPopup from '@/components/addBookPopupComp/addBookPopup';

export default function Home() {
  const bookList = useAppSelector((state) => state.booksReducer.bookList);
  const [isAddEditModelOpen, setAddEditModal] = useState(false);
  const [bookToBeEdited, setBookToBeEdited] = useState<Book | null>(null);

  const dispatch = useAppDispatch();

  const toggleModal = (bookToBeEdited: Book | null = null) => {
    setBookToBeEdited(bookToBeEdited);
    setAddEditModal((isOpen) => !isOpen);
  };

  const deleteBookById = (event: React.MouseEvent, bookId: string) => {
    event.stopPropagation();
    dispatch(deleteBook(bookId));
  };

  return (
    <>
      <div className={styles.bookList}>
        <h1 className={`${styles.appHeader} h-centered mb-20`}>The Book Store 📚</h1>
        <button className={`${styles.addBtn} blue-button h-centered`} onClick={() => toggleModal()}>
          Add +
        </button>
        {bookList.length > 0 ? (
          <ul className={styles.booksList}>
            {bookList.map((book) => (
              <li className={styles.booksListItem} key={book.id}>
                <div className="cursor-pointer" onClick={() => toggleModal(book)}>
                  <h3 className={styles.bookName}>📘 {book.name}</h3>
                  <p className={styles.bookDetails}>
                    Category: <span className={styles.italicValue}>{book.category}</span>
                  </p>
                  <p className={styles.bookDetails}>
                    Price: <span className={styles.italicValue}>${book.price}</span>
                  </p>
                </div>
                <button className={styles.deleteButton} onClick={(e) => deleteBookById(e, book.id as string)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.noBooksText}>
            <p>No Books added yet. Click "Add+" to add new Books.</p>
          </div>
        )}
      </div>
      {isAddEditModelOpen && (
        <Suspense fallback={<div className="centered-div"> Loading... </div>}>
          <AddBookPopup closeModal={toggleModal} initialBookDetails={bookToBeEdited} />
        </Suspense>
      )}
    </>
  );
}

