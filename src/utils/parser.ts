export interface RegistroHoras {
  data: string;
  horarios: string[];
  erro?: boolean;
}

/**
 * Função responsável por extrair a data e os horários de um texto bruto 
 * colado do sistema de ponto.
 */
export function parseFrequenciaTexto(texto: string): RegistroHoras[] {
  // Limpeza de sujeira: remove letras soltas (ex: 19:15r) que o relógio exporta errado
  const textoLimpo = texto.replace(/[a-zA-Z]/g, '');
  
  const linhas = textoLimpo.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
  const resultados: RegistroHoras[] = [];

  const regexData = /(\\d{2}\\/\\d{2}(?:\\/\\d{2,4})?)/;
  const regexHora = /(\\d{2}:\\d{2})/g;

  for (const linha of linhas) {
    const matchData = linha.match(regexData);
    if (!matchData) continue; 

    const data = matchData[1];
    
    const horarios = [];
    let matchHora;
    while ((matchHora = regexHora.exec(linha)) !== null) {
      horarios.push(matchHora[1]);
    }

    resultados.push({
      data,
      horarios,
      erro: horarios.length > 0 && horarios.length % 2 !== 0 
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

  if (minutosSaida <= minutosEntrada) {
    minutosSaida += 24 * 60;
  }

  return (minutosSaida - minutosEntrada) / 60;
}

/**
 * Calcula as horas de Adicional Noturno (22h às 05h) e aplica a "Hora Ficta" (1h = 52min30s)
 * Essa correção (Módulo 1) garante que o pagamento bata exatamente com a CLT.
 */
export function calcularAdicionalNoturno(entrada: string, saida: string): number {
  const [h1, m1] = entrada.split(':').map(Number);
  const [h2, m2] = saida.split(':').map(Number);

  let mIn = h1 * 60 + m1;
  let mOut = h2 * 60 + m2;

  if (mOut <= mIn) mOut += 24 * 60;

  // Janela noturna em minutos (22:00 = 1320, 05:00 = 300 -> 24h = 1740)
  const inicioNoturno = 22 * 60;
  const fimNoturno = 24 * 60 + 5 * 60; 

  let horasNoturnasReais = 0;

  // Intersecção do plantão com a janela noturna
  const overlapInicio = Math.max(mIn, inicioNoturno);
  const overlapFim = Math.min(mOut, fimNoturno);

  if (overlapInicio < overlapFim) {
    horasNoturnasReais = (overlapFim - overlapInicio) / 60;
  }

  // Multiplicador da CLT para Hora Ficta Noturna (60 / 52.5 = 1.142857)
  return horasNoturnasReais * (60 / 52.5);
}

/**
 * Calcula a Rubrica 300 (Sobreaviso Fator 6).
 * Corrige o BUG em que o sistema antigo calculava o fator 1/3 sem abater a hora ficta.
 */
export function calcularRubrica300(totalBruto: number, adicionalNoturnoFicto: number): number {
  const horasCorrigidas = totalBruto + adicionalNoturnoFicto;
  return horasCorrigidas / 3;
}
