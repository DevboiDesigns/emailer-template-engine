import { SLEmailer, EmailTemplates } from '../src'

describe('Send Email', () => {
  it('Send email to dev', async () => {
    const service = new SLEmailer()
    service.devEmail = 'chrisdevenv@gmail.com'
    await service.send('dev', await EmailTemplates.getTemplate001())
  })
  it('Send email to team', async () => {
    const service = new SLEmailer()
    service.teamEmails = [
      'chrisdevenv@gmail.com',
      'infinitychristopher@gmail.com',
    ]
    await service.send('team', await EmailTemplates.getTemplate001())
  })
  it('Send email to prod', async () => {
    const service = new SLEmailer()
    service.prodEmails = [
      'chrisdevenv@gmail.com',
      'infinitychristopher@gmail.com',
    ]
    await service.send('prod', await EmailTemplates.getTemplate001())
  })
})
