const usersService = require('../services/users.service');
const apiResponse = require('../utils/api-response');

async function getUsers(req, res, next) {
  try {
    const users = await usersService.getAllUsers();
    return res.status(200).json(apiResponse.success(users, 'Users fetched'));
  } catch (error) {
    return next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const id = Number(req.params.id);
    const user = await usersService.getUserById(id);

    if (!user) {
      return res.status(404).json(apiResponse.failure('User not found'));
    }

    return res.status(200).json(apiResponse.success(user, 'User fetched'));
  } catch (error) {
    return next(error);
  }
}

async function createUser(req, res, next) {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json(apiResponse.failure('name and email are required'));
    }

    const user = await usersService.createUser({ name, email });
    return res.status(201).json(apiResponse.success(user, 'User created'));
  } catch (error) {
    if (error.code === '23505' || error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json(apiResponse.failure('Email already exists'));
    }

    return next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json(apiResponse.failure('Provide name or email to update'));
    }

    const user = await usersService.updateUser(id, { name, email });
    if (!user) {
      return res.status(404).json(apiResponse.failure('User not found'));
    }

    return res.status(200).json(apiResponse.success(user, 'User updated'));
  } catch (error) {
    if (error.code === '23505' || error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json(apiResponse.failure('Email already exists'));
    }

    return next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = Number(req.params.id);
    const isDeleted = await usersService.deleteUser(id);

    if (!isDeleted) {
      return res.status(404).json(apiResponse.failure('User not found'));
    }

    return res.status(200).json(apiResponse.success(null, 'User deleted'));
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
