const {uploader, url} = require('cloudinary').v2;
const {Router} = require('express');
const Work = require('../models/Work');
const router = Router();
const multer = require('multer');
const auth = require('../middleware/auth.middleware');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

function getColor(colors) {
    if (colors[0][0] === "#FFFFFF") {
        return colors[1][0];
    } else {
        return colors[0][0];
    }
}

router.get('/api/works', async (req, res) => {
    await Work.find({}).sort({'_id': -1}).then(users => res.json(users));
});

router.post('/api/create', auth, upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'thumbnail', maxCount: 1}
]), async (req, res) => {
    const {title} = req.body;

    const workDuplicateTitle = await Work.findOne({title});
    if (workDuplicateTitle) {
        return res.status(400).json({message: 'That title is already taken'})
    }

    let imageUrl = '';
    let thumbnailUrl = '';
    let color = '';

    await uploader.upload(req.files.image[0].path, {colors: true}).then((result) => {
        imageUrl = result.secure_url;
        color = getColor(result.colors);
    });

    await uploader.upload(req.files.thumbnail[0].path, {colors: true}).then((result) => {
        thumbnailUrl = result.secure_url;
    });

    const work = new Work({
        title: title,
        image: imageUrl,
        thumbnail: thumbnailUrl,
        color: color
    });

    await work.save();
    res.redirect('/');
});

module.exports = router;