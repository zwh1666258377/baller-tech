# BT!

## Getting Started

Open the database

```bash
$ pushd docker > null
$ echo DB_DATA_PATH=[data path]:/data/db > .env
$ docker-compose up -d
$ popd > null
```

In the root directory install dependencies

```bash
$ yarn
```

Start the frontend dev server

```bash
$ yarn dev/start
```

Start the backend dev server

```bash
$ npx nodemon
```

Open localhost:7001

