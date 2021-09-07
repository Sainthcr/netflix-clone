/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect , useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () => {

  
  const [movieList,setMovieList] = useState([]);
  const [featuredData,setFeaturedData]=useState(null);
  const[blackHeader, setBlackHeader] = useState(true);


useEffect( () => {  
    const loadAll= async ()=> {
       
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      
      let Originals = list.filter(i=>i.slug==='originals');
      let randomChose = Math.floor(Math.random() *(Originals[0].items.results.length -1 ) );
      let chosen = Originals[0].items.results[randomChose];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');
      setFeaturedData(chosenInfo);


} 
loadAll();

},[])

useEffect( ()=>{
 const scrollListener = () =>{
  if(window.scrollY > 200){
    setBlackHeader(true);
  } else{
    setBlackHeader(false)
  }

 }

window.addEventListener('scroll',scrollListener);

return () => {
  window.removeEventListener('scroll',scrollListener);
}

},[]);

  return( 
    <div className='page'>
      <Header black={blackHeader} />
  
    {featuredData && 
    <FeaturedMovie item={featuredData} />
    }

      <section className='lists'>
        {movieList.map(( item ,key) => (
          <MovieRow
         key={key} 
         title={item.title} 
         items={item.items}
         />

        ))}
      </section>
      <footer>
        Feito com <span role='img' aria-label='coração'>💜</span> pelaB7Web<br/>
        Direitos de imagem para Netflix
        Dados pegos do site Themoviedb.org
      </footer>
      {movieList.length <= 0 && 
      <div className='loading'>
        <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='carregando'/>
      </div>

}


    </div>

)

};



