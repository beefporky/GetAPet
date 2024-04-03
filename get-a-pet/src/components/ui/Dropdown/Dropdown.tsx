import { useRef, useState } from 'react'
import classes from './Dropdown.module.css'
import Input from '../Input/Input'
import Button from '../Button';

type Option = {
    label: string;
    value: string | number;
}

type DropdownProps = {
    options: Option[];
    name: string;
    selectLabel: string;
    onChange?: (option: string) => void;
}

const Dropdown = ({ options, name, selectLabel, onChange }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<Option>({ label: selectLabel, value: '' });
    const duplicateOptions = JSON.parse(JSON.stringify(options));
    const [localOptions, setLocalOptions] = useState(duplicateOptions);
    const listRef = useRef<HTMLDivElement>(null);
    const hiddenRef = useRef<HTMLInputElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    function handleOpen(event: React.MouseEvent<HTMLDivElement>) {
        const target = event.nativeEvent.target as HTMLElement;
        if (!target.className.includes('search') && !target.className.includes('item')) {
            setIsOpen(prevVal => !prevVal);
        }
    }

    function handleSelected(option: Option) {
        setSelectedValue(option);
    }

    function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
        // check if children and check if it is part of the ancestry
        if (!(event.target.closest(`.${listRef.current?.className}`) && event.currentTarget !== listRef.current) && !(event.relatedTarget && (event.currentTarget.contains(event.relatedTarget)))
        ) {
            setIsOpen(false);
        }
    }

    function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setLocalOptions(duplicateOptions.filter((option: Option) => option.label.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    function handleSubmitSearch(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setIsOpen(false);
        hiddenRef.current!.value = selectedValue.value as string;
        onChange && onChange(selectedValue.value as string);
        resetSearch();
    }

    function resetSearch() {
        setLocalOptions(duplicateOptions);
        searchRef.current!.value = '';
    }

    return (
        <div tabIndex={0} className={classes.dropdown} onClick={handleOpen} onBlur={handleBlur} ref={listRef}>
            <span className={classes.value}>{selectedValue.label}</span>
            <div className={classes.caret}></div>
            <ul className={`${classes.dropdownValues} ${isOpen ? classes.show : null}`}>
                <div className={classes.searchContainer}>
                    <Input type="search" className={classes.searchField} placeholder="Search" inputLabel={false} onChange={handleSearch} ref={searchRef} />
                    <Button type='button' className={classes.searchButton} textOnly={false} onClick={handleSubmitSearch}>Done</Button>
                    <input type="hidden" name={name} ref={hiddenRef} />
                </div>
                {localOptions.map((option: Option) => <li key={option.value} className={classes.item} onClick={() => handleSelected(option)}>{option.label}</li>)}
            </ul>
        </div>

    )
}

export default Dropdown