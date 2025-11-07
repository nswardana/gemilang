# PZ-KSUZ Backend (Node.js + Express + Sequelize)

## Setup

1. Copy `.env.example` to `.env` and update DB credentials.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Seed initial data:
   ```bash
   npm run seed
   ```
4. Start server:
   ```bash
   npm start
   ```

## Endpoints

- `GET /api/categories` - list categories
- `GET /api/categories/:id/groups` - list groups for a category
- `GET /api/groups/:id/members` - list members for a group
- `GET /api/members/:id` - get member detail
- `PUT /api/members/:id` - update member

Models: Category, GroupName (table `group_names`), Member (table `members`)
