const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const workRoutes = require('./routes/works');
const cloudinary = require('cloudinary').v2;
const sslRedirect = require('heroku-ssl-redirect');

const PORT = process.env.PORT || 5000;
const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || config.get('cloudName'),
    api_key: process.env.CLOUD_API_KEY || config.get('cloudApiKey'),
    api_secret: process.env.CLOUD_API_SECRET || config.get('cloudApiSecret')
});

app.use(sslRedirect());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json({extended: true}));
app.use(workRoutes);
app.use('/api/auth', require('./routes/auth'));
app.use('/uploads', express.static('uploads'));

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e) {
        console.log(e);
    }
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

start();

