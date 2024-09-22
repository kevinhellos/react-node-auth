# SQLite3 Node REST
Node JS REST API with SQLite3

## Setup
### Step 1
- Run ```npm install```

### Step 2
- If you're on a MacOS: run ```npm run build-db```
- If you're on a Windows OS: run ```npm run build-db-win```

### Step 3
- Run ```node index```
- Your api will be served in [http://localhost:3000](http://localhost:3000)

## Available routes
Default port number is 3000

### GET - /api/menus
- Retrieves all menu items from the database

### GET - /api/menus/:id
- Retrieves a specific menu item from the database by id

### POST - /api/menus
- Creates a new menu item in the database

### PATCH - /api/menus/:id
- Updates a specific menu item in the database by id

### DELETE - /api/menus/:id
- Deletes a specific menu item from the database by id