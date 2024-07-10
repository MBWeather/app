export const environment = {
  production: true,
  api: {
    servers: {
      primary: {
        url: 'https://api.openweathermap.org/',
        api: 'data/',
        headers: {
          // Any other default headers can be added here
        }
      },
      backup: 'https://yourbackupserver.com'
    },
    primaryHeaders: {
      'Content-Type': 'application/json',
      // Any other default headers can be added here
    }
  },
  app: {
    name: 'MBWeather',
    version: '1.0.0',
    config: {
      language: {
        default: 'en',
        available: ['si', 'en'],
      },
      storage: {
        keys: {
          language: 'languages',
          selectedLanguage: 'selectedLanguage'
        }
      }
    }
  }
};
