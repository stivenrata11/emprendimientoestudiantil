# app.py - Aplicación Flask Principal
# Importacion de librerias
from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
import os
from datetime import datetime
import uuid
#import re # Expresiones regulares

# Inicializacion de la aplicacion Flask
app = Flask(__name__)
app.secret_key = 'emprendimientos_estudiantiles_2025'

# Archivo para almacenar datos en formato JSON
DATA_FILE = 'data/emprendimientos.json'

# Categorías disponibles para los emprendimientos
CATEGORIAS = [
    'Tecnología', 'Servicios', 'Educación', 'Salud y Bienestar', 'Otro'
]

# Estados del emprendimiento 
ESTADOS = ['Idea', 'En desarrollo', 'Funcionando', 'En crecimiento', 'Establecido']

# Tiempo funcionando
TIEMPO_FUNCIONANDO = [
    'Menos de 6 meses', '6 meses - 1 año', '1-2 años', 
    '2-3 años', 'Más de 3 años'
]

# Funciones para cargar y guardar emprendimientos
def cargar_emprendimientos():
    """Carga emprendimientos desde archivo JSON usando operaciones con listas"""
    if os.path.exists(DATA_FILE):
        try:
            # Abre el archivo en modo lectura con codificación UTF-8
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            # Si ocurre un error, retorna una lista vacía
            return []
    # Si el archivo no existe, retorna una lista vacía
    return []

# Funcion para guardar emprendimientos en formato JSON
def guardar_emprendimientos(emprendimientos):
    """Guarda emprendimientos en archivo JSON usando operaciones con diccionarios"""
    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    # Abre el archivo en modo escritura con codificación UTF-8
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        # Guarda los emprendimientos en el archivo con formato JSON
        json.dump(emprendimientos, f, indent=2, ensure_ascii=False)



# Funcion para limpiar las URLs de las redes sociales
def limpiar_url_social(url):
    """Limpia URLs de redes sociales usando operaciones de cadena"""
    # Si la URL es None, retorna una cadena vacía
    if not url:
        return ""
    # Elimina espacios y caracteres especiales
    url = url.strip()
    # Si la URL no comienza con http:// o https://, agrega https://
    if url and not url.startswith(('http://', 'https://')):
        # Agrega https:// al inicio de la URL
        url = 'https://' + url
    # Retorna la URL limpia
    return url

#---------------------------------------------------------------------------------------------------
# Ruta para la pagina principal
@app.route('/')
def index():
    """Página principal - operaciones con listas para mostrar emprendimientos destacados"""
    # Carga los emprendimientos desde el archivo JSON
    emprendimientos = cargar_emprendimientos()
    
    # Operaciones aritméticas: calcular estadísticas de los emprendimientos
    total_emprendimientos = len(emprendimientos)
    emprendimientos_por_categoria = {}
    
    # Operaciones con diccionarios y listas
    for emp in emprendimientos:
        categoria = emp.get('categoria', 'Otro')
        emprendimientos_por_categoria[categoria] = emprendimientos_por_categoria.get(categoria, 0) + 1
    
    # Mostrar solo los 6 más recientes
    emprendimientos_destacados = emprendimientos[-6:] if len(emprendimientos) > 6 else emprendimientos
    
    # Retorna la pagina principal con los emprendimientos destacados
    return render_template('index.html', 
                         # Muestra los emprendimientos destacados en la pagina principal
                         emprendimientos=emprendimientos_destacados,
                         # Muestra el total de emprendimientos
                         total=total_emprendimientos,
                         # Muestra las estadisticas de las categorias de los emprendimientos
                         categorias_stats=emprendimientos_por_categoria)

# Ruta para el formulario de registro
@app.route('/registro', methods=['GET', 'POST'])
def registro():
    """Formulario de registro con validaciones usando operaciones booleanas"""
    if request.method == 'POST':
        # Lista para almacenar errores
        errores = []
        # Obtener datos del formulario usando operaciones de cadena para validar los datos
        nombre = request.form.get('nombre', '').strip()
        descripcion = request.form.get('descripcion', '').strip()
        email = request.form.get('email', '').strip()
        telefono = request.form.get('telefono', '').strip()
        # Validaciones booleanas para validar los datos
        if not nombre or len(nombre) < 3:
            errores.append("El nombre del emprendimiento debe tener al menos 3 caracteres")
        if not descripcion or len(descripcion) < 10:
            errores.append("La descripción debe tener al menos 10 caracteres")
        # Si hay errores, mostrar formulario con errores y los datos del formulario
        if errores:
            return render_template('registro.html', 
                                 categorias=CATEGORIAS,
                                 estados=ESTADOS,
                                 tiempo_opciones=TIEMPO_FUNCIONANDO,
                                 form_data=request.form,
                                 errores=errores,
                                 exito=None)
        # Crear emprendimiento usando operaciones con diccionarios para almacenar los datos
        emprendimiento = {
            'id': str(uuid.uuid4()),
            'nombre': nombre,
            'descripcion': descripcion,
            'categoria': request.form.get('categoria', 'Otro'),
            'estudiante_nombre': request.form.get('estudiante_nombre', '').strip(),
            'email': email,
            'universidad': request.form.get('universidad', '').strip(),
            'carrera': request.form.get('carrera', '').strip(),
            'semestre': request.form.get('semestre', '1'),
            'instagram': limpiar_url_social(request.form.get('instagram', '')),
            'facebook': limpiar_url_social(request.form.get('facebook', '')),
            'tiktok': limpiar_url_social(request.form.get('tiktok', '')),
            'sitio_web': limpiar_url_social(request.form.get('sitio_web', '')),
            'inversion_inicial': float(request.form.get('inversion_inicial', 0) or 0),
            'tiempo_funcionando': request.form.get('tiempo_funcionando', 'Menos de 6 meses'),
            'empleados': int(request.form.get('empleados', 1) or 1),
            'estado': request.form.get('estado', 'Idea'),
            'fecha_registro': datetime.now().isoformat()
        }
        # Operaciones con listas: agregar a la lista de emprendimientos para almacenar los datos
        emprendimientos = cargar_emprendimientos()
        emprendimientos.append(emprendimiento)
        guardar_emprendimientos(emprendimientos)
        # Redirecciona a la pagina de lista con mensaje de éxito por query string
        return redirect(url_for('lista', exito='¡Emprendimiento registrado exitosamente!'))
    # Retorna el formulario de registro con las categorias, estados y tiempo de funcionamiento
    return render_template('registro.html', 
                         categorias=CATEGORIAS,
                         estados=ESTADOS,
                         tiempo_opciones=TIEMPO_FUNCIONANDO,
                         errores=None,
                         exito=None)

