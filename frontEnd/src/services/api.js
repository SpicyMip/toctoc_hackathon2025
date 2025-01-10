// src/services/api.js

// En un proyecto real, podrías hacer un fetch a la URL real. Aquí simulamos.
export async function fetchProperties() {
    // Podrías hacer algo como:
    // const response = await fetch("https://tu-backend.com/api/propiedades");
    // const data = await response.json();
    // return data;
  
    // Pero en este ejemplo, devolvemos la respuesta mockeada de forma estática:
    return {
      "status": "ok",
      "statusCode": 200,
      "message": "",
      "docs": [
        {
          "_id": "6761870e74964afe7daafd5e",
          "address": {
            "lat": -33.4153,
            "long": -70.5853,
            "communeName": "Las Condes",
            "street": "ESTUDIO ESCUELA MILITAR"
          },
          "area": {
            "balcony": 0,
            "constructed": 0,
            "land": 0,
            "usable": 24
          },
          "distance": 57.97194527756779,
          "operationFamily": "Arriendo",
          "propertyFamilyType": "Departamento",
          "price": 13.305094678556461,
          "salableArea": 24,
          "ufm2": 0.5543789449398525,
          "publicationDate": "2024-01-31T00:00:00.000Z"
        },
        // ... El resto de docs que adjuntaste
      ],
      "limit": 20,
      "page": 1,
      "totalDocs": 980,
      "totalPages": 49
    };
  }
  