import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Roteiro de Visitas</h1>
        <ul className="flex gap-4">
          <li><Link href="/">Início</Link></li>
          <li><Link href="/processos">Processos</Link></li>
          <li><Link href="/smd">SMD</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
