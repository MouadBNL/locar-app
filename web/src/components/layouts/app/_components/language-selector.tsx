import { CheckIcon, LanguagesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const languages = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'fr',
    name: 'French',
  },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const currentLanguage = languages.find(language => language.code === i18n.language);

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <LanguagesIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {languages.map(language => (
            <DropdownMenuItem key={language.code} onClick={() => handleLanguageChange(language.code)}>
              <span>{language.name}</span>
              {currentLanguage?.code === language.code && <CheckIcon className="w-4 h-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
