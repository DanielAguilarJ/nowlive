import { Metadata } from 'next';
import DigitalStrategyClient from './DigitalStrategyClient';

export const metadata: Metadata = {
  title: 'Estrategia Digital | NOWLIVE',
  description: 'Estrategia sin datos es solo adivinanzas. Desarrollamos estrategias digitales basadas en datos que conectan con tu audiencia y generan resultados medibles.',
  keywords: ['estrategia digital', 'marketing digital', 'plan de marketing', 'consultoría digital', 'transformación digital'],
  openGraph: {
    title: 'Estrategia Digital | NOWLIVE',
    description: 'Estrategias digitales basadas en datos que generan resultados medibles.',
    type: 'website',
  },
};

export default function DigitalStrategyPage() {
  return <DigitalStrategyClient />;
}
