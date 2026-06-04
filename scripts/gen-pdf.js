import puppeteer from 'puppeteer'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, '../index.html')

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
await page.goto(`file://${src}`, { waitUntil: 'networkidle0' })

for (const lang of ['fr', 'en']) {
  await page.evaluate((l) => applyTranslation(l), lang)
  const out = resolve(__dirname, `../cv-${lang}.pdf`)
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  })
  console.log(`PDF saved → ${out}`)
}

await browser.close()
