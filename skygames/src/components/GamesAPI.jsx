import React, {useState, useEffect} from 'react'
import axios from 'axios';
import '../assets/css/home.css'
import { Link } from 'react-router-dom';

export default function GamesAPI() {
    const [data, setData] = useState('');

    useEffect(() => {
        const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        headers: {
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
            'X-RapidAPI-Key': '56206ffcc0msh78e4f75736ff329p133eb0jsn6059b1b2f90c'
        }
        };

        axios.request(options).then(function (response) {
            console.log(response);
            setData(response);
        }).catch(function (error) {
            console.error(error);
        });
    })
  return (
    <div className='popularcontent pb-5'>
        <h1>Suggested Free to Play Games</h1>
        <div className="container row row-cols-md-3 g-3 ms-5 ps-5 py-5 pb-5">
            {data?.data?.filter((item, index) => index >= 0 && index < 12 ).map((item) => (
            <div className="col">
                <div className="card contentcard" href='#' style={{backgroundColor : '#303030', width : '21rem', height:'300px'}}>
                    <img src={item.thumbnail} className="card-img-top" alt="..." style={{height:'400px'}}/>
                    <div className="card-body">
                        <h5 className="card-title py-1">{item.title}</h5>
                    </div>
                    <a href={item.game_url} class="btn btn-secondary">See More</a>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}
