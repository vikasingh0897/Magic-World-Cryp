import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import User from './models/user.model.js'; // Adjust this path to where your User model is located

const seedAdmin = async () => {
  try {
    // 1. Connect to Database
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDB...');

    // 2. Clear existing users
    await User.deleteMany({});
    console.log('Cleared all existing users.');

    // 3. Create Admin User
    const adminUser = new User({
      firstName: 'Raman',
      lastName: 'Pandit', // Optional, but helps fulfill schema structure
      username: 'adminraman',
      email: 'support111magiccrypto@gmail.com',
      password: 'admin@123',
      role: 'admin',
      emailVerified: true,
    });

    await adminUser.save();

    console.log('--- Seed Success ---');
    console.log('Admin Email: support111magiccrypto@gmail.com');
    console.log('Admin Pass:  admin@123');
    console.log('--------------------');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // 4. Close connection
    mongoose.connection.close();
  }
};

seedAdmin();
