# Penn-Northwest Web Server

This is a web server for the Penn-Northwest Community built using Node.js and Express. It features user authentication, event and membership management, and other core functionalities.

**Link to project:** [http://your-live-demo-link.com/](#)

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

### Tech Used

- **Node.js**
- **Express.js**
- **EJS for Templating**
- **Mongoose for MongoDB interaction**
- **Passport for Authentication**
- **Connect-Flash for Flash Messages**
- **Method-Override for HTTP Verb Overriding**
- **Morgan for Logging**
- **Express-Async-Errors for Error Handling**
- **Express-Session for Session Management**
- **Connect-Mongo for MongoDB Session Store**

### Core Features

1. **Environment Configuration**: Used `dotenv` to handle environment variables when not in production.
2. **Database Connection**: Utilized Mongoose to connect to a MongoDB database.
3. **Middleware Stack**: Added essential middlewares like `morgan` for logging, `method-override` for PUT and DELETE requests, and `express-session` for session management.
4. **Authentication**: Used `passport` and `passport-local` strategy for authentication.
5. **Routes**: Organized routes into separate modules for better maintainability.
6. **Error Handling**: Utilized custom error-handling middleware to gracefully handle errors.

## Optimizations

1. **Async Error Handling**: Instead of having try-catch blocks in each route, used `express-async-errors` for catching asynchronous errors.
2. **Database Input Sanitization**: Used `express-mongo-sanitize` to sanitize user inputs before storing them in the database.
3. **Session Store**: Used `connect-mongo` to store session information in MongoDB, instead of the default memory storage, for better scalability.
4. **Flash Messages**: Utilized `connect-flash` for better user experience by displaying informational messages.

## Lessons Learned:

1. **DRY Principles**: Always follow DRY (Don't Repeat Yourself) principles. For example, middleware and route definitions were organized into separate files for better code reusability.
2. **Error Handling**: Learning how to create custom error-handling middlewares helped me understand the importance of good user experience, even when things go wrong.
3. **Authentication**: Implementing authentication using Passport gave me a deeper understanding of how user authentication and session management work in real-world applications.

## Examples:

Please check out other projects in my portfolio:

- [Example Project 1](https://github.com/your-username/example-project-1)
- [Example Project 2](https://github.com/your-username/example-project-2)

# penn-northwest ------- BEGIN NOTES

The Penn-Northwest Website

## Site Content Layout:

### Landing Page:

### NAV

- Home
- Events
- Membership

Checkout the google font "Georama"

## Payment

stripe connect

https://stripe.com/connect

## Cloudinary Image Hosting

- The url returned is in the following format

  https://res.cloudinary.com/<cloud_name>/<asset_type>/<delivery_type>/<transformations>/<version>/<public_id_full_path>.<extension>

## Connected Accounts Requiring Handoff -----

- Cloudinary
- SendGrid Email
- (Maybe) reCaptcha - find at: google.com/recaptcha/admin
- Stripe Connect (Be sure to setup account notifications and customer email settings here https://dashboard.stripe.com/settings --- https://dashboard.stripe.com/settings/user --- https://dashboard.stripe.com/settings/communication-preferences)

## Packages to Look at

Dinero.js for handling monetary value conversions (maybe)
