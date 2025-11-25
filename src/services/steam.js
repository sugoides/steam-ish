// src/services/steam.js
const axios = require('axios');
const API_KEY = process.env.STEAM_API_KEY;

const base = 'https://api.steampowered.com';

const steam = axios.create({
  baseURL: base,
  timeout: 10000
});

const getPlayerSummaries = async (steamids) => {
  const { data } = await steam.get('/ISteamUser/GetPlayerSummaries/v0002', {
    params: { key: API_KEY, steamids: steamids.join(',') }
  });
  return data.response.players;
};

const getFriendList = async (steamid) => {
  const { data } = await steam.get('/ISteamUser/GetFriendList/v0001', {
    params: { key: API_KEY, steamid, relationship: 'friend' }
  });
  return data.friendslist?.friends || [];
};

const getOwnedGames = async (steamid) => {
  const { data } = await steam.get('/IPlayerService/GetOwnedGames/v0001', {
    params: {
      key: API_KEY,
      steamid,
      include_played_free_games: true,
      include_appinfo: true
    }
  });
  return data.response.games || [];
};

const getRecentlyPlayedGames = async (steamid) => {
  const { data } = await steam.get('/IPlayerService/GetRecentlyPlayedGames/v0001', {
    params: { key: API_KEY, steamid }
  });
  return data.response.games || [];
};

const getPlayerBans = async (steamids) => {
  const { data } = await steam.get('/ISteamUser/GetPlayerBans/v1', {
    params: { key: API_KEY, steamids: steamids.join(',') }
  });
  return data.players || [];
};

module.exports = {
  getPlayerSummaries,
  getFriendList,
  getOwnedGames,
  getRecentlyPlayedGames,
  getPlayerBans
};
