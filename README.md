# Coinbase-Android

A simple Android client for interacting with Coinbase APIs and demonstrating common flows (authentication, fetching balances, and viewing transactions). This repository contains the Android app source, build configuration, and basic examples to help you get started.

> NOTE: This project is not an official Coinbase product. Use your own API keys and follow Coinbase's official docs and terms of service when interacting with their APIs.

## Features
- OAuth / API key integration (placeholder)
- Fetch and display account balances
- List recent transactions
- Example UI components and networking setup
- Basic tests (if included in the repo)

## Prerequisites
- Android Studio (Arctic Fox or later recommended)
- JDK 11+
- Android SDK matching the project's compileSdkVersion
- Gradle (the wrapper is included)
- A Coinbase API key / OAuth credentials (if you plan to call live APIs)

## Quickstart

1. Clone the repository
   ```bash
   git clone https://github.com/hippiehustle/Coinbase-Android.git
   cd Coinbase-Android
   ```

2. Open the project in Android Studio
   - Use "Open" and select the project's root directory.
   - Let Android Studio sync Gradle and download dependencies.

3. Configure API credentials
   - Create a secure way to store your Coinbase credentials (local `gradle.properties`, encrypted keystore, or Android resources excluded from VCS).
   - Example `gradle.properties` entries (do NOT commit secrets):
     ```
     COINBASE_API_KEY="your_api_key_here"
     COINBASE_API_SECRET="your_api_secret_here"
     ```
   - Update the app's configuration code or BuildConfig usage to read these values at build/runtime.

4. Build and run
   - Select a device or emulator and Run from Android Studio.
   - If using APIs, ensure the device/emulator has network access and your credentials are configured.

## Configuration examples
- Networking: Retrofit / OkHttp (example) — update base URL and interceptors as needed.
- OAuth: Follow Coinbase's OAuth docs to obtain client ID/secret and redirect URIs.
- Environment: Use build flavors or resource overlays to separate dev/staging/prod settings.

## Testing
- Run unit tests from Android Studio (Gradle > test tasks) or via command line:
  ```bash
  ./gradlew test
  ```
- UI tests (if present) can be run with:
  ```bash
  ./gradlew connectedAndroidTest
  ```

## Contributing
Contributions are welcome. Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes with clear messages.
4. Open a pull request describing the change and rationale.

Guidelines:
- Add or update tests for new logic.
- Keep API keys and secrets out of commits.
- Follow existing code style and lint rules.

## Troubleshooting
- Build errors: ensure Android SDK and required platforms are installed.
- Network/API errors: verify credentials, API permissions, and network connectivity.
- If unsure, open an issue with logs and reproduction steps.

## License
See the LICENSE file in this repository for license details. If no license is present, assume "All rights reserved" and contact the repository owner for permission before reusing code.

## Acknowledgements
- Coinbase API docs: https://docs.cloud.coinbase.com/
- Open-source libraries used (e.g., Retrofit, OkHttp, Glide) — check the project dependencies for details.

If you'd like, I can:
- Tailor the README to the exact modules and packages in this repo (I can inspect the code and generate section specifics).
- Add badges, examples, or expand configuration and security guidance.