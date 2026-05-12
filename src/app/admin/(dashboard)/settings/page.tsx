'use client';

import { useState } from 'react';

interface SettingsData {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  phone: string;
  address: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  seo: {
    defaultTitle: string;
    titleSuffix: string;
    defaultDescription: string;
  };
  analytics: {
    googleAnalyticsId: string;
    googleTagManagerId: string;
  };
  notifications: {
    emailNewContact: boolean;
    emailNewTestimonial: boolean;
    emailWeeklyReport: boolean;
  };
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'integrations' | 'notifications'>('general');
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState<SettingsData>({
    siteName: 'CreamosTech',
    siteDescription: 'Agencia de Marketing Digital Full-Service',
    contactEmail: 'hola@creamostech.com',
    phone: '+34 912 345 678',
    address: 'Calle Gran Vía 123, Madrid, España',
    socialLinks: {
      facebook: 'https://facebook.com/creamostech',
      instagram: 'https://instagram.com/creamostech',
      twitter: 'https://twitter.com/creamostech',
      linkedin: 'https://linkedin.com/company/creamostech',
    },
    seo: {
      defaultTitle: 'CreamosTech - Agencia de Marketing Digital',
      titleSuffix: ' | CreamosTech',
      defaultDescription: 'Agencia de marketing digital full-service especializada en diseño web, estrategia digital, automatización y SEO.',
    },
    analytics: {
      googleAnalyticsId: 'G-XXXXXXXXXX',
      googleTagManagerId: 'GTM-XXXXXXX',
    },
    notifications: {
      emailNewContact: true,
      emailNewTestimonial: true,
      emailWeeklyReport: false,
    },
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // In production, save to database/API
    setIsSaving(false);
    alert('Configuración guardada correctamente');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'integrations', label: 'Integraciones', icon: '🔗' },
    { id: 'notifications', label: 'Notificaciones', icon: '🔔' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Configuración</h1>
          <p className="text-primary-400 mt-1">Gestiona la configuración general del sitio</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-semibold rounded-lg shadow-lg shadow-accent-500/25 transition-all disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Guardando...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Guardar cambios
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-primary-800/50 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-accent-500 text-white'
                : 'text-primary-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="bg-primary-800/50 backdrop-blur-sm rounded-xl border border-white/5 p-6">
        {activeTab === 'general' && (
          <GeneralSettings settings={settings} setSettings={setSettings} />
        )}
        {activeTab === 'seo' && (
          <SEOSettings settings={settings} setSettings={setSettings} />
        )}
        {activeTab === 'integrations' && (
          <IntegrationsSettings settings={settings} setSettings={setSettings} />
        )}
        {activeTab === 'notifications' && (
          <NotificationsSettings settings={settings} setSettings={setSettings} />
        )}
      </div>
    </div>
  );
}

function GeneralSettings({
  settings,
  setSettings,
}: {
  settings: SettingsData;
  setSettings: React.Dispatch<React.SetStateAction<SettingsData>>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Información básica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Nombre del sitio
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Email de contacto
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Dirección
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-primary-300 mb-2">
            Descripción del sitio
          </label>
          <textarea
            value={settings.siteDescription}
            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Redes sociales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(settings.socialLinks).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-primary-300 mb-2 capitalize">
                {key}
              </label>
              <input
                type="url"
                value={value}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, [key]: e.target.value },
                  })
                }
                className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SEOSettings({
  settings,
  setSettings,
}: {
  settings: SettingsData;
  setSettings: React.Dispatch<React.SetStateAction<SettingsData>>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Configuración SEO</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Título por defecto
            </label>
            <input
              type="text"
              value={settings.seo.defaultTitle}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, defaultTitle: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <p className="mt-1 text-xs text-primary-500">
              Caracteres: {settings.seo.defaultTitle.length}/60 recomendados
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Sufijo del título
            </label>
            <input
              type="text"
              value={settings.seo.titleSuffix}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, titleSuffix: e.target.value },
                })
              }
              className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
            <p className="mt-1 text-xs text-primary-500">
              Se añadirá al final del título de cada página
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Meta descripción por defecto
            </label>
            <textarea
              value={settings.seo.defaultDescription}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  seo: { ...settings.seo, defaultDescription: e.target.value },
                })
              }
              rows={3}
              className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
            />
            <p className="mt-1 text-xs text-primary-500">
              Caracteres: {settings.seo.defaultDescription.length}/160 recomendados
            </p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Vista previa en Google</h3>
        <div className="p-4 bg-white rounded-lg">
          <p className="text-blue-600 text-lg hover:underline cursor-pointer">
            {settings.seo.defaultTitle}
          </p>
          <p className="text-green-700 text-sm">https://creamostech.com</p>
          <p className="text-gray-600 text-sm mt-1">
            {settings.seo.defaultDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

function IntegrationsSettings({
  settings,
  setSettings,
}: {
  settings: SettingsData;
  setSettings: React.Dispatch<React.SetStateAction<SettingsData>>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Google Analytics</h3>
        <div className="p-4 bg-white/5 rounded-lg space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.84 2.9v18.2c0 .5-.4.9-.9.9h-5.1c-.5 0-.9-.4-.9-.9V2.9c0-.5.4-.9.9-.9h5.1c.5 0 .9.4.9.9zM15.04 21.1V8.8c0-.5-.4-.9-.9-.9h-5.1c-.5 0-.9.4-.9.9v12.3c0 .5.4.9.9.9h5.1c.5 0 .9-.4.9-.9zM7.24 21.1v-6.2c0-.5-.4-.9-.9-.9H1.24c-.5 0-.9.4-.9.9v6.2c0 .5.4.9.9.9h5.1c.5 0 .9-.4.9-.9z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white">Google Analytics 4</h4>
              <p className="text-sm text-primary-400 mt-1">
                Conecta tu cuenta de GA4 para rastrear el tráfico del sitio
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Measurement ID
            </label>
            <input
              type="text"
              value={settings.analytics.googleAnalyticsId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  analytics: { ...settings.analytics, googleAnalyticsId: e.target.value },
                })
              }
              placeholder="G-XXXXXXXXXX"
              className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Google Tag Manager</h3>
        <div className="p-4 bg-white/5 rounded-lg space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-white">Google Tag Manager</h4>
              <p className="text-sm text-primary-400 mt-1">
                Gestiona tus tags y pixels desde GTM
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-300 mb-2">
              Container ID
            </label>
            <input
              type="text"
              value={settings.analytics.googleTagManagerId}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  analytics: { ...settings.analytics, googleTagManagerId: e.target.value },
                })
              }
              placeholder="GTM-XXXXXXX"
              className="w-full px-4 py-2 bg-primary-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationsSettings({
  settings,
  setSettings,
}: {
  settings: SettingsData;
  setSettings: React.Dispatch<React.SetStateAction<SettingsData>>;
}) {
  const toggleNotification = (key: keyof SettingsData['notifications']) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    });
  };

  const notificationOptions = [
    {
      key: 'emailNewContact' as const,
      title: 'Nuevos mensajes de contacto',
      description: 'Recibe un email cuando alguien envíe un formulario de contacto',
    },
    {
      key: 'emailNewTestimonial' as const,
      title: 'Nuevos testimonios',
      description: 'Recibe un email cuando se envíe un nuevo testimonio',
    },
    {
      key: 'emailWeeklyReport' as const,
      title: 'Reporte semanal',
      description: 'Recibe un resumen semanal de las métricas del sitio',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Notificaciones por email</h3>
        <div className="space-y-4">
          {notificationOptions.map((option) => (
            <div
              key={option.key}
              className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-white">{option.title}</h4>
                <p className="text-sm text-primary-400 mt-1">{option.description}</p>
              </div>
              <button
                onClick={() => toggleNotification(option.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.notifications[option.key] ? 'bg-accent-500' : 'bg-primary-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.notifications[option.key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
