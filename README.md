# vid.io

VID.io is an app that allows you to capture your screen and share clips with your friends or colleagues at work.

## Features

- Screen capture: Capture your screen and record clips.
- Share clips: Easily share the captured clips with others.
- Login with Auth0: Securely authenticate users with Auth0.
- Storage: Store the captured clips in Amazon S3 (previously Vercel Blob).
- UI components: Utilize the Shadcn components for a sleek and modern user interface.

## Limitations:

- Non Authenticated users clips expires after ~1 day.
- Only files under 100MB can be uploaded to be shared.

## Installation

To run vid.io locally, make sure you have npm installed. Then, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/JaysusM/vid.io.git
   ```

2. Install the dependencies:

   ```bash
   cd vid.io
   npm install
   ```

3. Configure environment variables:

- Create a .env.local file in the root directory of the project.

- Fill in the necessary environment variables:

```bash
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
MONGODB_URI=
AUTH0_SECRET=
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access vid.io.

## Technologies Used

- Tailwind CSS
- Next.js 14
- Auth0
- Amazon S3
- Shadcn Components

## Deployment

vid.io is deployed on Vercel and can be visited at [vid-io.vercel.app](https://vid-io.vercel.app/).

## License

This project is licensed under the [MIT License](LICENSE).
