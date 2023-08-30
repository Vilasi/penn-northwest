# penn-northwest

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
- (Maybe) reCaptcha
- Stripe Connect (Be sure to setup account notifications and customer email settings here https://dashboard.stripe.com/settings --- https://dashboard.stripe.com/settings/user --- https://dashboard.stripe.com/settings/communication-preferences)

## Packages to Look at

Dinero.js for handling monetary value conversions (maybe)
