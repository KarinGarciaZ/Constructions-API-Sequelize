const multer = require('multer');

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname );
  }
});

const fileFilter = (req, file, cb) => {
  if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' )
    cb(null, true);
  else
    cb(null, false);
}

const upload = multer({storage, fileFilter})

module.exports = upload;