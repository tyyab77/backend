// backend/index.js
require('dotenv').config();
const express = require('express');
const CryptoJS = require('crypto-js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { data } = req.body;

  try {
    const decryptedBytes = CryptoJS.AES.decrypt(data, process.env.ENCRYPTION_KEY);
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

    const { email, password } = decryptedData;
    
    const isValidUser = email === 'test@example.com' && password === 'password';

    if (isValidUser) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Decryption error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
