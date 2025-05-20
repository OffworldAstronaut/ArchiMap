# ⛪ ArchiMap

O **ArchiMap** é um mapa interativo não oficial da Arquidiocese de Maceió, desenvolvido com [Leaflet.js](https://leafletjs.com/).
Possui o objetivo de apresentar as paróquias, comunidades, capelas e a catedral, localidades sob jurisdição do Bispo de Maceió, permitindo uma rápida consulta de suas localizações, contatos e horários das Missas, confissões e outros eventos regulares.

## ✨ Funcionalidades

- 📍 Marcadores personalizados por tipo de localidade (matriz, comunidade, capela, catedral);
- 🗺️ Mapa interativo com zoom e popups;
- ℹ️ Painel lateral com informações detalhadas de cada localidade;
- 🌗 Alternância entre modo claro e escuro (inclusive no mapa);

## 📁 Estrutura

```
ArchiMap/
│
├── index.html # Página principal
├── css/
│ └── home.css # Estilos personalizados
├── data/
│ └── parishes.json # Dados das paróquias
│ └── eucharist.svg # Favicon
├── src/
  └── script.js # Código JS para o index.html
```

## 🛠️ Contribuição

Para adicionar ou editar paróquias, edite o arquivo de dados em ``data``, ``parishes.json``.

📌 **Exemplo de Paróquia (JSON)**

```json
{
  "name": "Paróquia São Pedro",
  "type": "matriz",
  "location": {
    "lat": -9.6498,
    "lng": -35.7089
  },
  "address": "Rua Exemplo, 123",
  "priest": "Pe. João da Silva",
  "contact": {
    "phone": "(82) 99999-9999",
    "email": "paroquia@exemplo.com",
    "instagram": "@paroquiasp"
  },
  "schedule": {
    "masses": ["Dom 7h, 17h", "Qua 19h"],
    "confessions": ["Sáb 15h-17h"],
    "events": ["Terço dos Homens - Seg 20h"]
  }
  // A depender do tipo (paróquia, comunidade, ...) pode haver mais parâmetros, basta comparar com as que já existem. 
}
```

## 📦 Dependências

- [Leaflet.js](https://unpkg.com/leaflet/)
- [Leaflet-color-markers](https://github.com/pointhi/leaflet-color-markers) (para ícones coloridos)

## 📃 Licença

Licenciado sob a licença MIT. \
O objetivo desse projeto é colaborar na espiritualidade de toda a Arquidiocese, por meio da facilidade de consulta de informação.

> ✝️ "For the greater glory of God." 