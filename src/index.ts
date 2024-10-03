import ISendGrid from './model/sendgrid.interface'
import EmailTemplates from './templates'
import SendGrid from './libs/sendgrid.lib'

// Send Email Type
type SendEmailType = 'dev' | 'team' | 'prod'

class SLEmailer {
  devEmail = 'chrisdevenv@gmail.com'
  teamEmails: string[] = []
  prodEmails: string[] = []
  // typeof ISendGrid to use static methods
  constructor(readonly service: typeof ISendGrid = SendGrid) {}

  ///* ----------------- SEND EMAIL ----------------- */
  /// -----------------------------------------------
  send = async (
    sendType: SendEmailType,
    template: {
      html: string
      title: string
    },
  ) => {
    switch (sendType) {
      case 'team':
        // ---------------- SEND MULTIPLE TEST EMAILS ----------------
        const emails = this.teamEmails

        await this.service.sendMultipleEmails(
          emails,
          template.title,
          template.html,
        )
        console.log('Emails sent')
        break
      case 'dev':
        // ---------------- SEND ONE EMAIL ----------------
        await this.service.sendEmail(
          this.devEmail,
          template.title,
          template.html,
        )
        console.log('Email sent')
        break
      case 'prod':
        // ---------------- SEND ALL EMAILS ----------------
        try {
          await this.service.sendToAllUsers(
            template.title,
            template.html,
            this.prodEmails,
          )
        } catch (err) {
          console.log('Error sending emails')
          console.log(err)
        }
        console.log('Emails sent')
        break
      default:
        console.log('Invalid sendType')
        break
    }
  }
}

export { SLEmailer, EmailTemplates, SendGrid }

//* ---- SEND EMAIL TEST ----
// import SendGrid from "./libs/sendgrid.lib"
// const t = async () => {
//   const service = new SLEmailer(SendGrid)
//   // service.devEmail = "test@test.com"
//   service.send("dev", await EmailTemplates.getTemplate001())
// }
// t()
