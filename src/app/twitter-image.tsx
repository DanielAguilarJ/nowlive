import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = 'image/png';

export default function TwitterImage() {
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
        <div style={{ fontSize: 64, lineHeight: 1.05, fontWeight: 800, marginTop: 16 }}>
          Marketing digital
          <br />
          que rinde
        </div>
        <div style={{ marginTop: 46, fontSize: 18, color: '#6B7280' }}>nowlive.agency</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
