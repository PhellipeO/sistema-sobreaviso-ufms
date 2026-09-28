export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white p-4 flex gap-4 items-center print:hidden">
      <h1 className="m-0 text-lg border-r-2 border-slate-700 pr-5">Sobreaviso Pro</h1>
      <button className="bg-transparent text-white border-none text-sm cursor-pointer px-2 py-1 rounded transition hover:bg-slate-700">Calculadora</button>
      <button className="bg-transparent text-white border-none text-sm cursor-pointer px-2 py-1 rounded transition hover:bg-slate-700">Feriados</button>
      <button className="bg-transparent text-white border-none text-sm cursor-pointer px-2 py-1 rounded transition hover:bg-slate-700">Configurações</button>
      <button className="ml-auto bg-green-600 hover:bg-green-700 text-white border-none text-sm cursor-pointer px-4 py-2 rounded font-bold">
        🖨️ Imprimir Todos
      </button>
    </nav>
  );
}
