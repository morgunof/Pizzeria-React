import React from "react";
import styles from './Search.module.scss'
import {SearchContext} from '../../App'
import {debounce} from "lodash";

export const Search = () => {
    const {setSearchValue} = React.useContext(SearchContext)
    const inputRef = React.useRef()
    const [value, setValue] = React.useState('')

    const onClickClear = () => {
        setSearchValue('')
        setValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = React.useCallback(
        debounce((string) => {
            setSearchValue(string)
        }, 300),
        [],
    )

    const onChangeInput = event => {
        setValue(event.target.value)
        updateSearchValue(event.target.value)
    }

    return (
        <div className={styles.root}>
            <svg className={styles.icon}
                 viewBox="0 0 32 32"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z"/>
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Поиск пиццы..."/>

            {value && (
                <svg onClick={onClickClear}
                     className={styles.clear}
                     viewBox="0 0 14 14"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z"
                        id="Shape"/>
                </svg>
            )}
        </div>
    )
}

