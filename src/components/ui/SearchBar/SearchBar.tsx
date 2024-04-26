import { Form } from 'react-router-dom'
import Input from '../Input/Input'
import Button from '../Button/Button'
import classes from './SearchBar.module.css'
import { FaSearch } from 'react-icons/fa'
import { ComponentPropsWithoutRef } from 'react'

type SearchBarProps = {
    name: string;
    id: string;
    placeholder: string;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
} & ComponentPropsWithoutRef<'form'>

const SearchBar = ({ handleSubmit, ...props }: SearchBarProps) => {
    return (
        <Form method='GET' onSubmit={handleSubmit}>
            <div className={classes.searchContainer}>
                <Input type="search" name={props.name} id={props.id} placeholder={props.placeholder} className={`${classes.search} ${props.className || ""}`} /*className={classes.search}*/ inputLabel={false} />
                <Button textOnly={false} type='submit'><FaSearch /></Button>
            </div>
        </Form>
    )
}

export default SearchBar