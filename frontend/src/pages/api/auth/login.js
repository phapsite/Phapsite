// pages/api/auth/login.js
import {
    createSession
} from '@/lib/auth';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const {
                email,
                password
            } = req.body;

            // Your auth logic here (verify credentials)
            // For demo, we'll create a session for any email
            if (email) {
                const user = {
                    id: 'user123',
                    email,
                    name: 'Test User'
                };

                const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

                await createSession(user, expires, res);

                res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    user
                });
            } else {
                res.status(400).json({
                    success: false, message: 'Email required'
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                success: false, message: 'Server error'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}