const db = require('../db/knex');

async function getAllUsers() {
  return db('users')
    .select('id', 'name', 'email', 'created_at as createdAt', 'updated_at as updatedAt')
    .orderBy('id', 'asc');
}

async function getUserById(id) {
  return db('users')
    .select('id', 'name', 'email', 'created_at as createdAt', 'updated_at as updatedAt')
    .where({ id })
    .first();
}

async function createUser(payload) {
  const [id] = await db('users').insert({
    name: payload.name,
    email: payload.email
  });

  return getUserById(id);
}

async function updateUser(id, payload) {
  const updatePayload = {
    updated_at: db.fn.now()
  };

  if (payload.name) {
    updatePayload.name = payload.name;
  }

  if (payload.email) {
    updatePayload.email = payload.email;
  }

  const updatedCount = await db('users').where({ id }).update(updatePayload);

  if (updatedCount === 0) {
    return null;
  }

  return getUserById(id);
}

async function deleteUser(id) {
  const deletedCount = await db('users').where({ id }).del();
  return deletedCount > 0;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
