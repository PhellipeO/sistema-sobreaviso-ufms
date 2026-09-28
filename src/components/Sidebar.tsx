export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-300 p-4 print:hidden min-h-[calc(100vh-60px)]">
      <h3 className="mt-0 text-sm border-b border-gray-300 pb-2 mb-4">Colaboradores</h3>
      
      <div className="mb-4 flex flex-col gap-2">
        <input type="text" placeholder="Nome *" className="w-full p-2 border border-gray-300 rounded text-sm" />
        <input type="text" placeholder="Matrícula *" className="w-full p-2 border border-gray-300 rounded text-sm" />
        <input type="text" placeholder="Processo de Sobreaviso" className="w-full p-2 border border-gray-300 rounded text-sm" />
        <button className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold text-sm mt-1">
          + Cadastrar
        </button>
      </div>

      <ul className="list-none p-0 m-0">
        <li className="p-2 border border-gray-300 mb-2 rounded cursor-pointer flex justify-between items-center hover:bg-gray-50 text-sm">
          João da Silva
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200">Ok</span>
        </li>
      </ul>
    </aside>
  );
}
