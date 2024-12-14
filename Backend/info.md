# BACKEND

montamos una api res con express que haga un fetch y traiga la info del precio de la luz 
lo guarda en una variable y utilizando esa data montaremos 2 endpoint
1- Trae los datos por horas
2- Trae los datos por dias 

1 persona crea proyecto... etc y crear funciones para traer la data del precio de la luz
2 persona crea la api res con express



NOTAS: 
Cada modificacion hay que hacer un pull y hacer un mersh a la rama MAIN, solo inyectamos en la rama main despues de hacer un pr que sea aceptado por compañero








Proyecto API Luz-Tiempo

Tiene que tener una vista login, si no estamos registrados que aparezca un formulario de registro con 3 campos (username y 2 veces el password)
si las 3 pass son iguales entonces el boton de registrer aprece o que este difuminado. El registro se hace atacando a sqlite3
Cuendo las credenciales sean correctas tenemos la pagina index.html que tendra un nav, body y el footer que sera un componente que le pase como parametro  
un objeto y pintar los datos de todos los usuarios usuario y github. En el nav poner algun logo y dos botones luz y tiempo. cuando se pulse el boton luz
tiene que aprecer el precio luz hora y el grafico. Cuando pulse tiempo utilizar la api OpenWeather gratuite que da el tiempo de cualquier ciudadh que tenga 
dos campos para escribir el nombre de la ciudad y el boton de buscar y que devuelva el tiempo, a esta api solo hay que atacar con fetch no se guarda en la bd.
Se almacena la data en la bd del precio de la luz antes de renderizarla. Guardar las credenciales de usuario y es correcto hay que guardar la sesion en
localStorage y que es encriptado

La exposicion sera 2 o 3 diapositivas y cada uno hablara de su parte explicandola 

hay que instalar un paquete llamado cors y poner app.use(cors()); se instala con npm install cors