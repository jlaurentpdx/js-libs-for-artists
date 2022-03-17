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

  static async findAll() {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            libraries
          `
    );

    return rows.map((row) => new Library(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          libraries
        WHERE
          id=$1
        `,
      [id]
    );
    return new Library(rows[0]);
  }

  static async updateById(id, lib) {
    const existingLib = await Library.findById(id);
    const updateLib = { ...existingLib, ...lib };
    const { name, url, description } = updateLib;
    const { rows } = await pool.query(
      `
        UPDATE
            libraries
        SET
            name=$1,
            url=$2,
            description=$3
        WHERE
            id=$4
        RETURNING
            *
          `,
      [name, url, description, id]
    );

    return new Library(rows[0]);
  }
};
