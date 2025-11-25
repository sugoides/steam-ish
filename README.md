# Steam Profile App

A small Express + EJS app that displays a Steam user profile, friends and games using the Steam Web API. Includes a top navigation (Friends / Games), clickable cards linking to Steam, and a centered sign-in UI.

## Prerequisites
- Node.js (14+ recommended)
- npm
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
PORT=3000
SESSION_SECRET=change_this_secret
STEAM_API_KEY=your_steam_api_key_here
```

## Run

- Start the app:
  - npm start
- (Optional) Development with auto-reload (if configured):
  - npm run dev

Open http://localhost:3000 in your browser.

