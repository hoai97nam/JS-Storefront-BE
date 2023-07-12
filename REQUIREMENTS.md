## APIs list

| Endpoint | Method | Description |
| --- | --- | --- |
| User routes: |  |  |
| `http://localhost:3000/users` | POST | Add new user |
| `http://localhost:3000/users` | GET | Get all users |
| `http://localhost:3000/users/1` | GET | Get user with specific id |
| `http://localhost:3000/users` | DELETE | Delete user with specific id pass from http body |
| `http://localhost:3000/users/authenticate` | POST | Get authentication token of user |
| Order routes: |  |  |
| `http://localhost:3000/orders` | GET | Get all orders |
| `http://localhost:3000/orders/:id` | GET | Get order with specific id |
| `http://localhost:3000/orders` | POST | Add new order |
| `http://localhost:3000/orders` | DELETE | Delete order with specific id pass from http body |
| Product routes: |  |  |
| `http://localhost:3000/products` | GET | Get all products |
| `http://localhost:3000/products/:id` | GET | Get product with specific id |
| `http://localhost:3000/products` | POST | Add new product |
| `http://localhost:3000/products` | DELETE | Delete product with specific id pass from http body |
| Dashboard routes: |  |  |
| `http://localhost:3000/orders/:id/products` | POST | Add new product with dependencies |
| `http://localhost:3000/products-in-orders` | GET | Get product in order |
| `http://localhost:3000/users-with-orders` | GET | Get user with order |
| `http://localhost:3000/five-most-expensive` | GET | Get 5 most expensive |

## Table Schemas:
### **users table**:
| Column | Type |
| :----- | :--- |
| id | integer   |
| username | character varying(100) |
| password_digest | character varying |
```
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```
### **products table**:
| Column | Type |
| :----- | :--- |
| id | integer   |
| username | character varying(100) |
| password_digest | character varying |
```
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```

### **orders table**:
| Column | Type |
| :----- | :--- |
| id | integer   |
| status | character varying(64) |
| user_id | bigint |
```
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
```

### **order_products table**:
| Column | Type |
| :----- | :--- |
| id | integer   |
| quantity | integer |
| order_id | bigint | 
| product_id | bigint | 
```
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```
