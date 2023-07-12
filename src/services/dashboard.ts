import client from "../database";

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<{ name: string; price: number; order_id: string }[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT name, price, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
  async usersWithOrders(): Promise<{ username: string; status: string }[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT username, status FROM users INNER JOIN orders ON users.id = orders.user_id";
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }
  async fiveMostExpensive(): Promise<{ name: string; price: number }[]> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "SELECT name, price FROM products ORDER BY price DESC LIMIT 5";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`);
    }
  }
}
