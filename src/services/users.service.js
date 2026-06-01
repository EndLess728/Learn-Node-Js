const users = [];

function getAllUsers() {
  return users;
}

function getUserById(id) {
  return users.find((user) => user.id === id);
}

function createUser(payload) {
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: payload.name,
    email: payload.email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(newUser);
  return newUser;
}

function updateUser(id, payload) {
  const user = getUserById(id);
  if (!user) {
    return null;
  }

  user.name = payload.name ?? user.name;
  user.email = payload.email ?? user.email;
  user.updatedAt = new Date().toISOString();

  return user;
}

function deleteUser(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return false;
  }

  users.splice(index, 1);
  return true;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
