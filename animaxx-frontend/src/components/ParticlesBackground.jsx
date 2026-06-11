import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParticlesBackground() {

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#0f0c29",
          },
        },
        particles: {
          number: {
            value: 60,
          },
          color: {
            value: "#8b5cf6",
          },
          links: {
            enable: true,
            color: "#8b5cf6",
          },
          move: {
            enable: true,
            speed: 2,
          },
        },
      }}
      className="absolute inset-0"
    />
  );
}

export default ParticlesBackground;