import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 rounded-full px-2 sm:px-3 hover:bg-muted"
    >
      <Languages className="h-5 w-5 sm:h-4 sm:w-4 text-blue-500" />
      <span className="font-semibold text-sm hidden sm:inline-block">
        {language === 'en' ? 'हिन्दी' : 'English'}
      </span>
    </Button>
  );
}
