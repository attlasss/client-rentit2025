<template>
  <div class="legal-notice p-4">
    <h1 class="mb-3">Avís Legal</h1>

    <p><strong>Nom de l'empresa:</strong> Rent IT</p>
    <p><strong>Responsables legals:</strong> Carolina Morillo Valderas i Laureano Martínez Chacón</p>
    <p><strong>Domicili social:</strong> Carrer del Sol, 123, 08000 Barcelona, Espanya</p>
    <p><strong>Correu electrònic de contacte:</strong> info@rentit.com</p>
    <p><strong>Telèfon de contacte:</strong> +34 600 123 456</p>

    <h2 class="mt-4">Objecte i Àmbit d'Aplicació</h2>
    <p>
      El present avís legal regula les condicions generals d'accés i ús del lloc web de Rent IT, 
      accessible a través de l'adreça <strong>https://rentit2025.vercel.app/home</strong>, que Rent IT posa a disposició 
      dels usuaris d'internet amb la finalitat de proporcionar informació sobre els seus serveis de lloguer 
      de dispositius electrònics i facilitar la seva contractació en línia.
    </p>

    <h2 class="mt-4">Propietat Intel·lectual i Industrial</h2>
    <p>
      Tots els continguts d'aquest lloc web (textos, imatges, dissenys gràfics, codi font, logotips, marques, etc.) 
      són titularitat exclusiva de Rent IT o de tercers que n'han autoritzat el seu ús, i estan protegits per la 
      normativa de propietat intel·lectual i industrial. L'ús no autoritzat d'aquests elements pot donar lloc a 
      responsabilitats legalment establertes.
    </p>

    <h2 class="mt-4">Protecció de Dades Personals</h2>
    <p>
      Rent IT es compromet a garantir la confidencialitat i protecció de les dades personals dels usuaris. 
      Les dades facilitades seran tractades segons el Reglament (UE) 2016/679 (RGPD) i la Llei Orgànica 3/2018, 
      de protecció de dades i garanties de drets digitals. Pots consultar tots els detalls a la nostra 
      <router-link to="/politica-privacitat">Política de Privacitat</router-link>.
    </p>

    <h2 class="mt-4">Exclusió de Responsabilitat</h2>
    <p>
      Rent IT no es fa responsable dels danys i perjudicis de qualsevol naturalesa que poguessin derivar-se de la 
      utilització del lloc web, incloent-hi errors o omissions en els continguts, falta de disponibilitat del lloc 
      o transmissió de virus o programes maliciosos, tot i haver adoptat totes les mesures tecnològiques necessàries 
      per evitar-ho.
    </p>

    <h2 class="mt-4">Llei Aplicable i Jurisdicció</h2>
    <p>
      Aquest avís legal es regeix íntegrament per la legislació espanyola. Qualsevol conflicte o controvèrsia derivada 
      de la interpretació o aplicació d'aquestes condicions serà sotmesa a la jurisdicció dels jutjats i tribunals 
      de la ciutat de Barcelona.
    </p>
  </div>
</template>

<script>
export default {
  name: "AvisLegal",
};
</script>

<style scoped>
.legal-notice {
  max-width: 800px;
  margin: auto;
  line-height: 1.7;
  font-size: 1rem;
  text-align: justify;
}
</style>
