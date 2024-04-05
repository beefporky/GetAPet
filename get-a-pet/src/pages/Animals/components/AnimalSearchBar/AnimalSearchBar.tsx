import { Form } from 'react-router-dom'
import Input from '../../../../components/ui/Input/Input'
import Button from '../../../../components/ui/Button'
import classes from './AnimalSearchBar.module.css'

const AnimalSearchBar = () => {
    return (
        <Form method='GET' action='/animals'>
            <div className={classes.searchContainer}>
                <Input type="search" name="animalSearch" id="animalSearch" placeholder='Search Animal' required className={classes.search} inputLabel={false} />
                <Button textOnly={false} type='submit'>Search</Button>
            </div>
        </Form>
    )
}

export default AnimalSearchBar