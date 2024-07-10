# Nomnio Weather App

This project is a weather application built using Ionic and Angular for Nomnio d.o.o. The application fetches a 5-day weather forecast for Maribor from the OpenWeatherMap API and displays it in a user-friendly manner.

## Table of Contents
- [Technologies](#technologies)
- [Environment Versions](#environment-versions)
- [Requirements](#requirements)
- [Installation](#installation)
- [Serving the Application](#serving-the-application)
- [Building the Application](#building-the-application)
- [Compiling for Android](#compiling-for-android)
- [Compiling for iOS](#compiling-for-ios)

## Technologies
- HTML
- SCSS
- npm
- TypeScript
- Angular, Ionic
- Capacitor
- ngx-translate
- moment.js
...

## Environment Versions
- **npm**: v10.8.1
- **node.js**: v22.4.1 (NOT LTS)
- **ng**: v18.0.7
- **ionic**: v7.2.0

## Requirements
To develop and run this project, you will need:
- **Node.js**: Ensure you have the latest version of Node.js installed.
- **npm**: Comes with Node.js, ensure the latest version is available.
- **Ionic CLI**: Install globally using ```npm install -g @ionic/cli```.
- **Android Studio**: For building and testing Android applications.
- **Xcode**: For building and testing iOS applications (macOS only).

## Installation
Follow these steps to set up the project on your local machine:
1. Clone the repository:
    ```
    git clone https://github.com/your-org/nomnio-weather-app.git
    cd nomnio-weather-app
    ```

2. Install dependencies:
    ```
    npm install
    ```

## Serving the Application
To serve the application locally:
```
ionic serve
```
This will start a development server and open the app in your default browser. The app will automatically reload if you change any of the source files.

## Building the Application
To build the application for production:
```
ionic build (use --prod flag if you prefer)
```
This will create a `www` directory with the compiled application.

## Compiling for Android
To compile the application for Android:
1. Add the Android platform:
    ```
    ionic capacitor add android
    ```

2. Build the Android application:
    ```
    ionic capacitor build android
    ```

3. To run the application on an Android device/emulator:
    ```
    ionic capacitor run android
    ```

## Compiling for iOS
To compile the application for iOS (macOS only):
1. Add the iOS platform:
    ```
    ionic capacitor add ios
    ```

2. Build the iOS application:
    ```
    ionic capacitor build ios
    ```

3. Open the project in Xcode:
    ```
    ionic capacitor prepare ios
    open ios/App.xcworkspace
    ```

4. From Xcode, you can run the app on a simulator or a connected iOS device.

5. To sync your builds with progress you do in the future, please use `ionic cap sync [platform (ios/android/unspecified for both)]`

## Additional Notes
- Ensure you have the necessary environment variables and API keys configured, particularly for accessing the OpenWeatherMap API.
- Follow the guidelines in the [CONTRIBUTING.md](https://github.com/MBWeather/.github/blob/main/profile/CONTRIBUTING.md) file for contributing to the project.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/MBWeather/.github/blob/main/profile/LICENSE) file for details.
