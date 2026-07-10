import styles from './DownloadButton.module.css'

const DownloadButtons = ({ qrRef, config, fileName = 'qrcode' }) => {

  const getSVGEl = () => qrRef?.current?.querySelector('svg')

  /* ── SVG download ─────────────────────────────────── */
  const downloadSVG = () => {
    const svgEl = getSVGEl()
    if (!svgEl) return

    const size = config.size
    const m    = config.margin
    const total = size + m * 2

    // Build wrapper SVG that includes the margin area + background
    const ns = 'http://www.w3.org/2000/svg'
    const wrapper = document.createElementNS(ns, 'svg')
    wrapper.setAttribute('xmlns', ns)
    wrapper.setAttribute('width',   total)
    wrapper.setAttribute('height',  total)
    wrapper.setAttribute('viewBox', `0 0 ${total} ${total}`)

    if (config.bgColor && config.bgColor !== 'transparent') {
      const bg = document.createElementNS(ns, 'rect')
      bg.setAttribute('width',  total)
      bg.setAttribute('height', total)
      bg.setAttribute('fill',   config.bgColor)
      wrapper.appendChild(bg)
    }

    const g = document.createElementNS(ns, 'g')
    g.setAttribute('transform', `translate(${m},${m})`)
    const qrClone = svgEl.cloneNode(true)
    g.appendChild(qrClone)
    wrapper.appendChild(g)

    triggerDownload(
      new Blob([new XMLSerializer().serializeToString(wrapper)], { type: 'image/svg+xml;charset=utf-8' }),
      `${fileName}.svg`
    )
  }

  /* ── PNG download (SVG → canvas → PNG) ───────────── */
  const downloadPNG = () => {
    const svgEl = getSVGEl()
    if (!svgEl) return

    const size  = config.size
    const m     = config.margin
    const total = size + m * 2
    const scale = 2 // retina quality

    const clone = svgEl.cloneNode(true)
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    clone.setAttribute('width',  size)
    clone.setAttribute('height', size)

    const svgBlob = new Blob(
      [new XMLSerializer().serializeToString(clone)],
      { type: 'image/svg+xml;charset=utf-8' }
    )
    const svgUrl = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width  = total * scale
      canvas.height = total * scale
      const ctx = canvas.getContext('2d')
      ctx.scale(scale, scale)

      // Background fill
      if (config.bgColor && config.bgColor !== 'transparent') {
        ctx.fillStyle = config.bgColor
        ctx.fillRect(0, 0, total, total)
      }

      ctx.drawImage(img, m, m, size, size)
      URL.revokeObjectURL(svgUrl)

      canvas.toBlob(blob => {
        triggerDownload(blob, `${fileName}.png`)
      }, 'image/png')
    }
    img.src = svgUrl
  }

  const triggerDownload = (blob, name) => {
    const url = URL.createObjectURL(blob)
    const a   = Object.assign(document.createElement('a'), { href: url, download: name })
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={styles.wrap}>
      <button className={styles.btnPrimary} onClick={downloadPNG}>
        <DownIcon /> Download PNG
      </button>
      <button className={styles.btnSecondary} onClick={downloadSVG}>
        <DownIcon /> Download SVG
      </button>
    </div>
  )
}

const DownIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

export default DownloadButtons
