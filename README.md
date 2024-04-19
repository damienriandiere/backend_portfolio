## Project Description

The objective of this project is to develop a website that can serve as a portfolio for your IT or other projects.

- The website will be fullstack.
- The mandatory programming language to be used is JavaScript.
- The backend will be developed using Node.js, Express, and optionally MongoDB or PostgreSQL.
- The frontend will be developed using React.js. You can find the repository for the frontend [here](https://github.com/damienriandiere/frontend_portfolio).
  - The usage of frameworks based on React.js (e.g., Next.js) is prohibited.
  - The usage of website templates is prohibited.

### Sections

One section of the site is for unrestricted browsing. It will include, at a minimum:
- A personal presentation page with a form to send you an email message.
- A project presentation page that will list all projects in their reduced version (Thumbnail, title, introductory description, see project description below).
  - By clicking on a project in this list, all specific project information should appear.
- A mechanism to log in and log out of the admin section (see below).

One section of the site is dedicated to administration, and its access is protected.
- Only users with an account will be able to access it and will therefore be called admins.
- Within this section, you must enable an admin user to create, update, and delete a project.
- The admin section must also have a page showing analytics on the projects.

### Project Object

A project object consists of the following elements:
- A title
- An introductory description (limited to 80 characters)
- A complete description (limited to 250 words)
- A list of keywords (up to 10)
- A thumbnail image
- One to five illustration images
- Any other elements you deem of interest.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development mode](#development-mode)
- [Generate swagger](#generate-swagger)
- [Project structure](#project-structure)
- [License](#license)

## Installation

1. Clone the repository

```bash	
git clone https://github.com/damienriandiere/Backend_fullstack_2024.git
```
2. Navigate to the project directory

```bash
cd Backend_fullstack_2024/backend
```

3. Install dependencies

```bash
pnpm install
```

4. Create a file named `.env` and fix the variables.

```bash	
# env.sample
ACCESS_KEY_SECRET= #Secret for the access token
DB_URL= #URL for the database
PORT= #Port number for the server
REFRESH_KEY_SECRET= #Secret for the refresh token
URL= #URL for the server
```

## Usage

```bash
pnpm run start
```

## Development mode

```bash
pnpm run dev
```

## Generate swagger
  
  ```bash
  pnpm run swagger-autogen
  ```

## Project structure

```
|── backend
  ├── request # Request examples
  ├── src # Source code
  │   ├── controllers # Controllers for each route
  │   ├── middlewares # Middlewares like error handler or auth
  │   ├── models # Models for each entity
  │   ├── routes # Routes for requests
  │   ├── services # Services for data manipulation and logic
  │   ├── utils # Utils for common functions
  │   └── server.js # App entry point
  |── .env # Environment variables
  |── .eslintrc.json # Eslint config
  |── .gitattributes # Gitattributes
  |── .gitignore # Gitignore
  |── Dockerfile # Dockerfile
  |── LICENSE # MIT License
  |── package.json # Package.json
  |── pnpm-lock.yaml # Pnpm lock file
|── docker-compose.yml # Docker compose file
|── README.md # Readme

```

## License

This project is licensed under the terms of the

[MIT](https://choosealicense.com/licenses/mit/)