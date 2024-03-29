import Select from '../../../../components/ui/Select/Select'
import classes from './AnimalFilterForm.module.css'
const AnimalFilterForm = () => {
    return (
        <fieldset className={classes.filters}>
            <legend>Filters</legend>
            <Select name="breed" id="breed" selectLabel="Breed">
                <option value="breed">All Animals</option>
            </Select>
            <Select name="age" id="age" selectLabel="Age">
                <option value="age">All Animals</option>
            </Select>
            <Select name="size" id="size" selectLabel="Size">
                <option value="size">All Animals</option>
            </Select>
            <Select name="gender" id="gender" selectLabel="Gender">
                <option value="gender">All Animals</option>
            </Select>
        </fieldset>
    )
}
// breed age size gender
export default AnimalFilterForm