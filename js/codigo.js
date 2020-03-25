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
	            controller: vm.DialogController,
	            locals: {
	                m: vm.m
	            },
	            templateUrl: 'templates/cond-' + vm.idioma + '.tmpl.html',
	            parent: angular.element(document.body),
	            targetEvent: ev,
	            clickOutsideToClose: false,
	            fullscreen: true // Only for -xs, -sm breakpoints.
	        })
	        .then(function (answer) { //Respondió o true o false
	            vm.condiciones = answer;
	            if (answer) {
	                $scope.status = vm.m.condAcepto;
	            } else {
	                $scope.status = vm.m.condNoAcepto;
	            }
	        }, function () { //Canceló la ventana sin aceptar o declinar
	            vm.condiciones = false;
	            $scope.status = vm.m.condElse;
	        });
	};

    //Función que muestra el cuadro de dialogo de ayuda
	vm.mostrarAyuda = function (ev) {
        $mdDialog.show({
					controller: vm.DialogController,
                    locals : {m : vm.m},
					templateUrl: 'templates/ayuda.tmpl.html',
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
	            controller: vm.DialogController,
	            locals: {m: vm.m},
	            templateUrl: 'templates/multi.tmpl.html',
	            parent: angular.element(document.body),
	            targetEvent: ev,
	            clickOutsideToClose: true,
	            fullscreen: false // Only for -xs, -sm breakpoints.
	        })
	        .then(function (answer) { //En answer está el idioma escogido
	            vm.idioma = answer;
	            //Rellenamos el objeto m con los atributos del JSON seleccionado
	            vm.cargarIdioma(vm.idioma);
	            //Como ha cambiado de idioma, "reseteamos" el estado de las condiciones para que vuelva a aceptar
                vm.condiciones = false;
                $scope.status = "";


                //El toast lo mostramos en cargarIdioma(), ya que si no al ser asincrono, es posible que
	            //cuando termine cargarIdioma() todavía vm.m.langChange valga todavía lo anterior y no salía bien el mensaje

	        }, function () { //Canceló la ventana sin aceptar o declinar
	            //No hacemos nada, lo dejamos todo tal y como está...
	        });
	};

	//Función que muestra u oculta el cuadro de diálogo
	vm.DialogController = function ($scope, $mdDialog, m) {
        //Pasamos los mensajes al dialogo poniéndolos en el $scope
        $scope.m = m;

        $scope.hide = function () {
			$mdDialog.hide();
		};

		$scope.cancel = function () {
			$mdDialog.cancel();
		};

		$scope.answer = function (answer) {
			$mdDialog.hide(answer);
		};
	};

	//Función que borra todos los valores y los resetea
	vm.restart = function () {
		//Añadir todos los valores por defecto
		$scope.status = "";
		vm.condiciones = false;
		vm.user="";
		vm.pass="";
        vm.idioma = "es";
        vm.cargarIdioma(vm.idioma);
        vm.fabOpen = false;
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
            //Una vez cargados los datos del JSON, mostramos el toast
            vm.muestraToast(vm.m.langChange);
		};

		var error = function(error) {
            vm.muestraToast("Error while loading languages. Sorry.");
		};

		//Hacemos la consulta ajax y si va bien, se ejecutará la función éxito, si no error
        var url = "traducciones/" + vm.idioma + ".json";
        $http.get(url).then(exito, error);
    };

    //NOTE: Una vez definido, aquí empieza la ejecución del programa
    //FIXME: Arreglar ésto, creando un objeto JS tipo var app ={ atributos:... , métodos: ... }
    /******************************************************************************************/
    /********        ¡¡¡¡ Aquí empieza todo  !!!!   *******************************************/
    /******************************************************************************************/

    //Configuración básica
    vm.empresa = "Empresa Demo";
    vm.copyright = "GoBo Technologies";
    vm.enlaceCopyright = "mailto:gobotecno@gmail.com"; //Enlace al que llevará el copyright
    vm.descripcion = vm.empresa;
    vm.numeroVersion = "2.02";
    vm.nombreVersion = "P";
    vm.trial = false;           //Para mostrar u ocultar las opciones de wifi de cortesía sin login

    //Seleccionamos español por defecto
    vm.idioma = "es";
    vm.m = {};
    vm.cargarIdioma(vm.idioma);  //Y rellenamos el objeto m con los textos para el idioma seleccionado

    //Valores por defecto...
    vm.user="";                 //Usuario y contraseña por defecto que sale en el form
    vm.pass="";
    vm.condiciones = false;     //Indica si están aceptadas o no las condiciones
    vm.fabOpen = false;         //Indica si el speeddial está abierto o no (aunque no se usa porque no funcionaba)
    $scope.status = "";         //Es el texto que sale tras aceptar o rechazar las condiciones de uso


} //Fin mainController
