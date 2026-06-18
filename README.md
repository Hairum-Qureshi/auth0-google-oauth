# Auth0 Configuration

This project uses **Auth0** for authentication and authorization between the React frontend and NestJS backend.

The frontend authenticates users through Auth0 and obtains access tokens. The backend validates JWT access tokens issued by Auth0 before allowing access to protected routes.

---

## Auth0 Setup

Before running the application, you must create both:

1. An **API**
2. A **Single Page Application**

inside your Auth0 tenant.

---

## 1. Create an Auth0 API

Navigate to:

**Auth0 Dashboard → Applications → APIs → Create API**

Configure:

| Field             | Value                                           |
| ----------------- | ----------------------------------------------- |
| Name              | Any name (e.g. `My Nest API`)                   |
| Identifier        | Any unique URI (e.g. `https://api.example.com`) |
| Signing Algorithm | RS256                                           |

After creation, save the following value:

```text
Identifier
```

This value becomes:

```env
AUTH0_AUDIENCE=<API_IDENTIFIER>
```

for both the frontend and backend.

Example:

```env
AUTH0_AUDIENCE=https://api.example.com
```

---

## 2. Create an Auth0 Application

Navigate to:

**Auth0 Dashboard → Applications → Applications → Create Application**

Configure:

| Field            | Value                            |
| ---------------- | -------------------------------- |
| Name             | Any name (e.g. `React Frontend`) |
| Application Type | Single Page Application          |

After creation, obtain:

- Domain
- Client ID

These values will be used in the frontend environment variables.

---

## 3. Configure Application URLs

Inside your Auth0 Application settings, configure:

### Allowed Callback URLs

```text
http://localhost:5173
```

### Allowed Logout URLs

```text
http://localhost:5173
```

### Allowed Web Origins

```text
http://localhost:5173
```

Save the changes.

---

## Frontend Environment Variables

Create a `.env` file inside:

```text
apps/frontend
```

Add:

```env
VITE_AUTH0_DOMAIN=xyz
VITE_AUTH0_CLIENT_ID=xyz
VITE_AUTH0_AUDIENCE=xyz
VITE_BACKEND_URL=http://localhost:4000
```

### Variable Descriptions

#### `VITE_AUTH0_DOMAIN`

Your Auth0 tenant domain.

Example:

```env
VITE_AUTH0_DOMAIN=dev-abc123.us.auth0.com
```

---

#### `VITE_AUTH0_CLIENT_ID`

The Client ID of the Auth0 Single Page Application.

---

#### `VITE_AUTH0_AUDIENCE`

The Identifier value from the Auth0 API.

This audience is requested when obtaining access tokens for backend API access.

---

#### `VITE_BACKEND_URL`

Backend API base URL.

Default:

```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## Backend Environment Variables

Create a `.env` file inside:

```text
apps/backend
```

Add:

```env
PORT=4000
FRONTEND_URL=http://localhost:5173

AUTH0_AUDIENCE=xyz
AUTH0_ISSUER=xyz

JWT_SECRET=xyz
JWT_EXPIRES=259200000
```

### Variable Descriptions

#### `PORT`

Port used by the NestJS server.

Default:

```env
PORT=4000
```

---

#### `FRONTEND_URL`

Frontend origin used for CORS configuration.

Default:

```env
FRONTEND_URL=http://localhost:5173
```

---

#### `AUTH0_AUDIENCE`

The Auth0 API Identifier created earlier.

Example:

```env
AUTH0_AUDIENCE=https://api.example.com
```

---

#### `AUTH0_ISSUER`

Your Auth0 issuer URL.

Example:

```env
AUTH0_ISSUER=https://dev-abc123.us.auth0.com/
```

> The trailing slash is required if your authentication strategy expects the standard Auth0 issuer URL.

---

#### `JWT_SECRET`

Application-specific JWT secret used by backend features that require local token signing.

---

#### `JWT_EXPIRES`

JWT expiration time in milliseconds.

Default:

```env
JWT_EXPIRES=259200000
```

Equivalent to:

```text
3 days
```

---

## Running the Application

Install dependencies from the repository root:

```bash
npm install
```

Start all applications:

```bash
npm run dev
```

Default URLs:

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:4000
```

---

## Authentication Flow

1. User clicks login in the React application.
2. Auth0 authenticates the user.
3. Auth0 returns an access token to the frontend.
4. The frontend includes the token in API requests:

```http
Authorization: Bearer <access_token>
```

5. NestJS validates the token using:

```env
AUTH0_AUDIENCE
AUTH0_ISSUER
```

6. Protected routes become accessible only to authenticated users.
