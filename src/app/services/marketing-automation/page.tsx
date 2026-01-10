import { Metadata } from 'next';
import MarketingAutomationClient from './MarketingAutomationClient';

export const metadata: Metadata = {
  title: 'Marketing Automation | NOWLIVE',
  description: 'Tus competidores duermen, pero su marketing no. Implementamos sistemas de automatización que trabajan 24/7 para nutrir leads y cerrar ventas.',
  keywords: ['marketing automation', 'automatización', 'email marketing', 'CRM', 'nurturing', 'workflows', 'HubSpot', 'ActiveCampaign'],
  openGraph: {
    title: 'Marketing Automation | NOWLIVE',
    description: 'Sistemas de automatización que trabajan 24/7 para tu negocio.',
    type: 'website',
  },
};

export default function MarketingAutomationPage() {
  return <MarketingAutomationClient />;
}
