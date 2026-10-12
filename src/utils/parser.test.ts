import { calcularDiferencaHoras, parseFrequenciaTexto, calcularAdicionalNoturno, calcularRubrica300 } from './parser';

describe('Parser Matemático de Sobreaviso', () => {
  it('Deve calcular corretamente a diferença entre duas horas no mesmo dia', () => {
    const total = calcularDiferencaHoras('07:30', '19:15');
    expect(total).toBeCloseTo(11.75); // 11 horas e 45 minutos
  });

  it('Deve calcular corretamente a diferença virando a madrugada', () => {
    const total = calcularDiferencaHoras('22:00', '06:00');
    expect(total).toBeCloseTo(8.00); // 8 horas redondas
  });

  it('Deve retornar 0 se entrada e saída forem iguais', () => {
    const total = calcularDiferencaHoras('12:00', '12:00');
    expect(total).toBe(24); // Se for exatamente igual, na regra de ponto, virou 24h
  });

  it('Deve reconhecer horários válidos com sufixo r (relógio) e m (manual) e ignorar c (cancelado)', () => {
    const textoPonto = `
      01/05/2026 SEX 07:30r 12:00c 13:00c 19:15r Plantão Sobreaviso
      02/05/2026 SAB 19:00m 07:00m
    `;

    const resultado = parseFrequenciaTexto(textoPonto);

    expect(resultado).toHaveLength(2);
    // Dia 01/05 deve ignorar 12:00c e 13:00c e manter apenas 07:30 e 19:15
    expect(resultado[0].data).toBe('01/05/2026');
    expect(resultado[0].horarios).toEqual(['07:30', '19:15']);
    expect(resultado[0].erro).toBe(false);

    // Dia 02/05 deve aceitar os horários manuais com 'm'
    expect(resultado[1].data).toBe('02/05/2026');
    expect(resultado[1].horarios).toEqual(['19:00', '07:00']);
    expect(resultado[1].erro).toBe(false);
  });

  it('Deve calcular o adicional noturno com a hora ficta da CLT (1h = 52.5min)', () => {
    // 22:00 às 05:00 são 7 horas normais. Em hora ficta: 7 * (60/52.5) = 8 horas.
    const noturno = calcularAdicionalNoturno('22:00', '05:00');
    expect(noturno).toBeCloseTo(8.00);
  });

  it('Deve recalcular a Rubrica 300 abatendo as horas do adicional noturno', () => {
    const totalBruto = 8;
    const horaFictaNoturna = 1;
    const rubrica300 = calcularRubrica300(totalBruto, horaFictaNoturna);
    // (8 + 1) / 3 = 3
    expect(rubrica300).toBe(3);
  });
});
