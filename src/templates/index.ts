import fs from 'fs'
import path from 'node:path'
import mjml2html from 'mjml'
import handleBars from 'handlebars'
const { compile } = handleBars

const loadviewfromfile = (
  filename: string,
): HandlebarsTemplateDelegate<any> => {
  const fullPath = path.join(__dirname, filename)
  try {
    const view = fs.readFileSync(fullPath, 'utf8')
    const template = compile(view)
    return template
  } catch (err) {
    console.log(err)
    throw err
  }
}

export default class EmailTemplates {
  //**** ------- TEMPLATE 001 ------- ****
  // Advice Market - Questions and Consultation are now free
  // Black background with white text and blue button that opens the app
  static getTemplate001 = async () => {
    const subject = `Free Advice Market Features`
    // Compile the template
    const template = loadviewfromfile('template_001.mjml')
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
    // Return the html and the subject of the email
    return { html: html.html, subject }
  }
}
