exports.allAccess = (req, res) => {
  res.status(200).send({ message: "Public Content.", description: "Any user can have access to that content" });
};
exports.userBoard = (req, res) => {
  res.status(200).send({ message: "User Content.", description: "Only plain users can have access to this content" });
};
exports.adminBoard = (req, res) => {
  res.status(200).send({ message: "Admin Content.", description: "Only admin users can have access to this content" });
};
exports.moderatorBoard = (req, res) => {
  res.status(200).send({ message: "Moderator Content.", description: "Only moderator users can have access to this content" });
};