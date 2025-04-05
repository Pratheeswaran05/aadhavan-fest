const express = require('express');
const app = express();
const sequelize = require('./config/sequelize');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const videoRoutes = require('./routes/videoRoutes');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/admin', adminRoutes);
app.use('/api/videos', videoRoutes);

// Sync sequelize and start server
sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
});
