const express = require('express');
const app = express();
const sequelize = require('./config/sequelize');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const videoRoutes = require('./routes/videoRoutes');

require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/admin', adminRoutes);
app.use('/api/videos', videoRoutes);


// console.log('JWT Secret Key:', process.env.JWT_SECRET);

// Sync sequelize and start server
sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
});

// mobile port
// sequelize.sync().then(() => {
//     app.listen(5000, '0.0.0.0', () => 
//         console.log('Server running on http://192.168.150.166:5000')
//     );
// });
