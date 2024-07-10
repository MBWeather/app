export const environment = {
  production: false,
  api: {
    servers: {
      primary: {
        url: 'https://api.openweathermap.org/',
        api: 'data/',
        keys: {
          "3.0/onecall": '7b6b6d5c44605c7d595357c0d2e2e6d7'
        },
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
      constants: {
        MILLISECONDS: 1000,
        KELVIN: 273.15
      },
      languages: {
        default: 'en',
        available: ['si', 'en'],
      },
      storage: {
        keys: {
          weatherData: 'weatherData'
        }
      }
    }
  }
};
