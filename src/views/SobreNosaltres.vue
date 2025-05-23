<template>
  <section class="sobre-nosotros">
    <div class="hero">
      <h1>Sobre Rent IT</h1>
      <p class="subtitulo">Revolucionando la forma de alquilar tecnología</p>
    </div>

    <div class="contenido container">
      <div class="mision">
        <h2>Nuestra misión</h2>
        <p>
          En Rent IT, creemos que la tecnología debe estar al alcance de todos,
          sin complicaciones ni altos costos. Nuestra misión es facilitar el acceso a dispositivos electrónicos
          mediante un sistema de alquiler ágil, confiable y sostenible.
        </p>
      </div>

      <div class="valores">
        <h2>Valores que nos guían</h2>
        <ul>
          <li><strong>Sostenibilidad:</strong> Promovemos el consumo responsable y la reutilización.</li>
          <li><strong>Innovación:</strong> Buscamos siempre soluciones tecnológicas simples y efectivas.</li>
          <li><strong>Confianza:</strong> Garantizamos seguridad y transparencia en cada alquiler.</li>
          <li><strong>Comunidad:</strong> Trabajamos para crear una red de usuarios satisfechos y conectados.</li>
        </ul>
      </div>

      <div class="equipo">
        <h2>Conoce al equipo</h2>
        <div class="team-cards">
          <div class="card" v-for="member in team" :key="member.name">
            <img :src="member.photo" :alt="`Foto de ${member.name}`" />
            <h3>{{ member.name }}</h3>
            <p class="role">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SobreNosotros",
  data() {
    return {
      team: [
        {
          name: "Laura Martínez",
          role: "CEO & Fundadora",
          photo: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Carlos Pérez",
          role: "CTO",
          photo: "https://randomuser.me/api/portraits/men/34.jpg",
        },
        {
          name: "Sara Gómez",
          role: "Diseñadora UX/UI",
          photo: "https://randomuser.me/api/portraits/women/68.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
.sobre-nosotros {
  font-family: "Poppins", sans-serif;
  color: #333;
  padding: 3rem 1rem;
  background: #fafafa;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
  color: #0f4c81;
}

.hero h1 {
  font-weight: 700;
  font-size: 2.5rem;
  letter-spacing: 1.5px;
  margin-bottom: 0.3rem;
}

.subtitulo {
  font-weight: 400;
  font-size: 1.25rem;
  color: #4a6fa5;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h2 {
  font-weight: 600;
  margin-bottom: 1rem;
  color: #145374;
}

.mision p,
.valores ul,
.equipo {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
}

.valores ul {
  list-style: none;
  padding-left: 0;
}

.valores li {
  margin-bottom: 0.8rem;
}

.valores strong {
  color: #0f4c81;
}

.team-cards {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1.5rem;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(15, 76, 129, 0.15);
  width: 180px;
  text-align: center;
  padding: 1.5rem 1rem;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
}

.card img {
  border-radius: 50%;
  width: 90px;
  height: 90px;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid #0f4c81;
}

.card h3 {
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: #0f4c81;
}

.role {
  font-size: 0.9rem;
  color: #777;
  font-style: italic;
}
</style>
