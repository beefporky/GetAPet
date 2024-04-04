import { type Option } from './Dropdown'
import Checkmark from './Checkmark';
import classes from './DropdownItem.module.css';

type DropdownItemProps = {
    handleSelected: (option: Option) => void;
    option: Option;
    itemSelected: Option;
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