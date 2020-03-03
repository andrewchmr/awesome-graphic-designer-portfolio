const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const workRoutes = require('./routes/works');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json({extended: true}));
app.use(workRoutes);
app.use('/api/auth', require('./routes/auth'));
app.use('/uploads', express.static('uploads'));

async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/my_database', {
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

