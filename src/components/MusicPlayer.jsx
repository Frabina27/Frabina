import React, { useState, useEffect, useRef } from "react";
import { getAuthorizationUrl, getAccessToken, getRecentlyPlayed } from "./SpotifyAuth";

const MusicPlayer = () => {
  const playerRef = useRef(null);
  const [lastTrack, setLastTrack] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Exchange auth code for access token
  const exchangeCode = async (code) => {
    try {
      setLoading(true);
      const token = await getAccessToken(code);
      if (token) {
        setAccessToken(token);
      } else {
        setError('Failed to get Spotify access token');
      }
    } catch (err) {
      setError('Failed to authenticate with Spotify: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check for authorization code in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      exchangeCode(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Fetch last track
  useEffect(() => {
    if (!accessToken) return;

    const fetchLastTrack = async () => {
      try {
        const recently = await getRecentlyPlayed(accessToken, 1);
        if (recently && recently.items && recently.items.length > 0) {
          const track = recently.items[0].track;
          setLastTrack({
            name: track.name,
            artist: track.artists.map(a => a.name).join(', '),
            image: track.album.images[0]?.url,
          });
        }
      } catch (err) {
        console.error('Error fetching track:', err);
      }
    };

    fetchLastTrack();
    const interval = setInterval(fetchLastTrack, 30000);
    return () => clearInterval(interval);
  }, [accessToken]);

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
      </div>
    </div>
  );
};

export default MusicPlayer;