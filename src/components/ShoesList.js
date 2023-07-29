import shoes from '../db/shoes.json';

export default function ShoesList() {
    const dataShoes = shoes;
    return (
        <div>
            <ul className='items-div'>
                {dataShoes.map(e =>
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
                        rating={e.rating} />
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
            <img src={image} alt="img" />
            <span>Name: {name}</span>
            <span>Description: {description}</span>
            <span>Price: {discount !== 0 ? price * (100 - discount) / 100 : price}</span>
            <span>Rating: {rating} out of 5</span>
            <button onClick={buyProduct}>Add to Cart</button>
        </li>
    )
}

