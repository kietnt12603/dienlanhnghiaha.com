'use client';

import { logoutAdmin } from '@/actions/logout';

export default function LogoutButton() {
  return (
    <button
      onClick={() => logoutAdmin()}
      className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition font-medium border border-gray-200"
    >
      Đăng xuất
    </button>
  );
}
