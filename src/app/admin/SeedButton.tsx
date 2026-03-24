'use client';

import { useState } from 'react';
import { seedServices } from '@/actions/admin';

export default function SeedButton() {
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    if (!confirm('Bạn có muốn nạp dữ liệu mẫu cho trang Dịch vụ không?')) return;
    setLoading(true);
    const res = await seedServices();
    alert(res.message);
    setLoading(false);
  };

  return (
    <button
      onClick={handleSeed}
      disabled={loading}
      className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 rounded-lg transition font-bold border border-blue-100 disabled:opacity-50"
    >
      {loading ? 'Đang nạp...' : 'Nạp Dữ Liệu Mẫu'}
    </button>
  );
}
