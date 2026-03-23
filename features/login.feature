@login @SauceDemo @E2E  
Feature: Login en Sauce Demo

  Como un cliente de Sauce Demo, 
  Quiero poder iniciar sesión en la plataforma
  Para poder acceder a mi cuenta y realizar compras.

  Background:
    Given que el usuario navega a la pagina de inicio de sesion

  Scenario: Inicio de sesion exitoso
    When ingresa el usuario "standard_user" y la contraseña "secret_sauce"
    Then deberia ser redirigido a la pagina de productos

  Scenario: Inicio de sesion fallido por credenciales invalidas
    When ingresa el usuario "usuario_invalido" y la contraseña "clave_incorrecta"
    Then deberia ver un mensaje de error que dice "Epic sadface: Username and password do not match any user in this service"

  Scenario: Inicio de sesion fallido por usuario bloqueado
    When ingresa el usuario "locked_out_user" y la contraseña "secret_sauce"
    Then deberia ver un mensaje de error que dice "Epic sadface: Sorry, this user has been locked out."