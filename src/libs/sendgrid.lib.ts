import sendgrid from '../config/sendgrid'
import SendGridType from '../model/sendgrid.interface'
import _ from 'lodash'

//* SENDGRID LIMITS TO 1000 EMAILS PER Request
export default class SendGrid implements SendGridType {
  // ---------------- FROM EMAIL
  static fromEmail = 'visrule@pm.me'
  //* MULTLIPLE EMAILS
  static sendSmallBatch = async (
    emails: string[],
    subject: string,
    html: string,
  ) => {
    try {
      // SENDS multliple and prevents users from seeing each others emails
      // SENDGRID LIMITS TO 1000 EMAILS PER Request
      await sendgrid.sendMultiple(SendGrid.makeEmails(emails, subject, html))
    } catch (err) {
      console.error(err)
      console.error('Error sending multiple emails')
      throw new Error('Error sending multiple emails')
    }
  }

  //* SINGLE EMAIL
  static sendSingleEmail = async (
    email: string,
    subject: string,
    html: string,
  ) => {
    try {
      await sendgrid.send(SendGrid.makeEmail(email, subject, html))
    } catch (err) {
      console.error(err)
      console.error('Error sending email-sendEmail')
      throw new Error('Error sending email-sendEmail')
    }
  }

  //* SINGLE EMAIL with Attachmentn
  static sendEmailWAttachment = async (
    email: string,
    subject: string,
    html: string,
    attachment: string,
    fileName: string,
    fileType: string,
  ) => {
    try {
      await sendgrid.send(
        SendGrid.makeEmailWithAttachment(
          email,
          subject,
          html,
          attachment,
          fileName,
          fileType,
        ),
      )
    } catch (err) {
      console.error(err)
      console.error('Error sending email--sendEmailWAttachment')
      throw new Error('Error sending email--sendEmailWAttachment')
    }
  }

  static sendLargeBatch = async (
    subject: string,
    html: string,
    emails: string[],
  ) => {
    try {
      emails = emails.filter(
        (email) => email !== undefined && email !== '' && email !== null,
      )
      // SENDGRID LIMITS TO 1000 EMAILS PER Request
      // batch email in groups of 1000 to prevent sendgrid error
      // * will throw an error but ignore it, the emails will still be sent
      const batches = _.chunk(emails, 500)
      for (const batch of batches) {
        await sendgrid.sendMultiple(SendGrid.makeEmails(batch, subject, html))
      }
    } catch (err) {
      console.error(err)
      console.error('Error sending email--sendToAllUsers')
    }
  }

  // ----------------- EMAIL MAKER
  static makeEmailWithAttachment = (
    email: string,
    subject: string,
    html: string,
    attachment: string,
    fileName: string,
    fileType: string,
  ) => {
    return {
      to: email,
      from: this.fromEmail,
      subject: subject,
      text: subject,
      html: html,
      attachments: [
        {
          content: attachment,
          filename: fileName,
          type: `application/${fileType}`,
          disposition: 'attachment',
        },
      ],
    }
  }

  // ----------------- EMAIL MAKER
  static makeEmail = (email: string, subject: string, html: string) => {
    return {
      to: email,
      from: this.fromEmail,
      subject: subject,
      text: subject,
      html: html,
    }
  }

  // ----------------- EMAIL MAKER
  static makeEmails = (emails: string[], subject: string, html: string) => {
    return {
      to: emails,
      from: this.fromEmail,
      subject: subject,
      text: subject,
      html: html,
    }
  }
}
