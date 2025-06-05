// NOTE: Versi lengkap dengan ekspor CSV
import { useState } from "react";

const siswaPerKelas = {
  "Kelas 1": ["Alya", "Budi", "Citra"],
  "Kelas 2": ["Dewi", "Eko", "Farhan"],
  "Kelas 3": ["Gita", "Hafidz", "Indah"]
};

const kehadiranOptions = ["Hadir", "Izin", "Sakit", "Alpha"];
const semuaMapel = ["Matematika", "Bahasa Indonesia", "IPA", "IPS"];

export default function AbsensiNilaiForm() {
  const [kelas, setKelas] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [mapelDipilih, setMapelDipilih] = useState([]);
  const [absensi, setAbsensi] = useState({});
  const [nilai, setNilai] = useState({});
  const [catatan, setCatatan] = useState({});

  const toggleMapel = (namaMapel) => {
    setMapelDipilih((prev) =>
      prev.includes(namaMapel)
        ? prev.filter((m) => m !== namaMapel)
        : [...prev, namaMapel]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasil = getHasil();
    console.log("Data dikirim:", hasil);
    alert("Data disimpan dan akan dikirim ke WhatsApp (simulasi)");
  };

  const getHasil = () => {
    return {
      tanggal,
      kelas,
      data: (siswaPerKelas[kelas] || []).map((nama) => ({
        nama,
        kehadiran: absensi[nama] || "",
        nilai: mapelDipilih.reduce((acc, m) => {
          acc[m] = nilai[nama]?.[m] || "";
          return acc;
        }, {}),
        catatan: catatan[nama] || ""
      }))
    };
  };

  const exportCSV = () => {
    const hasil = getHasil();
    const headers = ["Nama", "Kehadiran", ...mapelDipilih.map(m => `Nilai ${m}`), "Catatan"];
    const rows = hasil.data.map((row) => [
      row.nama,
      row.kehadiran,
      ...mapelDipilih.map(m => row.nilai[m] || ""),
      row.catatan
    ]);

    const csvContent = [headers, ...rows]
      .map((e) => e.map(v => `"${v}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Rekap_${kelas}_${tanggal}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Input Absensi & Nilai Harian</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          className="p-2 border rounded"
          value={kelas}
          onChange={(e) => setKelas(e.target.value)}
        >
          <option value="">-- Pilih Kelas --</option>
          {Object.keys(siswaPerKelas).map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>

        <input
          type="date"
          className="p-2 border rounded"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />
      </div>

      {kelas && (
        <>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Pilih Mata Pelajaran (Opsional)</label>
            <div className="flex flex-wrap gap-2">
              {semuaMapel.map((m) => (
                <label key={m} className="inline-flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={mapelDipilih.includes(m)}
                    onChange={() => toggleMapel(m)}
                  />
                  {m}
                </label>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <table className="w-full border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Nama</th>
                  <th className="border p-2">Kehadiran</th>
                  {mapelDipilih.map((m) => (
                    <th key={m} className="border p-2">Nilai {m}</th>
                  ))}
                  <th className="border p-2">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {siswaPerKelas[kelas].map((nama) => (
                  <tr key={nama}>
                    <td className="border p-2">{nama}</td>
                    <td className="border p-2">
                      <select
                        value={absensi[nama] || ""}
                        onChange={(e) => setAbsensi({ ...absensi, [nama]: e.target.value })}
                        className="w-full p-1 border rounded"
                      >
                        <option value="">--</option>
                        {kehadiranOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>
                    {mapelDipilih.map((m) => (
                      <td key={m} className="border p-2">
                        <input
                          type="number"
                          value={nilai[nama]?.[m] || ""}
                          onChange={(e) => setNilai({
                            ...nilai,
                            [nama]: {
                              ...(nilai[nama] || {}),
                              [m]: e.target.value
                            }
                          })}
                          className="w-full p-1 border rounded"
                        />
                      </td>
                    ))}
                    <td className="border p-2">
                      <input
                        type="text"
                        value={catatan[nama] || ""}
                        onChange={(e) => setCatatan({ ...catatan, [nama]: e.target.value })}
                        className="w-full p-1 border rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Simpan & Kirim WA
              </button>
              <button
                type="button"
                onClick={exportCSV}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Unduh Rekap (CSV)
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}