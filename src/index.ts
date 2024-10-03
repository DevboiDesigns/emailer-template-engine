import SendGridType from './model/sendgrid.interface'
import EmailTemplates from './templates'
import SendGrid from './libs/sendgrid.lib'

// Send Email Type
type SendEmailType = 'dev' | 'team' | 'prod'

class SLEmailer {
  singleEmail = 'chrisdevenv@gmail.com'
  smallBatch: string[] = []
  largeBatch: string[] = []
  // typeof ISendGrid to use static methods
  constructor(readonly service: typeof SendGridType = SendGrid) {}

  ///* ----------------- SEND EMAIL ----------------- */
  /// -----------------------------------------------
  send = async (
    sendType: SendEmailType,
    template: {
      html: string
      subject: string
    },
  ) => {
    try {
      switch (sendType) {
        case 'team':
          // ---------------- SEND MULTIPLE TEST EMAILS ----------------
          const emails = this.smallBatch

          await this.service.sendSmallBatch(
            emails,
            template.subject,
            template.html,
          )
          console.log('Emails sent')
          break
        case 'dev':
          // ---------------- SEND ONE EMAIL ----------------
          await this.service.sendSingleEmail(
            this.singleEmail,
            template.subject,
            template.html,
          )
          console.log('Email sent')
          break
        case 'prod':
          // ---------------- SEND ALL EMAILS ----------------
          try {
            await this.service.sendLargeBatch(
              template.subject,
              template.html,
              this.largeBatch,
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
    } catch (err) {
      console.log(err)
      return err
    }
  }
}

export { SLEmailer, EmailTemplates, SendGrid }

//* ---- SEND EMAIL TEST ----
// import SendGrid from "./libs/sendgrid.lib"
// const t = async () => {
//   const service = new SLEmailer(SendGrid)
//   // service.devEmail = "test@test.com"
// service.send("dev", await EmailTemplates.getTemplate001())
// }
// t()
