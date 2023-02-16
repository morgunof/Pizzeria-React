import React from "react";
import styles from './styles.module.scss'

export const NotFoundBlock = () => {
    return (
        <div className={styles.root}>
            <h1>
                <span>4😕4</span>
                <br/>
                Ничего не найдено
            </h1>
            <p className={styles.description}>К сожалению мы не нашли данную страницу, а может ее и не было...</p>
            {/*<form action="/">*/}
            {/*    <button*/}
            {/*        className={styles.buttonHome}>Вернуться на главную страницу*/}
            {/*    </button>*/}
            {/*</form>*/}
        </div>
    )
}