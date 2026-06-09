export async function exportJSON(nodes, edges) {
  const data = JSON.stringify({ nodes, edges }, null, 2);
  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'flowchart.json',
        types: [{ description: 'JSON Flowchart File', accept: { 'application/json': ['.json'] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(data);
      await writable.close();
    } catch (e) {
      if (e.name !== 'AbortError') throw e;
    }
  } else {
    // Fallback for browsers without File System Access API
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flowchart.json';
    a.click();
    URL.revokeObjectURL(url);
  }
}

export function importJSON(onSuccess, onError) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.nodes && data.edges) onSuccess(data.nodes, data.edges);
        else onError('Invalid flowchart file', 'The selected file does not contain a valid flowchart. Please choose a file exported from this application.');
      } catch {
        onError('Could not read file', 'The file could not be parsed. Please ensure it is a valid JSON flowchart file.');
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

export function printDiagram() {
  window.print();
}

export async function exportSVG(svgEl) {
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svgEl);
  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: 'flowchart.svg',
        types: [{ description: 'SVG Image', accept: { 'image/svg+xml': ['.svg'] } }],
      });
      const writable = await handle.createWritable();
      await writable.write(svgStr);
      await writable.close();
    } catch (e) {
      if (e.name !== 'AbortError') throw e;
    }
  } else {
    const blob = new Blob([svgStr], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flowchart.svg';
    a.click();
    URL.revokeObjectURL(url);
  }
}
