const usersService = require('../services/users.service');
const apiResponse = require('../utils/api-response');

function getUsers(req, res) {
  const users = usersService.getAllUsers();
  return res.status(200).json(apiResponse.success(users, 'Users fetched'));
}

function getUser(req, res) {
  const id = Number(req.params.id);
  const user = usersService.getUserById(id);

  if (!user) {
    return res.status(404).json(apiResponse.failure('User not found'));
  }

  return res.status(200).json(apiResponse.success(user, 'User fetched'));
}

function createUser(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json(apiResponse.failure('name and email are required'));
  }

  const user = usersService.createUser({ name, email });
  return res.status(201).json(apiResponse.success(user, 'User created'));
}

function updateUser(req, res) {
  const id = Number(req.params.id);
  const { name, email } = req.body;

  if (!name && !email) {
    return res.status(400).json(apiResponse.failure('Provide name or email to update'));
  }

  const user = usersService.updateUser(id, { name, email });
  if (!user) {
    return res.status(404).json(apiResponse.failure('User not found'));
  }

  return res.status(200).json(apiResponse.success(user, 'User updated'));
}

function deleteUser(req, res) {
  const id = Number(req.params.id);
  const isDeleted = usersService.deleteUser(id);

  if (!isDeleted) {
    return res.status(404).json(apiResponse.failure('User not found'));
  }

  return res.status(200).json(apiResponse.success(null, 'User deleted'));
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
