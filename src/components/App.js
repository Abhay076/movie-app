import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import { addMovies ,setShowMovies} from "../actions";
class App extends React.Component{
  componentDidMount(){
    const {store}=this.props;
    store.subscribe(()=>{
      console.log('UPDATED');
      this.forceUpdate();
    })
    store.dispatch(addMovies(data));
    console.log('STATE',this.props.store.getState());
  }
  isMovieFavourite =(movie)=>{
    const {favourites}=this.props.store.getState();
    const index=favourites.indexOf(movie);
    // find the movie
    if(index!==-1){
      return true;
    }
    return false;
  }
  onChangeTab=(val)=>{
    this.props.store.dispatch(setShowMovies(val));
  }
  render(){
   // console.log('RENDER');
    const {list,favourites,showFavourites}= this.props.store.getState();//list:[], favourites:[]
    const displaymovies=showFavourites ? favourites : list;
    console.log('RENDER',this.props.store.getState());
  return (
    <div className="App">
       <Navbar/>
       <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={()=>this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={()=>this.onChangeTab(true)}>Favorites</div>
          </div>
          <div className="list">
            {displaymovies.map((movie,index) =>(
              <MovieCard 
              movie={movie} 
              key={`movies-${index}`}
              dispatch={this.props.store.dispatch}
              isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displaymovies.length===0 ? <div className="no-movies">no movies to display!</div>:null}
       </div>
    </div>
  );
}
}

export default App;
