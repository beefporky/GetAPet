import { type DropdownOption } from './Dropdown'
import Checkmark from './Checkmark';
import classes from './DropdownItem.module.css';

type DropdownItemProps = {
    handleSelected: (option: DropdownOption) => void;
    option: DropdownOption;
    itemSelected?: DropdownOption;
    closeOnSelect?: boolean;
}
const DropdownItem = ({
    handleSelected,
    option,
    itemSelected,
    closeOnSelect = false
}: DropdownItemProps) => {
    return <li key={option.value} className={`${itemSelected?.value === option.value ? classes.itemSelected : classes.item}`} onClick={() => handleSelected(option)}>{option.label}
        {(itemSelected?.value === option.value && !closeOnSelect) && <Checkmark />}
    </li>;
}

export default DropdownItem;