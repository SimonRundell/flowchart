# Flowchart Boss

**Version 0.1.1**

A browser-based flowchart builder built with React and Vite. No back-end, no external diagram library — everything runs in the browser using a pure SVG canvas.

Created by Simon Rundell, Dept of ITDD, Exeter College.

---

## Changelog

### v0.1.1 — 2026-06-09
- Added **Learning Centre** — a self-paced learning drawer covering 27 lessons and tasks across 6 modules, from flowchart fundamentals through to T-Level computer science algorithms (searching, sorting, recursion, merge sort, stacks).
- Learning progress is persisted in the browser's `localStorage` so it survives page reloads.
- New files: `src/components/LearningDrawer.jsx`, `src/data/lessons.js`.

### v0.1.0 — Initial release
- Drag-and-drop SVG canvas with 6 standard flowchart symbols.
- Pan, zoom, node/edge editing, JSON and SVG export, print support.

---

## Features

- Drag-and-drop standard flowchart symbols onto an infinite canvas
- Connect nodes by dragging from their port handles
- Bezier-curve edges with optional labels
- Pan and zoom the canvas freely
- Inline text editing on nodes and edges
- Per-node font size, bold toggle, and text-position control
- Save / load diagrams as JSON
- Export the diagram as an SVG image
- Print or save as PDF via the browser
- **Learning Centre** — self-paced guided learning with 27 lessons and tasks, progress saved locally

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

The app opens at `http://localhost:5173` (or the next available port).

### Production build

```bash
npm run build      # outputs to dist/
npm run preview    # local preview of the production build
```

---

## How to Use

### Building a diagram

| Action | How |
|---|---|
| Add a node | Drag a symbol from the **Symbols** panel on the left onto the canvas |
| Select a node | Click it |
| Move a node | Click and drag it |
| Connect two nodes | Hover a node to reveal its port dots (blue circles), then drag from a port to a port on another node |
| Delete selected item | Press **Delete** or **Backspace**, or click the Delete button in the toolbar |
| Edit node text | Double-click the node; press **Enter** or click away to commit, **Shift+Enter** for a line break |
| Edit edge label | Double-click the edge |

### Navigating the canvas

| Action | How |
|---|---|
| Zoom in / out | Scroll wheel, or the **+** / **−** toolbar buttons |
| Pan | Hold **Space** and drag, or drag with the middle mouse button |
| Reset zoom | Click **Reset** in the toolbar |

### Node properties (toolbar, when a node is selected)

- **Label** — multi-line text area for the node's label
- **Font size** — pick from 9 px to 32 px
- **Bold** — toggle bold weight
- **Text position** — place the label inside, above, below, left, or right of the shape

### Edge properties (toolbar, when an edge is selected)

- **Label** — text shown at the midpoint of the edge (e.g. "Yes" / "No")
- **Font size** — pick from 9 px to 18 px

### File operations

| Button | Action |
|---|---|
| **New** | Clear the canvas (confirms if there are unsaved nodes) |
| **Import** | Load a `.json` file previously exported from this app |
| **Export JSON** | Save the diagram as `flowchart.json` |
| **Export SVG** | Save the canvas as `flowchart.svg` |
| **Print / PDF** | Opens the browser print dialog |

---

## Learning Centre

Click the **Learning** tab on the right edge of the screen to open the Learning Centre drawer. It can be kept open alongside the canvas while you work.

### Modules

| Module | Type | Items |
|---|---|---|
| Introduction to Flowcharts | Theory | What flowcharts are; standard symbols; good practice |
| Everyday Processes | Tasks | Cup of tea, crossing the road, website login, vending machine |
| Loops and Repetition | Theory + Tasks | Loop concepts; countdown; sum until zero; times tables |
| Searching Algorithms | Theory + Tasks | Linear search; binary search |
| Sorting Algorithms | Theory + Tasks | Bubble sort; insertion sort; selection sort |
| Advanced Algorithms (T-Level) | Theory + Tasks | Recursion; factorial; merge sort; stack push/pop |

### Difficulty levels

Tasks are labelled to indicate expected prior knowledge:

| Level | Meaning |
|---|---|
| Starter | No prior experience needed |
| Beginner | Comfortable with basic symbols and simple sequences |
| Intermediate | Confident with loops and multiple decisions |
| Advanced | Familiar with nested loops and algorithm concepts |
| Expert | T-Level / A-Level standard |

### Progress tracking

Clicking **Mark as complete** on any item records it in the browser's `localStorage`. The progress bar at the top of the drawer updates immediately. Progress persists across sessions and page reloads, but is tied to the browser — clearing site data will reset it.

