import UsersTable from "@/components/UsersTable";
import { User } from "@/type";

async function getUsers(search = "", page = 1): Promise<User[]> {
  const res = await fetch(
    `http://localhost:3000/api/users?results=10&page=${page}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const users: User[] = data.users;

  if (!search) return users;

  return users.filter((u) => {
    const query = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(query) ||
      u.location.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      u.phone.toLowerCase().includes(query) ||
      u.cell.toLowerCase().includes(query) ||
      u.age.toString().includes(query)
    );
  });
}

export default async function Home(props: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams.q || "";
  const page = Number(searchParams.page) || 1;

  const users = await getUsers(search, page);

  return (
    <main className="p-8 bg-white text-gray-600 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Daftar Pengguna</h1>
      <UsersTable users={users} currentPage={page} search={search} />
    </main>
  );
}
