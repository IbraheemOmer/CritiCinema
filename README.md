# CritiCinema

CritiCinema is a web application that allows users to submit their movie reviews and watch movie trailers. The application includes an admin panel where new movie details can be added. The database for this application is MongoDB.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)

## Features

- **User Reviews**: Users can submit their reviews for movies.
- **Movie Trailers**: Users can watch trailers for various movies.
- **Admin Panel**: Admins can add new movie details, including title, description, and trailers.
- **MongoDB Integration**: The application uses MongoDB for data storage.

## Technologies Used

- **Frontend**: React
- **Backend**: Spring Boot
- **Database**: MongoDB

## Folder Structure

```
CritiCinema/
│
├── web-project-react/       # Frontend files
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── README.md
│   └── ...
│
├── web-project-springboot/  # Backend files
│   ├── src/
│   ├── pom.xml
│   ├── README.md
│   └── ...
│
├── README.md                # Project README
└── ...
```

## Setup and Installation

### Prerequisites

- Node.js and npm installed
- Java JDK and Maven installed
- MongoDB installed and running

### Frontend Setup

1. Navigate to the `web-project-react` folder:

   ```sh
   cd web-project-react
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the React development server:

   ```sh
   npm start
   ```

### Backend Setup

1. Navigate to the `web-project-springboot` folder:

   ```sh
   cd web-project-springboot
   ```

2. Build the Spring Boot application:

   ```sh
   mvn clean install
   ```

3. Run the Spring Boot application:

   ```sh
   mvn spring-boot:run
   ```

### MongoDB Setup

1. Ensure MongoDB is running on its default port.

2. The application will automatically connect to the MongoDB instance. Ensure the MongoDB connection settings in the Spring Boot application (`application.properties`) are correct.

## Usage

1. Open your web browser and navigate to `http://localhost:3000` to access the React frontend.

2. Use the frontend interface to browse movies, submit reviews, and watch trailers.

3. Admin users can log in to the admin panel to add new movie details.