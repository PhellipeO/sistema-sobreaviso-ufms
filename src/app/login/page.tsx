export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            HUB
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-800 mb-6">Acesso ao Sistema</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail (SIAPE)</label>
            <input 
              type="email" 
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="Digite seu e-mail corporativo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha Segura</label>
            <input 
              type="password" 
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition mt-4"
          >
            Entrar no Sistema
          </button>
        </form>
        <p className="text-center text-xs text-slate-500 mt-6">
          Acesso restrito à Unidade de Administração de Pessoal (UAP).<br/>
          Em caso de perda de senha, contate a DTI.
        </p>
      </div>
    </div>
  );
}
