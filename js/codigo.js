/*
Autor ExprimeAndroid(c)
*/

angular
	.module("miModulo", ['ngMaterial', 'ngMessages'])
	.controller("miControlador", ["$scope", "$mdDialog", mainController]);

function mainController($scope, $mdDialog) {
	var vm = this;

	//Configuración básica
	vm.empresa = "WIFI Gratis";
	vm.copyright = "GoBo Technologies";
	vm.descripcion = vm.empresa;
	vm.numeroVersion = "2.0";
	vm.nombreVersion = "b ML";
	vm.textoMenuBar = "WIFI Exclusivo para clientes";
	vm.user="";             //Usuario y contraseña por defecto que sale en el form
	vm.pass="";     
	vm.idioma = "es";       //Indica el idioma en el que está la aplicación
    vm.condiciones = false; //Indica si están aceptadas o no las condiciones
	$scope.status = "";     //Es el texto que sale tras aceptar o rechazar las condiciones de uso
	

	//Función que muestra el cuadro de dialogo para aceptar las condiciones
	vm.mostrarCondiciones = function (ev) {
			$mdDialog.show({
					controller: DialogController,
					templateUrl: 'condiciones.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: true // Only for -xs, -sm breakpoints.
				})
				.then(function (answer) { //Respondió o true o false
					vm.condiciones = answer;
					if (answer){
						$scope.status = "Has aceptado las condiciones de uso";
						$scope.status = "No podrás navegar mientras no aceptes las condiciones";
					}
				}, function () {  //Canceló la ventana sin aceptar o declinar
					vm.condiciones = false;
					$scope.status = "Has cerrado la ventana sin aceptar o rechazar las condiciones. No podrás navegar mientras no sean aceptadas.";
				});
	};

    //Función que muestra el cuadro de dialogo para aceptar las condiciones
	vm.mostrarSelectorIdioma = function (ev) {
			$mdDialog.show({
					controller: DialogController,
					templateUrl: 'multilenguaje.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: true // Only for -xs, -sm breakpoints.
				})
				.then(function (answer) { //En answer está el idioma escogido
					vm.idioma = answer;
				    switch (answer) {
                        case "es":
                            $scope.status = "Idioma español";
                            break;
                        case "en":
                            $scope.status = "Language english";
                            break;
                        default:
                            $scope.status = "Idioma por defecto - Español";
                            vm.idioma = "es";
                    }

				}, function () {  //Canceló la ventana sin aceptar o declinar
					vm.idioma = "es";
					$scope.status = "Has cerrado la ventana sin cambiar el idioma";
				});
	};
	
	//Función que muestra u oculta el cuadro de diálogo
	function DialogController($scope, $mdDialog) {
		$scope.hide = function () {
			$mdDialog.hide();
		};

		$scope.cancel = function () {
			$mdDialog.cancel();
		};

		$scope.answer = function (answer) {
			$mdDialog.hide(answer);
		};
	}


	//Función que borra todos los valores y los resetea
	vm.restart = function () {
		//Añadir todos los valores por defecto
		$scope.status = "";
		vm.condiciones = false;
		vm.user="";
		vm.pass="";
	};

} //Fin mainController
