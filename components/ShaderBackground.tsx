'use client';

import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

export default function ShaderBackground() {
  return (
    <ShaderGradientCanvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      pixelDensity={1}
    >
      <ShaderGradient
        animate="off"
        type="plane"
        wireframe={false}
        shader="defaults"
        uTime={5}
        uSpeed={0.2}
        uStrength={1.2}
        uDensity={1}
        uFrequency={0}
        uAmplitude={0}
        positionX={0}
        positionY={0}
        positionZ={0}
        rotationX={45}
        rotationY={0}
        rotationZ={0}
        color1="#df9684"
        color2="#feb47b"
        color3="#ecb88d"
        reflection={0.2}
        cAzimuthAngle={180}
        cPolarAngle={75}
        cDistance={3}
        cameraZoom={8}
        lightType="3d"
        brightness={1.2}
        envPreset="dawn"
        grain="on"
        toggleAxis={false}
        zoomOut={false}
        hoverState=""
        enableTransition={false}
      />
    </ShaderGradientCanvas>
  );
}
