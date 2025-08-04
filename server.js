const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend (optional if hosted separately)
app.use(express.static('public'));

// Contact Form Route
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  // Email setup
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vallarymitchelle1@gmail.com', // Replace with your Gmail
      pass: 'process.env.PTSO',   // Use App Password if 2FA is on
    },
  });

  const mailOptions = {
    from: email,
    to: 'vallarymitchelle1@gmail.com', // Where you want to receive messages
    subject: `New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to send message' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

