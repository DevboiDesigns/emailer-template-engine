import { EmailerEngine, EmailTemplates } from '../src'

describe('Send Email', () => {
  it('Send single email', async () => {
    const service = new EmailerEngine()
    service.singleEmail = 'chrisdevenv@gmail.com'
    await expect(
      service.send('one', await EmailTemplates.getTemplate001()),
    ).resolves.not.toThrow()
  })

  it('Send small batch of emails', async () => {
    const service = new EmailerEngine()
    service.smallBatch = [
      'chrisdevenv@gmail.com',
      'infinitychristopher@gmail.com',
    ]
    await expect(
      service.send('many', await EmailTemplates.getTemplate001()),
    ).resolves.not.toThrow()
  })

  it('Send large batch of emails', async () => {
    const service = new EmailerEngine()
    service.largeBatch = [
      'chrisdevenv@gmail.com',
      'infinitychristopher@gmail.com',
    ]
    await expect(
      service.send('all', await EmailTemplates.getTemplate001()),
    ).resolves.not.toThrow()
  })
})
