# Welcome to Framez by Oluwaseyi Adisa 👋

Welcome to Framez! A mobile social media application built with React Native (Expo) and Supabase where users can share posts with images and follow other users.

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/.create-expo-app).

[Hosted Appetize Link](https://appetize.io/app/b_xx33pujprweffdu77daduogkqu)

[Hosted Appetize Link](https://appetize.io/app/b_xx33pujprweffdu77daduogkqu)

[Hosted Appetize Link](https://appetize.io/app/b_xx33pujprweffdu77daduogkqu)

## Features Implemented

- **User Authentication:** Users can create an account and log in using their email and password. Note that email authentication was turned off for this project to allow for the creation of dummy accounts.
- **Post Upload:** Users can create text-based posts with optional image attachments, stored in Supabase Storage.
- **Social**: Users can follow and unfollow other users to view their posts in a home feed.
- **Explore Feed:** Users can view posts from other users they do not follow in an explore feed. -**Profile Edits**: Users can change their profile images and bio.

## Backend

This project utilizes [Supabase](https://supabase.com) for its backend. Supabase provides a robust and scalable infrastructure that handles user authentication, data storage, and other essential backend functionalities.

Key Supabase services used:

- **Supabase Authentication:** For secure user sign-up and login with email and password.
- **Supabase Database:** A PostgreSQL database to store image URLs and user information.
- **Supabase Storage:** To upload and store user images securely.

## Get started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/seyiadisa/hng13-stage-four-framez.git framez

    cd framez
    ```

2.  Install dependencies

    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    You'll need to connect the app to your own Supabase instance.

- Create a new project on Supabase.
- Go to `Project Settings` > `API`.
- Create a new API key on the dashboard.
- Add your Supabase URL and publishable key to a `.env` file in your `framez` directory:
  ```
  EXPO_PUBLIC_SUPABASE_URL="YOUR_SUPABASE_URL"
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY="YOUR_SUPABASE_PUBLISHABLE_KEY"
  ```

4.  Start the app

    ```bash
    bun run start
    ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

[Hosted Appetize Link](https://appetize.io/app/b_xx33pujprweffdu77daduogkqu)

[Hosted Appetize Link](https://appetize.io/app/b_xx33pujprweffdu77daduogkqu)

[Hosted Appetize Link](https://appetize.io/app/b_xx33pujprweffdu77daduogkqu)
