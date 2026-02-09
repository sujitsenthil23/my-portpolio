const handleContact = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required.'
    });
  }

  const payload = {
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  console.log('Contact submission:', payload);

  return res.status(200).json({
    success: true,
    message: 'Message received. I will get back to you soon.'
  });
};

module.exports = { handleContact };
