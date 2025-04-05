const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');

exports.registerAdmin = async (req, res) => {
    try {
      console.log("Received request for admin profile with user ID:", req.user?.id);
  
      const { name, email, password, role, roleId } = req.body;
   
      const existingAdmin = await AdminUser.findOne({ where: { email } });
      if (existingAdmin) {
        return res.status(400).json({ message: 'Admin already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const admin = await AdminUser.create({
        name,
        email,
        role,
        roleId,
        password_hash: hashedPassword
      });
  
      res.status(201).json({ id: admin.id, email: admin.email, name: admin.name, role: admin.role });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await AdminUser.findOne({ where: { email } });
        if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, admin.password_hash);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });


        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const admin = req.admin; // This is full AdminUser model instance!

        res.json({
            id: admin.id,
            name: admin.name,
            email: admin.email
            // any other fields you want
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
