# Barbershop Management System API
The Barbershop Management System automates the workflow of a barbershop manager by maintaining a database of clients and haircuts. The system tracks customer information, haircut types, and pricing. Clients who complete five haircuts become regular customers and receive a 3% discount on future services. The system also records transaction details(visits), including the haircut type, client, and date. Additionally, it supports multiple branches and historical price tracking for better financial management.

## Technologies Used:  
- NestJS – Scalable backend framework  
- JWT – Authentication & authorization  
- Passport.js – Secure user authentication  
- Mongoose – MongoDB ODM for data management
- Swagger – API documentation  


## Installation

### Clone the repository:
```bash
git clone https://github.com/maksympelyno/barbershop_api
```

### Install dependencies:
```bash
npm install
```

### Create a `.env` file:
Create a `.env` file in the root directory and add the fields to it MOGNO_URI and JWT_SECRET.

### Start the server:
```bash
npm run start:dev
```
The server will start on port **5000**.

## Usage
### Access the API:
Navigate to `http://localhost:5000` .

### Swagger documentation:
Navigate to `http://localhost:5000/api/` to view swagger doc.

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
