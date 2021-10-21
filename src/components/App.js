import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import React from "react";
import { addMovies } from "../actions";
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
  render(){
    console.log('RENDER');
    const movies= this.props.store.getState();
  return (
    <div className="App">
       <Navbar/>
       <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favorites</div>
          </div>
          <div className="list">
            {movies.map((movie,index) =>(
              <MovieCard movie={movie} key={`movies-${index}`}/>
            ))}
          </div>
       </div>
    </div>
  );
}
}

export default App;
