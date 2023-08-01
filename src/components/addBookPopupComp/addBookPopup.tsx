"use client"

import React, { useEffect, useReducer, useRef } from "react";
import styles from './addBookPopup.module.css'

import { Book, addBook } from "@/redux/features/booksSlice";
import { useAppDispatch } from "@/redux/store";

const BOOK_CATEGORIES = ["Fiction", "Mystery", "Fantasy", "Science Fiction", "Romance", "Thriller", "Biography", "Self-Help", "Other"];

interface AddBookProps {
  initialBookDetails: null | Book;
  closeModal: () => void;
}

const stateReducer = (state: any, updatedData: any) => {
  return { ...state, ...updatedData };
};

const AddBookPopup = (props: AddBookProps) => {
  const { initialBookDetails, closeModal } = props;
  const [bookDetails, setBookDetails] = useReducer(
    stateReducer,
    initialBookDetails || {
      name: "",
      price: "",
      category: "",
      description: "",
    }
  );

  const dispatch = useAppDispatch();

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Focus the name input element when the component mounts
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const addNewBook = (event: React.FormEvent) => {
    event?.preventDefault();
    const isFieldMissing = Object.values(bookDetails).some((value) => typeof value !== "number" && !value);
    if (isFieldMissing) {
      alert("Please fill in all the fields.");
      return;
    }

    dispatch(addBook(bookDetails));
    closeModal();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setBookDetails({ [name]: value });
  };

  return (
    <div className={styles.popupContainer}>
      <form className={styles.addBookForm}>
        <button type="button" className={styles.closeButton} onClick={() => closeModal()}>
          x
        </button>
        <h2 className="h-centered mb-20">{initialBookDetails ? "Modify" : "Add New"} Book</h2>
        <label  className={styles.formLabel} htmlFor="name">Name:</label>
        <input className={styles.formInput} name="name" ref={nameInputRef} value={bookDetails.name} onChange={handleChange} />
        <label  className={styles.formLabel} htmlFor="price">Price:</label>
        <input className={styles.formInput} type="number" name="price" value={bookDetails.price} onChange={handleChange} />
        <label  className={styles.formLabel} htmlFor="category">Category:</label>
        <select className={styles.formInput} name="category" onChange={handleChange} value={bookDetails.category}>
          <option value="">Select a category</option>
          {BOOK_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <label  className={styles.formLabel} htmlFor="description">Description:</label>
        <textarea className={styles.formInput} name="description" value={bookDetails.description} onChange={handleChange} />
        <button onClick={addNewBook} className="h-centered blue-button">
          {initialBookDetails ? "Modify" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddBookPopup;
