const { getMessages } = require('../models/webchatModel');

const getAllMessages = async (req, res) => {
  try {
    const messages = await getMessages();
    return res.status(200).render('webchat', { messages });
  } catch {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getAllMessages };
