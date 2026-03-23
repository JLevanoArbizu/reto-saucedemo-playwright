@@Shopping @SauceDemo @E2E  
Feature: Flujo de compra en Sauce Demo

  Como un cliente de Sauce Demo, 
  Quiero poder agregar productos al carrito y completar una compra 
  Para poder adquirir los productos que necesito.

  Background:
    Given que el usuario "standard_user" ha iniciado sesion

  Scenario: Agregar un producto al carrito
    When agrega el producto "Sauce Labs Backpack" al carrito
    Then el icono del carrito deberia mostrar "1" unidad

  Scenario: Ver productos en el carrito
    Given que el usuario tiene el producto "Sauce Labs Backpack" en su carrito
    When navega al carrito de compras
    Then deberia ver el producto "Sauce Labs Backpack" en la lista

  Scenario: Completar el proceso de compra (Checkout)
    Given que el usuario tiene el producto "Sauce Labs Backpack" en su carrito
    And se encuentra en la pagina de informacion de pago
    When completa el formulario con "Jose" "Levano" "15001"
    And finaliza la orden
    Then deberia ver el mensaje de confirmacion "Thank you for your order!"