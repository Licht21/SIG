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
  const res = await client.query("SELECT nama_tempat, kategori, alamat, ST_AsGeoJSON(lokasi), deskripsi  FROM lokasi_ikonik");

  const response = h
    .response({
      data: res.rows,
    })
    .code(200);

  return response;
};

const getDataLine = async (request, h) => {
  const res = await client.query("SELECT * FROM jalur_kos_ke_lokasi_ikonik");

  const response = h
    .response({
      data: res.rows,
    })
    .code(200);

  return response;
};

const getDataPolygon = async (request, h) => {
  const res = await client.query("SELECT nama_kos, harga_sewa_tahunan, fasilitas, jumlah_kamar, ST_AsGeoJSON(lokasi), akses_24_jam, deskripsi FROM rumah_kos");

  const response = h
    .response({
      data: res.rows,
    })
    .code(200);

  return response;
};

export { getDataPoint, getDataLine, getDataPolygon };
