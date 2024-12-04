# Database

1. Create two mysql databases for prisma, one database for the real datas, the other one which will be called ...-shadow. Prisma use internally for migrations.
2. Fill out the mysql creditentials in the backend .env file

Run the following command to creat mysql databases
npx prisma migrate deploy

# Development

1. npm install - in the backend and in the frontend folder
2. create .env.development in the folder, see .env.development.example in the corresponding folder
3. create .env on the backend, see .env.development.example in the corresponding folder
4. npm run dev - run local development server both on frontend and on the backend

# Production

1. npm run build -seperately on both folder. On the frontend will create a dist folder, and on the backend will create a dist folder 2. create
2. npm start - run on the backend which will server both the frontend and the backend from the same domain.

Note: / in the end of the urls can cause CORS error. See examples
