const os = require('os')
const fs = require('fs')
const multer = require('multer')

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    const path = `${os.tmpdir()}/uploads`
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path)
    }

    cb(null, path)
  },
  filename(_req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`)
  },
})

const upload = multer({ storage })

module.exports = { upload }
