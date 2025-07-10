# 🚀 EmprendeUni - Plataforma de Emprendimientos Estudiantiles

Una plataforma web moderna y dinámica para conectar, promocionar y hacer crecer los emprendimientos de estudiantes universitarios. Desarrollada con Flask y tecnologías web modernas.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Características Técnicas](#-características-técnicas)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## ✨ Características

### 🎯 Funcionalidades Principales
- **Registro de Emprendimientos**: Formulario completo para registrar nuevos emprendimientos estudiantiles
- **Catálogo de Emprendimientos**: Lista filtrable y buscable de todos los emprendimientos registrados
- **Páginas de Detalle**: Información detallada de cada emprendimiento
- **Sistema de Categorías**: Organización por categorías (Tecnología, Servicios, Educación, etc.)
- **Estados de Progreso**: Seguimiento del estado del emprendimiento (Idea, En desarrollo, Funcionando, etc.)
- **Redes Sociales**: Integración con Instagram, Facebook, TikTok y sitios web
- **Estadísticas en Tiempo Real**: Dashboard con métricas de la plataforma

### 🎨 Características de Diseño
- **Interfaz Moderna**: Diseño responsive y atractivo con animaciones CSS
- **Experiencia de Usuario**: Navegación intuitiva y feedback visual
- **Loading Animations**: Pantallas de carga con animaciones personalizadas
- **Gradientes y Efectos**: Efectos visuales modernos y atractivos
- **Iconografía**: Uso de Font Awesome para iconos consistentes

## 🛠️ Tecnologías Utilizadas

### Backend
- **Flask 2.0.1**: Framework web ligero y flexible
- **Python 3.x**: Lenguaje de programación principal
- **JSON**: Almacenamiento de datos en formato JSON
- **UUID**: Generación de identificadores únicos

### Frontend
- **HTML5**: Estructura semántica moderna
- **CSS3**: Estilos avanzados con animaciones y efectos
- **JavaScript**: Interactividad y funcionalidades dinámicas
- **Font Awesome 6.4.0**: Iconografía profesional
- **Google Fonts (Inter)**: Tipografía moderna y legible

### Características Técnicas
- **Responsive Design**: Compatible con dispositivos móviles y desktop
- **Progressive Enhancement**: Funcionalidad básica sin JavaScript
- **SEO Friendly**: Estructura HTML optimizada para motores de búsqueda
- **Accessibility**: Consideraciones de accesibilidad web

## 🚀 Instalación

### Prerrequisitos
- Python 3.7 o superior
- pip (gestor de paquetes de Python)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/stivenrata11/emprendimientoestudiantil.git
   cd emprenduni
   ```

2. **Crear entorno virtual (recomendado)**
   ```bash
   python -m venv venv
   
   # En Windows
   venv\Scripts\activate
   
   # En macOS/Linux
   source venv/bin/activate
   ```

3. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

4. **Ejecutar la aplicación**
   ```bash
   python app.py
   ```

5. **Acceder a la aplicación**
   Abre tu navegador y ve a `http://localhost:5000`

## 📖 Uso

### Para Estudiantes Emprendedores

1. **Registrar tu Emprendimiento**
   - Ve a la página "Registrar"
   - Completa el formulario con la información de tu emprendimiento
   - Incluye enlaces a tus redes sociales
   - Guarda tu emprendimiento

2. **Ver tu Emprendimiento**
   - Navega a "Emprendimientos" para ver tu proyecto listado
   - Haz clic en tu emprendimiento para ver los detalles completos

### Para Visitantes

1. **Explorar Emprendimientos**
   - Usa los filtros por categoría
   - Busca emprendimientos por nombre o descripción
   - Explora los detalles de cada proyecto

2. **Conectar con Emprendedores**
   - Usa los enlaces de redes sociales para contactar
   - Visita los sitios web de los emprendimientos

## 📁 Estructura del Proyecto

```
emprendeuni/
├── app.py                 # Aplicación principal Flask
├── requirements.txt       # Dependencias de Python
├── README.md             # Este archivo
├── data/
│   └── emprendimientos.json  # Base de datos JSON
├── static/
│   ├── css/
│   │   ├── index.css     # Estilos de la página principal
│   │   ├── lista.css     # Estilos de la lista de emprendimientos
│   │   ├── detalle.css   # Estilos de la página de detalle
│   │   └── registro.css  # Estilos del formulario de registro
│   ├── js/
│   │   ├── index.js      # JavaScript de la página principal
│   │   ├── lista.js      # JavaScript de la lista
│   │   ├── detalle.js    # JavaScript de la página de detalle
│   │   └── registro.js   # JavaScript del formulario
│   └── images/           # Imágenes del proyecto
└── templates/
    ├── index.html        # Página principal
    ├── lista.html        # Lista de emprendimientos
    ├── detalle.html      # Página de detalle
    └── registro.html     # Formulario de registro
```

## 🔌 API Endpoints

La aplicación incluye endpoints API para integración con otros sistemas:

### GET `/api/emprendimientos`
Retorna todos los emprendimientos en formato JSON.

**Respuesta:**
```json
[
  {
    "id": "uuid",
    "nombre": "Nombre del Emprendimiento",
    "descripcion": "Descripción...",
    "categoria": "Tecnología",
    "estudiante_nombre": "Nombre del Estudiante",
    "email": "email@ejemplo.com",
    "universidad": "Universidad",
    "carrera": "Ingeniería",
    "semestre": "5",
    "instagram": "https://instagram.com/...",
    "facebook": "https://facebook.com/...",
    "tiktok": "https://tiktok.com/...",
    "sitio_web": "https://sitio.com",
    "inversion_inicial": 1000.0,
    "tiempo_funcionando": "6 meses - 1 año",
    "empleados": 3,
    "estado": "En desarrollo",
    "fecha_registro": "2025-01-15T10:30:00"
  }
]
```

### GET `/api/stats`
Retorna estadísticas generales de la plataforma.

**Respuesta:**
```json
{
  "total": 25,
  "categorias": ["Tecnología", "Servicios", "Educación"],
  "total_categorias": 3,
  "total_emprendedores": 20
}
```

## 🔧 Características Técnicas

### Validaciones
- **Nombre**: Mínimo 3 caracteres
- **Descripción**: Mínimo 10 caracteres
- **Email**: Formato válido de email
- **URLs**: Limpieza automática de URLs de redes sociales

### Categorías Disponibles
- Tecnología
- Servicios
- Educación
- Salud y Bienestar
- Otro

### Estados de Emprendimiento
- Idea
- En desarrollo
- Funcionando
- En crecimiento
- Establecido

### Tiempo de Funcionamiento
- Menos de 6 meses
- 6 meses - 1 año
- 1-2 años
- 2-3 años
- Más de 3 años

## 📸 Capturas de Pantalla

### Página Principal
   ![Página Principal](https://github.com/stivenrata11/emprendimientoestudiantil/issues/1#issue-3221014617)

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Mantén el código limpio y bien documentado
- Sigue las convenciones de nomenclatura existentes
- Añade tests para nuevas funcionalidades
- Actualiza la documentación según sea necesario

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Jhon Anderson** - *Desarrollo inicial* - [TuUsuario](https://github.com/stivenrata11)

## 🙏 Agradecimientos

- Comunidad de estudiantes emprendedores
- Contribuidores y testers
- Recursos de diseño y desarrollo utilizados

## 📞 Contacto

- **Email**: jhonandersonmora220@gmail.com
- **GitHub**: [@TuUsuario](https://github.com/stivenrata11)

---

⭐ Si este proyecto te ha sido útil, ¡considera darle una estrella en GitHub! 
