'use client';

import { useState } from 'react';
import { loginAdmin } from '@/actions/admin';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    const res = await loginAdmin(password);
    if (res.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(res.message || 'Mật khẩu không chính xác');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo/Brand Area */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
            <Lock className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Quản trị viên</h1>
          <p className="text-gray-500 font-medium">Vui lòng đăng nhập để tiếp tục</p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-premium p-10">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
                Mật khẩu truy cập
              </label>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-gray-900 dark:text-white outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-4">
                <p className="text-xs text-red-600 dark:text-red-400 font-bold text-center italic">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {isLoading ? "Đang xác thực..." : "Đăng nhập ngay"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest">
          Điện Lạnh Nghĩa Hà &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
