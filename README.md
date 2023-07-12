# JS-Storefront-BE
[Udacity] JS-Storefront-BE Project 2
## Some configurations:

### 1. Clone this repo and run those following commands:

```
    cd JS-Storefront-BE && npm install
```
Backend will run on port:3000

### 2. Migrate database by commands `db-migrate up` or `db-migrate down` to drop all tables

### 2.1 Connect Database
In this case I use Ubuntu 22.04 LTS as an WSL on window 10, install `psql`

access psql by command `psql postgres` or `sudo -u postgres psql`

create user that matched to configuration in `.env` and `database.json`, example:
```
    CREATE USER full_stack_user WITH PASSWORD 'password123';
    CREATE DATABASE full_stack_dev;
    \c full_stack_dev
```

Run `db-migrate up` or `db-migrate down`

### 3. Install other package by command `npm i <package-name>`

Running between model relationship

pre-condition to run orders/ run as order of data

- Add user with id

- Add Order in orders table

- Add product in products table

## APIs list

| Endpoint | Method | Description |
| --- | --- | --- |
| `http://localhost:3000/users` | POST | Add new user |
| `http://localhost:3000/users` | GET | Get all users |
| `http://localhost:3000/users/1` | GET | Get user with specific id |
| `http://localhost:3000/users` | DELETE | Delete user with specific id pass from http body |
| `http://localhost:3000/users/authenticate` | POST | Get authentication token of user |
| --- | --- | --- |
| `http://localhost:3000/orders` | GET | Get all orders |
| `http://localhost:3000/orders/:id` | GET | Get order with specific id |
| `http://localhost:3000/orders` | POST | Add new order |
| `http://localhost:3000/orders` | DELETE | Delete order with specific id pass from http body |
| --- | --- | --- |
| `http://localhost:3000/products` | GET | Get all products |
| `http://localhost:3000/products/:id` | GET | Get product with specific id |
| `http://localhost:3000/products` | POST | Add new product |
| `http://localhost:3000/products` | DELETE | Delete product with specific id pass from http body |
| --- | --- | --- |
| `http://localhost:3000/orders/:id/products` | POST | Add new product with dependencies |
| `http://localhost:3000/products-in-orders` | GET | Get product in order |
| `http://localhost:3000/users-with-orders` | GET | Get user with order |
| `http://localhost:3000/five-most-expensive` | GET | Get 5 most expensive |
