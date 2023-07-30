import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setLocation } from "@/redux/settingsSlice/slice";
import {useState} from 'react'

const SearchInput: React.FC<{className?: string}> = ({className = ''}) => {
    const [inputValue, setInputValue] = useState('')
    const dispatch = useAppDispatch()

    const handleSetLocation = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(setLocation(inputValue))
        setInputValue('')
    }

    const handleSetInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    return (
        <form className={`flex gap-4 items-center justify-center ${className}`} onSubmit={handleSetLocation}>
            <label>
                <input type="text" value={inputValue} placeholder="London" onChange={handleSetInputValue} className="text-black pl-2 py-1 rounded-3xl"/>
            </label>
            <button type="submit" className="px-4 py-1.5 bg-purple-600 rounded-3xl">Search</button>
        </form>
    );
};
export default SearchInput;