import zodErrorsParser from '@/zodErrorsParser'
import z from 'zod'

describe('GET', () => {
  // Client errors
  test('try to get a bad request response', () => {
    const schema = z.object({
      email: z
        .email('Send a valid email')
        .nonempty('Email require'),
      password: z.string().nonempty('Password require')
    })

    const data = {
      email: '',
      password: ''
    }

    const parsedData = schema.safeParse(data)

    const parsedErrors = zodErrorsParser(parsedData.error!.issues, { onlyFirstError: false })

    const [ firstEmailError, secondEmailError ] = parsedErrors.email
    const [ firstPasswordError ] = parsedErrors.password
    
    expect(firstEmailError).toBe('Send a valid email')
    expect(secondEmailError).toBe('Email require')
    expect(firstPasswordError).toBe('Password require')
  })

  // test('try to get a unauthorized response', async () => {
  //   const response = await request(server).get('/unauthorized').send()
  //   expect(response.status).toBe(ClientErrorCodes.unauthorized)
  //   expect(response.body.statusCode).toBe(undefined)
  //   expect(response.body.message).toBe('Unauthorized')
  //   expect(response.body.details.detailsMessage).toBe('This are important details')
  // })

})
