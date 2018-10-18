/*
Autor ExprimeAndroid(c)
*/

angular
	.module("miModulo", ['ngMaterial', 'ngMessages'])
	.controller("miControlador", ["$scope", "$mdDialog", "$mdToast" , mainController])
;

function mainController($scope, $mdDialog, $mdToast) {
	var vm = this;

	//Configuración básica
	vm.empresa = "WIFI Gratis";
	vm.copyright = "GoBo Technologies";
	vm.descripcion = vm.empresa;
	vm.numeroVersion = "2.0";
	vm.nombreVersion = "b ML";
	vm.textoMenuBar = "WIFI Exclusivo para clientes";
	vm.user="";                 //Usuario y contraseña por defecto que sale en el form
	vm.pass="";     
	vm.idioma = "es";           //Indica el idioma en el que está la aplicación (en formato corto y largo)
    vm.idiomaLargo = "Español";
    vm.condiciones = false;     //Indica si están aceptadas o no las condiciones
	$scope.status = "";         //Es el texto que sale tras aceptar o rechazar las condiciones de uso
	

	//Función que muestra el cuadro de dialogo para aceptar las condiciones
	vm.mostrarCondiciones = function (ev) {
			$mdDialog.show({
					controller: DialogController,
					templateUrl: 'condiciones.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: false,
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

    //Función que muestra el cuadro de dialogo de ayuda
	vm.mostrarAyuda = function (ev) {
			$mdDialog.show({
					controller: DialogController,
					templateUrl: 'ayuda.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					fullscreen: false // Only for -xs, -sm breakpoints.
				})
				.then(function (answer) { //Respondió o true o false
				    //No hacemos nada, ya que sólo es ayuda

				}, function () {  //Canceló la ventana sin aceptar o declinar
                    //No hacemos nada
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
					fullscreen: false // Only for -xs, -sm breakpoints.
				})
				.then(function (answer) { //En answer está el idioma escogido
					vm.idioma = answer;
				    switch (answer) {
                        case "es":
                            vm.idiomaLargo = "Español";
                            vm.muestraToast("Idioma establecido a Español");
                            break;
                        case "en":
                            vm.idiomaLargo = "English";
                            vm.muestraToast("Language established to English");
                            break;
                        case "fr":
                            vm.idiomaLargo = "Français";
                            vm.muestraToast("Langue établie au français");
                            break;
                        default:
                            vm.idiomaLargo = "Español";
                            vm.muestraToast("Establecido por defecto a Español");
                    }

				}, function () {  //Canceló la ventana sin aceptar o declinar
					vm.idioma = "es";
                    vm.idiomaLargo = "Español";
                    vm.muestraToast("No seleccionaste ningún idioma, se elegirá el idioma por defecto");
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
        vm.idioma = "es";
        vm.idiomaLargo = "Español";
	};


    /**
    Función que recibe un mensaje, una posición y una duración y muestra un Toast con esos valores.
    mensaje es el mensaje que queremos mostrar
    posicion puede valer top bottom left y right, por ej: si queremos arriba a la derecha pasamos "top left". Por defecto será "bottom right"
    duración son los milisegundos que estará el toast (por defecto 3000)
    */
    vm.muestraToast = function(mensaje,posicion,duracion) {
        if (duracion === undefined) {
            duracion = 3000;
        }
        if (posicion === undefined) {
            posicion = "bottom right";
        }

        $mdToast.show(
          $mdToast.simple()
            .textContent(mensaje)
            .position(posicion)
            .hideDelay(duracion)
        );
    };


} //Fin mainController
