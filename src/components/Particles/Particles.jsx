import { useEffect, useRef } from 'react'

// Floating golden particles background
function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    let animationId
    let width, height

    const generate = () => {
      const count = Math.min(Math.floor(width / 18), 120)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.6 + 0.2,
      }))
    }

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      generate()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0 || p.x > width) p.speedX *= -1
        if (p.y < 0 || p.y > height) p.speedY *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)'
        ctx.shadowBlur = 8
        ctx.fill()
      })
      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />
}

export default Particles
