import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getUniqueId } from "../../utils"

export interface Book {
  id?: string,
  name: string,
  price: number,
  category: string,
  description: string
}


interface BooksState {
  bookList : Book[]
}

const initialState : BooksState = {
  bookList : []
}

export const BooksSlice = createSlice({
  name : "books",
  initialState,
  reducers : {
    addBook : (state, action: PayloadAction<Book>)=>{
      const editID = action.payload.id;
      if(editID){
        const bookIndex = state.bookList.findIndex(book => book.id === editID)
        state.bookList[bookIndex] = action.payload
      } else {
        state.bookList.push({
          id: getUniqueId(),
          ...action.payload
        })
      }
    },
    deleteBook : (state, action: PayloadAction<string>)=>{
      state.bookList = state.bookList.filter(book => book.id !== action.payload)
    },
  }
})

export const {addBook, deleteBook} = BooksSlice.actions;

export default BooksSlice.reducer;