import { CharacterFilter, SortOption } from "../types/interfaces";
import { useTranslation } from "react-i18next";

interface FiltersProps {
    filters: CharacterFilter;
    sort: SortOption;
    onFilterChange: (filters: CharacterFilter) => void;
    onSortChange: (sort: SortOption) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, sort, onFilterChange, onSortChange }) => {
    const { t } = useTranslation();

     return (
        <div className="flex flex-wrap gap-1 mb-6">
            <select
              className="p-2 border rounded"
              value={filters.status || ''}
              onChange={(e) => onFilterChange({ ...filters, status: e.target.value || undefined })}
              >
                <option value="">{t('filters.allStatus')}</option>
                <option value="alive">{t('status.alive')}</option>
                <option value="dead">{t('status.dead')}</option>
                <option value="unknown">{t('status.unknown')}</option>
            </select>
            <select
              className="p-2 border rounded"
              value={filters.species || ''}
              onChange={(e) => onFilterChange({ ...filters, species: e.target.value || undefined })}
            >
                <option value="">{t('filters.allSpecies')}</option>
                <option value="Human">{t('species.human')}</option>
                <option value="Alien">{t('species.alien')}</option>
            </select>
            <select
              className="p-2 border rounded"
              value={`${sort.field}-${sort.direction}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split('-');
                onSortChange({ field: field as 'name' | 'origin.name', direction: direction as 'asc' | 'desc' });
              }}
            >
                <option value="name-asc">{t('sort.nameAsc')}</option>
                <option value="name-desc">{t('sort.nameDesc')}</option>
                <option value="origin.name-asc">{t('sort.originAsc')}</option>
                <option value="origin.name-desc">{t('sort.originDesc')}</option>
            </select>
        </div>
     )
};

export default Filters;