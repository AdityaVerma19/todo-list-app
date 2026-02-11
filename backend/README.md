## Todo Backend (Express + MongoDB)

This is a fresh backend for your Todo MERN app.  
It is wired to match your existing frontend:

- `POST /api/auth/register` — expects `{ name, email, password }`
- `POST /api/auth/login` — expects `{ email, password }`, returns `{ token }`
- `GET /api/todo` — requires `Authorization: <token>` header, returns todos
- `POST /api/todo` — requires `Authorization: <token>`, body `{ text }`

### 1. Install dependencies

From the `backend` folder:

```bash
npm install
```

### 2. Configure environment

Edit `.env` in the `backend` folder:

```env
MONGO_URI=your-mongodb-connection-string-here
JWT_SECRET=supersecretjwtkey
```

- For `MONGO_URI`, copy the **connection string for your cluster** from MongoDB Atlas
  (Connection → Drivers → Node.js).
- Keep `JWT_SECRET` as any strong random string.

### 3. Run the server

From the `backend` folder:

```bash
npm start
```

You should see:

- `MongoDB connected`
- `Server running on port 5000`

### 4. Frontend expectations

Your React app already calls:

- `http://localhost:5000/api/auth/register`
- `http://localhost:5000/api/auth/login`
- `http://localhost:5000/api/todo`

Once the server is running and `.env` is correct, registration, login, and todo creation
should all work from the frontend.

