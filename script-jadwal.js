document.addEventListener('DOMContentLoaded', () => {
    // Fungsi parseCSV tetap sama
    function parseCSV(text) {
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const values = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
            for (let j = 0; j < headers.length; j++) {
                let value = values[j] || '';
                if (value.startsWith('"') && value.endsWith('"')) { value = value.slice(1, -1); }
                obj[headers[j].trim()] = value;
            }
            result.push(obj);
        }
        return result;
    }

    // Fungsi untuk menampilkan data tabel
    function renderTable(data, theadId, tbodyId) {
        const thead = document.getElementById(theadId);
        const tbody = document.getElementById(tbodyId);
        
        thead.innerHTML = '';
        tbody.innerHTML = '';

        if (data.length === 0) return;

        const headers = Object.keys(data[0]);
        
        // Buat baris header
        let headerRow = '<tr>';
        headers.forEach(header => {
            headerRow += `<th>${header}</th>`;
        });
        headerRow += '</tr>';
        thead.innerHTML = headerRow;

        // Isi baris data
        data.forEach(rowData => {
            let row = '<tr>';
            headers.forEach(header => {
                // Ganti '-' dengan string kosong agar sel terlihat kosong
                const cellData = rowData[header] === '-' ? '' : rowData[header];
                row += `<td>${cellData}</td>`;
            });
            row += '</tr>';
            tbody.innerHTML += row;
        });
    }

    // Mengambil kedua file CSV secara bersamaan
    Promise.all([
        fetch('data/jadwal-kuliah.csv').then(response => response.text()),
        fetch('data/jadwal-piket.csv').then(response => response.text())
    ])
    .then(([csvKuliah, csvPiket]) => {
        const dataKuliah = parseCSV(csvKuliah);
        const dataPiket = parseCSV(csvPiket);

        renderTable(dataKuliah, 'jadwal-kuliah-head', 'jadwal-kuliah-body');
        renderTable(dataPiket, 'jadwal-piket-head', 'jadwal-piket-body');
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('jadwal-kuliah-container').innerHTML = '<p class="text-danger">Gagal memuat jadwal kuliah.</p>';
        document.getElementById('jadwal-piket-container').innerHTML = '<p class="text-danger">Gagal memuat jadwal piket.</p>';
    });
});