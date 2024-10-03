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

**Example Template**

```ts
static getTemplate001 = async () => {
    const subject = `Free Advice Market Features`
    // set the file path to the mjml template to be sent
    let FILEPATH = 'src/templates/template_001.mjml'
    // mjml template file path
    const view = fs.readFileSync(FILEPATH, 'utf8')
    // Compile the template
    const template = compile(view)
    // Content to be injected into the template
    const context = {
      offerInfo: '* Offer valid for a limited time',
      bodyMessage: 'Questions & Consultations are now Free!',
      bodyHeader: 'Advice Market',
      titleMessage: 'StockLift',
      bodySubMessage: 'It has never been faster to connect with an Expert',
    }
    // Render the template with the context
    const mjml = template(context)
    // Convert mjml to html
    const html = mjml2html(mjml)
    if (html.errors.length) {
      console.error(html.errors)
    }
    // Return the html and the TITLE of the email
    return { html: html.html, subject }
  }
```

## Sending an Email

There are 3 different ways to send an email:

- `dev`
- `team`
- `prod`

1. Create an EmailerEngine Object with the provided SendGrid object or one that conforms to [SendGridType](/Users/devboi/GitHub/emailer-template-engine/src/model/sendgrid.interface.ts)`sendgrid.interface.ts`
2. Set the emails to send to
3. Send!

```ts
const service = new EmailerEngine(SendGrid)
service.singleEmail = 'test@test.com'
service.smallBatch = ['test@test.com']
// Intended for amounts over 1000
service.largeBatch = ['test@test.com']
service.send('dev', await EmailTemplates.getTemplate001())
```
