document.addEventListener('DOMContentLoaded', () => {
    const daftarTugasContainer = document.getElementById('daftar-tugas');

    // Mengambil data dari file JSON
    fetch('data/minggu-depan.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal memuat data: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Kosongkan kontainer (hapus spinner loading)
            daftarTugasContainer.innerHTML = '';

            if (data.length === 0) {
                daftarTugasContainer.innerHTML = '<p class="text-muted">Tidak ada tugas untuk minggu depan.</p>';
                return;
            }

            data.forEach(tugas => {
                const card = `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card card-tugas h-100">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${tugas.judul}</h5>
                                <p class="card-text flex-grow-1">${tugas.deskripsi}</p>
                                <p class="card-text flex-grow-1"><a href="${drive.pengumpulan}"target="https://drive.google.com/drive/folders/1-0kDwGKTJskdxKJk3MlDbH6ZFQf7qc7C" rel="noopener noreferrer">Link Pengumpulan</a></p>
                                <p class="card-deadline mb-0"><strong>Tenggat:</strong> ${tugas.tanggal}</p>
                            </div>
                        </div>
                    </div>
                `;
                daftarTugasContainer.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            daftarTugasContainer.innerHTML = '<p class="text-danger">Maaf, terjadi kesalahan saat memuat data tugas.</p>';
        });

});
