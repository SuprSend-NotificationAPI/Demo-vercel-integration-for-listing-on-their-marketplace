# Vercel Integration Project

This project will help you get listed on [Vercel's marketplace.](https://vercel.com/marketplace) to gain more visibility for your product.

![Vercel Marketplace](https://github.com/user-attachments/assets/6edc3df7-fbc3-43a5-8499-e7196e139978)

This project demonstrates how to create a **custom Vercel integration** that allows users to authorize access to their **Vercel account**, select a project, and create **environment variables** for that project using **OAuth 2.0 authentication**. By providing a seamless integration with Vercel, this project showcases the ability to interact with Vercel's API, empowering developers to enhance their **continuous deployment** workflows.

## Features

This Vercel integration project offers the following key features:

- **OAuth 2.0 Authentication with Vercel:** Securely authorize access to the user's Vercel account to access project details.
- **Project Listing:** Fetches and displays the user's Vercel projects, making it easy to select the desired project for further actions.
- **Create Environment Variables:** Allows the creation of environment variables for the selected Vercel project, aiding in secure handling of sensitive information.
- **Secure Data Management:** Utilizes environment variables to handle sensitive information, ensuring data security and best practices in managing API keys and secrets.

## Why Use This Vercel Integration?

Integrating with Vercel using OAuth provides a robust way to automate and manage **continuous deployment workflows**, environment configurations, and other project settings directly from your own applications. This project can be a reference for developers looking to build integrations with Vercel’s API for tasks like managing projects, deploying static sites, and configuring build settings.

## Prerequisites

Before you start, ensure you have the following:

- **Node.js** (version 14 or later) and **npm** or **yarn** for package management.
- A **Vercel account** with access to manage projects and integrations.
- A **registered Vercel integration** (OAuth app) to enable the OAuth 2.0 flow.

## Setup Guide

Follow these steps to set up and run the Vercel integration project locally:

1. **Clone this Repository:**
   ```bash
   git clone https://github.com/SuprSend-NotificationAPI/Demo-vercel-integration-for-listing-on-their-marketplace.git
   cd vercel-integration-project
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   This will install all necessary Node.js modules required to run the project.

3. **Create an Environment File:**
   Create a `.env.local` file in the root directory of your project with the following content:
   ```bash
   VERCEL_CLIENT_ID=your_client_id
   VERCEL_CLIENT_SECRET=your_client_secret
   REDIRECT_URI=http://localhost:3000/signup
   ```
   Replace `your_client_id` and `your_client_secret` with the credentials of your registered Vercel OAuth app.

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   This will start the server on `http://localhost:3000`. Open this URL in your browser to access the application.

## How the Vercel Integration Works

1. The user initiates the **OAuth flow** by clicking on the authorization link provided by the application.
2. Upon successful authorization, the user is redirected back to the application, where the authorization code is exchanged for an **access token**.
3. The access token is then used to interact with the **Vercel API** to fetch the user's projects.
4. The user selects a project, and the application creates an **environment variable** for that project using the Vercel API.

This workflow demonstrates how to securely integrate with Vercel, offering a scalable way to manage projects, environments, and other settings programmatically.

## Creating Your Own Vercel Integration

To create a custom Vercel integration for your own projects, follow these steps:

1. **Register a New OAuth App:**
   - Go to your Vercel account settings and register a new OAuth app.
   - Set the redirect URI to `http://localhost:3000/signup` for local development.

2. **Configure Your Project:**
   - Copy the **Client ID** and **Client Secret** from the OAuth app to your `.env.local` file.
   - Modify the `app/signup/page.tsx` component to customize the integration flow as per your requirements.

3. **Extend Integration Features:**
   - Edit the `app/api/create-env-variable/route.ts` file to handle other actions with the Vercel API, such as creating multiple environment variables, fetching deployment status, or configuring custom build settings.

## Important Files and Code Structure

- **`app/signup/page.tsx`**: This is the main component that manages the integration flow, including the OAuth authorization and project selection.
- **`app/api/authorize/route.ts`**: This file handles the OAuth token exchange, securing the process of obtaining access to the Vercel API.
- **`app/api/create-env-variable/route.ts`**: Manages the creation of environment variables for the selected Vercel project.

## Deployment to Vercel

To deploy this application to Vercel:

1. **Push Your Code to GitHub:**
   ```bash
   git push origin main
   ```
   
2. **Create a New Vercel Project:**
   - Go to Vercel, create a new project, and link it to your GitHub repository.
   
3. **Add Environment Variables:**
   - In the Vercel project settings, add the environment variables from your `.env.local` file for secure handling during deployment.

4. **Deploy:**
   - Once set up, deploy the application using Vercel's deployment flow.

## Security Considerations

- **Environment Variables**: Always use environment variables to store sensitive information like API keys and secrets. Never commit your `.env.local` file to source control.
- **OAuth Best Practices**: Use proper OAuth flows and token handling to ensure secure API interactions.
- **Error Handling**: Implement robust error handling and input validation to manage different scenarios and ensure application security in production environments.

## Contributing

Contributions to this Vercel integration project are welcome! Please feel free to fork the repository, make your changes, and submit a Pull Request. Whether it's adding new features, fixing bugs, or improving documentation, your input is valuable.

## License

This project is open source and available under the [MIT License](LICENSE).
