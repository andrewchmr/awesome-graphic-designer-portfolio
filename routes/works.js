const {uploader, api} = require('cloudinary').v2;
const {Router} = require('express');
const Work = require('../models/Work');
const router = Router();
const multer = require('multer');
const auth = require('../middleware/auth.middleware');

const url = '/api/works';

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

const getCloudPublicId = (url) => {
    return url.match(/[^\/]*$/)[0].replace(/\.[^/.]+$/, "");
};

function getColor(colors) {
    if (colors[0][0] === "#FFFFFF") {
        return colors[1][0];
    } else {
        return colors[0][0];
    }
}

router.get(url, async (req, res) => {
    await Work.find({}).sort({'_id': -1}).then(users => res.json(users));
});

router.get(`${url}/colors/:id`, async (req, res) => {
    const id = req.params.id;
    const work = await Work.findById(id);
    const publicIdImage = getCloudPublicId(work.image);
    try {
        const data = await api.resource(publicIdImage,
            {colors: true});
        if (!data) {
            res.status(404).send({
                message: `Cannot find colors for image with public_id=${id}`
            });
        } else {
            res.send(data.colors);
        }
    } catch (e) {
        res.status(500).send({
            message: "Could not get colors for work with id=" + id
        });
    }
});

router.put(`${url}/:id`, auth, async (req, res) => {
    const id = req.params.id;
    const {title, category, color} = req.body;
    if (!(title && category && color)) {
        return res.status(400).json({message: 'Wrong request body'})
    }
    await Work.findByIdAndUpdate(id, {title, category, color}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
});

router.post(url, auth, upload.fields([
    {name: 'image', maxCount: 1},
    {name: 'thumbnail', maxCount: 1}
]), async (req, res) => {
    const {title, category} = req.body;

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
        color: color,
        category: category
    });

    await work.save();
    return res.status(200).json({message: 'Work successfully added!'})
});

router.delete(`${url}:id`, auth, async (req, res) => {
    const id = req.params.id;

    const work = await Work.findById(id);
    const publicIdImage = getCloudPublicId(work.image);
    const publicIdThumbnail = getCloudPublicId(work.thumbnail);
    await api.delete_resources([publicIdImage, publicIdThumbnail], function (error, result) {
        console.log(result, error);
    });

    Work.findByIdAndRemove(id)
        .then(async data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete work with id=${id}. Maybe work was not found!`
                });
            } else {
                res.send({
                    message: "Work was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete work with id=" + id
            });
        });
});

module.exports = router;