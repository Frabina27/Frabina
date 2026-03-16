import React, { useState, useEffect, useRef } from "react";
import { getAuthorizationUrl, getAccessToken, getCurrentlyPlaying, getRecentlyPlayed } from "./SpotifyAuth";

const MusicPlayer = () => {
  const playerRef = useRef(null);
  const spotifyPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [volume, setVolume] = useState(100);
  const [deviceId, setDeviceId] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);

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

  // Load Spotify Web Playback SDK
  useEffect(() => {
    if (!accessToken) return;

    // Load the SDK script
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Music Player',
        getOAuthToken: cb => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      spotifyPlayerRef.current = player;

      // Ready
      player.addListener('player_state_changed', state => {
        if (!state) return;
        
        setIsPlaying(!state.paused);
        setCurrentPosition(state.position);
        setDuration(state.duration);

        if (state.current_track) {
          const track = state.current_track.item;
          setCurrentTrack({
            name: track.name,
            artist: track.artists.map(a => a.name).join(', '),
            album: track.album.name,
            image: track.album.images[0]?.url,
            duration: track.duration_ms / 1000,
            url: track.external_urls.spotify,
            id: track.id,
          });
        }
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        setPlayerReady(true);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        setPlayerReady(false);
      });

      player.connect();
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [accessToken]);

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const played = new Date(dateString);
    const diffMs = now - played;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return played.toLocaleDateString();
  };

  // Fetch recently played tracks for the list
  useEffect(() => {
    if (!accessToken) return;

    const fetchRecentlyPlayed = async () => {
      try {
        const recently = await getRecentlyPlayed(accessToken, 5);
        if (recently && recently.items && recently.items.length > 0) {
          setRecentlyPlayed(recently.items.map(item => ({
            id: item.track.id,
            name: item.track.name,
            artist: item.track.artists.map(a => a.name).join(', '),
            image: item.track.album.images[0]?.url,
            playedAt: item.played_at,
            url: item.track.external_urls.spotify,
          })));
        }
      } catch (err) {
        console.error('Error fetching recently played:', err);
      }
    };

    fetchRecentlyPlayed();
    const interval = setInterval(fetchRecentlyPlayed, 30000);
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

  // Play/Pause control
  const handlePlayPause = async () => {
    if (!spotifyPlayerRef.current) return;

    spotifyPlayerRef.current.togglePlay();
  };

  // Volume control
  const handleVolumeChange = (newVolume) => {
    if (!spotifyPlayerRef.current) return;

    setVolume(newVolume);
    spotifyPlayerRef.current.setVolume(newVolume / 100);
  };

  // Handle logout
  const handleLogout = () => {
    setAccessToken(null);
    setCurrentTrack(null);
    setError(null);
    setRecentlyPlayed([]);
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
            <p style={{ fontSize: '13px', marginBottom: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
              🎵 Connect Spotify
            </p>
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
              {loading ? 'Loading...' : 'Login with Spotify'}
            </button>
            {error && (
              <p style={{ fontSize: '11px', color: '#ff6b6b', marginTop: '8px', lineHeight: 1.4 }}>
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If authenticated but player not ready, show loading
  if (!playerReady) {
    return (
      <div
        ref={playerRef}
        className="music-player"
      >
        <div className="music-bar">
          <div style={{ textAlign: 'center', padding: '16px 12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
              🎵 Connecting player...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If no track loaded yet
  if (!currentTrack) {
    return (
      <div
        ref={playerRef}
        className="music-player"
      >
        <div className="music-bar">
          <div style={{ textAlign: 'center', padding: '16px 12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
              ▶️ Ready to play
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={playerRef}
      className={`music-player ${isOpen ? "music-player--open" : ""}`}
    >
      {/* Recently Played List */}
      {isOpen && recentlyPlayed.length > 0 && (
        <div className="music-song-list">
          <div className="music-list-heading">Recently Played</div>
          {recentlyPlayed.map((track, idx) => (
            <div key={idx} className="music-song-item">
              <div className="music-song-item-cover">
                {track.image ? (
                  <img src={track.image} alt={track.name} />
                ) : (
                  <span style={{ fontSize: '16px' }}>♪</span>
                )}
              </div>
              <div className="music-song-item-text">
                <div className="music-song-item-title">{track.name}</div>
                <div className="music-song-item-artist">{track.artist}</div>
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
                {formatTimeAgo(track.playedAt)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Now Playing Bar */}
      <div className="music-bar">
        {/* Song Info */}
        <div className="music-bar-info" onClick={() => setIsOpen(!isOpen)}>
          <div className="music-bar-cover">
            {currentTrack.image ? (
              <img src={currentTrack.image} alt={currentTrack.name} />
            ) : (
              <span className="music-note-icon">♪</span>
            )}
          </div>
          <div className="music-bar-text">
            <div className="music-bar-title">{currentTrack.name}</div>
            <div className="music-bar-artist">
              {currentTrack.artist}
              {timeStamp && (
                <span style={{ color: 'rgba(255,255,255,0.4)', marginLeft: '6px' }}>
                  • {formatTimeAgo(timeStamp)}
                </span>
              )}
            </div>
          </div>
          <div className="music-bar-chevron">{isOpen ? '›' : '‹'}</div>
        </div>

        {/* Progress Bar */}
        {duration > 0 && (
          <div className="music-progress-wrap">
            <div className="music-progress">
              <div 
                className="music-progress-fill" 
                style={{ width: `${(currentPosition / duration) * 100}%` }}
              />
              <div 
                className="music-progress-thumb" 
                style={{ left: `${(currentPosition / duration) * 100}%` }}
              />
            </div>
            <div className="music-time-display">
              <span className="music-time">
                {Math.floor(currentPosition / 1000 / 60)}:{String(Math.floor((currentPosition / 1000) % 60)).padStart(2, '0')}
              </span>
              <span className="music-time">
                {Math.floor(duration / 1000 / 60)}:{String(Math.floor((duration / 1000) % 60)).padStart(2, '0')}
              </span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="music-controls">
          <button
            className="music-ctrl music-ctrl--play"
            onClick={handlePlayPause}
            disabled={!playerReady}
            title={playerReady ? (isPlaying ? "Pause" : "Play") : "Player not ready"}
            style={{ opacity: playerReady ? 1 : 0.5 }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            className="music-ctrl"
            onClick={handleLogout}
            title="Disconnect Spotify"
          >
            ✕
          </button>
        </div>

        {/* Volume Control */}
        <div className="music-volume">
          <span className="music-vol-icon" title="Volume">🔊</span>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
            className="music-vol-slider"
            disabled={!playerReady}
            style={{ opacity: playerReady ? 1 : 0.5 }}
          />
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', minWidth: '24px', textAlign: 'right' }}>
            {volume}%
          </span>
        </div>

        {/* Status Message */}
        {error && (
          <div style={{ fontSize: '10px', color: '#ff6b6b', textAlign: 'center', padding: '4px' }}>
            {error}
          </div>
        )}
        {!playerReady && (
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '4px' }}>
            Loading player...
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;