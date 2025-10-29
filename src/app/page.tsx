import UsersTable from "@/components/UsersTable";
import { User } from "@/type";

async function getUsers(search: string = "") {
  const res = await fetch(`http://localhost:3000/api/users?results=20&page=1`, {
    cache: "no-store", // Always fetch fresh data
  });

  // Handle fetch errors
  if (!res.ok) {
    console.log({ res });
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();

  if (!search) return data.users;

  // Filter data on the server component side
  return data.users.filter((u: User) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const search = searchParams.q || "";
  const users = await getUsers(search);

  return (
    <main className="p-8 bg-white text-gray-600">
      <h1 className="text-2xl font-bold mb-6">Daftar Pengguna</h1>
      <UsersTable users={users} />
    </main>
  );
}
