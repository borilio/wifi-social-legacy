# wifi-social
Login Wifi-Social de Gobo Technologies

## Vista previa última versión GitHub

Para acceder al enlace de GitHub y ver la última versión del repositorio, visite:
https://borilio.github.io/wifi-social-legacy/

## Releases

Para crear una release, hay que eliminar el archivo `index.html` y eliminar los comentarios del html y dejar al 'aire' 
todas las variables del mikrotik. 

### Ejemplo

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

