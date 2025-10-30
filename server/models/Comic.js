const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    edition: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    coverColor: {
      type: String,
      default: 'from-slate-500 to-indigo-500',
    },
    coverImage: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comic', comicSchema);
