const pool = require('../utils/pool');

module.exports = class Library {
  id;
  name;
  url;
  description;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.url = row.url;
    this.description = row.description;
  }

  static async insert({ name, url, description }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
              libraries (name, url, description)
            VALUES
              ($1, $2, $3)
            RETURNING
              *
            `,
      [name, url, description]
    );

    return new Library(rows[0]);
  }
};