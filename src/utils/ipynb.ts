import type { CellInfo } from "../types"

/**
 * Parses notebook cell markup text and extracts structured cell information.
 *
 * This function processes text containing Jupyter notebook cells marked with
 * Parses notebook cell markup text and extracts structured cell information.
 *
 * This function processes text containing Jupyter notebook cells marked with
 * special comments in the format `{/* cell:N cell_type:TYPE *\/}`
 *
 * @param text - The notebook content string containing cell markers and content.
 *               Cell markers use the format: `{/* cell:0 cell_type:markdown *\/}`
 *
 * @returns An array of CellInfo objects, each containing:
 *          - cellNumber: The cell number from the marker
 *          - cellType: The type of cell (e.g., 'markdown', 'code')
 *          - content: The cleaned cell content (code blocks removed, links extracted)
 *          - idx: The starting index of the cell marker in the original text
 *          - l: The length of the cell marker
 *          - hl: Heading level (0 for non-headings, 1-6 for markdown headings)
 *          - h: The heading text (empty string if not a heading)
 *
 * @example
 * const input = `
 *   # Introduction
 *   This is a test notebook.
 *   {/* cell:1 cell_type:code *\/}
 *   \`\`\`python
 *   print("Hello")
 *   \`\`\`
 * `;
 * const cells = splitTextWithCellInfo(input);
 * // cells[0].cellNumber === 0
 * // cells[0].cellType === 'markdown'
 * // cells[0].h === 'Introduction'
 * // cells[0].hl === 2 (## = two hashes)
 *
 * @remarks
 * - Content is automatically trimmed and cleaned:
 *   - Python code fence markers are removed
 *   - HTML anchor tags are stripped
 * - Markdown headings are detected using regex `/^#+\s/`
 * - Heading level is calculated from the number of '#' characters}
 *   # Introduction
 *   This is a test notebook.
 *   {<comment> cell:1 cell_type:code <end comment>}
 *   \`\`\`python
 *   print("Hello")
 *   \`\`\`
 * `;
 * const cells = splitTextWithCellInfo(input);
 * // cells[0].cellNumber === 0
 * // cells[0].cellType === 'markdown'
 * // cells[0].h === 'Introduction'
 * // cells[0].hl === 2 (## = two hashes)
 *
 * @remarks
 * - Content is automatically trimmed and cleaned:
 *   - Python code fence markers are removed
 *   - HTML anchor tags are stripped
 * - Markdown headings are detected using regex `/^#+\s/`
 * - Heading level is calculated from the number of '#' characters
 */
export const splitTextWithCellInfo = (text: string): Array<CellInfo> => {
  const cells: Array<CellInfo> = []
  const regex = /\{\/*\*\s*cell:(\d+)\s*cell_type:(\w+)\s*\*\/\}/g
  let match
  while ((match = regex.exec(text)) !== null) {
    cells.push({
      idx: match.index,
      l: match[0].length,
      cellNumber: parseInt(match[1]),
      cellType: match[2],
      content: "",
      hl: 0,
      h: "",
    })
  }

  // now based on the indexes we can extract the content
  for (let i = 0; i < cells.length; i++) {
    const start = cells[i].idx + cells[i].l
    const end = cells[i + 1]?.idx

    cells[i].content = text
      .slice(start, end)
      .trim()
      .replace(/^```python/, "")
      .replace(/```$/, "")
      // remove all links in html format
      .replace(/<a[\s\S]*?<\/a>/g, "")
      .trim()
    // check if the cell is markdown and extract the heading level
    if (cells[i].cellType === "markdown") {
      const headingMatch = cells[i].content.match(/^#+ /)
      if (headingMatch) {
        cells[i].hl = headingMatch[0].length
        cells[i].h = cells[i].content.split("\n")[0].replace(/^#+ /, "")
      }
    }
  }

  return cells
}
