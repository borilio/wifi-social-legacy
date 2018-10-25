/*
Autor ExprimeAndroid(c) by Gobo Technologies
*/

angular
	.module("miModulo", ['ngMaterial', 'ngMessages'])
	.controller("miControlador", ["$scope", "$mdDialog", "$mdToast", "$http" , mainController])
;

function mainController($scope, $mdDialog, $mdToast, $http) {
	var vm = this;


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
					} else{
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
				    //Rellenamos el objeto m con los atributos del JSON seleccionado
                    vm.cargarIdioma(vm.idioma);
                    //El toast lo mostramos en cargarIdioma(), ya que si no al ser asincrono, es posible que
                    //cuando termine cargarIdioma() todavía vm.m.change valga todavía lo anterior y no salía bien el mensaje

                }, function () {  //Canceló la ventana sin aceptar o declinar
				    //No hacemos nada, lo dejamos todo tal y como está...
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

    /**
    Función que hace una consulta Ajax y vuelca un JSON en un objeto vm.m donde estarán todos los textos
    para el idioma seleccionado.
    codigo - String con el código de idioma para cargar. 'es' para español, 'en' para english y así...
    El objeto JSON se vuelca en el atributo vm.m
    */
    vm.cargarIdioma = function (codigo) {
        var exito = function(resp) {
            vm.m = resp.data;
            vm.muestraToast(vm.m.change);
		};

		var error = function(error) {
            vm.muestraToast("Error while loading languages. Sorry.");
		};

		//Hacemos la consulta ajax y si va bien, se ejecutará la función éxito, si no error
        var url = "traducciones/" + vm.idioma + ".json";
        $http.get(url).then(exito, error);
    };

    //NOTE: Una vez definido, aquí empieza la ejecución del programa

    /******************************************************************************************/
    /********        ¡¡¡¡ Aquí empieza todo  !!!!   *******************************************/
    /******************************************************************************************/

    //Configuración básica
    vm.empresa = "WIFI Gratis";
    vm.copyright = "GoBo Technologies";
    vm.descripcion = vm.empresa;
    vm.numeroVersion = "2.0";
    vm.nombreVersion = "b ML";

    //Seleccionamos español por defecto
    vm.idioma = "es";
    vm.m = {};
    vm.cargarIdioma(vm.idioma);  //Y rellenamos el objeto m con los textos para el idioma seleccionado


    //Valores por defecto...
    vm.user="";                 //Usuario y contraseña por defecto que sale en el form
    vm.pass="";
    vm.condiciones = false;     //Indica si están aceptadas o no las condiciones
    $scope.status = "";         //Es el texto que sale tras aceptar o rechazar las condiciones de uso


} //Fin mainController
