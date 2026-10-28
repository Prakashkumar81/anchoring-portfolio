import ffmpegPath from 'ffmpeg-static'
import { spawn } from 'child_process'
import { readdirSync, existsSync, mkdirSync, statSync } from 'fs'
import { join } from 'path'

const SRC = join(process.cwd(), '_original_videos')
const OUT = join(process.cwd(), 'public', 'assets', 'wmv')
mkdirSync(OUT, { recursive: true })

const files = readdirSync(SRC).filter((f) => /\.(mp4|MP4)$/.test(f))
console.log('Source files:', files)

function encode(fileName) {
  return new Promise((resolve) => {
    const input = join(SRC, fileName)
    const outName = fileName.replace(/ /g, '-').replace(/\.(mp4|MP4)$/i, '.mp4')
    const output = join(OUT, outName)
    if (!existsSync(input)) return resolve()
    console.log(`\nEncoding ${fileName} ...`)
    const args = [
      '-y', '-i', input,
      '-c:v', 'libx264',
      '-profile:v', 'baseline',
      '-level', '3.1',
      '-pix_fmt', 'yuv420p',
      '-vf', 'fps=24,scale=640:-2',
      '-c:a', 'aac', '-b:a', '128k', '-ac', '2',
      '-movflags', '+faststart',
      '-preset', 'fast',
      '-crf', '26',
      output,
    ]
    const p = spawn(ffmpegPath, args)
    p.stderr.on('data', (d) => {
      const s = d.toString()
      if (s.includes('Audio:')) console.log('  AUDIO STREAM:', s.split('\n').find(l=>l.includes('Audio:')).trim())
      if (s.includes('Video:')) console.log('  VIDEO STREAM:', s.split('\n').find(l=>l.includes('Video:')).trim())
    })
    p.on('close', (code) => {
      if (code === 0) {
        const mb = (statSync(output).size / 1024 / 1024).toFixed(1)
        console.log(`  OK → ${outName} (${mb}MB)`)
      } else {
        console.log(`  FAILED exit ${code}`)
      }
      resolve()
    })
    p.on('error', (e) => { console.log('  spawn error', e.message); resolve() })
  })
}

for (const f of files) await encode(f)
console.log('\nDone. Output in wmv/')
