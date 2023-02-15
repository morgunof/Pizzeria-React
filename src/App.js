import React from "react";
import {Axios} from "axios";

import './scss/app.scss';

import {Header} from './components/Header';
import {Sort} from './components/Sort';
import {Categories} from './components/Categories';
import {PizzaBlock} from './components/PizzaBlock';


function App() {
    const [items, setItems] = React.useState([])

    React.useEffect(() => {
        fetch('https://63ed1d643d9c852c3f565970.mockapi.io/items')
            .then(res => res.json())
            .then(json => {
                setItems(json)
            })
    },[])

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            items.map(obj =>
                                <PizzaBlock key={obj.id}
                                            {...obj}/>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

