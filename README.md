# Kainos Jobs

Kainos Jobs is an online job application platform designed to serve both Kainos recruitment admins and job applicants. Recruitment admins can retrieve and update job roles and their relevant information, while applicants can browse and apply for available positions.
## Table of Contents
- Getting Started
- Front-End
  - Installation
  - Running the Application
  - Testing
  - Linting
- Back-End
  - Installation
  - Database Initialization
  - Running the Application
  - Testing
  - Linting

## Getting Started

To get started with the Kainos Jobs application, clone both repositories:

- Backend: `lc-kainosjobs-back`
- Frontend: `lc-kainosjobs-front`

## Front-End

### Installation

Navigate to the front-end directory and install all dependencies:

```bash
npm install
```

### Running the Application

To run the front-end application, use the following command:

```bash
npm start
```

### Testing

To run tests for the front-end application, use:

```bash
npm test
```

### Linting

To lint the front-end code, ensure you have the necessary linting tools installed and run:

```bash
npm run lint
```

## Back-End

### Installation

Navigate to the back-end directory and install all dependencies:

```bash
npm install
```

### Database Initialization

Initialize the database and Flyway by adding the following environment variables to your `.zshrc` file (or equivalent):

```bash
export FLYWAY_URL=""
export FLYWAY_USER=""
export FLYWAY_PASSWORD=""
export FLYWAY_BASELINE_ON_MIGRATE=true
export EXPIRATION_TIME=""

export DB_USERNAME=""
export DB_PASSWORD=""
export DB_HOST=""
export DB_NAME=""
export SESSION_SECRET=""
export API_URL=""
```

### Running Migrations

To run migrations to the MySQL server using Maven, use the following command:

```bash
mvn migrate
```

### Running the Application

In `KainosJobsApplication.java`, right-click the play button beside `public class KainosJobsApplication` and select "Modify Run Configuration." Underneath Java 22, enter `server` as the argument.

From now on, pressing the play button will run the application.

### Testing

To run tests for the back-end application, use:

```bash
mvn clean test
```

### Linting

To lint the back-end code, install Checkstyle and run:

```bash
mvn checkstyle:check
```
