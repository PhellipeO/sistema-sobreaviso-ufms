"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

interface Colaborador {
  id?: string | number;
  nome: string;
  matricula: string;
}

export default function Sidebar() {
  const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");

  useEffect(() => {
    fetchColaboradores();
  }, []);

  const fetchColaboradores = async () => {
    const { data } = await supabase.from('colaboradores').select('*');
    if (data) setColaboradores(data);
  };

  const handleAdd = async () => {
    if (!nome || !matricula) return;
    const { error } = await supabase.from('colaboradores').insert([{ nome, matricula }]);
    if (!error) {
      setNome("");
      setMatricula("");
      fetchColaboradores();
    } else {
      alert("Erro ao cadastrar. Configure as tabelas no Supabase.");
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-300 p-4 print:hidden min-h-[calc(100vh-60px)] flex flex-col justify-between">
      <div>
        <h3 className="mt-0 text-sm border-b border-gray-300 pb-2 mb-4 font-semibold text-slate-700">Colaboradores</h3>
        
        <div className="mb-4 flex flex-col gap-2">
          <input 
            type="text" 
            placeholder="Nome *" 
            className="w-full p-2 border border-gray-300 rounded text-sm" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Matrícula *" 
            className="w-full p-2 border border-gray-300 rounded text-sm" 
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
          <button 
            onClick={handleAdd}
            className="w-full p-2 bg-green-600 hover:bg-green-700 text-white rounded font-bold text-sm mt-1"
          >
            + Cadastrar
          </button>
        </div>

        <ul className="list-none p-0 m-0">
          {colaboradores.length === 0 ? (
            <li className="text-xs text-gray-500 text-center">Nenhum colaborador</li>
          ) : (
            colaboradores.map((c, idx) => (
              <li key={idx} className="p-2 border border-gray-300 mb-2 rounded cursor-pointer flex justify-between items-center hover:bg-gray-50 text-sm">
                {c.nome}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200">Ok</span>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="pt-4 mt-6 border-t border-gray-200 text-xs text-slate-500">
        <p className="font-semibold text-slate-700 mb-1">Criado por:</p>
        <p className="text-slate-600 font-medium">Phellipe Oliveira de Almeida</p>
        <p className="text-slate-600 font-medium">Nyágara Veras de Freitas</p>
        <p className="text-[11px] text-slate-400 mt-1">Projeto Integrador II - UFMS</p>
      </div>
    </aside>
  );
}
