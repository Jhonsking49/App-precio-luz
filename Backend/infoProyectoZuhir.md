# PROYECTO API-PRECIO-LUZ


# DESCRIPCION

Funcionamiento del Proyecto
Este proyecto es una API que gestiona los precios de la electricidad. La aplicación realiza las siguientes funciones:

Obtención de Precios Externos: La API se conecta a una fuente externa para obtener los precios de la electricidad.

Almacenamiento en Base de Datos: Una vez que los precios son obtenidos, se procesan y almacenan en una base de datos SQLite para su consulta posterior.

Consultas a la Base de Datos: La API permite realizar consultas para obtener los precios almacenados de varias formas:

Obtener todos los precios.
Consultar los precios de un día específico.
Consultar los precios de una hora específica.

Servidor Web: El servidor ejecuta la aplicación en el puerto especificado y expone los endpoints para interactuar con los precios de luz.


# Tecnologias utilizadas

Express, SQLite3, dotenv, cors