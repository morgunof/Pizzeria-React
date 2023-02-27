import React from "react";

import {Categories} from "../components/Categories";
import {Sort} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {Index} from "../components/PizzaBlock";

export const Home = ({searchValue}) => {
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0)
    const [sortType, setSortType] = React.useState({

        name: 'популярности',
        sortProperty: 'рейтингу',
    })

    React.useEffect(() => {
        setIsLoading(true)

        const sortBy = sortType.sortProperty.replace('+', '')
        const order = sortType.sortProperty.includes('+') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        fetch(
            `https://63ed1d643d9c852c3f565970.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then(res => res.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue])

    const pizzas = items.filter(obj => {
        if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }
        return false

    }).map(obj => <Index key={obj.id} {...obj}/>)
    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(index) =>
                    setCategoryId(index)}/>
                <Sort value={sortType} onClickSort={(index) =>
                    setSortType(index)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletons : pizzas
                }
            </div>
        </div>
    )
}