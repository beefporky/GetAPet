import classes from './DropdownSearch.module.css';
import Button from '../Button/Button'
import Input from '../Input/Input';

type InputChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => void;
type DropdownSearchProps = {
    handleFilter: InputChangeEvent
    handleSubmitSearch: (event: React.MouseEvent<HTMLButtonElement>) => void;
    value: string;
}

const DropdownSearch = ({
    handleFilter,
    handleSubmitSearch,
    value
}: DropdownSearchProps) => {
    return <div className={classes.searchContainer}>
        <Input type="search" className={classes.searchField} placeholder="Search" inputLabel={false} onChange={handleFilter} value={value} />
        <Button type='button' className={classes.searchButton} textOnly={false} onClick={handleSubmitSearch}>Done</Button>
    </div>;
}
export default DropdownSearch