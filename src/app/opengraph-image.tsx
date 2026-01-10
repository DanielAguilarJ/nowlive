import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: '#ffffff',
          color: '#111827',
        }}
      >
        <div style={{ fontSize: 20, letterSpacing: 6, fontWeight: 700, color: '#6B7280' }}>NOWLIVE</div>
        <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 800, marginTop: 18 }}>
          Agencia de Marketing
          <br />
          Digital
        </div>
        <div style={{ fontSize: 28, lineHeight: 1.3, marginTop: 22, color: '#374151', maxWidth: 900 }}>
          Diseño que convierte. Estrategia basada en datos.
        </div>
        <div style={{ marginTop: 50, fontSize: 18, color: '#6B7280' }}>nowlive.agency</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
