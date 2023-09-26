import './GameList.scss';
import PlaySvg from '../../resources/play.svg';
import VerticalLogo from '../vertical-logo/VerticalLogo';

const template = {
    games: [
        {
            title: "Tic-Tac-Toe",
            players: {
                min: 2,
                max: 2
            },
            complexity: "low",
            playingTime: "1 minute",
            randomness: "none",
            imgSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAp8WFCljEo7ud5es8AChl8gUEZCV31cIVug&usqp=CAU'
        },
        {
            title: "Uno",
            players: {
                min: 2,
                max: 10
            },
            complexity: "low",
            playingTime: "15 minutes",
            randomness: "high",
            imgSrc: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Funo%2Fhome%2FGameName_Store_Landscape_2560x1440-2560x1440-5195e8a3e06d672f97a1ee49ecea59027c14cae4.jpg'
        }
    ]
}

export default function GameList() {

    const gameElements = template.games.map(game => {
        return (
            <div className='game-block' key={ game.title }>
                <span className='img' style={{backgroundImage: `url(${game.imgSrc})`}}></span>
                <span className='info'>
                    <h5>{game.title}</h5>
                    <span>Players:
                        {
                        game.players.min && game.players.max && game.players.min !== game.players.max ? 
                        ` ${game.players.min} - ${game.players.max}` : 
                        ` ${game.players.min}`
                        }
                    </span>
                    <span>Complexity: {game.complexity}</span>
                    <span>Playing time: ~{game.playingTime}</span>
                    <span>Randomness: {game.randomness}</span>
                </span>
                <button className='play-button'><img src={ PlaySvg } className='icon-big'></img></button>
            </div>
        )
    })

    return (
        <div className='game-list'>
            { gameElements }
            <VerticalLogo showDesc={false} />
        </div>
    )
}