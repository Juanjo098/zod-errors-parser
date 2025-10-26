# zod-errors-parser

`zod-errors-parser` is a small but powerful utility package designed to simplify and standardize error handling from Zod, a popular schema validation library for TypeScript and JavaScript.

Instead of dealing directly with the complex structure of ZodError.issues, this parser converts validation errors into a clean, easy-to-read object grouped by field.
It’s perfect for displaying validation messages in forms, APIs, or any context where you need clear and structured feedback for users or developers.

## Installation

You can install the package from npm using the following command:

```bash
npm install zod-errors-parser
```

## Usage example

```typescript
import zodErrorsParser from '@/zodErrorsParser'
import z from 'zod'

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

if (!parsedData.success) {
  return zodErrorsParser(parsedData.error.issues)
}
```

You'll get the next output

```typescript
  {
    email: ['Send a valid email', 'Email require'],
    password: ['Password require']
  }
```

If you want retrieve only the first error, set this in te options:

```typescript
import zodErrorsParser from '@/zodErrorsParser'
import z from 'zod'

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

if (!parsedData.success) {
  return zodErrorsParser(parsedData.error.issues, { onlyFirstError: true })
}
```

Then you'll get the next output

```typescript
  {
    email: ['Send a valid email'],
    password: ['Password require']
  }
```

## Benefits
✅ Simplicity:
Easily converts Zod’s complex error structure into a clean, readable, and developer-friendly format.

✅ Consistency:
Centralize and standardize how validation errors are handled and displayed across your entire application.

✅ Clarity:
Provides clear, per-field error messages — ideal for form validation or API responses.

✅ Extensibility:
Flexible configuration options (like onlyFirstError) let you tailor the output to your specific use case.

✅ TypeScript Friendly:
Built with full TypeScript support for strong typing and autocompletion during development.