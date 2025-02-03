describe('Flujo Completo de Reservas', () => {
  const testUser = {
    fullName: 'Usuario de Prueba',
    email: 'test123@example.com',
    password: 'TestF@1234'
  };

  beforeEach(() => {
    cy.viewport(1280, 800);
    
    cy.visit('http://localhost:3000/login');
    cy.contains('Registrarme').click();
    
    cy.get('input[name="fullName"]').type(testUser.fullName);
    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.contains('button', 'Crear cuenta').click();

    cy.contains('a', 'Iniciar sesión', { timeout: 10000 })
    .should('be.visible')
    .click();

    cy.get('input[name="email"]').type(testUser.email);
    cy.get('input[name="password"]').type(testUser.password);
    cy.contains('button', 'Ingresar').click();
    
    cy.url().should('not.include', '/login');
    cy.visit('http://localhost:3000/reservas/MisReservas');
    cy.wait(1000);
  });

  it('Debería completar todo el flujo de reserva', () => {
    cy.intercept('GET', '/api/recursos').as('getRecursos');
    cy.contains('button', 'Reservar').click();

    const futureDate = '2026-01-01';
    cy.get('input[type="date"]').first()
      .clear()
      .type(futureDate)
      .should('have.value', futureDate)
      .blur()
      .trigger('change');

    cy.wait('@getRecursos', { timeout: 10000 })
      .its('response.statusCode')
      .should('eq', 304);

    cy.get('select', { timeout: 10000 })
      .as('recursoSelect')
      .select('Laboratorio de redes - Salon 500');

    cy.get('@recursoSelect').should('have.value', 'Salon 500');
    
    cy.get('div.grid.grid-cols-3.gap-4')
      .should('be.visible')
      .contains('label', 'Jueves')
      .parent()
      .contains('label', '20:00 - 20:30')
      .click();

    cy.contains('button', 'Realizar Reserva').click();

    cy.wait(2000); // Esperar que se cargue la reserva
    
    cy.get('svg[viewBox="0 0 24 24"][style*="cursor: pointer"]')
      .first()
      .click({ force: true });

    cy.contains('button', 'Confirmar')
      .should('be.visible')
      .click();

    cy.contains('button', 'Cerrar sesión')
      .should('exist')
      .click({ force: true });

    cy.url().should('include', '/login');
  });
});