import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginMulai, loginSukses, loginGagal } from '../../store/slices/authSlice';
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
export default function FormMasuk() {
  const [formData, setFormData] = useState({
    email: '',
    kataSandi: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginMulai());
      const response = await axios.post('https://api-kekeringan-production.up.railway.app/api/pengguna/masuk', formData);
      dispatch(loginSukses(response.data));
      navigate('/dashboard');
    } catch (error) {
      dispatch(loginGagal(error.response?.data?.pesan || 'Terjadi kesalahan'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Masuk ke Akun Anda</CardTitle>
            <CardDescription>
              Masukkan email dan kata sandi Anda untuk masuk.
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
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? 'Memproses...' : 'Masuk'}
                </Button>
                <Button variant="outline" className="w-full">
                  Masuk dengan Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Belum punya akun?{" "}
                <a href="/daftar" className="underline underline-offset-4">
                  Daftar
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}