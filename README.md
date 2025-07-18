# PEAK - Canadian Outdoor E-commerce Platform

A fully functional e-commerce platform built from scratch, targeting the Canadian outdoor market. This project demonstrates essential full-stack development skills with production-ready architecture and modern development practices

- Authentication with role-based access (NextAuth)
- Admin dashboard for product and order management
- Product catalog, shopping cart, and order flow
- PostgreSQL schema with REST API using Node.js
- CI/CD pipeline with GitHub Actions and Vercel


## Tech Stack
- **Frontend**: React, Tailwind CSS  
- **Backend**: Node.js, Next.js  
- **Database**: PostgreSQL  
- **Documentation**: Swagger  
- **Testing**: Jest, Supertest  
- **CI/CD**: GitHub Actions (test & build), Vercel (auto deployment)


## Featured Libraries
- Prisma ORM: for DB access and easy db migration
- Next.js API Routes for handling auth requests
- Zustand for client side auth state management
- Docker for containerized Postgres and app environments


## Features
1. Auth
- Smart login/signup logic: Checks if an email exists --> dynamically shows login or signup form.
- Secure JWT + Cookie-based Authentication
  - Validates user credentials using hashed passwords
      On success:
        generate accessToken: valid for 15 min
        generate refreshToken: valid for 7 days
  - save a session record in the database containing both tokens and expiration info
  - sends both tokens to the browser as Http-only cookies