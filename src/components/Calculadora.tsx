export default function Calculadora() {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-slate-700">Calculadora de Sobreaviso</h2>
      
      <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200">
        <label className="block font-bold mb-2 text-slate-700">Entrada de Horas (Copiar e Colar do Ponto)</label>
        <textarea 
          className="w-full h-32 p-3 border border-slate-300 rounded focus:outline-none focus:border-blue-500 font-mono text-sm"
          placeholder="Exemplo:\n01/05/2026  07:30 19:15\n02/05/2026  19:00 07:00"
        ></textarea>
        <button className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition">
          Processar Horas
        </button>
      </div>

      <div className="overflow-x-auto border border-slate-300 rounded">
        <table className="w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-100 text-xs uppercase text-slate-700">
            <tr>
              <th className="px-4 py-3 border-b">Data</th>
              <th className="px-4 py-3 border-b border-l">Horários Originais</th>
              <th className="px-4 py-3 border-b border-l bg-green-50">Rubrica 300 (Sobreaviso)</th>
              <th className="px-4 py-3 border-b border-l bg-orange-50">Rubrica 81 (Extra 50%)</th>
              <th className="px-4 py-3 border-b border-l bg-orange-50">Rubrica 878 (Noturno 50%)</th>
              <th className="px-4 py-3 border-b border-l bg-blue-50">Rubrica 361 (Extra 100%)</th>
              <th className="px-4 py-3 border-b border-l bg-blue-50">Rubrica 363 (Noturno 100%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-slate-500 italic">
                Nenhum dado processado ainda. Cole as horas acima e clique em "Processar Horas".
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
