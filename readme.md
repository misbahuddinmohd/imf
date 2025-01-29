# IMF Gadget Management API

## Overview
The **Impossible Missions Force (IMF)** requires a secure API to manage their high-tech gadgets. This project is built as part of an assignment for the **Backend Developer Role at Upraised**. It provides endpoints to manage gadget inventory, update statuses, and trigger self-destruct sequences.

## Tech Stack
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **PostgreSQL** - Relational database
- **Prisma** - ORM for database interactions

## Features
### 1. Gadget Inventory (`/gadgets`)
- **GET**: Retrieve all gadgets with a randomly generated "mission success probability" for each.
- **POST**: Add a new gadget with a unique, randomly generated codename.
- **PATCH**: Update an existing gadget's information.
- **DELETE**: Mark a gadget as **"Decommissioned"** instead of deleting it, with a timestamp.

### 2. Self-Destruct Sequence (`/gadgets/{id}/self-destruct`)
- **POST**: Trigger a gadget's self-destruct sequence, requiring a randomly generated confirmation code.

## Data Model
### Gadgets Table
| Field  | Type   | Description |
|--------|--------|-------------|
| `id` | UUID | Unique identifier |
| `name` | String | Gadget name |
| `status` | Enum | `Available`, `Deployed`, `Destroyed`, `Decommissioned` |
| `statusTimeStamp` | Timestamp (nullable) | Time of decommissioning |

## Bonus Features
- **Authentication & Authorization**: JWT-based authentication to protect API endpoints.
- **Filtering**: `GET /gadgets?status={status}` to filter gadgets by status.
- **Deployment**: Hosted on **Vercel** for easy access.

## Installation & Setup
### Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL database
- Environment variables setup (`.env` file)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/misbahuddinmohd/imf.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in `.env`:
   ```sh
   DATABASE_URL=your_postgres_connection_string
   JWT_SECRET=your_secret_key
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
5. Start the server:
   ```sh
   npm start
   ```

## API Documentation
### Refer: `https://documenter.getpostman.com/view/26687626/2sAYQiCTRz#ff5ec187-7396-4612-9d69-ddf74a9474c0`
