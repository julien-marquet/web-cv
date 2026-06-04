import puppeteer from 'puppeteer'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, '../index.html')
const out = resolve(__dirname, '../cv.pdf')

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})
const page = await browser.newPage()

await page.goto(`file://${src}`, { waitUntil: 'networkidle0' })
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
})

await browser.close()
console.log(`PDF saved → ${out}`)
