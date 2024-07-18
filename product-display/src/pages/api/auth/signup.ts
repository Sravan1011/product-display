import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/config/db';
import User from '@/model/User';
import sendEmail from '../sendMail';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, username, password } = req.body;

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });

      await sendEmail(
        user.email,
        'Email Confirmation',
        `Please confirm your email by clicking the following link: ${process.env.NEXT_PUBLIC_BASE_URL}/confirm?token=${token}`
      );

      res.status(201).json({
        _id: user._id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
        token,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
