import { useState } from "react";
import FormLaporan from "../components/laporan/FormLaporan";
import DaftarLaporan from "../components/laporan/DaftarLaporan";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const [laporanDiEdit, setLaporanDiEdit] = useState(null);
  const [open, setOpen] = useState(false); // State untuk mengontrol modal

  const handleSelesaiEdit = () => {
    setLaporanDiEdit(null);
    setOpen(false); // Tutup modal setelah selesai
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Monitoring Kekeringan
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Buat Laporan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {laporanDiEdit ? "Edit Laporan" : "Buat Laporan Baru"}
              </DialogTitle>
              <DialogDescription>
                Silakan isi form di bawah ini untuk{" "}
                {laporanDiEdit ? "mengedit" : "membuat"} laporan baru.
              </DialogDescription>
            </DialogHeader>
            <FormLaporan
              dataAwal={laporanDiEdit}
              mode={laporanDiEdit ? "edit" : "tambah"}
              onSelesai={handleSelesaiEdit}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Daftar Laporan Kekeringan
          </h2>
          <DaftarLaporan
            onEdit={(laporan) => {
              setLaporanDiEdit(laporan);
              setOpen(true); // Buka modal saat mengedit
            }}
          />
        </div>
      </div>
    </div>
  );
}
