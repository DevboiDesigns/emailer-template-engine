# Email Template Engine [Open Source]

This is a dynamic template email engine. You can design html ([mjml](https://mjml.io)) views and in one click send to your entire user database.

- [SendGrid Docs](https://www.twilio.com/docs/sendgrid/for-developers?_gl=1*clryzh*_gcl_au*MTI1NzQzNjQ1My4xNzI3OTQ2MTY2*_ga*NDY5MDcxMTY4LjE3Mjc5NDYxNjc.*_ga_8W5LR442LD*MTcyNzk0NjE2Ny4xLjEuMTcyNzk0NzgzNC4wLjAuMA..)

## Setup

1. clone repo
2. `npm i`
3. `cp .env.example .env` - fill in SendGrid API Key
4. Run

# Emails

## Creating a view

The template engine uses [mjml](https://mjml.io) views and [handlebars](https://handlebarsjs.com) to complie with imbedded properties

1. Desgin a view in the templates directory in mjml
2. Create a new property in EmailTemplates
   - set the subject
   - file path
   - compile view
   - set injected properties
   - return html

## Sending an Email