---

## Symbol Reference

| Symbol | Shape | Standard meaning |
|---|---|---|
| **Terminal** | Rounded rectangle | Start or End of a process |
| **Process** | Rectangle | A step or action |
| **Sub-Process** | Rectangle with vertical bars at each end | A defined sub-routine or sub-process |
| **Decision** | Diamond | A branch point (Yes/No, True/False, etc.) |
| **Input / Output** | Parallelogram | Data entering or leaving the process |
| **Connector** | Circle | Off-page connector or junction point |

---

## JSON File Format

Diagrams are saved as a plain JSON object with two arrays.

```json
{
  "nodes": [ ... ],
  "edges": [ ... ]
}
```

### Node object

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier (`id_1`, `id_2`, …) |
| `type` | string | `terminal`, `process`, `subprocess`, `decision`, `io`, or `connector` |
| `x` | number | Centre x position in SVG coordinates |
| `y` | number | Centre y position in SVG coordinates |
| `width` | number | Shape width in pixels |
| `height` | number | Shape height in pixels |
| `text` | string | Label text (newlines are supported) |
| `fontSize` | number | Label font size in px (default 13) |
| `fontWeight` | string | `"normal"` or `"bold"` |
| `textPos` | string | `"inside"`, `"above"`, `"below"`, `"left"`, or `"right"` |

### Edge object

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier |
| `fromId` | string | ID of the source node |
| `fromPort` | string | Source port: `"top"`, `"right"`, `"bottom"`, or `"left"` |
| `toId` | string | ID of the target node |
| `toPort` | string | Target port: `"top"`, `"right"`, `"bottom"`, or `"left"` |
| `label` | string | Optional edge label |
| `labelFontSize` | number | Label font size in px (default 12) |

---

## Project Structure

```
flowchart/
├── public/
│   └── images/favicon.png
├── src/
│   ├── App.jsx               # Root component; owns all diagram state
│   ├── App.css               # Global styles
│   ├── main.jsx              # React entry point
│   ├── CMFloatAd.jsx         # Floating attribution banner
│   ├── components/
│   │   ├── Canvas.jsx        # SVG canvas: grid, nodes, edges, text-editor overlay
│   │   ├── EdgePath.jsx      # Bezier edge renderer and temporary drag-edge
│   │   ├── LearningDrawer.jsx# Self-paced learning drawer with progress tracking
│   │   ├── Modal.jsx         # Alert / confirm dialog
│   │   ├── NodeShape.jsx     # Node shape geometry, text, and port handles
│   │   ├── Palette.jsx       # Left-hand symbol library
│   │   └── Toolbar.jsx       # Top toolbar: file ops, zoom, properties panel
│   ├── data/
│   │   └── lessons.js        # All Learning Centre module and lesson content
│   └── utils/
│       ├── fileUtils.js      # JSON/SVG export, JSON import, print
│       └── geometry.js       # Coordinate transforms, port positions, bezier maths
├── index.html
├── package.json
└── vite.config.js
```

### Key architectural notes

- **All state lives in `App.jsx`** — nodes, edges, viewport, selection, drag/connect/pan state, and the active modal. Child components receive data and callbacks via props.
- **The canvas is a plain SVG element.** There is no third-party diagram library. Pan and zoom are implemented as a single SVG `<g transform="translate(x,y) scale(s)">` wrapper.
- **Edges are cubic Bezier curves.** Control-point distance is proportional to the straight-line distance between ports, capped at a minimum of 60 px, so short connections still curve gracefully.
- **Text editing** uses a `<textarea>` absolutely positioned over the SVG (not a foreign object), scaled to match the current viewport zoom.
- **File save** uses the File System Access API (`showSaveFilePicker`) where available, with a `<a download>` fallback for browsers that do not support it.
- **Learning Centre progress** is stored in `localStorage` under the key `flowchart_learning_progress` as a flat object mapping item IDs to booleans.

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| React | 18 | UI rendering |
| Vite | 5 | Dev server and bundler |
| @vitejs/plugin-react | 4 | JSX transform / fast refresh |

No CSS framework or diagram library is used.

---

## Browser Support

Any modern browser (Chrome, Firefox, Edge, Safari). The File System Access API save dialog is available in Chromium-based browsers; Firefox and Safari fall back to a standard download.

---

## License

Copyright (c) 2026 Simon Rundell, Dept of ITDD, Exeter College.

This work is licensed under [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/).

You are free to share and adapt this work for non-commercial purposes, provided you give appropriate credit and distribute any derivative works under the same license.
