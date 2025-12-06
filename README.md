# Steam Profile App

A small Express + EJS app that displays a Steam user profile, friends and games using the Steam Web API. Includes a top navigation (Friends / Games), clickable cards linking to Steam, and a centered sign-in UI.

## Prerequisites
- Node.js (14+ recommended)
- npm
- Docker & Docker Compose (for Docker deployment)
- A Steam Web API key (get one from https://steamcommunity.com/dev/apikey)

## Setup

1. Clone repository
```
git clone https://github.com/sugoides/steam-ish
```
2. Install dependencies
```
npm install
```
3. Create an `.env` file in the project root (example below)
```
SESSION_SECRET=change_this_secret
STEAM_API_KEY=your_steam_api_key_here
BASE_URL=http://localhost:3000
```

## Run

### Local Development
- Start the app:
```
npm start
```
- (Optional) Development with auto-reload:
```
npm run dev
```
- Open `http://localhost:3000` in your browser.

### Docker Compose
1. Download the `docker-compose.yml` file from the repository
2. Ensure your `.env` file is configured (see Setup step 3)
3. Start the application with Redis:
```
docker-compose up -d
```
4. View logs:
```
docker-compose logs -f steam-ish
```
5. Stop the application:
```
docker-compose down
```

The app will be available at `http://localhost:3000` (or your configured `BASE_URL`).

