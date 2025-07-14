import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: "#3b82f6" },
          opacity: { value: 0.1 },
          size: { value: 3, random: true },
          move: { enable: true, speed: 0.5 },
          links: { enable: false },
        },
        interactivity: {
          events: {
            onHover: { enable: false },
            onClick: { enable: false },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
