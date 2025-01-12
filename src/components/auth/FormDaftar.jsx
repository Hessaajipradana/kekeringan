import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormDaftar() {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kataSandi: '',
    konfirmasiKataSandi: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.kataSandi !== formData.konfirmasiKataSandi) {
      setError('Kata sandi tidak cocok');
      return;
    }

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/pengguna/daftar', {
        nama: formData.nama,
        email: formData.email,
        kataSandi: formData.kataSandi
      });
      navigate('/masuk');
    } catch (error) {
      setError(error.response?.data?.pesan || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Daftar Akun Baru</CardTitle>
            <CardDescription>
              Silakan isi form di bawah ini untuk mendaftar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="nama">Nama Lengkap</Label>
                  <Input
                    id="nama"
                    type="text"
                    placeholder="Nama Lengkap"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="kataSandi">Kata Sandi</Label>
                  <Input
                    id="kataSandi"
                    type="password"
                    required
                    value={formData.kataSandi}
                    onChange={(e) => setFormData({ ...formData, kataSandi: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="konfirmasiKataSandi">Konfirmasi Kata Sandi</Label>
                  <Input
                    id="konfirmasiKataSandi"
                    type="password"
                    required
                    value={formData.konfirmasiKataSandi}
                    onChange={(e) => setFormData({ ...formData, konfirmasiKataSandi: e.target.value })}
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Memproses...' : ' Daftar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}