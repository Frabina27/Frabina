import { useState, useRef, useEffect } from "react";

// ─── ADD YOUR SONGS HERE ───────────────────────────────────────────────────
const SONGS = [
  {
    id: 1,
    title: "Song Title",
    artist: "Artist Name",
    src: "/music/song1.mp3",   // path relative to /public
    cover: null,               // or "/covers/song1.jpg"
  },
  {
    id: 2,
    title: "Song Title",
    artist: "Artist Name",
    src: "/music/song2.mp3",
    cover: null,
  },
  {
    id: 3,
    title: "Song Title",
    artist: "Artist Name",
    src: "/music/song3.mp3",
    cover: null,
  },
];
// ──────────────────────────────────────────────────────────────────────────

const fmt = (s) => {
  if (!s || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export default function MusicPlayer() {
  const audioRef        = useRef(null);
  const isPlayingRef    = useRef(false);   // stale-closure-safe ref
  const progressBarRef  = useRef(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [progress,     setProgress]     = useState(0);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [duration,     setDuration]     = useState(0);
  const [expanded,     setExpanded]     = useState(false);
  const [volume,       setVolume]       = useState(0.8);

  const song = SONGS[currentIndex];

  // Keep ref in sync so the visibility handler never reads stale state
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  // ── Tab visibility: pause on hide, resume on show ──
  useEffect(() => {
    const handle = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (isPlayingRef.current) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  // ── Load new track whenever index changes ──
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src  = song.src;
    audio.load();
    if (isPlayingRef.current) {
      audio.play().catch(() => {});
    }
  }, [currentIndex]); // eslint-disable-line

  // ── Sync volume ──
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // ── Controls ──
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else           { audio.play().catch(() => {}); setIsPlaying(true); }
  };

  const prev = () => setCurrentIndex(i => (i - 1 + SONGS.length) % SONGS.length);
  const next = () => setCurrentIndex(i => (i + 1) % SONGS.length);

  const selectSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    // play() triggered by the useEffect above
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pct  = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    audio.currentTime = pct * audio.duration;
  };

  // ── Audio events ──
  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const onLoadedMetadata = () => setDuration(audioRef.current?.duration || 0);
  const onEnded          = () => next();

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      />

      {/* ── Player shell ── */}
      <div className={`music-player ${expanded ? "music-player--open" : ""}`}>

        {/* ── Song list (expandable) ── */}
        {expanded && (
          <div className="music-song-list">
            <p className="music-list-heading">Favorite Songs</p>
            {SONGS.map((s, i) => (
              <div
                key={s.id}
                className={`music-song-item ${i === currentIndex ? "music-song-item--active" : ""}`}
                onClick={() => selectSong(i)}
              >
                <div className="music-song-item-cover">
                  {s.cover
                    ? <img src={s.cover} alt={s.title} />
                    : <span className="music-note-icon">♪</span>
                  }
                </div>
                <div className="music-song-item-text">
                  <span className="music-song-item-title">{s.title}</span>
                  <span className="music-song-item-artist">{s.artist}</span>
                </div>
                {i === currentIndex && (
                  <span className="music-playing-dot" data-playing={isPlaying} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Now playing bar ── */}
        <div className="music-bar">

          {/* Song info — clicking expands the list */}
          <div className="music-bar-info" onClick={() => setExpanded(e => !e)} title="Show song list">
            <div className="music-bar-cover">
              {song.cover
                ? <img src={song.cover} alt={song.title} />
                : <span className="music-note-icon">♪</span>
              }
            </div>
            <div className="music-bar-text">
              <span className="music-bar-title">{song.title}</span>
              <span className="music-bar-artist">{song.artist}</span>
            </div>
            <span className="music-bar-chevron">{expanded ? "▾" : "▴"}</span>
          </div>

          {/* Transport controls */}
          <div className="music-controls">
            <button className="music-ctrl" onClick={prev} title="Previous">⏮</button>
            <button className="music-ctrl music-ctrl--play" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? "⏸" : "▶"}
            </button>
            <button className="music-ctrl" onClick={next} title="Next">⏭</button>
          </div>

          {/* Progress + time */}
          <div className="music-progress-wrap">
            <span className="music-time">{fmt(currentTime)}</span>
            <div
              className="music-progress"
              ref={progressBarRef}
              onClick={handleSeek}
              title="Seek"
            >
              <div className="music-progress-fill" style={{ width: `${progress}%` }} />
              <div className="music-progress-thumb" style={{ left: `${progress}%` }} />
            </div>
            <span className="music-time">{fmt(duration)}</span>
          </div>

          {/* Volume */}
          <div className="music-volume">
            <span className="music-vol-icon">{volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}</span>
            <input
              type="range"
              min="0" max="1" step="0.05"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="music-vol-slider"
              title="Volume"
            />
          </div>
        </div>
      </div>
    </>
  );
}