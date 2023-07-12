import client from "../database";

export type Product = {
  id?: string;
  name: string;
  price: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable get products: ${error}`);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable get products: ${error}`);
    }
  }

  async create(order: Product): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *";
      const result = await conn.query(sql, [order.name, order.price]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable insert products: ${error}`);
    }
  }

  async delete(id: string): Promise<Product>{
    try {
        const conn = await client.connect();
      const sql = "DELETE FROM products WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
        throw new Error(`unable get products: ${error}`);
    }
  }
}
