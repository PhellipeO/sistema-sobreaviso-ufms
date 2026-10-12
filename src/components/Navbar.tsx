export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white p-4 flex flex-wrap gap-4 items-center justify-between print:hidden">
      <div className="flex items-center gap-3">
        <h1 className="m-0 text-lg border-r-2 border-slate-700 pr-4 font-semibold">
          Sobreaviso Projeto Integrador
        </h1>
        <span className="text-xs text-slate-300 hidden md:inline">
          Desenvolvedores: <strong className="text-white font-medium">Phellipe Oliveira de Almeida</strong> &amp; <strong className="text-white font-medium">Nyágara Veras de Freitas</strong>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-transparent text-white border-none text-sm cursor-pointer px-2 py-1 rounded transition hover:bg-slate-700">Calculadora</button>
        <button className="bg-transparent text-white border-none text-sm cursor-pointer px-2 py-1 rounded transition hover:bg-slate-700">Feriados</button>
        <button className="bg-transparent text-white border-none text-sm cursor-pointer px-2 py-1 rounded transition hover:bg-slate-700">Configurações</button>
        <button className="ml-2 bg-green-600 hover:bg-green-700 text-white border-none text-sm cursor-pointer px-4 py-2 rounded font-bold">
          🖨️ Imprimir Todos
        </button>
      </div>
    </nav>
  );
}
