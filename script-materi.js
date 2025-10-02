document.addEventListener('DOMContentLoaded', () => {
    const daftarMateriContainer = document.getElementById('daftar-materi');

    function parseCSV(text) {
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');
        const result = [];
        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const values = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || [];
            for (let j = 0; j < headers.length; j++) {
                let value = values[j] || '';
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                }
                obj[headers[j].trim()] = value;
            }
            result.push(obj);
        }
        return result;
    }

    fetch('data/materi-kuliah.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal memuat data: " + response.statusText);
            }
            return response.text();
        })
        .then(csvText => {
            const data = parseCSV(csvText);
            daftarMateriContainer.innerHTML = '';

            if (data.length === 0) {
                daftarMateriContainer.innerHTML = '<p class="text-muted">Belum ada materi yang diunggah.</p>';
                return;
            }

            data.forEach(materi => {
                let linkButtonHTML = '';
                if (materi.link && materi.link.trim() !== '') {
                    linkButtonHTML = `
                        <a href="${materi.link}" class="btn btn-primary btn-sm mt-3" target="_blank" rel="noopener noreferrer">
                            Buka Materi
                        </a>
                    `;
                }

                const card = `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card card-tugas h-100">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${materi.judul}</h5>
                                <p class="card-text flex-grow-1">${materi.deskripsi}</p>
                                <div>
                                    <span class="badge bg-secondary">${materi.kategori}</span>
                                    ${linkButtonHTML}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                daftarMateriContainer.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            daftarMateriContainer.innerHTML = '<p class="text-danger">Maaf, terjadi kesalahan saat memuat data materi.</p>';
        });
});