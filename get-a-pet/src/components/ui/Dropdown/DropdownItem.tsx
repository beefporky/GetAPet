import { type DropdownOption } from './Dropdown'
import Checkmark from './Checkmark';
import classes from './DropdownItem.module.css';

type DropdownItemProps = {
    handleSelected: (option: DropdownOption) => void;
    option: DropdownOption;
    itemSelected: DropdownOption;
}
const DropdownItem = ({
    handleSelected,
    option,
    itemSelected
}: DropdownItemProps) => {
    return <li key={option.value} className={`${itemSelected.value === option.value ? classes.itemSelected : classes.item}`} onClick={() => handleSelected(option)}>{option.label}
        {itemSelected.value === option.value && <Checkmark />}
    </li>;
}

export default DropdownItem;