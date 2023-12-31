import { useEffect, useState } from 'react';
import shoes from '../db/shoes.json';

export default function ShoesList() {
    const [dataShoes, setDataShoes] = useState(shoes);
    const [count, setCount] = useState(20);
    const colors = ['red', 'blue', 'gray'];
    const [color, setColor] = useState({});
    const [price, setPrice] = useState(0);
    const [sort, setSort] = useState('');

    useEffect(() => {
        if (count > dataShoes.length) {
            return setCount(dataShoes.length);
        }
        if (count + 20 > dataShoes.length) {
            if (count < 20 && dataShoes.length >= 20) {
                setCount(20);
            }
            if (count < 20 && dataShoes.length < 20) {
                setCount(dataShoes.length);
            }
            return;
        }
        setCount(count + 20);
    }, [count, dataShoes.length]);

    const incrementCount = () => count + 20 > dataShoes.length ? setCount(dataShoes.length) : setCount(count + 20);

    // function incrementCount() {
    //     if (count > dataShoes.length) {
    //         return setCount(dataShoes.length);
    //     }
    //     if (count + 20 > dataShoes.length) {
    //         return setCount(dataShoes.length);
    //     } 
    //     setCount(count + 20);
    // }

    const onColorChange = (e) => {
        setColor(state => ({ ...state, [e.target.value]: e.target.checked }));
    }

    const onPriceChange = (e) => {
        setPrice(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const shoesTemp = shoes;
        setDataShoes(shoesTemp);
        console.log(shoesTemp);

        const colors = Array.from(e.target['color']).filter(c => c.checked === true);
        const colorsId = [];
        colors.forEach(e => colorsId.push(e.id));
        console.log(colors);
        console.log(colorsId);
        const shoesId = [];
        shoesTemp.forEach(s => s.color.forEach(c => colorsId.indexOf(c) !== -1 && !shoesId.includes(s.id) ? shoesId.push(s.id) : ''));
        console.log(shoesId);

        setDataShoes(shoesTemp.filter(el => shoesId.includes(el.id) && el.price <= price));
        // setDataShoes(state => state.filter(el => el.color.some(c => colorsId.indexOf(c) !== -1)));
        // setDataShoes(state => state.filter(el => el.color.some(c => c === 'red')));

        // setCount(dataShoes.length);
        // console.log(count);
        // console.log(dataShoes);
        // incrementCount();
    }

    const onSortChangeHandler = (e) => {
        setSort(e.target.value);
        switch (e.target.value) {
            case "name_asc":
                return setDataShoes(dataShoes.sort((a, b) => a.name.localeCompare(b.name)));
            case "name_desc":
                return setDataShoes(dataShoes.sort((a, b) => b.name.localeCompare(a.name)));
            case "price_asc":
                return setDataShoes(dataShoes.sort((a, b) => a.price - b.price));
            case "price_desc":
                return setDataShoes(dataShoes.sort((a, b) => b.price - a.price));
            default:
                return '';
        }
    }

    return (
        <div className='main'>
            <div className='filter-div'>
                <form onSubmit={onSubmitHandler}>
                    <div className='filter-div-div'>
                        <h3>Choose colors</h3>
                        {colors.map((e, i) =>
                            <CheckBox
                                key={i}
                                id={e}
                                label={e}
                                title={e}
                                name="color"
                                value={e}
                                checked={color[e] || false}
                                onChange={onColorChange} />
                        )}
                    </div>
                    <div className='filter-div-div'>
                        <h3>Choose price</h3>
                        <label htmlFor="price">{price}</label>
                        <input
                            id='price'
                            type="range"
                            min="0"
                            max="1000"
                            value={price}
                            onChange={onPriceChange} />
                    </div>
                    <div>
                        <button className='btn'>Search</button>
                    </div>
                </form>
            </div>

            <div className='product-grid'>
                <div className='category-sort-div'>
                    <h1>Shoes</h1>
                    <h2>This page shows shoes in store</h2>
                    <select
                        className='sort-select'
                        value={sort}
                        onChange={onSortChangeHandler} >
                        <option value="name_asc" key="name_asc">Name A-Z</option>
                        <option value="name_desc" key="name_desc">Name Z-A</option>
                        <option value="price_asc" key="price_asc">Price ASC</option>
                        <option value="price_desc" key="price_desc">Price DESC</option>
                    </select>
                </div>
                <ul className='items-div'>
                    {dataShoes.map((e, i) =>
                        i + 1 <= count ?
                            <ListItem
                                id={e.id}
                                key={e.id}
                                name={e.name}
                                description={e.description}
                                price={e.price}
                                image={e.image}
                                color={e.color}
                                size={e.size}
                                discount={e.discount}
                                rating={e.rating} /> : ''
                    )}
                </ul>
                <h2 className='heading-count'>Loading {count} out of {dataShoes.length}</h2>

                <button className='btn-load' onClick={incrementCount} disabled={count === dataShoes.length}>Load More</button>
            </div>

        </div>
    )
}


function ListItem({ id, name, description, price, image, color, size, discount, rating }) {
    function buyProduct(e) {
        e.preventDefault();
        alert('Product added to cart');
    }

    return (
        <li className='item'>
            <div className='item-img'>
                <img src={image} alt="img" />
            </div>
            <div className='item-desc'>
                <p>Name: {name}</p>
                <p>Description: {description}</p>
                <p>Price: {discount !== 0 ?
                    <span><span style={{ textDecoration: "line-through" }}>{price}</span> {price * (100 - discount) / 100}</span> :
                    price}
                </p>
                <p>Rating: {rating} out of 5</p>
                <button className='btn' onClick={buyProduct}>Add to Cart</button>
            </div>
        </li>
    )
}

const CheckBox = ({ id, label, title, name, value, checked, onChange }) => {
    return (
        <>
            <label htmlFor={id} title={title}>{label}</label>
            <input className="checkbox"
                type="checkbox"
                id={id}
                title={title}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange} />
        </>
    )
}