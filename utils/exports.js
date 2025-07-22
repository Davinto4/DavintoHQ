export function exportToCsv(items, filename = 'export.csv') {
  if (!items || !items.length) {
    alert('No data to export');
    return;
  }

  const replacer = (key, value) => (value === null || value === undefined ? '' : value);
  const header = Object.keys(items[0]);
  const csv = [
    header.join(','), // header row first
    ...items.map(row =>
      header
        .map(fieldName => JSON.stringify(row[fieldName], replacer))
        .join(',')
    ),
  ].join('\r\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (navigator.msSaveBlob) {
    // For IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}