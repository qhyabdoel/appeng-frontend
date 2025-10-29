"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface User {
  name: string;
  age: number;
  location: string;
  email: string;
  phone: string;
  cell: string;
  picture: string[];
}

export default function UserTable({ users }: { users: User[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?q=${search}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Cari nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-3">Gambar</th>
              <th className="border p-3">Nama</th>
              <th className="border p-3">Umur</th>
              <th className="border p-3">Alamat</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">No Telepon 1</th>
              <th className="border p-3">No Telepon 2</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border p-2">
                  <Image
                    src={user.picture[0]}
                    alt={user.name}
                    className="w-12 h-12 rounded-full"
                    width={100}
                    height={100}
                  />
                </td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.age}</td>
                <td className="border p-2">{user.location}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.phone}</td>
                <td className="border p-2">{user.cell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
