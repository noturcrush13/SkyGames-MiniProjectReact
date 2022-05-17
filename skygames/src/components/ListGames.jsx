import React, {useState} from 'react'
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import '../assets/css/home.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const GET_GAMES = gql`
query GetGames {
    list_game(order_by: {id_game: asc_nulls_first}) {
      gambar_game
      id_game
      nama_game
    }
  }
`

export default function ListGames(props) {
    const [games, setGames] = useState([])
    const {loading, error, data: dataGame} = useQuery(GET_GAMES)
    console.log(dataGame)

    return (
    <div>
        <div className='popularcontent'>
            <div className='titlecontent'>
                <h1>Games</h1>
            </div>
            <div className="container row row-cols-md-3 g-3 ms-5 ps-5 py-5">
                {dataGame && dataGame.list_game.map((game) => (
                <div className="col">
                    <div className="card contentcard" href='#' style={{backgroundColor : '#303030', width : '21rem', height:'300px'}}>
                        <img src={game.gambar_game} className="card-img-top" alt="..." style={{height:'400px'}}/>
                        <div className="card-body">
                            <h5 className="card-title py-1">{game.nama_game}</h5>
                            <Link to={`/games/${game.nama_game}`} class="btn btn-secondary">See More</Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}
