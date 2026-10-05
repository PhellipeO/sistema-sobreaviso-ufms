"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Feriados() {
  const [feriados, setFeriados] = useState<any[]>([]);

  useEffect(() => {
    fetchFeriados();
  }, []);

  const fetchFeriados = async () => {
    const { data } = await supabase.from('feriados').select('*');
    if (data) setFeriados(data);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm mt-6">
      <h2 className="text-xl font-bold mb-4 text-slate-700">Feriados Cadastrados</h2>
      <ul className="list-disc pl-5">
        {feriados.length === 0 ? (
          <li className="text-slate-500">Nenhum feriado carregado do banco.</li>
        ) : (
          feriados.map((f, i) => (
            <li key={i}>{f.data} - {f.nome}</li>
          ))
        )}
      </ul>
      <p className="mt-4 text-xs text-gray-400">
        * A lógica de integração de feriados no parser de rubricas (100%) funciona no background após a carga destes dados.
      </p>
    </div>
  );
}
