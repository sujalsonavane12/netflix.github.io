import React, { useEffect } from 'react'
import "./Home.scss"
import axios from "axios";
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai"
import { useState } from 'react';

const apiKey ="f3f4f01aea574d6926f6d1db5d2dec1c"
const url="https://api.themoviedb.org/3"
const imgUrl="https://image.tmdb.org/t/p/original"
const upcoming="upcoming"
const nowPlaying="now_playing"
const popular="popular"
const topRated="top_rated"


const Card = ({img}) =>(
  <img className='card' src={img} alt="" />
)




const Row = ({title ,arr = [{
  



}] }) =>(

  <div className='row'>


    <h2>{title}</h2>

    <div>
    
      {
        arr.map((item, index)=>(
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
    
        ))
      }

    </div>
   

  </div>
)

const Home = () => {

  const [upcomingMovies, setUpcomingMovies]= useState([])
  
  const [nowPlayingMovies, setnowPlayingMovies]= useState([])
  
  const [popularMovies, setpopularMovies]= useState([])
  
  const [topRatedMovies, settopRatedMovies]= useState([])

 




  useEffect(() => {

    
    const fetchUpcoming = async()=>{
        const {data: {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
        setUpcomingMovies(results);
   
    };

    const fetchnowPlaying = async()=>{
      const {data: {results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}&page=2`)
      setnowPlayingMovies(results);
 
  };

  const fetchpopular = async()=>{
    const {data: {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
    setpopularMovies(results);

};

const fetchtopRated = async()=>{
  const {data: {results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}&page=3`)
  settopRatedMovies(results);

};



  
    fetchUpcoming()
    fetchnowPlaying();
    fetchpopular();
    fetchtopRated();
    

  }, [])
  


  return (
    <section className='home'>
      <div className="banner" style={{
          backgroundImage : upcomingMovies[0] 
          ? `url(${`${imgUrl}/${upcomingMovies[0].poster_path}`})` 
          :"rgb(16,16,16)"
      }}>

      {upcomingMovies[0] && <h1>{upcomingMovies[0].original_title} </h1>}
      {upcomingMovies[0] && <p>{upcomingMovies[0].overview} </p>}


      <div>
      <button> <BiPlay /> Play</button>
      <button>My List <AiOutlinePlus /></button>

      </div>
      </div>



      <Row title={"Upcoming Movies"} arr={upcomingMovies}  />
      <Row title={"Now playing"} arr={nowPlayingMovies}  />
      <Row title={"Popular"} arr={popularMovies}  />
      <Row title={"Top Rated"} arr={topRatedMovies}  />
      
    


    </section>
  )
}

export default Home