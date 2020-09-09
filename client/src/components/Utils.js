// Utils.js

const bookStates = {
  isbn: "",
  title: "",
  author: "",
  description: "",
  publisher: "",
  published_year: 0,
  image_src: "",
  category: "",
  formValid: false,
  isOpen: false,
}

function toggleOpen() {
  this.setState({ isOpen: !this.state.isOpen });
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

export { bookStates, toggleOpen, validateForm, evtHandler }