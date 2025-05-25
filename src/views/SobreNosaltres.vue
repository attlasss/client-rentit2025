<template>
  <div class="about-us p-5">
    <h1 class="mb-4">SOBRE NOSALTRES</h1>

    <p class="lead">
      A Rent IT, creiem en un futur on la tecnologia és accessible, responsable i compartida. Som una empresa jove però amb una visió clara: <strong>fer que llogar tecnologia sigui fàcil, sostenible i intel·ligent</strong>.
    </p>

    <h2 class="mt-5">Els Nostres Valors</h2>

    <div class="row g-4 mt-4 bg-main-blue">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="value-section h-100 p-3 shadow-sm rounded text-center">
          <img src="https://i.pinimg.com/736x/d5/63/f7/d563f731a494e2b5d7dc1d238988ad5e.jpg" alt="Accessibilitat" class="valor-icon mb-2" />
          <h4 class="fw-bold mb-2">Accessibilitat per a tothom</h4>
          <p>
            Volem eliminar les barreres d’entrada a la tecnologia. Tant si ets estudiant com emprenedor, a Rent IT pots accedir a dispositius de qualitat sense necessitat de comprar-los. <strong>La tecnologia no hauria de ser un luxe, sinó una eina.</strong>
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="value-section h-100 p-3 shadow-sm rounded text-center">
          <img src="https://i.pinimg.com/736x/88/a5/6b/88a56bc257271714a28c7824669e7620.jpg" alt="Sostenibilitat" class="valor-icon mb-2" />
          <h4 class="fw-bold mb-2"> Sostenibilitat real</h4>
          <p>
            Allarguem la vida útil dels dispositius promovent el lloguer responsable. D’aquesta manera, contribuïm a la reducció de residus electrònics i fomentem un <strong>model circular més amable amb el planeta</strong>.
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="value-section h-100 p-3 shadow-sm rounded text-center">
          <img src="https://i.pinimg.com/736x/5d/c9/44/5dc944bcfbe73dec11d06de0c4040308.jpg" alt="Comunitat" class="valor-icon mb-2" />
          <h4 class="fw-bold mb-2"> Comunitat i confiança</h4>
          <p>
            Cada article a la nostra plataforma ve amb una història i una persona al darrere. Apostem per una <strong>comunitat segura</strong>, amb valoracions reals i comunicació clara, on el respecte és fonamental.
          </p>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="value-section h-100 p-3 shadow-sm rounded text-center">
          <img src="https://i.pinimg.com/736x/e4/02/b3/e402b3846e6848a5f7ae7324bef12803.jpg" alt="Innovació" class="valor-icon mb-2" />
          <h4 class="fw-bold mb-2">Innovació amb sentit</h4>
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

    <!-- Imagen añadida al final -->
    <div class="text-center mt-5">
      <img 
        src="https://i.pinimg.com/736x/e4/47/d3/e447d32bdc2b9a9cb2ff4f2e5bf7823e.jpg" 
        alt="Equip Rent IT" 
        class="img-final-equipo img-fluid rounded shadow"
      />
    </div>
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
.valor-icon {
  width: 55px;
  height: 55px;
  object-fit: contain;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.lead {
  font-size: 1.2rem;
}
.img-final-equipo {
  max-width: 400px;
  width: 100%;
  height: auto;
  display: inline-block;
}
@media (max-width: 576px) {
  .img-final-equipo {
    max-width: 90vw;
  }
}
@media (max-width: 991px) {
  .value-section {
    margin-bottom: 1.5rem;
  }
  .valor-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
