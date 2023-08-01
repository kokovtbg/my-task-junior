import { useEffect, useState } from 'react';
import shoes from '../db/shoes.json';

export default function ShoesList() {
    const [dataShoes, setDataShoes] = useState(shoes);
    const [count, setCount] = useState(20);
    const colors = ['red', 'blue', 'gray'];
    const [color, setColor] = useState({});
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (count > dataShoes.length) {
            return setCount(dataShoes.length);
        }
        if (count + 20 > dataShoes.length) {
            if (count < 20 && dataShoes.length >= 20) {
                setCount(20);
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

        setDataShoes(shoesTemp.filter(el => shoesId.includes(el.id)));
        setDataShoes(shoesTemp.filter(el => el.price <= price));
        // setDataShoes(state => state.filter(el => el.color.some(c => colorsId.indexOf(c) !== -1)));
        // setDataShoes(state => state.filter(el => el.color.some(c => c === 'red')));

        // setCount(dataShoes.length);
        // console.log(count);
        // console.log(dataShoes);
        // incrementCount();
    }

    return (
        <div className='main'>
            <div className='filter-div'>
                <form onSubmit={onSubmitHandler}>
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
                    <h3>Choose price</h3>
                    <label htmlFor="price">{price}</label>
                    <input
                        id='price'
                        type="range"
                        min="0"
                        max="1000"
                        value={price}
                        onChange={onPriceChange} />
                    <button>Search</button>
                </form>
            </div>

            <div className='product-grid'>
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
                <button onClick={buyProduct}>Add to Cart</button>
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