import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CharacterList from './components/CharacterList.tsx';
import Filters from './components/Filters.tsx';
import LanguageSwitcher from './components/LanguageSwitcher.tsx';
import { CharacterFilter, SortOption } from './types/interfaces.ts';
import { useTranslation } from 'react-i18next';
import './index.css';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const { t } = useTranslation();
  const [filters, setFilter] = useState<CharacterFilter>({});
  const [sort, setSort] = useState<SortOption>({field: 'name', direction: 'asc'});
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">{t('title')}</h1>
          <Filters
            filters={filters}
            sort={sort}
            onFilterChange={setFilter}
            onSortChange={setSort}
          />
          <CharacterList filters={filters} sort={sort} />
        </div>
        <LanguageSwitcher />
      </div>
    </ApolloProvider>
  );
}

export default App
