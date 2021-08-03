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


### Desmikrotización (eliminar comentarios $())

No es necesario poner en comentarios las variables del mikrotik, se pueden dejar comentadas y el mikrotik las leerá igualmente. Y el html las ignorará, por lo que no es necesario desmikrotizar.


