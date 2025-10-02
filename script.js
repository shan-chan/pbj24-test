document.addEventListener('DOMContentLoaded', () => {
    const daftarTugasContainer = document.getElementById('daftar-tugas');

    // Mengambil data dari file JSON
    fetch('data/minggu-ini.json')
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
                daftarTugasContainer.innerHTML = '<p class="text-muted">Tidak ada tugas untuk minggu ini.</p>';
                return;
            }

            data.forEach(tugas => {
                const card = `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card card-tugas h-100">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${tugas.judul}</h5>
                                <p class="card-text flex-grow-1">${tugas.deskripsi}</p>
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