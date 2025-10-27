"use client";

import dynamic from 'next/dynamic';
import { useI18n } from "@/components/lang/i18n-provider";
import { useEffect } from 'react';

// Dynamic imports to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then(mod => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then(mod => mod.Popup),
  { ssr: false }
);

export function ContactMap() {
  const { t } = useI18n();
  
  // Coordinates for 1 Av. Marcel Ramolfo Garnier, Massy, 91300, France
  const position: [number, number] = [48.7311, 2.2678];

  useEffect(() => {
    // Fix Leaflet marker icons issue
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    }
  }, []);

  return (
    <div className="pt-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-full h-80 sm:h-96 lg:h-[496px] rounded-lg overflow-hidden shadow-lg">
            <MapContainer
              center={position}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
              zoomControl={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-brand-primary)' }}>
                      EPIDOM
                    </h3>
                    <p className="text-sm text-gray-600 mb-1">
                      {t("contact.info.address.line1")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {t("contact.info.address.line2")}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
