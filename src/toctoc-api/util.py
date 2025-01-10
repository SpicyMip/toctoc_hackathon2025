import re
import difflib
import json
import os


# Diccionario con los datos a buscar
data_to_fill = {
    "commune": [
    # Región de Arica y Parinacota
    "Arica", "Camarones", "Putre", "General Lagos",
    
    # Región de Tarapacá
    "Iquique", "Alto Hospicio", "Pozo Almonte", "Huara", "Camiña", "Colchane", "Pica",
    
    # Región de Antofagasta
    "Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama",
    "Tocopilla", "María Elena",
    
    # Región de Atacama
    "Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro",
    "Vallenar", "Freirina", "Huasco", "Alto del Carmen",
    
    # Región de Coquimbo
    "La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña",
    "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado",
    "Illapel", "Canela", "Los Vilos", "Salamanca",
    
    # Región de Valparaíso
    "Valparaíso", "Viña del Mar", "Concón", "Quintero", "Puchuncaví", "Casablanca", "Juan Fernández",
    "Quilpué", "Villa Alemana", "Limache", "Olmué", "Quillota", "La Calera", "Hijuelas", 
    "La Cruz", "Nogales", "San Antonio", "Cartagena", "El Tabo", "El Quisco", "Algarrobo",
    "San Felipe", "Llaillay", "Catemu", "Panquehue", "Putaendo", "Santa María", 
    "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "Isla de Pascua","Concon",
    
    # Región Metropolitana
    "Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba",
    "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", 
    "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", 
    "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal",
    "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", 
    "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", 
    "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Curacaví", 
    "María Pinto", "San Pedro", "Alhué", "Talagante", "El Monte", "Isla de Maipo", 
    "Padre Hurtado", "Peñaflor",
    
    # Región del Libertador General Bernardo O'Higgins
    "Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", 
    "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", 
    "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", 
    "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", 
    "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz",
    
    # Región del Maule
    "Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", 
    "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", 
    "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", 
    "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", 
    "San Javier", "Villa Alegre", "Yerbas Buenas",
    
    # Región de Ñuble
    "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", 
    "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", 
    "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay",
    
    # Región del Biobío
    "Concepción", "Chiguayante", "Coronel", "Florida", "Hualpén", "Hualqui", "Lota", 
    "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Los Ángeles", 
    "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", 
    "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Arauco", 
    "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Álamos", "Tirúa",
    
    # Región de La Araucanía
    "Temuco", "Carahue", "Cholchol", "Cunco", "Curarrehue", "Freire", "Galvarino", 
    "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", 
    "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", 
    "Vilcún", "Villarrica", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", 
    "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria",
    
    # Región de Los Ríos
    "Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", 
    "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno",
    
    # Región de Los Lagos
    "Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Llanquihue", 
    "Los Muermos", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", 
    "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", 
    "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", 
    "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena",
    
    # Región de Aysén
    "Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", 
    "Tortel", "Chile Chico", "Río Ibáñez",
    
    # Región de Magallanes y la Antártica Chilena
    "Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", 
    "Antártica", "Puerto Natales", "Torres del Paine", "Primavera", "Timaukel"
],
    "region": [
    "Región de Arica y Parinacota",
    "Región de Tarapacá",
    "Región de Antofagasta",
    "Región de Atacama",
    "Región de Coquimbo",
    "Región de Valparaíso",
    "Región Metropolitana de Santiago",
    "Región del Libertador General Bernardo O'Higgins",
    "Región del Maule",
    "Región de Ñuble",
    "Región del Biobío",
    "Región de La Araucanía",
    "Región de Los Ríos",
    "Región de Los Lagos",
    "Región de Aysén del General Carlos Ibáñez del Campo",
    "Región de Magallanes y de la Antártica Chilena",
    "Los Lagos",
    "Aysén",
    "Ñuble", "Coquimbo", "Tarapacá", "Arica y Parinacota", "Atacama","Valparaíso","Maule", "Magallanes", "Los Ríos", "Metropolitana"
],
    "typeOfProperty": ["casa", "departamento", "parcela"],
    "typeOfOperation": ["venta", "compra", "arriendo"],
    "bedrooms": 2,
    "bathrooms": 1,
    "parking": 1,
    "storage": 1,
    "area": 60,
    "priceMax": 99999,
    "priceMin": 0,
    "petFriendly": True
}

# Lista de prompts
prompts = [
    "Casa pequeña con vista al mar en Valparaíso",
    "Departamento en venta en Metropolitana",
    "Parcela con piscina cerca de Quilpué",
    "Casa grande en la playa de Valparaíso",
    "Departamento usado en venta en Santiago",
    "Caza grande serca de valpo usada",
    "Deparamento barato en viña del mar",
    "Casa en vanta en valpraiso",
    "Parcela serca del mar en quilpue",
    "Dpartamento amoblado en arrriendo en concon"
]

