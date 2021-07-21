# wifi-social-legacy
Login Wifi-Social de Gobo Technologies

## Versión más nueva

Existe una versión más reciente del proyecto, en fase de pruebas, usando Angular 12 en el siguiente repositorio:
https://github.com/borilio/wifi-social

## Vista previa última versión GitHub

Para acceder al enlace de GitHub y ver la última versión del repositorio, visite:

https://borilio.github.io/wifi-social-legacy/

## Releases

Para crear una release, se crea una rama con el nombre `release-YYYY-MM-DD` y en esa rama se edita el archivo ``login.html``, quitando todos los comentarios de las variables del mikrotik (desmikrotizar).

El último release lo encontrará en:
https://github.com/borilio/wifi-social-legacy/releases/latest

Las releases más antiguas se encuentran en:
https://github.com/borilio/wifi-social-legacy/releases


### Ejemplo de desmikrotización (eliminar comentarios $())

Cambiar esto:

```html
	<!--	$(if chap-id)-->
	<form name="sendin" action="$(link-login-only)" method="post">
		<input type="hidden" name="username" />
		<input type="hidden" name="password" />
		<input type="hidden" name="dst" value="$(link-orig)" />
		<input type="hidden" name="popup" value="true" />
	</form>

	<script type="text/javascript" src="js/md5.js"></script>
	<script type="text/javascript">

		function doLogin() {
			document.sendin.username.value = document.login.username.value;
			document.sendin.password.value = hexMD5('$(chap-id)' + document.login.password.value + '$(chap-challenge)');
			document.sendin.submit();
			return false;
		}
	</script>
	<!--	$(endif)-->
```

Por esto otro:

```html
		$(if chap-id)
	<form name="sendin" action="$(link-login-only)" method="post">
		<input type="hidden" name="username" />
		<input type="hidden" name="password" />
		<input type="hidden" name="dst" value="$(link-orig)" />
		<input type="hidden" name="popup" value="true" />
	</form>

	<script type="text/javascript" src="js/md5.js"></script>
	<script type="text/javascript">

		function doLogin() {
			document.sendin.username.value = document.login.username.value;
			document.sendin.password.value = hexMD5('$(chap-id)' + document.login.password.value + '$(chap-challenge)');
			document.sendin.submit();
			return false;
		}
	</script>
		$(endif)
```

