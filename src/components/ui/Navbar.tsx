import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-64 bg-gray-50 border-r p-4">
      <h3 className="font-bold">SaaS</h3>
      <ul className="mt-4">
        <li className="mt-2">
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li className="mt-2">
          <Link href="/auth/login">Sign in</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
