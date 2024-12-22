import { Character } from '../types/interfaces';
import { useTranslation } from 'react-i18next';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'alive':
        return 'bg-green-500';
      case 'dead':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2">{character.name}</h2>
      <div className="space-y-2">
        <div className="flex items-center">
          <span className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(character.status)}`} />
          <p>{t(`status.${character.status.toLowerCase()}`)}</p>
        </div>
        <p>
            <span className="font-semibold">Species: </span> 
            {t(`species.${character.species.toLowerCase()}`)}
        </p>
        <p>
            <span className="font-semibold">Gender: </span> 
            {t(`gender.${character.gender.toLowerCase()}`)}
        </p>
        <p>
            <span className="font-semibold">Origin: </span> 
            {character.origin.name}
        </p>
      </div>
    </div>
  );
};

export default CharacterCard;