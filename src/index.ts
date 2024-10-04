import SendGridType from './model/sendgrid.interface'
import EmailTemplates from './templates'
import SendGrid from './libs/sendgrid.lib'

// Send Email Type
type SendEmailType = 'one' | 'many' | 'all'

class EmailerEngine {
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
        case 'many':
          // ---------------- SEND MULTIPLE TEST EMAILS ----------------
          const emails = this.smallBatch

          await this.service.sendSmallBatch(
            emails,
            template.subject,
            template.html,
          )
          console.log('Emails sent')
          break
        case 'one':
          // ---------------- SEND ONE EMAIL ----------------
          await this.service.sendSingleEmail(
            this.singleEmail,
            template.subject,
            template.html,
          )
          console.log('Email sent')
          break
        case 'all':
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

export { EmailerEngine, EmailTemplates, SendGrid }

//* ---- SEND EMAIL TEST ----
const t = async () => {
  const service = new EmailerEngine(SendGrid)
  service.singleEmail = 'test@test.com'
  // service.smallBatch = ['test@test.com']
  // service.largeBatch = ['test@test.com']   // Intended for amounts over 1000
  service.send('one', await EmailTemplates.getTemplate001())
}
t()
