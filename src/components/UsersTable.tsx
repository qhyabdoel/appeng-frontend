"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UserTableProps } from "@/type";

export default function UserTable({
  users,
  search,
  currentPage,
}: UserTableProps) {
  const router = useRouter();
  const [query, setQuery] = useState(search);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?q=${query}&page=1`);
  };

  const handlePageChange = (page: number) => {
    router.push(`/?q=${query}&page=${page}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Cari nama..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-3">Nama</th>
              <th className="border p-3">Umur</th>
              <th className="border p-3">Alamat</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">No Telepon 1</th>
              <th className="border p-3">No Telepon 2</th>
              <th className="border p-3">Gambar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.age}</td>
                <td className="border p-2">{user.location}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phone}</td>
                <td className="border p-2">{user.cell}</td>
                <td className="border p-2">
                  <Image
                    src={user.picture[0]}
                    alt={user.name}
                    className="w-12 h-12"
                    width={100}
                    height={100}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-2 text-sm text-gray-600 cursor-pointer">
          Page {currentPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 border rounded cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
