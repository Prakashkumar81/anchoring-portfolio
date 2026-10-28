import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Helper to normalize any YouTube URL (watch, youtu.be, embed) into an embed URL.
 */
function getYouTubeEmbedUrl(url, autoplay = false) {
  if (!url) return ''
  const regExp = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i
  const match = url.match(regExp)
  const videoId = match ? match[1] : null

  if (videoId) {
    const params = new URLSearchParams()
    if (autoplay) {
      params.set('autoplay', '1')
    }
    params.set('rel', '0')
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }

  if (autoplay && !url.includes('autoplay=')) {
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}autoplay=1`
  }
  return url
}

/**
 * VideoPlayer — supports both embedded YouTube players and HTML5 <video> elements.
 */
function VideoPlayer({ url, title = 'Video player', controls = true, className = '', playing = false }) {
  const isYouTube = Boolean(url && (url.includes('youtube.com') || url.includes('youtu.be')))
  const videoRef = useRef(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (isYouTube) return
    const el = videoRef.current
    if (!el) return

    el.muted = isMuted
    el.volume = isMuted ? 0 : 1

    if (playing) {
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [isMuted, playing, url, isYouTube])

  const handleSoundToggle = (event) => {
    event.stopPropagation()
    const el = videoRef.current
    if (!el) return

    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    el.muted = nextMuted
    el.volume = nextMuted ? 0 : 1

    if (!nextMuted && playing) {
      el.play().catch(() => {})
    }
  }

  if (isYouTube) {
    const embedSrc = getYouTubeEmbedUrl(url, playing)
    return (
      <div className={`video-player-wrap video-player-iframe-wrap ${className}`}>
        <iframe
          className="video-player-iframe"
          src={embedSrc}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className={`video-player-wrap ${className}`}>
      <button
        type="button"
        className="video-player-sound-btn"
        onClick={handleSoundToggle}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? '🔇 Unmute' : '🔊 Sound on'}
      </button>

      <video
        ref={videoRef}
        className="video-player-native"
        src={url}
        controls={controls}
        preload="auto"
        playsInline
        muted={isMuted}
        volume={isMuted ? 0 : 1}
        controlsList="nodownload"
        onLoadedMetadata={(event) => {
          event.currentTarget.muted = isMuted
          event.currentTarget.volume = isMuted ? 0 : 1
        }}
      />
    </div>
  )
}

VideoPlayer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
  controls: PropTypes.bool,
  className: PropTypes.string,
  playing: PropTypes.bool,
}

export default VideoPlayer