palabras_correctas = [
    # Regiones de Chile
    "Arica", "Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
    "Valparaíso", "Metropolitana", "Libertador General Bernardo O'Higgins", "Maule",
    "Ñuble", "Biobío", "Araucanía", "Los Ríos", "Los Lagos", "Aysén", 
    "Magallanes", "Antártica",

    # Comunas de Chile (Ejemplo parcial; puedes expandir con la lista completa)
    "Arica", "Camarones", "Putre", "General Lagos",
    
    # Región de Tarapacá
    "Iquique", "Alto Hospicio", "Pozo Almonte", "Huara", "Camiña", "Colchane", "Pica",
    
    # Región de Antofagasta
    "Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama",
    "Tocopilla", "María Elena",
    
    # Región de Atacama
    "Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro",
    "Vallenar", "Freirina", "Huasco", "Alto del Carmen",
    
    # Región de Coquimbo
    "La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paihuano", "Vicuña",
    "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado",
    "Illapel", "Canela", "Los Vilos", "Salamanca",
    
    # Región de Valparaíso
    "Valparaíso", "Viña del Mar", "Concón", "Quintero", "Puchuncaví", "Casablanca", "Juan Fernández",
    "Quilpué", "Villa Alemana", "Limache", "Olmué", "Quillota", "La Calera", "Hijuelas", 
    "La Cruz", "Nogales", "San Antonio", "Cartagena", "El Tabo", "El Quisco", "Algarrobo",
    "San Felipe", "Llaillay", "Catemu", "Panquehue", "Putaendo", "Santa María", 
    "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "Isla de Pascua", "Viña","Concon"
    
    # Región Metropolitana
    "Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba",
    "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", 
    "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", 
    "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal",
    "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", 
    "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", 
    "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Curacaví", 
    "María Pinto", "San Pedro", "Alhué", "Talagante", "El Monte", "Isla de Maipo", 
    "Padre Hurtado", "Peñaflor",
    
    # Región del Libertador General Bernardo O'Higgins
    "Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", 
    "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", 
    "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", 
    "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", 
    "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz",
    
    # Región del Maule
    "Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", 
    "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", 
    "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", 
    "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", 
    "San Javier", "Villa Alegre", "Yerbas Buenas",
    
    # Región de Ñuble
    "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", 
    "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", 
    "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay",
    
    # Región del Biobío
    "Concepción", "Chiguayante", "Coronel", "Florida", "Hualpén", "Hualqui", "Lota", 
    "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Los Ángeles", 
    "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", 
    "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Arauco", 
    "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Álamos", "Tirúa",
    
    # Región de La Araucanía
    "Temuco", "Carahue", "Cholchol", "Cunco", "Curarrehue", "Freire", "Galvarino", 
    "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre Las Casas", 
    "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", 
    "Vilcún", "Villarrica", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", 
    "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria",
    
    # Región de Los Ríos
    "Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", 
    "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno",
    
    # Región de Los Lagos
    "Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Llanquihue", 
    "Los Muermos", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", 
    "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", 
    "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", 
    "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena",
    
    # Región de Aysén
    "Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", 
    "Tortel", "Chile Chico", "Río Ibáñez",
    
    # Región de Magallanes y la Antártica Chilena
    "Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos", 
    "Antártica", "Puerto Natales", "Torres del Paine", "Primavera", "Timaukel",

    # Términos relacionados con búsqueda de propiedades
    "casa", "departamento", "venta", "compra", "arriendo", "parcela", "terreno",
    "piscina", "jardín", "vista", "mar", "playa", "nueva", "usada", "amoblada",
    "estacionamiento", "bodega", "jardín", "quincho", "terraza", "balcón",
    "barata", "lujosa", "amplia", "remodelada", "grande", "pequeña", "céntrica",
    "periférica", "acogedora", "cerca", "transporte", "metro", "colegios", 
    "segura", "moderna", "campestre", "urbana", "edificio", "condominio",
    "independiente", "semi-independiente", "habitaciones", "baños", 
    "estacionamientos", "bodegas", "área", "m2", "construcción", "amplio patio",
    "gastos comunes", "subsidio", "crédito hipotecario", "inversión",
    "valor", "precio máximo", "precio mínimo", "mascotas", "pet-friendly",
    "calefacción", "luminoso", "esquina", "centrica"
]

# Función para corregir errores ortográficos en un string
def corregir_texto(texto, diccionario):
    palabras = texto.split()  # Dividir el texto en palabras
    palabras_corregidas = []
    for palabra in palabras:
        # Buscar la palabra más similar en el diccionario
        coincidencia = difflib.get_close_matches(palabra.lower(), diccionario, n=1, cutoff=0.7)
        if coincidencia:
            palabras_corregidas.append(coincidencia[0])
        else:
            palabras_corregidas.append(palabra)  # Si no hay coincidencias, conservar la original
    return " ".join(palabras_corregidas)

# Función para buscar coincidencias en un prompt
def find_matches_in_prompt(prompt, data):
    matches = {key: "" for key in data.keys()}  # Inicializar con campos vacíos
    for key, value in data.items():
        if isinstance(value, list):  # Si el valor es una lista, verificar cada elemento
            for sub_value in value:
                if re.search(re.escape(str(sub_value)), prompt, re.IGNORECASE):
                    matches[key] = sub_value
                    break
        else:  # Si el valor es único, verificar directamente
            if re.search(re.escape(str(value)), prompt, re.IGNORECASE):
                matches[key] = value
    # Manejar casos donde no se especifique "typeOfOperation"
    if matches["typeOfOperation"] == "":
        matches["typeOfOperation"] = ["compra", "arriendo"]
    return {"prompt": prompt, "matches": matches}

# Corregir los textos de los prompts
prompts = [corregir_texto(prompt, palabras_correctas) for prompt in prompts]

# Crear directorio de salida
directorio_salida = "prompts_json"
os.makedirs(directorio_salida, exist_ok=True)

# Generar JSON separado por cada prompt
for idx, prompt in enumerate(prompts):
    resultado = find_matches_in_prompt(prompt, data_to_fill)
    archivo_salida = os.path.join(directorio_salida, f"prompt_{idx + 1}.json")
    with open(archivo_salida, "w", encoding="utf-8") as archivo:
        json.dump(resultado, archivo, indent=4, ensure_ascii=False)

print(f"Archivos JSON generados en el directorio: {directorio_salida}")