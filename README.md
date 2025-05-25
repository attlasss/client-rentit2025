### Manual d'instal·lació per al projecte Vue (Rent-IT)

## Requisits Prèvis

Abans de començar, assegura't de tenir instal·lats els següents programes:

* **Node.js** (recomanat: versió 14.x o superior)
* **npm** (que s'instal·la juntament amb Node.js)
* **Git** (per clonar el repositori)

## Instal·lació

Segueix aquests passos per instal·lar i posar en marxa el projecte a la teva màquina local.

### 1. Clonar el repositori

Clona el repositori de GitHub a la teva màquina local utilitzant el següent comandament:

```bash
git clone https://github.com/attlasss/rent-it-admin.git
cd rent-it
```

### 2. Instal·lar les dependències

Un cop dins del directori del projecte, instal·la totes les dependències necessàries executant:

```bash
npm install
```

Aquest comandament instal·larà totes les llibreries necessàries que estan definides al fitxer `package.json`.

### 3. Configuració de l'entorn

Si el teu projecte requereix variables d'entorn (com a claus API), assegura't de crear un fitxer `.env` a l'arrel del projecte. Si no és necessari, pots ometre aquest pas.

### 4. Iniciar el servidor de desenvolupament

Per executar el servidor en mode desenvolupament, utilitza el següent comandament:

```bash
npm run serve
```

Això iniciarà el servidor de desenvolupament i podràs accedir a l'aplicació a:

```
http://localhost:8080
```

### 5. Compilar per a producció

Si vols compilar el projecte per a producció, executa:

```bash
npm run build
```

Això generarà una versió optimitzada del projecte al directori `dist/` per a ser desplegada en producció.
```


## Tecnologies Utilitzades

* **Vue.js** (per a la interfície d'usuari)
* **Vue Router** (per a la navegació)
* **Bootstrap 5** (per al disseny responsiu)
* **Axios** (per a la gestió de sol·licituds HTTP)
* **Feather Icons** (per als icones)
* **JWT Decode** (per a decodificar JSON Web Tokens)

