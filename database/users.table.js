class UsersTable {
  constructor(client) {
    this.client = client;
  }

  getAllUsers = async function () {
    const { rows } = await this.client.query(
      `SELECT id, username, name, location 
          FROM users;
        `
    );

    return rows;
  };

  createUser = async function ({ username, password, name, location }) {
    try {
      const {
        rows: [user],
      } = await this.client.query(
        `
          INSERT INTO users(username, password, name, location) 
          VALUES($1, $2, $3, $4) 
          ON CONFLICT (username) DO NOTHING 
          RETURNING *;
        `,
        [username, password, name, location]
      );

      return user;
    } catch (error) {
      throw error;
    }
  };

  updateUser = async function (id, fields = {}) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    if (setString.length === 0) {
      return;
    }

    try {
      const {
        rows: [user],
      } = await this.client.query(
        `
        UPDATE users
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );

      return user;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UsersTable;
