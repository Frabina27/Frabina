import React, { useState, useEffect, useRef } from "react";
import { getAuthorizationUrl, getAccessToken, getCurrentlyPlaying, getRecentlyPlayed } from "./SpotifyAuth";

const MusicPlayer = () => {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Exchange auth code for access token
  const exchangeCode = async (code) => {
    try {
      console.log('Starting token exchange for code:', code);
      setLoading(true);
      const token = await getAccessToken(code);
      console.log('Successfully got token:', token ? 'yes' : 'no');
      if (token) {
        localStorage.setItem('spotify_access_token', token);
        setAccessToken(token);
        console.log('Token saved to localStorage');
      } else {
        console.error('No token returned from getAccessToken');
        setError('No token received from Spotify');
      }
    } catch (err) {
      console.error('Exchange error:', err);
      setError('Failed to authenticate with Spotify: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Check for authorization code in URL
  useEffect(() => {
    console.log('Checking for auth code in URL');
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    console.log('Code found:', code ? 'yes' : 'no');

    if (code) {
      console.log('Exchanging code...');
      exchangeCode(code);
    } else {
      console.log('No code, checking localStorage');
      const storedToken = localStorage.getItem('spotify_access_token');
      console.log('Stored token found:', storedToken ? 'yes' : 'no');
      if (storedToken) {
        console.log('Setting token from localStorage');
        setAccessToken(storedToken);
      }
    }
  }, []);

  // Fetch currently playing or recently played track
  useEffect(() => {
    if (!accessToken) return;

    const fetchTrack = async () => {
      try {
        console.log('Fetching current track...');
        let track = await getCurrentlyPlaying(accessToken);
        
        if (!track || !track.item) {
          console.log('No current track, fetching recently played...');
          const recently = await getRecentlyPlayed(accessToken, 1);
          if (recently && recently.track) {
            track = { item: recently.track, is_playing: false };
          }
        }

        if (track && track.item) {
          console.log('Found track:', track.item.name);
          setCurrentTrack({
            name: track.item.name,
            artist: track.item.artists.map(a => a.name).join(', '),
            album: track.item.album.name,
            image: track.item.album.images[0]?.url,
            duration: track.item.duration_ms / 1000,
            url: track.item.external_urls.spotify,
          });
          setIsPlaying(track.is_playing || false);
        } else {
          console.log('No track data available');
        }
      } catch (err) {
        console.error('Error fetching track:', err);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 5000);
    return () => clearInterval(interval);
  }, [accessToken]);

  // Handle Spotify login
  const handleSpotifyLogin = async () => {
    try {
      console.log('Starting Spotify login...');
      const authUrl = await getAuthorizationUrl();
      console.log('Redirecting to:', authUrl);
      window.location.href = authUrl;
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to start authentication: ' + err.message);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    setAccessToken(null);
    setCurrentTrack(null);
    setError(null);
  };

  // Dragging functionality
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsDragging(true);
      const rect = playerRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !playerRef.current) return;

      const newRight = window.innerWidth - e.clientX + dragOffset.x;
      const newBottom = window.innerHeight - e.clientY + dragOffset.y;

      playerRef.current.style.right = Math.max(0, newRight) + "px";
      playerRef.current.style.bottom = Math.max(0, newBottom) + "px";
      playerRef.current.style.left = "auto";
      playerRef.current.style.top = "auto";
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  // If not authenticated, show login button
  if (!accessToken) {
    return (
      <div
        ref={playerRef}
        className="music-player"
        onMouseDown={handleMouseDown}
      >
        <div className="music-bar">
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <p style={{ fontSize: '12px', marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>
              Connect Spotify
            </p>
            <button
              onClick={handleSpotifyLogin}
              disabled={loading}
              style={{
                background: 'linear-gradient(135deg, #1DB954, #1ed760)',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {loading ? 'Loading...' : 'Login with Spotify'}
            </button>
            {error && (
              <p style={{ fontSize: '10px', color: '#ff6b6b', marginTop: '8px' }}>
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // If authenticated but no track, show loading
  if (!currentTrack) {
    return (
      <div
        ref={playerRef}
        className="music-player"
        onMouseDown={handleMouseDown}
      >
        <div className="music-bar">
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
              Loading track...
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
      onMouseDown={handleMouseDown}
    >
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
            <div className="music-bar-artist">{currentTrack.artist}</div>
          </div>
          <div className="music-bar-chevron">›</div>
        </div>

        {/* Controls */}
        <div className="music-controls">
          <a
            href={currentTrack.url}
            target="_blank"
            rel="noopener noreferrer"
            className="music-ctrl"
            title="Open in Spotify"
          >
            🎵
          </a>
          <button
            className="music-ctrl music-ctrl--play"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Playing on Spotify" : "Paused"}
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
      </div>
    </div>
  );
};

export default MusicPlayer;