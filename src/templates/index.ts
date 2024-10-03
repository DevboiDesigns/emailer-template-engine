import fs from 'fs'
import handleBars from 'handlebars'
const { compile } = handleBars
import mjml2html from 'mjml'

//TODO: resolve path to file for npm package architecture

import path from 'path'
import { promisify } from 'util'
const readFilep = promisify(fs.readFile)

async function loadConfig(filename = 'template_001.mjml') {
  const configPath = path.resolve(
    path.dirname(require.main?.filename || ''),
    filename,
  )
  try {
    try {
      const data = await readFilep(configPath, 'utf8')
      return data
      return JSON.parse(data)
    } catch (err) {
      console.log(err)
    }
    // return fs.readFileSync(configPath, "utf8")
    // return JSON.parse(data)
  } catch (err) {
    console.log(err)
  }
}

export default class EmailTemplates {
  //**** ------- TEMPLATE 001 ------- ****
  // Advice Market - Questions and Consultation are now free
  // Black background with white text and blue button that opens the app
  // htmlTemplate001 = AMTemplate.getTemplate001()
  static getTemplate001 = async () => {
    const subject = `Free Advice Market Features`
    // set the file path to the mjml template to be sent
    let FILEPATH = 'src/templates/template_001.mjml'
    // let FILEPATH = "./template_001.mjml"
    // mjml template file path
    // const view = await loadConfig()
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
}

// const t = async () => {
//   const r = await loadConfig()
//   console.log(r)
// }
// t()
