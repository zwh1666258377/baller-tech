# BT!

## Getting Started

Open the database

```bash
$ pushd docker > null
$ echo DB_DATA_PATH=[data path]:/data/db > .env # set your local database data path
$ docker-compose up -d
$ popd > null
```

In the root directory install dependencies

```bash
$ yarn
```

Start the frontend dev server

```bash
$ yarn start
```

Start the backend dev server

```bash
$ yarn server
```

Open localhost:8000!

