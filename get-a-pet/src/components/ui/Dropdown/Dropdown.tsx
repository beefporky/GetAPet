import DropdownItem from './DropdownItem';
import DropdownSearch from './DropdownSearch';
import { useEffect, useRef, useState } from 'react'
import classes from './Dropdown.module.css'

export type DropdownOption = {
    label: string;
    value: string | number;
}

type DropdownProps = {
    options: DropdownOption[];
    name: string;
    selectLabel: string;
    onChange?: (option: string) => void;
    hasSearch?: boolean;
    value: string;
}

const Dropdown = ({ options, name, selectLabel, onChange, hasSearch = true, value }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<DropdownOption>({ label: selectLabel, value: '' });
    const duplicateOptions = JSON.parse(JSON.stringify(options));
    const [localOptions, setLocalOptions] = useState(duplicateOptions);
    const listRef = useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = useState('');
    const [itemSelected, setItemSelected] = useState<DropdownOption>({ label: selectLabel, value: '' });

    useEffect(() => {
        handleSubmitSearch();
        onChange && onChange(itemSelected.value as string);
        resetSearch();
    }, [selectedValue]);

    function handleOpen(event: React.MouseEvent<HTMLDivElement>) {
        const target = event.nativeEvent.target as HTMLElement;
        if (!target.className.includes('search') && !target.className.includes('item')) {
            setIsOpen(prevVal => !prevVal);
        }
    }

    function handleSelected(option: DropdownOption) {
        setItemSelected(option);
        if (!hasSearch) {
            setSelectedValue(option);
        }
    }

    function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
        // check if children and check if it is part of the ancestry
        if (!(event.target.closest(`.${listRef.current?.className}`) && event.currentTarget !== listRef.current) && !(event.relatedTarget && (event.currentTarget.contains(event.relatedTarget)))
        ) {
            setIsOpen(false);
        }
    }

    function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
        setLocalOptions(duplicateOptions.filter((option: DropdownOption) => option.label.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    function handleSubmitSearch(event?: React.MouseEvent<HTMLButtonElement>) {
        if (event) {
            event.preventDefault();
        }
        setIsOpen(false);
        if (hasSearch) {
            setSelectedValue(itemSelected);
            resetSearch();
        }
    }

    function resetSearch() {
        setLocalOptions(duplicateOptions);
        setSearchValue('');
    }

    // TODO: implement make the dropdown have a multi-select feature by passing a boolean value of "multi" to the props
    // TODO: show loading spinner when fetching data from an API which should block the whole screen
    // TODO: the breed dropdown should not be interactive when the type dropdown value is changed but only until it is finished loading the new breeds
    // TODO: add a de-select functionality to the DropdownItem component
    return (
        <div tabIndex={0} className={classes.dropdown} onClick={handleOpen} onBlur={handleBlur} ref={listRef}>
            <span className={classes.value}>{selectedValue.label}</span>
            <div className={classes.caret}></div>
            <input type="hidden" name={name} value={value} />
            <ul className={`${classes.dropdownValues} ${isOpen ? classes.show : null}`}>
                {hasSearch && <DropdownSearch handleFilter={handleFilter} handleSubmitSearch={handleSubmitSearch} value={searchValue} />}
                {localOptions.map((option: DropdownOption) => {
                    return <DropdownItem key={option.value} handleSelected={handleSelected} option={option} itemSelected={itemSelected} />
                })}
            </ul>
        </div>

    )
}

export default Dropdown