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
    let csv = "Data,Horarios Originais,Total Bruto (h),Rubrica 300 (1/3)\n";
    resultados.forEach(reg => {
      let totalBruto = 0;
      if (!reg.erro && reg.horarios.length >= 2) {
        for (let j = 0; j < reg.horarios.length; j += 2) {
          if (reg.horarios[j+1]) totalBruto += calcularDiferencaHoras(reg.horarios[j], reg.horarios[j+1]);
        }
      }
      const rubrica300 = (totalBruto / 3).toFixed(2);
      csv += `${reg.data},${reg.horarios.join(' ')},${reg.erro ? 'ERRO' : totalBruto.toFixed(2)},${reg.erro ? '-' : rubrica300}\n`;
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <label className="block font-bold text-slate-700">
            Entrada de Horas (Copiar e Colar do Ponto)
          </label>
          <div className="text-xs text-slate-600 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <strong>r</strong> Relógio
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              <strong>m</strong> Manual
            </span>
            <span className="inline-flex items-center gap-1 font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <strong>c</strong> Cancelado (ignorado)
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mb-2">
          Cole as linhas do relatório com a data e os horários de entrada e saída. Nomes de dias da semana e outras informações são filtrados automaticamente.
        </p>

        <textarea 
          className="w-full h-32 p-3 border border-slate-300 rounded focus:outline-none focus:border-blue-500 font-mono text-sm bg-white"
          placeholder={`Exemplo de linhas do espelho de ponto:\n01/05/2026 SEX 07:30r 12:00c 13:00c 19:15r Plantão Sobreaviso\n02/05/2026 SAB 19:00m 07:00m`}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        ></textarea>

        {resultados.some(r => r.erro) && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 text-sm rounded flex items-center gap-2">
            ⚠️ <span>Atenção: Alguns horários parecem estar incompletos ou em formato incorreto. Corrija a digitação.</span>
          </div>
        )}

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
                  Nenhum dado processado ainda. Cole as horas acima e clique em &quot;Processar Horas&quot;.
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
