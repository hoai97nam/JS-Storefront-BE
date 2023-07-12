import client from "../database";

export type Order = {
  id?: string;
  status: string;
  user_id: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable get orders: ${error}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders WHERE id=($1)`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable get orders: ${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *";
      const result = await conn.query(sql, [order.status, order.user_id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable insert orders: ${error}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "DELETE FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`unable get orders: ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<any> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      //@ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }
}
