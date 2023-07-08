# JS-Storefront-BE
[Udacity] JS-Storefront-BE Project 2
## Some configurations:

### Migration step
In this case I use Ubuntu 22.04 LTS as an WSL on window 10, install `psql`

access psql by command `psql postgres`

create user that matched to configuration in `.env` and `database.json`, example:
```
    CREATE USER full_stack_user WITH PASSWORD 'password123';
    CREATE DATABASE full_stack_dev;
    \c full_stack_dev
```

Run `db-migrate up` or `db-migrate down` 