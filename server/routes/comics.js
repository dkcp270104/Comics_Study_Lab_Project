const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Comic = require('../models/Comic');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname || '');
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({ storage });

const formatComic = (doc) => {
  const comic = doc.toObject({ versionKey: false });
  return {
    ...comic,
    coverImageUrl: comic.coverImage ? `/uploads/${comic.coverImage}` : '',
  };
};

router.get('/', async (_req, res) => {
  try {
    const comics = await Comic.find().sort({ createdAt: -1 });
    res.json(comics.map(formatComic));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, adminOnly, upload.single('coverImage'), async (req, res) => {
  try {
    const { title, edition, description, coverColor } = req.body;

    if (!title || !edition) {
      return res.status(400).json({ message: 'Title and edition are required' });
    }

    const comic = await Comic.create({
      title,
      edition,
      description,
      coverColor,
      coverImage: req.file ? req.file.filename : '',
    });
    res.status(201).json(formatComic(comic));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const comic = await Comic.findByIdAndDelete(id);
    if (!comic) {
      return res.status(404).json({ message: 'Comic not found' });
    }
    if (comic.coverImage) {
      const filePath = path.join(uploadDir, comic.coverImage);
      fs.unlink(filePath, () => {});
    }
    res.json({ message: 'Comic removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
