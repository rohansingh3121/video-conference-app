import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Host from '../models/Host';

const router = Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingHost = await Host.findOne({ email });

    if (existingHost) {
      return res.status(400).json({ message: 'Host already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newHost = new Host({
      name,
      email,
      password: hashedPassword,
    });

    await newHost.save();

    res.status(201).json({ message: 'Host created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const host = await Host.findOne({ email });

    if (!host) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, host.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: host._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
