const messageHandler = require('../handlers/message');
const { extendBook, administration } = require('../handlers/fromDB');

const dbKey = {
    extend: "panjang",
    status: "status",
    bebas: "bebas pinjam",
    surat: "surat"
};

module.exports = {
    index: async (req, res, next) => {
        try {
            return res.status(200).json({
                "test": "test"
            });
        } catch (err) {
            next(err);
        }
    },
    messages: async (req, res, next) => {
        try {
            const session = req.session;
            
            let response = {
                message: "",
                option: [],
            };
    
            if (!req.session.state) {
                req.session.state = 'GREETING';
                return res.status(200).json({
                    status: 'OK',
                    message: 'Ok',
                    data: {
                        message: "Halo, selamat datang di Perpustakaan UPI. Ada yang bisa saya bantu?",
                        option: ["Pinjam Buku", "Jam Buka", "Status Administrasi", "Perpanjang Peminjaman"],
                    }
                });
            }

            const {input} = req.body;
    
            // if user input match dbKey
            // give related response
            if (input.match(dbKey.extend)) {
                req.session.state = 'PERPANJANG PINJAM';
                response.message = "Ingin melakukan perpanjangan koleksi?\nSilakan masukkan Nomor Barcode koleksi kamu (contoh. a0056066)";

            } else if ((input.match(dbKey.status || input.match(dbKey.bebas))) && !input.match(dbKey.surat)) {
                req.session.state = 'STATUS ADMINISTRASI';
                response.message = "Silakan masukkan NIM kamu (contoh. 2007703)";
    
            } else {
                let result;
    
                if (req.session.state == 'GREETING' || req.session.state == 'CHATING') {
                    result = await messageHandler(req);
                    response.message = result;

                } else if (req.session.state == 'PERPANJANG PINJAM') {
                    result = await extendBook(input);
                    req.session.state = 'CHATING';

                    if (result) {
                        response.message = `Selamat! Koleksi dengan nomor barcode ${result.barcode_nmbr} berhasil diperpanjang. Jangan lupa untuk mengembalikan koleksi ini sebelum tanggal ${result.due_back_dt}.`;
                    } else {
                        response.message = "Mohon maaf, perpanjangan koleksi gagal. Barcode yang kamu masukkan salah atau sudah melewati batas kuota perpanjangan.";
                        response.option.push('Daftar Anggota');
                    }
                    response.option.push('Pengembalian Buku');
                    response.option.push('Koleksi Rusak/Hilang');

                } else if (req.session.state == 'STATUS ADMINISTRASI') {
                    result = await administration(input);
                    req.session.state = 'CHATING';

                    if (result) {
                        response.message = `Terima kasih sudah menunggu!\nStatus Administrasi kamu (${input}) saat ini adalah ${result}.`;
                    } else {
                        response.message = "Mohon maaf, pemeriksaan status administrasi gagal. NIM yang kamu masukkan belum terdaftar sebagai anggota atau salah.";
                    }
                    response.option.push('Pengembalian Buku');
                    response.option.push('Surat Bebas Pinjam');

                }
            }
    
            return res.status(200).json({
                status: 'OK',
                message: 'Response message from server has been successfully received.',
                data: response,
            });
    
        } catch (err) {
            next(err);
        }
    }
}