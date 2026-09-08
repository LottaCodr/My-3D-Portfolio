import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { usePrefersReducedMotion, useIsTouch } from "../../hooks/useMediaQuery";

/* Particle count scales down on touch devices — 5,000 points is a needless
   battery drain on a phone that will scroll past it in a second. */
const count = (isTouch) => (isTouch ? 1400 : 3200);

function Stars(props) {
  const ref = useRef();
  const isTouch = useIsTouch();
  const reduce = usePrefersReducedMotion();

  const positions = useMemo(
    () => random.inSphere(new Float32Array(count(isTouch) * 3), { radius: 1.25 }),
    [isTouch],
  );

  useFrame((_state, delta) => {
    if (reduce || !ref.current) return;
    ref.current.rotation.x -= delta / 22;
    ref.current.rotation.y -= delta / 30;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#cfa96e"
          size={0.0022}
          sizeAttenuation
          depthWrite={false}
          opacity={0.75}
        />
      </Points>
    </group>
  );
}

/** Ambient starfield. Decorative only — never blocks interaction. */
export default function StarsCanvas() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
