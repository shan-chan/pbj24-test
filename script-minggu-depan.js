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
                // --- PENAMBAHAN KODE DIMULAI DI SINI ---

                // 1. Buat variabel kosong untuk menampung HTML tombol
                let linkButtonHTML = '';

                // 2. Cek apakah properti 'link' ada dan tidak kosong di data tugas
                if (tugas.link && tugas.link.trim() !== '') {
                    // 3. Jika ada, isi variabel dengan HTML untuk tombol
                    linkButtonHTML = `
                        <a href="${tugas.link}" class="btn btn-success btn-sm mt-3" target="https://drive.google.com/drive/folders/1-0kDwGKTJskdxKJk3MlDbH6ZFQf7qc7C" rel="noopener noreferrer">
                            Kumpulkan Tugas
                        </a>
                    `;
                }
                
                // --- PENAMBAHAN KODE SELESAI DI SINI ---

                const card = `
                    <div class="col-md-6 col-lg-4 mb-4">
                        <div class="card card-tugas h-100">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${tugas.judul}</h5>
                                <p class="card-text flex-grow-1">${tugas.deskripsi}</p>
                                <div>
                                    <p class="card-deadline mb-0"><strong>Tenggat:</strong> ${tugas.tanggal}</p>
                                    ${linkButtonHTML} 
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                // Catatan: Variabel ${linkButtonHTML} disisipkan di atas
                daftarTugasContainer.innerHTML += card;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            daftarTugasContainer.innerHTML = '<p class="text-danger">Maaf, terjadi kesalahan saat memuat data tugas.</p>';
        });
});
