# vid.io

VID.io is an app that allows you to capture your screen and share clips with your friends or colleagues at work.

## Features

- Screen capture: Capture your screen and record clips.
- Share clips: Easily share the captured clips with others.
- Login with Auth0: Securely authenticate users with Auth0.
- Storage: Store the captured clips in Amazon S3 (previously Vercel Blob).
- UI components: Utilize the Shadcn components for a sleek and modern user interface.
- Transcoding with FFmpeg: Transcode the clips to a common format for easy sharing.

## Limitations:

- Non Authenticated users clips expires after ~1 day.
- Only files under 100MB can be uploaded to be shared.

## Installation

To run vid.io locally, make sure you have npm installed. Then, follow these steps:

1. Clone the repository:

   ```bash
   git clone
   ```

2. Generate the necessary keys from third-party services:

- Create an account on [Auth0](https://auth0.com/).
- Create an account on [Amazon Web Services](https://aws.amazon.com/).
- Create a MongoDB database on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

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

4. Build the Docker image:

   ```bash
   docker build -t vid.io .
   ```

5. Run the Docker container:

   ```bash
   docker run -p 3000:3000 vid.io
   ```

6. Open your browser and navigate to `http://localhost:3000` to access vid.io.

## Technologies Used

- Tailwind CSS
- Next.js 14
- Auth0
- Amazon S3
- Shadcn Components
- FFmpeg
- MongoDB
- Docker

## Deployment

vid.io is deployed on Vercel and can be visited at [vid-io.vercel.app](https://vid-io.vercel.app/).

## License

This project is licensed under the [MIT License](LICENSE).
