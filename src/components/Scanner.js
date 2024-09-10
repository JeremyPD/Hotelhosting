import React, { useCallback, useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelDropzone() {
  const [data, setData] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [error, setError] = useState('');

  // Maneja la carga del archivo cuando se arrastra y se suelta
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (!file) return;

    processFile(file);
  }, []);

  // Maneja la selección del archivo desde un input de archivo
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    processFile(file);
  };

  // Procesa el archivo Excel
  const processFile = (file) => {
    setError('');
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const binaryString = e.target.result;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        setSheetNames(workbook.SheetNames);
        setSelectedSheet(workbook.SheetNames[0]); // Selecciona la primera hoja por defecto

        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet);
        setData(json);
      } catch (err) {
        setError('Error al procesar el archivo.');
        console.error(err);
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()} // Permite que el archivo sea soltado
      style={{
        border: '2px dashed #ccc',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileSelect}
        style={{ display: 'none' }} // Oculta el input de archivo
      />
      <p>Arrastra y suelta un archivo Excel aquí, o haz clic para seleccionar uno.</p>
      {sheetNames.length > 0 && (
        <div>
          <select onChange={(e) => setSelectedSheet(e.target.value)} value={selectedSheet}>
            {sheetNames.map((sheetName) => (
              <option key={sheetName} value={sheetName}>
                {sheetName}
              </option>
            ))}
          </select>
        </div>
      )}
      {data.length > 0 && (
        <div>
          <h3>Datos de {selectedSheet}:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default ExcelDropzone;
