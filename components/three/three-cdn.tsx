import Script from 'next/script';

export function ThreeCdn() {
  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"
      strategy="afterInteractive"
    />
  );
}

