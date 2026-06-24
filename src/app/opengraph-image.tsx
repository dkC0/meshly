import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Meshly -- Web Design & Development Studio, Warsaw';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
          background: '#0D0B08',
          backgroundImage:
            'radial-gradient(circle at 80% 22%, rgba(201,115,61,0.20), transparent 55%), ' +
            'radial-gradient(circle at 8% 88%, rgba(201,115,61,0.08), transparent 50%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C9733D', display: 'flex' }} />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#9C9488',
            }}
          >
            Meshly
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 44,
            fontSize: 58,
            lineHeight: 1.32,
            letterSpacing: -1,
            color: '#F4F1EC',
          }}
        >
          <span>Most are losing you</span>
          <span>
            customers, <span style={{ color: '#C9733D' }}>quietly.</span>
          </span>
        </div>

        <span
          style={{
            display: 'flex',
            marginTop: 56,
            fontSize: 21,
            letterSpacing: 2,
            color: '#9C9488',
          }}
        >
          Web design &amp; development studio -- Warsaw, Poland
        </span>
      </div>
    ),
    size
  );
}
