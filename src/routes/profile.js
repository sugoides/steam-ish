// src/routes/profile.js

const express = require('express');
const router = express.Router();
const {
  getPlayerSummaries,
  getFriendList,
  getOwnedGames,
  getRecentlyPlayedGames
} = require('../services/steam');
const { minutesToHours, since } = require('../utils/format');

const ensureAuth = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/');

// Helper: fetch Steam Store API details for a game
async function getStoreImages(appid) {
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data[appid] && data[appid].success) {
      const appData = data[appid].data;
      return {
        header_image: appData.header_image || `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
        capsule_image: appData.capsule_image || `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/logo.jpg`,
        capsule_imagev5: appData.capsule_imagev5 || null
      };
    }
  } catch (err) {
    console.error(`Failed to fetch store images for ${appid}:`, err.message);
  }
  // Fallback if API fails
  return {
    header_image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`,
    capsule_image: `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/logo.jpg`,
    capsule_imagev5: null
  };
}

router.get('/me', ensureAuth, async (req, res) => {
  try {
    const steamid = req.user.id;

    // Profile
    const [me] = await getPlayerSummaries([steamid]);

    // Friends + summaries
    const friends = await getFriendList(steamid);
    const friendIds = friends.map(f => f.steamid);
    const chunkSize = 100;
    let friendProfiles = [];
    if (friendIds.length) {
      const chunks = [];
      for (let i = 0; i < friendIds.length; i += chunkSize) {
        chunks.push(friendIds.slice(i, i + chunkSize));
      }
      const results = await Promise.all(chunks.map(ids => getPlayerSummaries(ids)));
      friendProfiles = results.flat();
    }
    const friendMap = Object.fromEntries(friendProfiles.map(p => [p.steamid, p]));

    const friendsRich = friends.map(f => ({
      steamid: f.steamid,
      friend_since: since(f.friend_since),
      persona: friendMap[f.steamid]?.personaname || f.steamid,
      avatar: friendMap[f.steamid]?.avatarfull,
      profileurl: friendMap[f.steamid]?.profileurl,
      communityvisibilitystate: friendMap[f.steamid]?.communityvisibilitystate
    }));

    // Games
    const owned = await getOwnedGames(steamid);
    const recent = await getRecentlyPlayedGames(steamid);

    // Fetch store images for owned games
    const ownedRich = await Promise.all(
      owned.map(async g => {
        const images = await getStoreImages(g.appid);
        return {
          appid: g.appid,
          name: g.name,
          playtime_hours: minutesToHours(g.playtime_forever || 0),
          img_logo_url: images.header_image,
          header_image: images.header_image,
          store_url: `https://store.steampowered.com/app/${g.appid}`
        };
      })
    );

    // Fetch store images for recent games
    const recentRich = await Promise.all(
      recent.map(async g => {
        const images = await getStoreImages(g.appid);
        return {
          appid: g.appid,
          name: g.name,
          playtime_2weeks_hours: minutesToHours(g.playtime_2weeks || 0),
          header_image: images.header_image,
          img_logo_url: images.capsule_image,
          store_url: `https://store.steampowered.com/app/${g.appid}`
        };
      })
    );

    res.render('profile', {
      user: req.user,
      me,
      friends: friendsRich,
      games: ownedRich,
      recentGames: recentRich
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load profile.');
  }
});

module.exports = router;
