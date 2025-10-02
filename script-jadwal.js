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
        
        let headerRow = '<tr>';
        headers.forEach(header => {
            headerRow += `<th>${header}</th>`;
        });
        headerRow += '</tr>';
        thead.innerHTML = headerRow;

        data.forEach(rowData => {
            let row = '<tr>';
            headers.forEach(header => {
                let cellData = rowData[header] === '-' ? '' : rowData[header];
                // Mengganti koma dengan tag <br> agar nama turun ke bawah
                cellData = cellData.replace(/, /g, '<br>');
                row += `<td>${cellData}</td>`;
            });
            row += '</tr>';
            tbody.innerHTML += row;
        });
    }

    // Mengambil kedua file CSV
    Promise.all([
        fetch('data/jadwal-kuliah.csv').then(response => response.text()),
        fetch('data/jadwal-piket.csv').then(response => response.text())
    ])
    .then(([csvKuliah, csvPiket]) => {
        const dataKuliah = parseCSV(csvKuliah);
        const dataPiket = parseCSV(csvPiket);

        renderTable(dataKuliah, 'jadwal-kuliah-head', 'jadwal-kuliah-body');
        
        // --- PERUBAHAN UNTUK JADWAL PIKET ---
        // Karena jadwal piket hanya 2 baris, kita buat tabelnya secara manual
        // agar lebih sesuai dengan gambar.
        const piketContainer = document.getElementById('jadwal-piket-container');
        let piketHTML = `
            <h2 class="mb-3">Jadwal Piket</h2>
            <h4 class="mt-4">Minggu Pertama & Ketiga</h4>
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr><th>Selasa</th><th>Rabu</th><th>Kamis</th><th>Jumat</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${dataPiket[0].Selasa.replace(/, /g, '<br>')}</td>
                            <td>${dataPiket[0].Rabu.replace(/, /g, '<br>')}</td>
                            <td>${dataPiket[0].Kamis.replace(/, /g, '<br>')}</td>
                            <td>${dataPiket[0].Jumat.replace(/, /g, '<br>')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h4 class="mt-4">Minggu Kedua & Keempat</h4>
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover">
                    <thead>
                        <tr><th>Selasa</th><th>Rabu</th><th>Kamis</th><th>Jumat</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${dataPiket[1].Selasa.replace(/, /g, '<br>')}</td>
                            <td>${dataPiket[1].Rabu.replace(/, /g, '<br>')}</td>
                            <td>${dataPiket[1].Kamis.replace(/, /g, '<br>')}</td>
                            <td>${dataPiket[1].Jumat.replace(/, /g, '<br>')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
        piketContainer.innerHTML = piketHTML;

    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('jadwal-kuliah-container').innerHTML = '<p class="text-danger">Gagal memuat jadwal kuliah.</p>';
        document.getElementById('jadwal-piket-container').innerHTML = '<p class="text-danger">Gagal memuat jadwal piket.</p>';
    });
});