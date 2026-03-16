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
  const [volume, setVolume] = useState(100);
  const [playingDeviceId, setPlayingDeviceId] = useState(null);
  const [timeStamp, setTimeStamp] = useState(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

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

  // Fetch currently playing and recently played tracks
  useEffect(() => {
    if (!accessToken) return;

    const fetchTrack = async () => {
      try {
        // Get currently playing
        let track = await getCurrentlyPlaying(accessToken);
        
        if (track && track.item) {
          setCurrentTrack({
            name: track.item.name,
            artist: track.item.artists.map(a => a.name).join(', '),
            album: track.item.album.name,
            image: track.item.album.images[0]?.url,
            duration: track.item.duration_ms / 1000,
            url: track.item.external_urls.spotify,
            id: track.item.id,
            progressMs: track.progress_ms || 0,
          });
          setIsPlaying(track.is_playing || false);
          setTimeStamp(new Date().toISOString());
          setPlayingDeviceId(track.device?.id);
        } else {
          // Get recently played if nothing currently playing
          const recently = await getRecentlyPlayed(accessToken, 5);
          if (recently && recently.items && recently.items.length > 0) {
            const firstTrack = recently.items[0];
            setCurrentTrack({
              name: firstTrack.track.name,
              artist: firstTrack.track.artists.map(a => a.name).join(', '),
              album: firstTrack.track.album.name,
              image: firstTrack.track.album.images[0]?.url,
              duration: firstTrack.track.duration_ms / 1000,
              url: firstTrack.track.external_urls.spotify,
              id: firstTrack.track.id,
            });
            setIsPlaying(false);
            setTimeStamp(firstTrack.played_at);
            
            // Format recently played list
            setRecentlyPlayed(recently.items.map(item => ({
              id: item.track.id,
              name: item.track.name,
              artist: item.track.artists.map(a => a.name).join(', '),
              image: item.track.album.images[0]?.url,
              playedAt: item.played_at,
              url: item.track.external_urls.spotify,
            })));
          }
        }
      } catch (err) {
        console.error('Error fetching track:', err);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 3000);
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
    if (!accessToken || !playingDeviceId) return;

    try {
      const endpoint = isPlaying 
        ? 'https://api.spotify.com/v1/me/player/pause'
        : 'https://api.spotify.com/v1/me/player/play';

      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_id: playingDeviceId,
        }),
      });

      if (response.ok) {
        setIsPlaying(!isPlaying);
      } else {
        setError('Unable to control playback. Make sure Spotify is open.');
      }
    } catch (err) {
      setError('Playback error: ' + err.message);
    }
  };

  // Volume control
  const handleVolumeChange = async (newVolume) => {
    if (!accessToken || !playingDeviceId) return;

    setVolume(newVolume);
    
    try {
      await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${newVolume}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      console.error('Volume control error:', err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setAccessToken(null);
    setCurrentTrack(null);
    setError(null);
    setRecentlyPlayed([]);
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

  // If authenticated but no track, show loading
  if (!currentTrack) {
    return (
      <div
        ref={playerRef}
        className="music-player"
        onMouseDown={handleMouseDown}
      >
        <div className="music-bar">
          <div style={{ textAlign: 'center', padding: '16px 12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
              ⏳ Loading...
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

        {/* Controls */}
        <div className="music-controls">
          <a
            href={currentTrack.url}
            target="_blank"
            rel="noopener noreferrer"
            className="music-ctrl"
            title="Open in Spotify"
          >
            ↗
          </a>
          <button
            className="music-ctrl music-ctrl--play"
            onClick={handlePlayPause}
            disabled={!playingDeviceId}
            title={playingDeviceId ? (isPlaying ? "Pause" : "Play") : "No active device"}
            style={{ opacity: playingDeviceId ? 1 : 0.5 }}
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
            disabled={!playingDeviceId}
            style={{ opacity: playingDeviceId ? 1 : 0.5 }}
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
        {!playingDeviceId && (
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '4px' }}>
            Open Spotify to control playback
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;