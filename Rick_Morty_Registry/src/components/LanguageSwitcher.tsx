import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    return (
        <div className="fixed bottom-0 w-full bg-white border-t p-4">
            <div className="container mx-auto flex justify-center space-x-4">
                <button
                  className={`px-4 py-2 rounded ${i18n.language === 'en' ? 'bg-blue-500 text-white': 'bg-gray-200'}`}
                  onClick={() => i18n.changeLanguage('en')}
                >
                    English
                </button>
                <button
                  className={`px-4 py-2 rounded ${i18n.language === 'de' ? 'bg-blue-500 text-white' : 'bg-gray-200'}}`}
                  onClick={() => i18n.changeLanguage('de')}
                >
                    Deutsch
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;