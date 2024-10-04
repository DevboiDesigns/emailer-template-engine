abstract class SendGridType {
  static sendSmallBatch: (
    emails: string[],
    subject: string,
    html: string,
  ) => Promise<void>
  static sendSingleEmail: (
    email: string,
    subject: string,
    html: string,
  ) => Promise<void>
  static sendEmailWAttachment: (
    email: string,
    subject: string,
    html: string,
    attachment: string,
    fileName: string,
    fileType: string,
  ) => Promise<void>
  static sendLargeBatch: (
    subject: string,
    html: string,
    emails: string[],
  ) => Promise<void>
}

export default SendGridType
