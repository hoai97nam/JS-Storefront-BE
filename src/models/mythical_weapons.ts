import client from "../database";

export type Weapon = {
  id: Number;
  name: string;
  type: string;
};
export class MythicalWeaponsStore {
  async index(): Promise<Weapon[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM mythical_weapons";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get weapons ${error}`);
    }
  }
  async show(id: string): Promise<Weapon> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM mythical_weapons WHERE id=${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot get weapons with id = ${id}-${error}`);
    }
  }
  async create(weapon: Weapon): Promise<Weapon> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO mythical_weapons (name, type) VALUES($1, $2) RETURNING *`;
      const result = await conn.query(sql, [weapon.name, weapon.type]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot ADD weapons -${error}`);
    }
  }
  async delete(id: string): Promise<Weapon[]> {
    try {
      const conn = await client.connect();
      const sql = `DELETE FROM mythical_weapons WHERE id=${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Cannot DELETE weapons with id = ${id}-${error}`);
    }
  }
}
