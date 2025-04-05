// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const adminRoutes = require('./routes/adminRoutes');
// const pool = require('./config/db');
// const videoRoutes = require('./routes/videoRoutes');
// const { sequelize } = require('./config/db');



// dotenv.config();
// const app = express();

// app.use(express.json()); // Parses JSON requests
// app.use(cors()); // Enables CORS

// app.use('/api/admin', adminRoutes);

// app.use('/uploads', express.static('uploads'));

// app.use('/api/videos', videoRoutes);

// sequelize.sync()
//     .then(() => console.log('Database connected'))
//     .catch(err => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, async () => {
//     try {
//         await pool.connect();
//         console.log(`Server running on port ${PORT}`);
//         console.log("Connected to PostgreSQL");
//     } catch (err) {
//         console.error("Database connection error", err);
//     }
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const videoRoutes = require('./routes/videoRoutes');
const { sequelize } = require('./config/db');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/admin', adminRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/videos', videoRoutes);

// Connect to DB using Sequelize
sequelize.sync()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Database connection error', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
