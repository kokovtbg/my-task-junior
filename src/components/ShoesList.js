import { useEffect, useState } from 'react';
import shoes from '../db/shoes.json';

export default function ShoesList({ count, totalFunc }) {
    const [dataShoes, setDataShoes] = useState(shoes);
    
    useEffect(() => {
        totalFunc(dataShoes.length);
    }, []);

    return (
        <div className='main'>
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

