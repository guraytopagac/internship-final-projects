import './css/Game.css'

function Game({ game }) {
    const { title, description, price, link, image } = game

    return (
        <article className="game">
            <img src={image} alt={`${title} kapak görseli`} />

            <div className="gameBody">
                <h3>{title}</h3>
                <p>{description}</p>

                <div className="gameFooter">
                    <span className="price">${price.toFixed(2)}</span>

                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="buyButton"
                    >
                        Satın Al
                    </a>
                </div>
            </div>
        </article>
    )
}

export default Game