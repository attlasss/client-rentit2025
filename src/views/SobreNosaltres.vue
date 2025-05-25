<template>
  <div class="about-us p-5">
    <h1 class="mb-4">SOBRE NOSALTRES</h1>

    <p class="lead">
      A Rent IT, creiem en un futur on la tecnologia és accessible, responsable i compartida. Som una empresa jove però amb una visió clara: <strong>fer que llogar tecnologia sigui fàcil, sostenible i intel·ligent</strong>.
    </p>

    <h2 class="mt-5">Els Nostres Valors</h2>

    <div class="row g-4 mt-4">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="value-section h-100 p-3 shadow-sm rounded text-center">
          <h4 class="fw-bold mb-2">🌀 Accessibilitat per a tothom</h4>
          <p>
            Volem eliminar les barreres d’entrada a la tecnologia. Tant si ets estudiant com emprenedor, a Rent IT pots accedir a dispositius de qualitat sense necessitat de comprar-los. <strong>La tecnologia no hauria de ser un luxe, sinó una eina.</strong>
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="value-section h-100 p-3 shadow-sm rounded text-center">
          <h4 class="fw-bold mb-2">🌱 Sostenibilitat real</h4>
          <p>
            Allarguem la vida útil dels dispositius promovent el lloguer responsable. D’aquesta manera, contribuïm a la reducció de residus electrònics i fomentem un <strong>model circular més amable amb el planeta</strong>.
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="value-section h-100 p-3 shadow-sm rounded text-center">
          <h4 class="fw-bold mb-2">🤝 Comunitat i confiança</h4>
          <p>
            Cada article a la nostra plataforma ve amb una història i una persona al darrere. Apostem per una <strong>comunitat segura</strong>, amb valoracions reals i comunicació clara, on el respecte és fonamental.
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="value-section h-100 p-3 shadow-sm rounded text-center">
          <h4 class="fw-bold mb-2">🚀 Innovació amb sentit</h4>
          <p>
            No volem només seguir la tecnologia, sinó donar-li un propòsit. Millorem constantment la nostra plataforma perquè l’experiència sigui <strong>fluïda, útil i humana</strong>.
          </p>
        </div>
      </div>
    </div>

    <h2 class="mt-5">Una nova manera de connectar amb la tecnologia</h2>
    <p>
      Rent IT és molt més que una empresa de lloguer. És un moviment cap a un consum més conscient, una alternativa intel·ligent per a un món que canvia ràpid. 
    </p>

    <p class="fw-semibold mt-4">
      Uneix-te a nosaltres i forma part del canvi 💙
    </p>
  </div>
</template>

<script>
export default {
  name: "SobreNosaltres",
};
</script>

<style scoped>
.about-us {
  max-width: 1100px;
  margin: auto;
  font-size: 1.05rem;
  line-height: 1.8;
  color: #333;
}
.value-section h4 {
  color: #21339A;
}
.lead {
  font-size: 1.2rem;
}
@media (max-width: 991px) {
  .value-section {
    margin-bottom: 1.5rem;
  }
}
</style>
