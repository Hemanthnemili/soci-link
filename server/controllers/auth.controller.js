export const welcome = (req, res) => {
  res.status(200).json({ message: "Welcome to my server " });
};
