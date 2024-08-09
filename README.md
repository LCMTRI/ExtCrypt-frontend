<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/9113740/201498864-2a900c64-d88f-4ed4-b5cf-770bcb57e1f5.png">
  <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/9113740/201498152-b171abb8-9225-487a-821c-6ff49ee48579.png">
</picture>

<div align="center"><strong>ExtCrypt - Encrypt your PHP source codes</strong></div>
<div align="center">Built with Next.js 14</div>
<br />
<div align="center">
<a href="https://ext-crypt.vercel.app/">View Demo</a>
<span>
</div>

# ExtCrypt-frontend

## Overview

This is a starter template using the following stack:

- Framework - [Next.js 14](https://nextjs.org/13)
- Language - [TypeScript](https://www.typescriptlang.org)
- Styling - [Tailwind CSS](https://tailwindcss.com)
- Components - [Shadcn-ui](https://ui.shadcn.com)
- Schema Validations - [Yup](https://github.com/jquense/yup)
- Auth - [Nextauth](https://next-auth.js.org)
- UI library - [Shadcn UI](https://ui.shadcn.com/docs)
- Linting - [ESLint](https://eslint.org)
- Formatting - [Prettier](https://prettier.io)

## Pages

| Pages                                                                | Specifications                                                                            |
| :------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| [Home](https://ext-crypt.vercel.app//dashboard)                      | Landing Home Page.                                                                        |
| [Signin](https://ext-crypt.vercel.app//)                             | Authentication with **NextAuth**, supports login with Google.                             |
| [Key Options](https://ext-crypt.vercel.app//dashboard/user)          | A Form to choose hardware options to create key for encryption (creates a User's ticket). |
| [Upload & Encrypt](https://ext-crypt.vercel.app//dashboard/user/new) | A Form to upload source code and start encryption process.                                |
| [Tickets](https://ext-crypt.vercel.app//dashboard/employee)          | A Table to manage User's tickets.                                                         |
| [Source Codes](https://ext-crypt.vercel.app//dashboard/profile)      | A Table to manage User's encrypted source codes' information.                             |
| [Not Found](https://ext-crypt.vercel.app//dashboard/notfound)        | Not Found Page                                                                            |
| -                                                                    | -                                                                                         |

## Getting Started

Follow these steps to clone the repository and start the development server:

- `yarn`/`npm install`
- Create a `.env.local` file by copying the example environment file:
  `cp env.example.txt .env.local`
- Add the required environment variables to the `.env.local` file.
- `yarn dev`/`npm run dev`

You should now be able to access the application at http://localhost:3000.
