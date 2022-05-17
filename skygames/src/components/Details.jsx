import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../assets/css/home.css'
import Like from '../assets/img/happy.png'
import Dislike from '../assets/img/sad.png'
import NotReally from '../assets/img/poker-face.png'
import Button from '../assets/img/Button.png'
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import htmr from 'htmr';
import Games_Detail from '../pages/Games_Detail'

export default function Details() {
    const getDetail = gql`
    query MyQuery {
        list_game {
          comments {
            comment
            id
            nama_game
            username
          }
          deskripsi
          dislike
          download_link
          gambar_game
          id_game
          nama_game
          not_really
          Like
        }
      }
      
    `;
    const GetComment = gql`
    query MyQuery {
        user_reviews {
          comment
          id
          nama_game
          username
        }
      }
    `;

    const insertComment = gql`
    mutation MyMutation($comment: String = "", $nama_game: String = "", $username: String = "") {
        insert_user_reviews(objects: {comment: $comment, nama_game: $nama_game, username: $username}) {
          affected_rows
        }
      }
    `;

    const insertNumberLike = gql`
    mutation MyMutation($Like: Int) {
        insert_list_game(objects: {Like: $Like}) {
          affected_rows
        }
      }
    `;

    const deleteComment = gql`
    mutation MyMutation($id: Int) {
        delete_user_reviews(where: {id: {_eq: $id}}) {
          affected_rows
        }
      }
    `;


    const params = useParams();
    // console.log("ini params",params)
    const { loading, error, data: dataDetail } = useQuery(getDetail);
    // console.log("ini data",dataDetail)
    const { loading: loadingComment, error: errorComment, data: dataComment } = useQuery(GetComment);
    const [insertCommentMutation] = useMutation(insertComment, {refetchQueries: [GetComment],});
    const [insertNumberMutation] = useMutation(insertNumberLike, {refetchQueries: [getDetail],});
    const [deleteCommentMutation] = useMutation(deleteComment, {refetchQueries: [GetComment],});
    const [like, setLike] = useState(1);
    const [comment, setComment] = useState([{
        comments: "",
        username: "",
    }]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if( comment.comments.length > 0 && comment.username.length > 0){
            insertCommentMutation({
                variables: {
                    comment: comment.comments,
                    nama_game: params.id,
                    username: comment.username,
                }
            });
            // console.log("ini commment",comment.comments)
            // console.log("ini username",comment.username)
            setComment({
                comments: '',
                username: '',
            });
        }
        else{
            alert("Please fill the form")
        }
    }
    const handleChange = (e) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        })
        // console.log(comment)
    }

    const handleLike = (e) => {
        e.preventDefault();
        console.log(like)
    }

    const handleDelete = (id_comment) => {
        console.log(comment.id)
        if(id_comment){
            deleteCommentMutation({
                variables: {
                    id : id_comment,
                }
            });
        }
    }
    

    return (
    <div>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap" rel="stylesheet"></link>
        {dataDetail?.list_game.filter(game => game.nama_game === params.id).map(game => (
            <div className='popularcontent'>
                <div className='container-fluid row'>
                    <div className='col-md-5'>
                        <img src={game.gambar_game} alt="Foto Game" style={{width:'100%', height:'auto'}}/>
                        <div className='download mt-3'>
                            <Link to={game.download_link}><img src={Button} alt="Foto Game" style={{width:'100%', height:'auto'}}/></Link>
                        </div>
                        <div className='likecontent row my-3'>
                            <div className='col-2'>
                                <button onClick={handleLike}>
                                    <img src={Like} alt="Like" />
                                </button>
                                <p style={{marginLeft:'32px'}}>Like</p>
                            </div>
                            <div className='number col-2'>
                                <p>{game.Like}</p>
                            </div>
                            <div className='col-2'>
                                <button>
                                    <img src={NotReally} alt="NotReally" />
                                </button>
                                <p style={{marginLeft:'32px'}}>Meh</p>
                            </div>
                            <div className='number col-2'>
                                <p>{game.not_really}</p>
                            </div>
                            <div className='col-2'>
                                <button>
                                    <img src={Dislike} alt="Dislike" />
                                </button>
                                <p style={{marginLeft:'23px'}}>Dislike</p>
                            </div>
                            <div className='number col-2'>
                                <p>{game.dislike}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-7 py-5 px-3' style={{backgroundColor:'#303030', textAlign:'start'}}>
                        <h1 style={{fontSize:'65px', fontWeight:'bold'}}>{game.nama_game}</h1>
                        <h4 style={{fontSize:'23px', fontWeight:'normal'}}>{htmr(game.deskripsi)}</h4>
                    </div>
                </div>
                <div className='review py-5'>
                    <div className='container py-5' style={{backgroundColor : '#303030'}}>
                        <h1>
                            Reviews
                        </h1>
                        <div className='py-3'> 
                            <h5 style={{textAlign:'start'}}>What do you think about this game?</h5>
                            <form onSubmit={handleSubmit}>
                                <div class="mb-3" style={{textAlign:'start'}}>
                                    <label for="exampleInputEmail1" class="form-label">Username</label>
                                    <input type="text" class="form-control" aria-describedby="emailHelp" value={comment.username} name="username" onChange={handleChange}/>
                                </div>
                                <div class="mb-3" style={{textAlign:'start'}}>
                                    <label for="exampleInputPassword1" class="form-label">Comments</label>
                                    <textarea type="password" class="form-control" value={comment.comments} name="comments" onChange={handleChange}/>
                                </div>
                                <button type="submit" class="btn btn-primary" style={{float:'left'}} onClick={handleSubmit}>Submit</button>
                            </form>
                        </div>
                        <h2 className='mt-5'>User Reviews</h2>
                        {dataComment?.user_reviews.filter(review => review.nama_game === params.id).map(review => (
                            <div className='mt-5'>
                                <div className="comment-box">
                                    <h5>{review.username}</h5>
                                    <p>{review.comment}</p>
                                    <button onClick={() => handleDelete(review.id)}>delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>
    )
}
