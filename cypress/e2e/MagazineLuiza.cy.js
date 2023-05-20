describe('Testes no site do Magazine Luiza', () => {

    Cypress.config('defaultCommandTimeout', 60000);	
	
	const textToSearch	= 'Qualidade e Usabilidade de Software';
	
	const searchInput	= '[data-testid="input-search"]';
	const searchButton	= '[data-testid="search-submit"]';
	const itemReturned	= '[data-testid="product-list"] [data-testid="product-card-content"]';
	const addCartButton = 'section[style="grid-area: content / content / content / content;"] button[data-testid="bagButton"]';
	const cartItem		= '[class="BasketItemProduct-info-title"]';
  
  it('Acessar o site', () => {
  
	//This website presents this exception on the last page, regardless of the executed command. 
	//As long as the script is running, it throws this exception. 
	//So, I have handled it to prevent false failures.,
	cy.on('uncaught:exception', (err, runnable) => {
		if(err.message.includes('Already requesting showcase recommendation')){
		  console.log('Already requesting showcase recommendation')
          return false;
        }
		console.log(err.message)
	})
	  
	cy.visit('https://www.magazineluiza.com.br/')
	
	cy.get(searchInput)
	  .should('be.visible')
	  .type(textToSearch, { delay: 0 })
	  
	cy.get(searchButton)
	  .should('be.visible')
	  .click()
	  
	cy.contains('Resultados para '+ textToSearch, { matchCase: false })
	  .should('be.visible')
	  
	cy.contains(itemReturned, textToSearch, { matchCase: false })
	  .should('be.visible')
	  .click()
	  
	cy.get(addCartButton)
	  .should('be.visible')
	  .click()	  
	  
	cy.contains(cartItem, textToSearch, { matchCase: false })
	  .should('be.visible')
	  
  })
})