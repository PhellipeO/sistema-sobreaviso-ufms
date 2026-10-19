describe('Sistema de Gestão de Sobreaviso', () => {
  it('Deve carregar a página inicial e encontrar a Calculadora', () => {
    cy.visit('/')
    cy.contains('Calculadora de Sobreaviso').should('be.visible')
  })

  it('Deve mostrar um erro visual se os dados de entrada forem incompletos', () => {
    cy.visit('/')
    cy.get('textarea').type('01/05/2026 10:00') // Falta o horário de saída
    cy.contains('Processar Horas').click()
    cy.contains('Atenção: Alguns horários parecem estar incompletos').should('be.visible')
  })
})