# Ruta para la pagina de lista
@app.route('/lista')
def lista():
    """Lista emprendimientos con filtros usando operaciones con listas"""
    emprendimientos = cargar_emprendimientos()
    # Filtros usando operaciones booleanas y de cadena para filtrar los emprendimientos
    categoria_filtro = request.args.get('categoria', '').strip()
    busqueda = request.args.get('busqueda', '').strip().lower()
    # Operaciones con listas: filtrado para mostrar los emprendimientos
    if categoria_filtro:
        emprendimientos = [e for e in emprendimientos if e.get('categoria') == categoria_filtro]
    # Operaciones con listas: filtrado para mostrar los emprendimientos
    if busqueda:
        emprendimientos = [
            e for e in emprendimientos 
            if busqueda in e.get('nombre', '').lower() or 
               busqueda in e.get('descripcion', '').lower() or
               busqueda in e.get('estudiante_nombre', '').lower()
        ]
    # Mensaje de éxito si viene por query string
    exito = request.args.get('exito')
    # Retorna la pagina de lista con los emprendimientos, categorias, categoria actual y busqueda actual
    return render_template('lista.html', 
                         emprendimientos=emprendimientos,
                         categorias=CATEGORIAS,
                         categoria_actual=categoria_filtro,
                         busqueda_actual=request.args.get('busqueda', ''),
                         exito=exito)

# Ruta para la pagina de detalle
@app.route('/detalle/<emprendimiento_id>')
def detalle(emprendimiento_id):
    """Detalle de emprendimiento usando operaciones con listas para búsqueda"""
    emprendimientos = cargar_emprendimientos()
    # Operación con listas: búsqueda por ID para mostrar el emprendimiento
    emprendimiento = None
    for emp in emprendimientos:
        if emp.get('id') == emprendimiento_id:
            emprendimiento = emp
            break
    # Operación booleana: verificar si existe el emprendimiento
    if not emprendimiento:
        # Redirecciona a la lista con mensaje de error
        return redirect(url_for('lista', errores='Emprendimiento no encontrado'))
    # Retorna la pagina de detalle con el emprendimiento
    return render_template('detalle.html', emprendimiento=emprendimiento)

# Ruta para la API de emprendimientos
@app.route('/api/emprendimientos')
# Funcion para obtener los emprendimientos en formato JSON
def api_emprendimientos():
    """API para obtener emprendimientos en formato JSON"""
    emprendimientos = cargar_emprendimientos()
    return jsonify(emprendimientos)

# Ruta para la API de estadisticas
@app.route('/api/stats')
# Funcion para obtener las estadisticas de los emprendimientos en formato JSON
def api_stats():
    # Carga los emprendimientos desde el archivo JSON
    with open('data/emprendimientos.json', 'r', encoding='utf-8') as f:
        emprendimientos = json.load(f)
    # Calcula el total de emprendimientos
    total = len(emprendimientos)
    # Obtiene las categorias de los emprendimientos
    categorias = set(emp['categoria'] for emp in emprendimientos)
    # Calcula el total de categorias
    total_categorias = len(categorias)
    # Calcula el total de emprendedores
    total_emprendedores = len(set(emp['estudiante_nombre'] for emp in emprendimientos))
    # Retorna las estadisticas en formato JSON
    return jsonify({
        'total': total,
        # Muestra las categorias de los emprendimientos
        'categorias': list(categorias),
        # Muestra el total de categorias
        'total_categorias': total_categorias,
        # Muestra el total de emprendedores
        'total_emprendedores': total_emprendedores
    })

# Inicia la aplicacion Flask
if __name__ == '__main__':
    # Inicia la aplicacion Flask en modo debug
    app.run(debug=True)