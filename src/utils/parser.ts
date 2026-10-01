export interface RegistroHoras {
  data: string;
  horarios: string[];
  erro?: boolean;
}

/**
 * Função responsável por extrair a data e os horários de um texto bruto 
 * colado do sistema de ponto.
 * Exemplo de entrada: "01/05/2026 07:30 19:15"
 */
export function parseFrequenciaTexto(texto: string): RegistroHoras[] {
  const linhas = texto.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
  const resultados: RegistroHoras[] = [];

  // Regex para identificar uma data no formato DD/MM ou DD/MM/YYYY
  const regexData = /(\\d{2}\\/\\d{2}(?:\\/\\d{2,4})?)/;
  // Regex para identificar horários no formato HH:MM
  const regexHora = /(\\d{2}:\\d{2})/g;

  for (const linha of linhas) {
    const matchData = linha.match(regexData);
    if (!matchData) continue; // Ignora linhas sem data

    const data = matchData[1];
    
    // Extrai todos os horários da linha
    const horarios = [];
    let matchHora;
    while ((matchHora = regexHora.exec(linha)) !== null) {
      horarios.push(matchHora[1]);
    }

    resultados.push({
      data,
      horarios,
      erro: horarios.length % 2 !== 0 // Se tiver um número ímpar de horários, tem batida faltando
    });
  }

  return resultados;
}

/**
 * Calcula a diferença em horas decimais entre duas strings de horário HH:MM
 */
export function calcularDiferencaHoras(entrada: string, saida: string): number {
  const [h1, m1] = entrada.split(':').map(Number);
  const [h2, m2] = saida.split(':').map(Number);

  let minutosEntrada = h1 * 60 + m1;
  let minutosSaida = h2 * 60 + m2;

  // Trata virada de noite (ex: 22:00 às 06:00)
  if (minutosSaida <= minutosEntrada) {
    minutosSaida += 24 * 60;
  }

  return (minutosSaida - minutosEntrada) / 60;
}
