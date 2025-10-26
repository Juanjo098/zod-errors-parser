import { ZodIssue } from 'zod'

interface Options {
  onlyFirstError: boolean
}

export function zodErrorsParser(errors: ZodIssue[], options: Partial<Options>  = { onlyFirstError: false }) {
  const parsedErrors: { [key: PropertyKey]: string[] } = { }

  const { onlyFirstError } = options

  for (let i = 0; i < errors.length; i++) {
    const { message } = errors[i]
    const [ path ] = errors[i].path

    if (parsedErrors[path] && !onlyFirstError) parsedErrors[path].push(message)
    
    else parsedErrors[path] = [message]
  }

  return parsedErrors
}
