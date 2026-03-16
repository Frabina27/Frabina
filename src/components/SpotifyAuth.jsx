// SpotifyAuth.js - Handles Spotify PKCE authentication

const CLIENT_ID = "b08ee93b36e04a15ba7d3f3cc32e6d6e";
const REDIRECT_URI = "https://www.frabina.com/";


// Generate random string for PKCE
function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// SHA256 hash for PKCE
async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashString = hashArray.map(b => String.fromCharCode(b)).join('');
  return btoa(hashString).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// Get authorization URL
export async function getAuthorizationUrl() {
  const codeVerifier = generateRandomString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Store verifier in session storage
  sessionStorage.setItem('spotify_code_verifier', codeVerifier);

  const scope = 'user-read-currently-playing user-read-playback-state user-read-private user-read-email';
  const authUrl = new URL('https://accounts.spotify.com/authorize');

  authUrl.searchParams.append('client_id', CLIENT_ID);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.append('scope', scope);
  authUrl.searchParams.append('code_challenge_method', 'S256');
  authUrl.searchParams.append('code_challenge', codeChallenge);

  return authUrl.toString();
}

// Exchange code for access token
export async function getAccessToken(code) {
  const codeVerifier = sessionStorage.getItem('spotify_code_verifier');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  return data.access_token;
}

// Get currently playing track
export async function getCurrentlyPlaying(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

// Get recently played tracks
export async function getRecentlyPlayed(accessToken, limit = 1) {
  const response = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.items && data.items.length > 0 ? data.items[0] : null;
}

// Get user profile
export async function getUserProfile(accessToken) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export { CLIENT_ID, REDIRECT_URI };