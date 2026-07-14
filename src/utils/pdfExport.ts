import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

/**
 * Renders the given DOM node to a multi-page A4 PDF.
 *
 * We rasterize with html2canvas rather than drawing text directly with jsPDF.
 * jsPDF's built-in fonts don't include Hangul glyphs, and embedding a Korean
 * font file just for PDF export is heavy — rendering the already-styled DOM
 * (which the browser renders with proper Korean fonts) to an image sidesteps
 * that entirely and keeps the PDF's look identical to the on-screen editor.
 */
export async function exportNodeToPdf(node: HTMLElement, filename: string): Promise<void> {
  const canvas = await html2canvas(node, {
    scale: 2,
    backgroundColor: '#F7F4EC',
    useCORS: true,
  })

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const pageWidthMm = pdf.internal.pageSize.getWidth()
  const pageHeightMm = pdf.internal.pageSize.getHeight()

  const imgWidthMm = pageWidthMm

  // How tall one PDF page is, expressed in source canvas pixels.
  const pageHeightPx = (pageHeightMm * canvas.width) / imgWidthMm

  let renderedPx = 0
  let pageIndex = 0

  while (renderedPx < canvas.height) {
    const sliceHeightPx = Math.min(pageHeightPx, canvas.height - renderedPx)

    const pageCanvas = document.createElement('canvas')
    pageCanvas.width = canvas.width
    pageCanvas.height = sliceHeightPx
    const ctx = pageCanvas.getContext('2d')
    if (!ctx) break
    ctx.drawImage(
      canvas,
      0,
      renderedPx,
      canvas.width,
      sliceHeightPx,
      0,
      0,
      canvas.width,
      sliceHeightPx,
    )

    const sliceImgData = pageCanvas.toDataURL('image/jpeg', 0.95)
    const sliceHeightMm = (sliceHeightPx * imgWidthMm) / canvas.width

    if (pageIndex > 0) pdf.addPage()
    pdf.addImage(sliceImgData, 'JPEG', 0, 0, imgWidthMm, sliceHeightMm)

    renderedPx += sliceHeightPx
    pageIndex += 1
  }

  pdf.save(filename)
}
