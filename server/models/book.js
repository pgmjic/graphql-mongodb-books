var mongoose = require('mongoose');

const MyCategory = Object.freeze({
  Fiction: 'Fiction',
  Mystery: 'Mystery',
  Fantasy: 'Fantasy',
  ScienceFiction: 'Science Fiction',
});

var BookSchema = new mongoose.Schema({
  id: String,
  isbn: String,
  title: String,
  author: String,
  description: String,
  published_year: { type: Number, min: 1800, max: 2100 },
  publisher: String,
  updated_date: { type: Date, default: Date.now },
  image_src: String,
  category: {
    type: String,
    enum: Object.values(MyCategory),
    default: MyCategory.Fiction
  }
});

//var BookModel = mongoose.model('Book', BookSchema);

module.exports = { 
  Categories: MyCategory,  
  BookModel: mongoose.model('Book', BookSchema)
};
