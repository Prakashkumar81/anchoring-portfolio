/** compress-videos.mjs
* Rebuilds the portfolio videos for browser-safe playback while preserving
* the original 1080p quality and smooth motion.
*
* The bug here was a broken, partially generated encode that produced a
* corrupted MP4 in the public assets folder. The fix is to re-encode from the
* original source videos using a stable H.264 + AAC pipeline that keeps the
* audio clear and the motion smooth without excessive quality loss.
*
* Run: node compress-videos.mjs
*/
import ffmpegPath from 'ffmpeg-static'
import { spawn } from 'child_process'
import { readdirSync, statSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

const SOURCE_DIR = join(process.cwd(), '_original_videos')
const COMPRESSED_DIR = join(process.cwd(), 'public', 'assets', 'compressed')

// Keep the original 1080p framing, but bring the encode to a browser-safe
// 30fps H.264/AAC format for smooth playback without visible quality loss.
const TARGETS = ['Shayri.MP4', 'anniversary shayri male.MP4', 'Happy Engagement.mp4']

mkdirSync(COMPRESSED_DIR, { recursive: true })

function formatMB(bytes) {
 return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function compressFile(fileName) {
 return new Promise((resolve) => {
   const inputPath = join(SOURCE_DIR, fileName)
   const outName = fileName.replace(/ /g, '-')
   const outputPath = join(COMPRESSED_DIR, outName)

   if (!existsSync(inputPath)) {
     console.log(`Skipping (not found): ${fileName}`)
     return resolve()
   }

   const inSize = statSync(inputPath).size
   console.log(`\nRe-encoding: ${fileName} (${formatMB(inSize)})`)

   const args = [
     '-y',
     '-i', inputPath,
     '-map', '0:v:0',
     '-map', '0:a:0?',
     '-c:v', 'libx264',
     '-preset', 'slow',
     '-crf', '18',
     '-r', '30',
     '-pix_fmt', 'yuv420p',
     '-profile:v', 'high',
     '-level', '4.0',
     '-c:a', 'aac',
     '-b:a', '192k',
     '-ar', '48000',
     '-movflags', '+faststart',
     '-vf', 'fps=30',
     outputPath,
   ]

   const proc = spawn(ffmpegPath, args)
   proc.stderr.on('data', () => process.stdout.write('.'))
   proc.on('close', (code) => {
     if (code === 0) {
       const outSize = statSync(outputPath).size
       const saved = (1 - outSize / inSize) * 100
       console.log(`\nDone: ${fileName} → ${outName} (${formatMB(outSize)}, saved ${saved.toFixed(0)}%)`)
     } else {
       console.log(`\nError re-encoding ${fileName} (exit ${code})`)
     }
     resolve()
   })
   proc.on('error', (err) => {
     console.error(`\nFailed to spawn ffmpeg: ${err.message}`)
     resolve()
   })
 })
}

console.log('=== Rebuilding portfolio videos for smooth browser playback ===')
const files = readdirSync(SOURCE_DIR).filter((f) => /\.(mp4|MP4)$/.test(f))
console.log('Found files:', files.join(', ') || '(none)')

for (const file of files) {
 if (TARGETS.includes(file)) {
   await compressFile(file)
 }
}

console.log('\n=== Re-encoding complete ===')
console.log('Output folder:', COMPRESSED_DIR)
console.log('Files there:', readdirSync(COMPRESSED_DIR).join(', ') || '(none)')
