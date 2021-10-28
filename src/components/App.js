import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import { addMovies ,setShowMovies} from "../actions";
import {connect} from 'react-redux'
class App extends React.Component{
  componentDidMount(){
    const {store}=this.props;
    store.subscribe(()=>{
      console.log('UPDATED');
      this.forceUpdate();
    })
    store.dispatch(addMovies(data));
    // console.log('STATE',this.props.store.getState());
    // console.log('state props',this.props);
  }
  isMovieFavourite =(movie)=>{
    const { movies }=this.props.store.getState();
    const index=movies.favourites.indexOf(movie);
    // find the movie
    if(index!==-1){
      return true;
    }
    return false;
  }
  changeTab=(val)=>{
    console.log('hiii');
    this.props.dispatch(setShowMovies(val));
  }
  render(){
   // console.log('RENDER');
   const { movies,search} = this.props;
   console.log('state props',this.props);

    const {list,favourites,showFavourites}= movies//list:[], favourites:[]
    console.log(showFavourites,'hii');
    const displayMovies=showFavourites ? favourites : list;
    console.log('RENDER',this.props.store.getState());
  return (
    <div className="App">
       <Navbar dispatch={this.props.store.dispatch} search={search}/>
       <div className="main">
          <div className="tabs">
            <div  className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.changeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`}  onClick={() => this.changeTab(true)}
>Favorites</div>
          </div>
          <div className="list">
            {displayMovies.map((movie,index) =>(
              <MovieCard 
              movie={movie} 
              key={`movies-${index}`}
              dispatch={this.props.store.dispatch}
              isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
             {displayMovies.length === 0 ? (
              <div className="no-movies">No movies to display! </div>
            ) : null}
          </div>
          {/* {displayMovies.length===0 ? <div className="no-movies">no movies to display!</div>:null} */}
       </div>
    </div>
  );
}
}
function mapStateToProps(state){
  return{
      movies:state.movies
  }
}
export default connect(mapStateToProps)(App);
