import { zodErrorsParser, zodArrayErrorParser } from '@/zodErrorsParser'
import z from 'zod'

describe('Get all errors', () => {
  test('Get all errors', () => {
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

  test('Get all errors from an array', () => {
    const userSchema = z.object({
      name: z.string('Envie texto plano')
        .min(6, 'Minimo 6 caracteres'),
      email: z.email('Envie un email')
    })

    const userArray = userSchema.array()

    const users = [
      { name: 'abc', email: 'examplemail.com' },
      { name: 'def', email: 'examplemail.com' }
    ]

    const parsedData = userArray.safeParse(users)

    const errors = zodArrayErrorParser(parsedData.error?.issues ?? [])
    
    expect(errors['0']).toBeDefined()
    expect(errors['0'].name[0]).toBe('Minimo 6 caracteres')
    expect(errors['0'].email[0]).toBe('Envie un email')
    expect(errors['1']).toBeDefined()
    expect(errors['1'].name[0]).toBe('Minimo 6 caracteres')
    expect(errors['1'].email[0]).toBe('Envie un email')
  })

  // test('try to get a unauthorized response', async () => {
  //   const response = await request(server).get('/unauthorized').send()
  //   expect(response.status).toBe(ClientErrorCodes.unauthorized)
  //   expect(response.body.statusCode).toBe(undefined)
  //   expect(response.body.message).toBe('Unauthorized')
  //   expect(response.body.details.detailsMessage).toBe('This are important details')
  // })

})
