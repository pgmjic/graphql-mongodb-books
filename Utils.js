// Utils.js

const bookStates = {
  isbn: "",
  isbn_checked: false,
  title: "",
  author: "",
  author_checked: true,
  description: "",
  publisher: "",
  published_year: 0,
  image_src: "",
  category: "",
  category_checked: false,
  formValid: false,
  isOpen: false,
}

const ValidFields = ['isbn', 'author', 'category'];

function toggleOpen() {
  this.setState({ isOpen: !this.state.isOpen });
}

function handleClose() {
  this.setState({ isOpen: false });
}  

function handleCheckBox(e) {
  let field_checked;
  if (ValidFields.includes(e.target.name)) {
    field_checked = e.target.name + '_checked';
    this.setState({
      [field_checked]: e.target.checked,
    });
  }
}

function validateForm() {
  const { title, published_year } = this.state;
  if (title.length > 0 && published_year >= 1900 
                       && published_year < 2100) 
    this.setState({ formValid: true })
}

function evtHandler(evt) {
  if (evt.target.name === 'image_src') {
    let imgSrc = evt.target.value.split('\\');
    let imgTag = imgSrc[imgSrc.length-1];
    this.setState({[evt.target.name]: imgTag},
      this.validateForm());
  }
  else {
    let val = evt.target.value;
    if (evt.target.name === 'published_year')
      val = parseInt(val);
    this.setState({[evt.target.name]: val},
      this.validateForm());
  }
}

export { bookStates, toggleOpen, handleClose, handleCheckBox, validateForm, evtHandler }