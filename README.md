## Demo Project: Clock Dashboard using Laravel 10, Vue.js 3 and Pinia (Vuex alternative)

![Dashboard](images/dashboard.png)

### Technologies

- Laravel 10
- Vue.js 3
- Inertia.js
- Pinia (Vuex alternative)
- Tailwind CSS
- Laravel Breeze

### Features

- Login
- Logout
- Register
- Forgot Password
- Dashboard
- Clock with customisable time offset (persisted in database)
- PHP Unit Tests
- Vue.js Unit Tests
- Containerised with Docker / Docker Compose

### Installation

1. Clone the repository
2. Install `docker` and `docker-compose`
3. Change directory to the project root e.g. `cd laravel-vue3-clock`
4. Run `make build` to build the containers and install dependencies
5. Run `make up` to build and start the containers
6. Run `make migrate` to run db migrations
7. All Set! Navigate to http://localhost in your browser
8. Register as a new user and access the dashboard

#### Development

- Run `make up` and `make down` to start & stop containers
- Run `make npm-dev` to run the vite in watch mode
- Run `make help` for other available commands

### Running Tests

- Run `make test-ui` to run the Vue.js tests
- Run `make test` to run the PHP tests

### Screenshots

![UI Tests](images/ui-tests.png)

![PHP Tests](images/php-tests.png)
