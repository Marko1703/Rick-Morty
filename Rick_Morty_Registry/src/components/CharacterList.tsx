import { useQuery } from '@apollo/client';
import { useInView } from 'react-intersection-observer';
import { GET_CHARACTERS } from '../graphql/queries';
import { Character, CharacterFilter, SortOption } from '../types/interfaces';
import CharacterCard from './CharacterCard';
import LoadingSpinner from './LoadingSpinner';
import { useEffect, useState } from 'react';

interface CharacterListProps {
  filters: CharacterFilter;
  sort: SortOption;
}

const CharacterList: React.FC<CharacterListProps> = ({ filters, sort }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  const { loading, error, data, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page: 1, filter: filters },
  });

  useEffect(() => {
    if (data) {
      setCharacters(data.characters.results);
    }
  }, [data]);

  useEffect(() => {
    if (inView && !loading && data?.characters.info.next) {
      fetchMore({
        variables: { page: page + 1 },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          setPage(page + 1);
          return {
            characters: {
              ...fetchMoreResult.characters,
              results: [...prev.characters.results, ...fetchMoreResult.characters.results],
            },
          };
        },
      });
    }
  }, [inView, loading, data, fetchMore, page]);

  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  const sortedCharacters = [...characters].sort((a, b) => {
    const getValue = (char: Character, field: string) => 
      field === 'origin.name' ? char.origin.name : char[field as keyof Character];
    
    const aValue = getValue(a, sort.field);
    const bValue = getValue(b, sort.field);
    
    return sort.direction === 'asc'
      ? (typeof aValue === 'string' && typeof bValue === 'string' 
          ? aValue.localeCompare(bValue)
          : String(aValue).localeCompare(String(bValue)))
      : (typeof aValue === 'string' && typeof bValue === 'string'
          ? bValue.localeCompare(aValue) 
          : String(bValue).localeCompare(String(aValue)));
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <div ref={ref} className="mt-4">
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default CharacterList;