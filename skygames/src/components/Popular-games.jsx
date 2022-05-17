import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/home.css';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom'


export default function Populargames() {
    const getPopular = gql`
    query MyQuery {
        list_game(limit: 3, order_by: {Like: asc_nulls_first}) {
          Like
          id_game
          nama_game
          deskripsi
          dislike
          download_link
          gambar_game
          not_really
        }
      }
      
    `;

    const { loading, error, data:dataPopular } = useQuery(getPopular);

  return (
    <div className='popularcontent'>
        <div className='titlecontent'>
            <h1>Popular Games</h1>
        </div>
        <div className="container row row-cols-md-3 g-3 ms-5 ps-5 py-5">
            {dataPopular && dataPopular.list_game.map((game) => (
                <div className="col">
                    <div className="card" style={{backgroundColor : '#303030', width : '21rem'}}>
                        <img src={game.gambar_game} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{game.nama_game}</h5>
                            <Link to={`/games/${game.nama_game}`} class="btn btn-secondary">See More</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}