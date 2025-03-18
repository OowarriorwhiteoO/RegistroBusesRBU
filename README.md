# Sistema de Registro de Buses (RBU)

Sistema web para el registro y gestión de buses, desarrollado con HTML, CSS y JavaScript.

## Características

- Autenticación de usuarios
- Registro de buses con información detallada
- Visualización y búsqueda de buses registrados
- Interfaz moderna y responsive
- Almacenamiento local persistente

## Tecnologías Utilizadas

- HTML5
- CSS3 (con variables CSS y Flexbox/Grid)
- JavaScript (Vanilla)
- Font Awesome para iconos
- LocalStorage para persistencia de datos

## Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/OowarriorwhiteoO/RegistroBusesRBU.git
```

2. Navega al directorio del proyecto:
```bash
cd RegistroBusesRBU
```

3. Inicia un servidor web local (por ejemplo, con Python):
```bash
python -m http.server 8000
```

4. Abre tu navegador y visita:
```
http://localhost:8000
```

## Uso

1. **Inicio de Sesión**
   - Usuario: admin
   - Contraseña: admin123

2. **Registro de Buses**
   - Accede a la sección "Registrar Bus"
   - Completa el formulario con los datos del bus
   - Opcionalmente añade una foto

3. **Visualización de Buses**
   - Ve a la sección "Ver Buses"
   - Utiliza el buscador para filtrar registros
   - Muestra/oculta fotos con el botón correspondiente

## Estructura del Proyecto

- `index.html`: Estructura principal y componentes HTML
- `styles.css`: Estilos y diseño responsive
- `script.js`: Lógica de la aplicación y manejo de datos

## Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu función (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Distribuido bajo la Licencia MIT. Ver `LICENSE` para más información.