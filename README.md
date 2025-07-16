# Fullstack E-commerce App

This is a fully functional ecommerce platform I built from scratch, focusing on essential fullstack features required in real-world applications.

The interface is kept simple to highlight core functionality and user flow.  
All key features were built from scratch, without using boilerplate or templates.

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


## Features
1. Auth
This project implements custom authentication logic using bcrypt for password hashing and jsonwebtoken (JWT) for stateless session handling. No external authentication framework like NextAuth was used.