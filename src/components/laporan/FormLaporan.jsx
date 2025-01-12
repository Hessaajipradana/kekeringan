import { useState } from "react";
import { useDispatch } from "react-redux";
import { tambahLaporan, updateLaporan } from "../../store/slices/laporanSlice";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import axios from "axios";

export default function FormLaporan({ dataAwal, mode = "tambah", onSelesai }) {
  const [formData, setFormData] = useState(
    dataAwal || {
      lokasi: "",
      tingkatKekeringan: "RENDAH",
      deskripsi: "",
      koordinat: {
        latitude: "",
        longitude: "",
      },
    }
  );

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (mode === "tambah") {
        const response = await axios.post(
          "https://api-kekeringan-production.up.railway.app/api/laporan",
          formData,
          config
        );
        dispatch(tambahLaporan(response.data));
        toast({
          title: "Berhasil!",
          description: "Laporan berhasil ditambahkan",
        });
      } else {
        const response = await axios.put(
          `https://api-kekeringan-production.up.railway.app/api/laporan/${dataAwal._id}`,
          formData,
          config
        );
        dispatch(updateLaporan(response.data));
        toast({
          title: "Berhasil!",
          description: "Laporan berhasil diperbarui",
        });
      }

      onSelesai();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal!",
        description: error.response?.data?.pesan || "Terjadi kesalahan",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Lokasi</label>
          <input
            type="text"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.lokasi}
            onChange={(e) =>
              setFormData({ ...formData, lokasi: e.target.value })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Tingkat Kekeringan
          </label>
          <select
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.tingkatKekeringan}
            onChange={(e) =>
              setFormData({ ...formData, tingkatKekeringan: e.target.value })
            }
          >
            <option value="RENDAH">Rendah</option>
            <option value="SEDANG">Sedang</option>
            <option value="TINGGI">Tinggi</option>
            <option value="KRITIS">Kritis</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Deskripsi</label>
        <textarea
          required
          rows={4}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.deskripsi}
          onChange={(e) =>
            setFormData({ ...formData, deskripsi: e.target.value })
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            step="any"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.koordinat.latitude}
            onChange={(e) =>
              setFormData({
                ...formData,
                koordinat: {
                  ...formData.koordinat,
                  latitude: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            step="any"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.koordinat.longitude}
            onChange={(e) =>
              setFormData({
                ...formData,
                koordinat: {
                  ...formData.koordinat,
                  longitude: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? "Memproses..."
          : mode === "tambah"
          ? "Tambah Laporan"
          : "Update Laporan"}
      </Button>
    </form>
  );
}
