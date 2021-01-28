const multer = require('multer')
const fs = require('fs')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename(req, file, cb) {
    const originalnameArr = file.originalname.split('.');
    const ext = originalnameArr[originalnameArr.length - 1];
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    // cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
    
    const path = `./uploads/${uniqueSuffix}`
    fs.mkdirSync(path, { recursive: true })

    cb(null, `${uniqueSuffix}/${file.originalname}`);
  },
});

module.exports = multer({ storage });
