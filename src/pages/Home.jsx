import React from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import qs from "qs";

import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlices";
import {Categories} from "../components/Categories";
import {Sort, sortList} from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import {Index} from "../components/PizzaBlock";
import {Pagination} from "../components/Pagination ";
import {SearchContext} from "../App";


export const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)


    const {categoryId, sort, currentPage} = useSelector((state) => state.filter)

    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }

    const fetchPizzas = () => {
        setIsLoading(true)

        const sortBy = sort.sortProperty.replace('+', '')
        const order = sort.sortProperty.includes('+') ? 'asc' : 'desc'
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `&search=${searchValue}` : ''

        axios.get(
            `https://63ed1d643d9c852c3f565970.mockapi.io/items?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
        ).then(res => {
            setItems(res.data)
            setIsLoading(false)
        })

        window.scrollTo(0, 0)
    }

    //Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, [])

    //Если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])

    //Если был первый рендер то запрашиваем пиццы
    React.useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort, searchValue, currentPage])


    const pizzas = items.map(obj => <Index key={obj.id} {...obj}/>)

    const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index}/>)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items"> {isLoading ? skeletons : pizzas}</div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}