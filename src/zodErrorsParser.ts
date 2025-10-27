import { ZodIssue } from 'zod'

interface Options {
  onlyFirstError: boolean
}

export function zodErrorsParser(errors: ZodIssue[], options: Partial<Options>  = { onlyFirstError: false }) {
  const parsedErrors: { [key: PropertyKey]: string[] } = { }

  const { onlyFirstError } = options

  if (errors.length === 0) return parsedErrors

  for (let i = 0; i < errors.length; i++) {
    const { message } = errors[i]
    const [ path ] = errors[i].path

    if (parsedErrors[path] && !onlyFirstError) parsedErrors[path].push(message)
    
    else parsedErrors[path] = [message]
  }

  return parsedErrors
}

export function zodArrayErrorParser(errors: ZodIssue[]) {
  const errorList: { [key: PropertyKey]: { [key: PropertyKey]: string[] }} = {  }
  if (errors.length === 0) return errorList

  for (let i = 0; i < errors.length; i++) {
    const { message } = errors[i]
    const [row, path] = errors[i].path

    if (errorList[row]) {
      if (errorList[row][path]) errorList[row][path].push(message)
      else errorList[row][path] = [message]
    } else {
      errorList[row] = {}
      errorList[row][path] = [message]
    }
  }

  return errorList
}
