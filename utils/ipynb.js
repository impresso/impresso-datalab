// export type cell = {
//   cell_type: "markdown" | "code"
//   source: string | string[]
// }

// export type kernelspec = {
//   language?: string
// }

export const extractMdFromIpynbCells = (
  // kernelspec: kernelspec,
  // cells: cell[],
  kernelspec = {},
  cells = []
) => {
  const language = kernelspec.language ?? "python"
  const content = cells
    .map((cell, i) => {
      const source = Array.isArray(cell.source)
        ? cell.source.join("")
        : cell.source
      if (cell.cell_type === "markdown") {
        // apply some regex transformation, eg removing <br> tags
        const regex = /<br\s*\/?>/gi
        // or remove </br> tags
        // const regex = /<\/br>/gi
        const transformedSource = source
          .replace(regex, "\n")
          .replace(/<\/br\s*>/gi, "\n")
        return `{/* cell:${i} cell_type:${cell.cell_type} */}\n${transformedSource}\n`
      }
      return `{/* cell:${i} cell_type:${cell.cell_type} */}\n\`\`\`${language}\n${source}\n\`\`\`\n`
    })
    .join("\n")

  // extract markdown links with label using regex, then puth them in a object {href, label}
  const links = []
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match
  while ((match = linkRegex.exec(content))) {
    links.push({ href: match[2], label: match[1] })
  }

  return {
    content,
    links,
  }
}

export const getTitleFromIpynb = (cells) => {
  const cellWithH1idx = cells.findIndex((cell) => {
    if (cell.cell_type !== "markdown") return false
    if (Array.isArray(cell.source)) {
      if (cell.source.length === 0) {
        return false
      }
      return cell.source[0].trim().startsWith("# ")
    }
    return cell.source.startsWith("# ")
  })

  if (cellWithH1idx < 0) {
    console.log("no heading found in ipynb!!")
    return null
  }
  const cellWithH1 = cells[cellWithH1idx]
  if (Array.isArray(cellWithH1.source)) {
    return {
      title: cellWithH1.source[0].trim().replace(/#/g, "").trim(),
      source: cellWithH1.source.slice(1),
      cellIdx: cellWithH1idx,
    }
  } else {
    return {
      title: cellWithH1.source.trim().replace(/#/g, "").trim(),
      cellIdx: cellWithH1idx,
    }
  }
}
