declare namespace NodeJS {
    interface ProcessEnv {
      VERCEL_CLIENT_ID: string;
      VERCEL_CLIENT_SECRET: string;
      REDIRECT_URI: string;
    }
  }