declare namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production' | 'test';

      /** サイト名 */
      readonly NEXT_PUBLIC_SITE_NAME: string;
      readonly NEXT_PUBLIC_SITE_DESC: string;

      readonly NEXT_PUBLIC_ENV: 'LOCAL' | 'PREVIEW' | 'PRODUCTION';

      /** Firebase関連 */
      readonly NEXT_PUBLIC_FIREBASE_API_KEY: string;
      readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      readonly NEXT_PUBLIC_FIREBASE_DATABASE_URL: string;
      readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
      readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      readonly NEXT_PUBLIC_FIREBASE_APP_ID: string;
      readonly NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
    }
  }
