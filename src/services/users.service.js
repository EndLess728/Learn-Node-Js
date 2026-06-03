const db = require("../db/mysql");

const userColumns = `
  id,
  name,
  email,
  created_at AS createdAt,
  updated_at AS updatedAt
`;

const userDetailsColumns = `
  id,
  user_id AS userId,
  phone,
  address,
  city,
  date_of_birth AS dateOfBirth,
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

async function getUserDetailById(id) {
  const [rows] = await db.execute(
    `SELECT ${userDetailsColumns} FROM user_info WHERE user_id = ? LIMIT 1`,
    [id],
  );

  return rows[0];
}

async function createUser(payload) {
  const [result] = await db.execute(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [payload.name, payload.email],
  );

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

async function updateUserDetails(id, payload) {
  const columns = [];
  const values = [id];
  const updateClauses = [];

  if (payload.phone) {
    columns.push("phone");
    values.push(payload.phone);
    updateClauses.push("phone = VALUES(phone)");
  }
  if (payload.address) {
    columns.push("address");
    values.push(payload.address);
    updateClauses.push("address = VALUES(address)");
  }
  if (payload.city) {
    columns.push("city");
    values.push(payload.city);
    updateClauses.push("city = VALUES(city)");
  }
  if (payload.dateOfBirth) {
    columns.push("date_of_birth");
    values.push(payload.dateOfBirth);
    updateClauses.push("date_of_birth = VALUES(date_of_birth)");
  }

  if (columns.length === 0) {
    return getUserDetailById(id);
  }

  const placeholders = columns.map(() => "?").join(", ");

  await db.execute(
    `INSERT INTO user_info (user_id, ${columns.join(", ")}) VALUES (?, ${placeholders}) ON DUPLICATE KEY UPDATE ${updateClauses.join(", ")}, updated_at = CURRENT_TIMESTAMP`,
    values,
  );

  return getUserDetailById(id);
}

async function deleteUser(id) {
  const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);

  return result.affectedRows > 0;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserDetailById,
  updateUserDetails,
  createUser,
  updateUser,
  deleteUser,
};
