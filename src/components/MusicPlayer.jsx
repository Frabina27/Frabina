import React, { useState, useEffect, useRef } from "react";
import { getAuthorizationUrl, getAccessToken, getRecentlyPlayed, refreshAccessToken } from "./SpotifyAuth";

const MusicPlayer = () => {
  const playerRef = useRef(null);
  const [lastTrack, setLastTrack] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

// Check for authorization code or tokens in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const token = params.get('token');
    const refresh = params.get('refresh');

    if (token && refresh) {
      // Tokens already in URL, use them
      console.log('Using tokens from URL');
      setAccessToken(token);
      setRefreshToken(refresh);
    } else if (code) {
      // Exchange code for tokens and add to URL
      console.log('Auth code found, exchanging...');
      const exchange = async () => {
        try {
          setLoading(true);
          const result = await getAccessToken(code);
          if (result && result.accessToken && result.refreshToken) {
            setAccessToken(result.accessToken);
            setRefreshToken(result.refreshToken);
            // Add tokens to URL
            window.history.replaceState({}, document.title, `?token=${result.accessToken}&refresh=${result.refreshToken}`);
          } else {
            setError('Failed to get Spotify tokens');
          }
        } catch (err) {
          setError('Failed to authenticate with Spotify: ' + err.message);
        } finally {
          setLoading(false);
        }
      };
      exchange();
    }
  }, []);

  // Refresh token when expired
  useEffect(() => {
    if (!refreshToken) return;

    // Check if token needs refresh every 45 minutes
    const interval = setInterval(async () => {
      try {
        console.log('Refreshing access token...');
        const result = await refreshAccessToken(refreshToken);
        if (result && result.accessToken) {
          setAccessToken(result.accessToken);
          // Update URL with new access token
          window.history.replaceState({}, document.title, `?token=${result.accessToken}&refresh=${refreshToken}`);
        }
      } catch (err) {
        console.error('Token refresh failed:', err);
        setError('Session expired, please login again');
        setAccessToken(null);
        setRefreshToken(null);
      }
    }, 45 * 60 * 1000); // 45 minutes

    return () => clearInterval(interval);
  }, [refreshToken]);

  // Fetch last track
  useEffect(() => {
    if (!accessToken) return;

    const fetchLastTrack = async () => {
      try {
        console.log('Fetching recently played...');
        const recently = await getRecentlyPlayed(accessToken, 1);
        console.log('Recently played response:', recently);
        
        if (recently && recently.items && recently.items.length > 0) {
          const track = recently.items[0].track;
          console.log('Setting track:', track.name);
          setLastTrack({
            name: track.name,
            artist: track.artists.map(a => a.name).join(', '),
            image: track.album.images[0]?.url,
          });
        } else {
          console.log('No items in recently played');
          setError('No recently played tracks found');
        }
      } catch (err) {
        console.error('Error fetching track:', err);
        setError('Error loading track: ' + err.message);
      }
    };

    fetchLastTrack();
    const interval = setInterval(fetchLastTrack, 30000);
    return () => clearInterval(interval);
  }, [accessToken]);

  // Handle logout
  const handleLogout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setLastTrack(null);
    setError(null);
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  // Handle Spotify login
  const handleSpotifyLogin = async () => {
    try {
      const authUrl = await getAuthorizationUrl();
      window.location.href = authUrl;
    } catch (err) {
      setError('Failed to start authentication: ' + err.message);
    }
  };

  // If not authenticated, show login button
  if (!accessToken) {
    return (
      <div
        ref={playerRef}
        className="music-player"
      >
        <div className="music-bar">
          <div style={{ textAlign: 'center', padding: '16px 12px' }}>
            <button
              onClick={handleSpotifyLogin}
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #1DB954, #1ed760)',
                border: 'none',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? 'Loading...' : 'Connect Spotify'}
            </button>
            {error && (
              <p style={{ fontSize: '11px', color: '#ff6b6b', marginTop: '8px' }}>
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If no track, show loading
  if (!lastTrack) {
    return (
      <div
        ref={playerRef}
        className="music-player"
      >
        <div className="music-bar">
          <div style={{ textAlign: 'center', padding: '16px 12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show last track
  return (
    <div
      ref={playerRef}
      className="music-player"
    >
      <div className="music-bar">
        <div className="music-bar-info">
          <div className="music-bar-cover">
            {lastTrack.image ? (
              <img src={lastTrack.image} alt={lastTrack.name} />
            ) : (
              <span className="music-note-icon">♪</span>
            )}
          </div>
          <div className="music-bar-text">
            <div className="music-bar-title">{lastTrack.name}</div>
            <div className="music-bar-artist">{lastTrack.artist}</div>
          </div>
        </div>
        <button
          className="music-ctrl"
          onClick={handleLogout}
          title="Disconnect Spotify"
          style={{ margin: '0 12px' }}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;