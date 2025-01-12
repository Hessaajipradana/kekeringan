import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  muatLaporanMulai,
  muatLaporanSukses,
  muatLaporanGagal,
  hapusLaporan,
} from "../../store/slices/laporanSlice";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Edit2, Trash2 } from "lucide-react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DaftarLaporan({ onEdit }) {
  const dispatch = useDispatch();
  const { daftarLaporan, loading, error } = useSelector(
    (state) => state.laporan
  );
  const { pengguna } = useSelector((state) => state.auth);
  const { toast } = useToast();

  useEffect(() => {
    const ambilLaporan = async () => {
      try {
        dispatch(muatLaporanMulai());
        const token = localStorage.getItem("token");
        const response = await axios.get("https://api-kekeringan-production.up.railway.app/api/laporan", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(muatLaporanSukses(response.data));
      } catch (error) {
        dispatch(
          muatLaporanGagal(error.response?.data?.pesan || "Terjadi kesalahan")
        );
        toast({
          variant: "destructive",
          title: "Gagal memuat laporan",
          description: error.response?.data?.pesan || "Terjadi kesalahan",
        });
      }
    };

    ambilLaporan();
  }, [dispatch]);

  const handleHapus = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://api-kekeringan-production.up.railway.app/api/laporan/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(hapusLaporan(id));
        toast({
          title: "Berhasil!",
          description: "Laporan berhasil dihapus",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Gagal menghapus laporan",
          description: error.response?.data?.pesan || "Terjadi kesalahan",
        });
      }
    }
  };

  const getTingkatKekeringanStyle = (tingkat) => {
    switch (tingkat) {
      case "KRITIS":
        return "bg-red-100 text-red-800 border-red-200";
      case "TINGGI":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "SEDANG":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md bg-destructive/10 p-4 my-4">
        <div className="text-sm text-destructive">{error }</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {daftarLaporan.map((laporan) => (
        <Card key={laporan._id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>{laporan.lokasi}</CardTitle>
            <CardDescription>
              {laporan.deskripsi}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTingkatKekeringanStyle(laporan.tingkatKekeringan)}`}>
              {laporan.tingkatKekeringan}
            </p>
            {laporan.koordinat?.latitude && laporan.koordinat?.longitude && (
              <p className="text-sm text-gray-500 ">
                Koordinat: {laporan.koordinat.latitude}, {laporan.koordinat.longitude}
              </p>
            )}
            <div className="text-xs text-gray-400 space-y-1">
              <p>Dilaporkan oleh: {laporan.pengguna.nama}</p>
              <p>
                Tanggal:{" "}
                {new Date(laporan.createdAt).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            {(pengguna?._id === laporan.pengguna?._id || pengguna?.peran === "admin") && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(laporan)}>
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleHapus(laporan._id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Hapus
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}

      {daftarLaporan.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Belum ada laporan kekeringan.
        </div>
      )}
    </div>
  );
}