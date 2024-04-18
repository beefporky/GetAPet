import DropdownItem from './DropdownItem';
import DropdownSearch from './DropdownSearch';
import { ReactNode, useRef, useState } from 'react'
import classes from './Dropdown.module.css'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import useCustomEffect from '../../../hooks/useCustomEffect';

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
    multi?: boolean;
    disabled?: boolean;
    closeOnSelect?: boolean;
    icon?: ReactNode;
}

const Dropdown = ({ options, name, selectLabel, onChange, hasSearch = false, value, multi = false, disabled = false, closeOnSelect, icon }: DropdownProps) => {
    const DEFAULT_DROPDOWN_OPTION: DropdownOption[] = [{ label: selectLabel, value: '' }];
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<DropdownOption[]>(DEFAULT_DROPDOWN_OPTION);
    const duplicateOptions = JSON.parse(JSON.stringify(options));
    const [localOptions, setLocalOptions] = useState(duplicateOptions);
    const listRef = useRef<HTMLDivElement>(null);
    const [searchValue, setSearchValue] = useState('');
    const [itemsSelected, setItemsSelected] = useState<DropdownOption[]>([{ label: selectLabel, value: '' }]);

    useCustomEffect(() => {
        handleSubmitSearch();
        const values = itemsSelected.map((item) => item.value)
        onChange && onChange(values.join(','));
        resetSearch();
    }, [JSON.stringify(selectedValue)]);

    function handleOpen(event: React.MouseEvent<HTMLDivElement>) {
        const target = event.nativeEvent.target as HTMLElement;
        if (!target.className.includes('search') && !target.className.includes('item')) {
            setIsOpen(prevVal => !prevVal);
        }
    }

    function handleSelected(option: DropdownOption) {
        setItemsSelected(prevSelections => {
            if (multi) {
                return multiSelected(option, prevSelections);
            } else {
                return [option];
            }
        });
        if (!hasSearch) {
            setSelectedValue(prevSelections => {
                if (multi) {
                    return multiSelected(option, prevSelections);
                } else {
                    return [option];
                }
            });
        }
    }

    function multiSelected(option: DropdownOption, prevSelections: DropdownOption[]) {
        const existingSelection = findSelected(option);
        if (existingSelection.length > 0) {
            const result = prevSelections.filter((item: DropdownOption) => item.value !== option.value && item.value !== '')
            return result.length === 0 ? DEFAULT_DROPDOWN_OPTION : result
            // return existingSelection.length > 0 ? prevSelections.filter((item: DropdownOption) => item.value !== option.value && item.value !== '') : [...prevSelections, option];
        } else {
            const nonEmptySelections = prevSelections.filter((item: DropdownOption) => item.value !== '')
            return [...nonEmptySelections, option]
        }
    }

    function findSelected(option: DropdownOption) {
        return itemsSelected.filter((item) => item.value === option.value);
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
        if (hasSearch) {
            setIsOpen(false);
            setSelectedValue(itemsSelected);
            resetSearch();
        }
        if (closeOnSelect) {
            setIsOpen(false);
        }
    }

    function resetSearch() {
        setLocalOptions(duplicateOptions);
        setSearchValue('');
    }

    function spreadValues() {
        return selectedValue.map((item) => item.label).join(',');
    }

    return (
        <div tabIndex={0} className={disabled ? `${classes.dropdown} ${classes.disabled}` : classes.dropdown} onClick={handleOpen} onBlur={handleBlur} ref={listRef}>
            <span className={classes.value}>{spreadValues()}</span>
            {icon || (isOpen ? <FaCaretUp /> : <FaCaretDown />)}
            <input type="hidden" name={name} value={value} />
            <ul className={`${classes.dropdownValues} ${isOpen ? classes.show : null}`}>
                {hasSearch && <DropdownSearch handleFilter={handleFilter} handleSubmitSearch={handleSubmitSearch} value={searchValue} />}
                {localOptions.map((option: DropdownOption) => {
                    const itemSelected = findSelected(option) || DEFAULT_DROPDOWN_OPTION;
                    return <DropdownItem key={option.value} handleSelected={handleSelected} option={option} itemSelected={itemSelected[0]} closeOnSelect={closeOnSelect} />
                })}
            </ul>
        </div>

    )
}

export default Dropdown