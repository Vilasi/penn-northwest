# Penn-Northwest Web Server

**NOTE! This is an interim development README and does not fully reflect the state of the project**

This is a web server for the Penn-Northwest Community built using HTML, CSS, JavaScript, EJS, Express, and MongoDB. It features user authentication, event and membership management, payment handling, automated email sending, and many others.

**Link to project:** [https://www.penn-northwest.com/](#)

![Penn-Northwest Home Page Image](https://i.imgur.com/O6l9XPQ.png)

## How It's Made:

### Tech Used

- **HTML, CSS, JavaScript**
- **Express.js**
- **EJS for Templating**
- **Bootstrap v5.2**
- **Mongoose & MongoDB**
- **Passport for Authentication**
- **Connect-Flash for Flash Messages**
- **Express-Async-Errors for Error Handling**
- **Express-Session for Session Management**
- **Connect-Mongo for MongoDB Session Store**

### Core Features

1. **CRUD Functionality**
2. **RESTful Architecture**
3. **User Login/Registration Authentication System**
4. **Automated Email Sending**
5. **Payment Handling System**

## Optimizations

1. **Async Error Handling**: Instead of having try-catch blocks in each route, used `express-async-errors` for catching asynchronous errors.
2. **Database Input Sanitization**: Used `express-mongo-sanitize` to sanitize user inputs before storing them in the database.
3. **Session Store**: Used `connect-mongo` to store session information in MongoDB, instead of the default memory storage, for better scalability.
4. **Flash Messages**: Utilized `connect-flash` for better user experience by displaying informational messages.

## Lessons Learned:

1. **DRY Principles**: Always follow DRY (Don't Repeat Yourself) principles. For example, middleware and route definitions were organized into separate files for better code reusability.
2. **Error Handling**: Learning how to create custom error-handling middlewares helped me understand the importance of good user experience, even when things go wrong.
3. **Authentication**: Implementing authentication using Passport gave me a deeper understanding of how user authentication and session management work in real-world applications.

## Some other projects of mine:

Check out other projects in my portfolio:

- [Homegrown Mercer County](https://homegrownmc.com/)
- [TaskForge](https://task-forge-ten.vercel.app/)
