# Spotify Clone (Reactjs & Nodejs) 🎉

🔥 full-stack music streaming application like spotify.

## Tech Stack 🚧

### Frontend

- [x] React
- [x] Redux-Toolkit
- [x] RTK-Query
- [x] Emotion-UI
- [x] React-Router-DOM

### Backend

- [x] Node
- [x] Express
- [x] Cloudinary
- [x] Sequelize
- [x] Postgresql

### Development Tools

- [x] Create-React-App
- [x] Nodemon
- [x] Docker

## Getting Started ⚡️

### Backend Development Setup (node-server)

#### Step 1

Create **.env** file inside **src/config** directory and add all the required environmental vriables. (required environment variables can be found in the **src/config/.env.example** file)

#### Step 2

> Start development server by running the following script.

```bash
npm run start:dev
```

##### OR

If your are using **docker**, run the following command.

```bash
docker-compose up
```

#### Step 3

> Seed data to the database & Upload pictures/audios to the cloudinary by running the following script.

```bash
npm run migrate
```

### Frontend Development Setup (react-client)

> Open **package.json** file and change current **proxy** url to the url of the **node-server**. Run the following script to start development server.

```bash
npm start
```
