// Utils.js holds custom hook: useBookstates
import { useState } from 'react';

const ValidFields = ['isbn', 'title', 'author', 'category'];

const bookStatesInit = {
  isbn: "ISBN",
  title: "",
  author: "Author",
  description: "Description",
  publisher: "Publisher",
  published_year: 0,
  image_src: "Image",
  formValid: false,
  isOpen: false,
};

const useCategory = () => {
  const [category, setCategory] = useState("");

  const selectCategory = (evt) => {
    setCategory(evt.target.value)
  }

  return { category, selectCategory }
}

const useBookstates = () => {
  const [bookStates, setBookStates] = useState(bookStatesInit);

  function populateBookstates(bookInfo) {
    setBookStates({ ...bookStates, 
      isbn: bookInfo.isbn,
      title: bookInfo.title,
      author: bookInfo.author,
      description: bookInfo.description,
      publisher: bookInfo.publisher,
      published_year: bookInfo.published_year,
      image_src: bookInfo.image_src,
      category: bookInfo.category
    })
  }
  
  function toggleOpen() {
    setBookStates({ ...bookStates, isOpen: !bookStates.isOpen });
  };
  
  function handleClose() {
    setBookStates({ ...bookStates, isOpen: false });
  }; 
  
  function validateForm() {
    if (bookStates.title.length > 0 && 
        bookStates.published_year >= 1900 && bookStates.published_year < 2100) {
      setBookStates({ ...bookStates, formValid: true });
    }
  };
  
  function evtHandler(evt) {
    if (evt.target.name === 'image_src') {
      let imgSrc = evt.target.value.split('\\');
      let imgTag = imgSrc[imgSrc.length-1];
      setBookStates({ ...bookStates, [evt.target.name]: imgTag});
    }
    else {
      let val = evt.target.value;
      if (evt.target.name === 'published_year') {
        val = parseInt(val);
      }
      setBookStates({ ...bookStates, [evt.target.name]: val});
    }
  };

  return { bookStates, setBookStates, populateBookstates, toggleOpen, 
    handleClose, evtHandler, validateForm }
}

export { useCategory, useBookstates, ValidFields }

