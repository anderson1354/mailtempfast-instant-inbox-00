
import React from 'react';
import { Card } from '@/components/ui/card';

interface AdBannerProps {
  type: 'horizontal' | 'rectangle' | 'square';
  position: 'top' | 'bottom' | 'sidebar';
}

const AdBanner: React.FC<AdBannerProps> = ({ type, position }) => {
  const getAdDimensions = () => {
    switch (type) {
      case 'horizontal':
        return 'h-24 md:h-32';
      case 'rectangle':
        return 'h-64';
      case 'square':
        return 'h-48 w-48 mx-auto';
      default:
        return 'h-24';
    }
  };

  const getAdContent = () => {
    switch (position) {
      case 'top':
        return 'Banner Superior • Google AdSense';
      case 'bottom':
        return 'Banner Inferior • Google AdSense';
      case 'sidebar':
        return 'Sidebar Ad • Google AdSense';
      default:
        return 'Google AdSense';
    }
  };

  return (
    <div className={`mb-6 ${position === 'top' ? 'mb-0' : ''}`}>
      <Card className={`${getAdDimensions()} border-dashed border-gray-300 bg-gray-50 flex items-center justify-center`}>
        <div className="text-center">
          <div className="text-sm text-gray-500 font-medium mb-1">
            📱 Espaço Publicitário
          </div>
          <div className="text-xs text-gray-400">
            {getAdContent()}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            728x90 • Responsivo
          </div>
        </div>
      </Card>
      
      {/* Placeholder for actual Google AdSense code */}
      <div className="hidden">
        {/* 
        Replace this comment with actual Google AdSense code when ready:
        
        <ins className="adsbygoogle"
             style={{display: 'block'}}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
        */}
      </div>
    </div>
  );
};

export default AdBanner;
