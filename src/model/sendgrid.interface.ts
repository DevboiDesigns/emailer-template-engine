abstract class ISendGrid {
  static sendMultipleEmails: (
    emails: string[],
    subject: string,
    html: string
  ) => Promise<void>
  static sendEmail: (
    email: string,
    subject: string,
    html: string
  ) => Promise<void>
  static sendEmailWAttachment: (
    email: string,
    subject: string,
    html: string,
    attachment: string,
    fileName: string,
    fileType: string
  ) => Promise<void>
  static sendToAllUsers: (
    subject: string,
    html: string,
    emails: string[]
  ) => Promise<void>
  static makeEmailWithAttachment: (
    email: string,
    subject: string,
    html: string,
    attachment: string,
    fileName: string,
    fileType: string
  ) => {
    to: string
    from: string
    subject: string
    text: string
    html: string
    attachments: {
      content: string
      filename: string
      type: string
      disposition: string
    }[]
  }
  static makeEmail: (
    email: string,
    subject: string,
    html: string
  ) => {
    to: string
    from: string
    subject: string
    text: string
    html: string
  }
  static makeEmails: (
    emails: string[],
    subject: string,
    html: string
  ) => {
    to: string[]
    from: string
    subject: string
    text: string
    html: string
  }
}

export default ISendGrid
