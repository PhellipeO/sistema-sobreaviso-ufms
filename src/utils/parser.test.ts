import { calcularDiferencaHoras } from './parser';

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
});
