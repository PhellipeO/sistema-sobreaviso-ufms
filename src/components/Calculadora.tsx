"use client";
import { useState } from "react";
import { parseFrequenciaTexto, calcularDiferencaHoras, RegistroHoras } from "@/utils/parser";

export default function Calculadora() {
  const [texto, setTexto] = useState("");
  const [resultados, setResultados] = useState<RegistroHoras[]>([]);

  const handleProcessar = () => {
    const processado = parseFrequenciaTexto(texto);
    setResultados(processado);
  };

  const handleExportarCSV = () => {
    let csv = "Data,Horarios Originais,Total Bruto (h),Rubrica 300 (1/3)\\n";
    resultados.forEach(reg => {
      let totalBruto = 0;
      if (!reg.erro && reg.horarios.length >= 2) {
        for (let j = 0; j < reg.horarios.length; j += 2) {
          if (reg.horarios[j+1]) totalBruto += calcularDiferencaHoras(reg.horarios[j], reg.horarios[j+1]);
        }
      }
      const rubrica300 = (totalBruto / 3).toFixed(2);
      csv += `${reg.data},${reg.horarios.join(' ')},${reg.erro ? 'ERRO' : totalBruto.toFixed(2)},${reg.erro ? '-' : rubrica300}\\n`;
    });
    
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "backup_calculo_sobreaviso.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-slate-700">Calculadora de Sobreaviso</h2>
      
      <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200">
        <label className="block font-bold mb-2 text-slate-700">Entrada de Horas (Copiar e Colar do Ponto)</label>
        <textarea 
          className="w-full h-32 p-3 border border-slate-300 rounded focus:outline-none focus:border-blue-500 font-mono text-sm"
          placeholder="Exemplo:\n01/05/2026  07:30 19:15\n02/05/2026  19:00 07:00"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        ></textarea>
        <div className="mt-3 flex gap-3">
          <button 
            onClick={handleProcessar}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
          >
            Processar Horas
          </button>
          <button 
            onClick={handleExportarCSV}
            disabled={resultados.length === 0}
            className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition"
          >
            ⬇️ Exportar CSV (Backup Local)
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-slate-300 rounded">
        <table className="w-full text-sm text-left text-slate-700">
          <thead className="bg-slate-100 text-xs uppercase text-slate-700">
            <tr>
              <th className="px-4 py-3 border-b">Data</th>
              <th className="px-4 py-3 border-b border-l">Horários Originais</th>
              <th className="px-4 py-3 border-b border-l bg-green-50">Total Bruto (h)</th>
              <th className="px-4 py-3 border-b border-l bg-orange-50">Rubrica 300 (1/3)</th>
            </tr>
          </thead>
          <tbody>
            {resultados.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500 italic">
                  Nenhum dado processado ainda. Cole as horas acima e clique em "Processar Horas".
                </td>
              </tr>
            ) : (
              resultados.map((reg, i) => {
                let totalBruto = 0;
                if (!reg.erro && reg.horarios.length >= 2) {
                  for (let j = 0; j < reg.horarios.length; j += 2) {
                    if (reg.horarios[j+1]) {
                      totalBruto += calcularDiferencaHoras(reg.horarios[j], reg.horarios[j+1]);
                    }
                  }
                }
                const rubrica300 = (totalBruto / 3).toFixed(2);

                return (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-3 font-bold">{reg.data}</td>
                    <td className="px-4 py-3 border-l text-blue-600">{reg.horarios.join(' ')}</td>
                    <td className="px-4 py-3 border-l bg-green-50">{reg.erro ? 'ERRO' : totalBruto.toFixed(2)}</td>
                    <td className="px-4 py-3 border-l bg-orange-50 font-bold">{reg.erro ? '-' : rubrica300}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
