import { SLEmailer, EmailTemplates } from '../src'

describe('Send Email', () => {
  it('Send email to dev', async () => {
    const service = new SLEmailer()
    service.singleEmail = 'chrisdevenv@gmail.com'
    await expect(
      service.send('dev', await EmailTemplates.getTemplate001()),
    ).resolves.not.toThrow()
  })

  it('Send email to team', async () => {
    const service = new SLEmailer()
    service.smallBatch = [
      'chrisdevenv@gmail.com',
      'infinitychristopher@gmail.com',
    ]
    await expect(
      service.send('team', await EmailTemplates.getTemplate001()),
    ).resolves.not.toThrow()
  })

  it('Send email to prod', async () => {
    const service = new SLEmailer()
    service.largeBatch = [
      'chrisdevenv@gmail.com',
      'infinitychristopher@gmail.com',
    ]
    await expect(
      service.send('prod', await EmailTemplates.getTemplate001()),
    ).resolves.not.toThrow()
  })
})
