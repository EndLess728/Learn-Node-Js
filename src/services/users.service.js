const db = require("../db/mysql");

const userColumns = `
  id,
  name,
  email,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

async function getAllUsers() {
  const [rows] = await db.execute(
    `SELECT ${userColumns} FROM users ORDER BY id ASC`,
  );

  return rows;
}

async function getUserById(id) {
  const [rows] = await db.execute(
    `SELECT ${userColumns} FROM users WHERE id = ? LIMIT 1`,
    [id],
  );

  return rows[0];
}

async function createUser(payload) {
  const [result] = await db.execute("INSERT INTO users (name, email) VALUES (?, ?)", [
    payload.name,
    payload.email,
  ]);

  return getUserById(result.insertId);
}

async function updateUser(id, payload) {
  const fields = [];
  const values = [];

  if (payload.name) {
    fields.push("name = ?");
    values.push(payload.name);
  }

  if (payload.email) {
    fields.push("email = ?");
    values.push(payload.email);
  }

  if (fields.length === 0) {
    return getUserById(id);
  }

  values.push(id);

  const [result] = await db.execute(
    `UPDATE users SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    values,
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getUserById(id);
}

async function deleteUser(id) {
  const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);

  return result.affectedRows > 0;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
