export const extractMdFromIpynbCells = (kernelspec, cells) => {
  const language = kernelspec.language
  return cells
    .map((cell, i) => {
      const source = Array.isArray(cell.source)
        ? cell.source.join("")
        : cell.source
      if (cell.cell_type === "markdown") {
        return `{/* cell:${i} cell_type:${cell.cell_type} */}\n${source}\n`
      }
      return `{/* cell:${i} cell_type:${cell.cell_type} */}\n\`\`\`${language}\n${source}\n\`\`\`\n`
    })
    .join("\n")
}

export const getTitleFromIpynb = (cells) => {
  const cellWithH1idx = cells.findIndex((cell) => {
    if (!cell.cell_type === "markdown") return false
    if (Array.isArray(cell.source)) {
      return cell.source[0].trim().startsWith("# ")
    }
    return cell.source.startsWith("# ")
  })
  if (cellWithH1idx < 0) return null
  const cellWithH1 = cells[cellWithH1idx]
  if (Array.isArray(cellWithH1.source)) {
    return {
      title: cellWithH1.source[0].trim().replace(/#/g, "").trim(),
      cellIdx: cellWithH1idx,
    }
  }
}
