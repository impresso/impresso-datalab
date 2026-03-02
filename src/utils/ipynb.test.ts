import { describe, it, expect } from "vitest"
import { splitTextWithCellInfo } from "./ipynb"
import type { CellInfo } from "../types"

describe("splitTextWithCellInfo", () => {
  it("should parse a single markdown cell", () => {
    const input = `{/* cell:0 cell_type:markdown */}
# Hello World`

    const result = splitTextWithCellInfo(input)

    expect(result).toHaveLength(1)
    expect(result[0].cellNumber).toBe(0)
    expect(result[0].cellType).toBe("markdown")
    expect(result[0].content).toContain("# Hello World")
  })

  it("should parse multiple cells with different types", () => {
    const input = `{/* cell:0 cell_type:markdown */}
# Introduction

{/* cell:1 cell_type:code */}
\`\`\`python
print("hello")
\`\`\``

    const result = splitTextWithCellInfo(input)

    expect(result).toHaveLength(2)
    expect(result[0].cellType).toBe("markdown")
    expect(result[1].cellType).toBe("code")
  })

  it("should extract heading information from markdown cells", () => {
    const input = `{/* cell:0 cell_type:markdown */}
## Section Title
Some content here`

    const result = splitTextWithCellInfo(input)

    expect(result[0].h).toBe("Section Title")
    expect(result[0].hl).toBe(3) // "## " has 3 characters
  })

  it("should handle non-heading markdown cells", () => {
    const input = `{/* cell:0 cell_type:markdown */}
This is regular content without a heading.`

    const result = splitTextWithCellInfo(input)

    expect(result[0].h).toBe("")
    expect(result[0].hl).toBe(0)
  })

  it("should remove python code fence markers from content", () => {
    const input = `{/* cell:0 cell_type:code */}
\`\`\`python
x = 42
print(x)
\`\`\``

    const result = splitTextWithCellInfo(input)

    expect(result[0].content).not.toContain("```python")
    expect(result[0].content).not.toContain("```")
    expect(result[0].content).toContain("x = 42")
  })

  it("should remove HTML anchor tags from content", () => {
    const input = `{/* cell:0 cell_type:markdown */}
Check out <a href="https://example.com">this link</a> for more info.`

    const result = splitTextWithCellInfo(input)

    expect(result[0].content).not.toContain("<a")
    expect(result[0].content).not.toContain("</a>")
  })

  it("should store cell marker position and length", () => {
    const input = `{/* cell:0 cell_type:markdown */}
Content`

    const result = splitTextWithCellInfo(input)

    expect(result[0].idx).toBe(0)
    expect(result[0].l).toBe("{/* cell:0 cell_type:markdown */}".length)
  })

  it("should correctly extract content between cells", () => {
    const input = `{/* cell:0 cell_type:markdown */}
First cell content
{/* cell:1 cell_type:code */}
Second cell content`

    const result = splitTextWithCellInfo(input)

    expect(result[0].content).toContain("First cell content")
    expect(result[0].content).not.toContain("Second cell content")
    expect(result[1].content).toContain("Second cell content")
  })

  it("should trim whitespace from cell content", () => {
    const input = `{/* cell:0 cell_type:markdown */}

    Some content with leading/trailing whitespace
    `

    const result = splitTextWithCellInfo(input)

    expect(result[0].content).toBe(
      "Some content with leading/trailing whitespace",
    )
  })

  it("should handle complex markdown with multiple heading levels", () => {
    const input = `{/* cell:0 cell_type:markdown */}
# Level 1
{/* cell:1 cell_type:markdown */}
### Level 3
{/* cell:2 cell_type:markdown */}
##### Level 5`

    const result = splitTextWithCellInfo(input)

    expect(result[0].h).toBe("Level 1")
    expect(result[0].hl).toBe(2)
    expect(result[1].h).toBe("Level 3")
    expect(result[1].hl).toBe(4)
    expect(result[2].h).toBe("Level 5")
    expect(result[2].hl).toBe(6)
  })

  it("should handle code cells with multiple code blocks", () => {
    const input = `{/* cell:0 cell_type:code */}
\`\`\`python
import pandas as pd
df = pd.read_csv('data.csv')
\`\`\``

    const result = splitTextWithCellInfo(input)

    expect(result[0].content).toContain("import pandas as pd")
    expect(result[0].content).toContain("df = pd.read_csv")
  })

  it("should preserve cell type as string", () => {
    const input = `{/* cell:0 cell_type:raw */}
Raw content`

    const result = splitTextWithCellInfo(input)

    expect(result[0].cellType).toBe("raw")
  })

  it("should handle empty cells", () => {
    const input = `{/* cell:0 cell_type:markdown */}
{/* cell:1 cell_type:code */}`

    const result = splitTextWithCellInfo(input)

    expect(result[0].content).toBe("")
    expect(result[1].content).toBe("")
  })

  it("should process real notebook example from ws4-embeddings", () => {
    const input = `{/* cell:2 cell_type:markdown */}
## Installation

Install the Impresso library (for now a specific branch).

{/* cell:3 cell_type:code */}
\`\`\`python
!pip install -qqq git+https://github.com/impresso/impresso-py.git@embeddings-search
\`\`\``

    const result = splitTextWithCellInfo(input)

    expect(result).toHaveLength(2)
    expect(result[0].cellNumber).toBe(2)
    expect(result[0].cellType).toBe("markdown")
    expect(result[0].h).toBe("Installation")
    expect(result[1].cellNumber).toBe(3)
    expect(result[1].cellType).toBe("code")
    expect(result[1].content).toContain("!pip install")
  })

  it("should handle cells with links and other HTML", () => {
    const input = `{/* cell:0 cell_type:markdown */}
Check <a href="docs.html">documentation</a> and <a target="_blank" href="link.html">external</a> links.`

    const result = splitTextWithCellInfo(input)

    expect(result[0].content).not.toMatch(/<a[^>]*>/g)
    expect(result[0].content).toContain("Check")
    expect(result[0].content).toContain("and")
  })

  it("should preserve multi-line content in cells", () => {
    const input = `{/* cell:0 cell_type:markdown */}
Line 1
Line 2
Line 3`

    const result = splitTextWithCellInfo(input)

    expect(result[0].content).toContain("Line 1")
    expect(result[0].content).toContain("Line 2")
    expect(result[0].content).toContain("Line 3")
  })

  it("should return correct CellInfo type structure", () => {
    const input = `{/* cell:0 cell_type:markdown */}
# Test`

    const result = splitTextWithCellInfo(input)
    const cell = result[0]

    // Verify all required properties exist
    expect(cell).toHaveProperty("cellNumber")
    expect(cell).toHaveProperty("cellType")
    expect(cell).toHaveProperty("content")
    expect(cell).toHaveProperty("idx")
    expect(cell).toHaveProperty("l")
    expect(cell).toHaveProperty("h")
    expect(cell).toHaveProperty("hl")

    // Verify types
    expect(typeof cell.cellNumber).toBe("number")
    expect(typeof cell.cellType).toBe("string")
    expect(typeof cell.content).toBe("string")
    expect(typeof cell.idx).toBe("number")
    expect(typeof cell.l).toBe("number")
    expect(typeof cell.h).toBe("string")
    expect(typeof cell.hl).toBe("number")
  })

  it("should handle edge case with code fence in middle of code", () => {
    const input = `{/* cell:0 cell_type:code */}
\`\`\`python
# This is a docstring
"""
Some documentation
\`\`\`
More code
\`\`\``

    const result = splitTextWithCellInfo(input)

    expect(result[0].content).toContain("# This is a docstring")
  })
})
