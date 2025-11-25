# Steam Profile App

A small Express + EJS app that displays a Steam user profile, friends and games using the Steam Web API. Includes a top navigation (Friends / Games), clickable cards linking to Steam, and a centered sign-in UI.

## Features
- Sign in with Steam (OpenID)
- Profile view with avatar, link to Steam profile and visibility
- Friends and owned games lists with clickable cards
- Fixed top navigation with hash scrolling to sections
- Responsive, themed UI (CSS in `public/css/steam.css`)

## Prerequisites
- Node.js (14+ recommended)
- npm
- A Steam Web API key (get one from https://steamcommunity.com/dev/apikey)

## Setup

1. Clone repository
   - git clone <repo-url> f:\Dev Stuff\steam-profile-app
2. Install dependencies
   - Open PowerShell or CMD in the project folder:
     - npm install
3. Create an `.env` file in the project root (example below)

Example `.env`
```
STEAM_API_KEY=your_steam_api_key_here
SESSION_SECRET=change_this_secret
PORT=3000
```

## Run

- Start the app:
  - npm start
- (Optional) Development with auto-reload (if configured):
  - npm run dev

Open http://localhost:3000 in your browser.

## Important files
- src/routes/profile.js — profile route that fetches friends/games
- src/views/layout.ejs — global layout and header partial rendered conditionally
- src/views/partials/header.ejs — top navigation and user area
- src/views/profile.ejs — profile page with `#friends` and `#games` sections
- src/views/index.ejs — sign-in / landing page
- public/css/steam.css — main styling and layout
- public/js/scroll-offset.js — optional smooth scroll with header offset (if present)

## Notes & customization
- Fixed header offset: adjust `--header-offset` or container padding in `public/css/steam.css` to match header height so anchored links aren't hidden.
- To hide the top nav on the sign-in page, the layout sets `body` without the `.has-header` class; header is rendered only when `user` exists.
- Cards for friends/games are anchors (`.card.card-link`) and open Steam links in a new tab.

## Troubleshooting
- If anchors jump beneath the fixed header when navigating to `#friends` or `#games`, enable the CSS `scroll-margin-top` (already included) or include the optional `public/js/scroll-offset.js` script and import it in `src/views/layout.ejs`.
- Clear browser cache after CSS changes.

## License
MIT — see LICENSE file.

```// filepath: f:\Dev Stuff\steam-profile-app\README.md
# Steam Profile App

A small Express + EJS app that displays a Steam user profile, friends and games using the Steam Web API. Includes a top navigation (Friends / Games), clickable cards linking to Steam, and a centered sign-in UI.

## Features
- Sign in with Steam (OpenID)
- Profile view with avatar, link to Steam profile and visibility
- Friends and owned games lists with clickable cards
- Fixed top navigation with hash scrolling to sections
- Responsive, themed UI (CSS in `public/css/steam.css`)

## Prerequisites
- Node.js (14+ recommended)
- npm
- A Steam Web API key (get one from https://steamcommunity.com/dev/apikey)

## Setup

1. Clone repository
   - git clone <repo-url> f:\Dev Stuff\steam-profile-app
2. Install dependencies
   - Open PowerShell or CMD in the project folder:
     - npm install
3. Create an `.env` file in the project root (example below)

Example `.env`
```
STEAM_API_KEY=your_steam_api_key_here
SESSION_SECRET=change_this_secret
PORT=3000
```

## Run

- Start the app:
  - npm start
- (Optional) Development with auto-reload (if configured):
  - npm run dev

Open http://localhost:3000 in your browser.

## Important files
- src/routes/profile.js — profile route that fetches friends/games
- src/views/layout.ejs — global layout and header partial rendered conditionally
- src/views/partials/header.ejs — top navigation and user area
- src/views/profile.ejs — profile page with `#friends` and `#games` sections
- src/views/index.ejs — sign-in / landing page
- public/css/steam.css — main styling and layout
- public/js/scroll-offset.js — optional smooth scroll with header offset (if present)

## Notes & customization
- Fixed header offset: adjust `--header-offset` or container padding in `public/css/steam.css` to match header height so anchored links aren't hidden.
- To hide the top nav on the sign-in page, the layout sets `body` without the `.has-header` class; header is rendered only when `user` exists.
- Cards for friends/games are anchors (`.card.card-link`) and open Steam links in a new tab.

## Troubleshooting
- If anchors jump beneath the fixed header when navigating to `#friends` or `#games`, enable the CSS `scroll-margin-top` (already included) or include the optional `public/js/scroll-offset.js` script and import it in `src/views/layout.ejs`.
- Clear browser cache after CSS changes.

## License