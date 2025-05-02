import { Client } from "pg";
import "dotenv/config";
const client = new Client({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
await client.connect();

const getDataPoint = async (request, h) => {
  const res = await client.query("SELECT nama_tempat, kategori, alamat, ST_AsGeoJSON(lokasi) AS lokasi, deskripsi  FROM lokasi_ikonik");

  const response = h
    .response({
      data: res.rows,
    })
    .code(200);

  return response;
};

const getDataLine = async (request, h) => {
  const res = await client.query(`SELECT rumah_kos.nama_kos, lokasi_ikonik.nama_tempat,  jalur_kos_ke_lokasi_ikonik.keterangan, ST_AsGeoJSON(jalur_kos_ke_lokasi_ikonik.jalur) AS jalur
                                  FROM rumah_kos 
                                  JOIN jalur_kos_ke_lokasi_ikonik ON rumah_kos.id = jalur_kos_ke_lokasi_ikonik.rumah_kos_id 
                                  JOIN lokasi_ikonik ON lokasi_ikonik.id = jalur_kos_ke_lokasi_ikonik.lokasi_ikonik_id`);

  const response = h
    .response({
      data: res.rows,
    })
    .code(200);

  return response;
};

const getDataPolygon = async (request, h) => {
  const res = await client.query("SELECT nama_kos, harga_sewa_tahunan, fasilitas, jumlah_kamar, ST_AsGeoJSON(lokasi) AS lokasi, akses_24_jam, deskripsi FROM rumah_kos");

  const response = h
    .response({
      data: res.rows,
    })
    .code(200);

  return response;
};

export { getDataPoint, getDataLine, getDataPolygon };
