import { API_OPTIONS } from './../utils/constants';
import { useDispatch } from 'react-redux';
import { addNewMovies } from "../utils/moviesSlice"
import { useEffect } from "react"


const useUpcomingMovies = () => {

    const dispatch = useDispatch()

    const upComingMovies = async () => {
        try {
            const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS)
            const json = await data.json()
            //console.log(json.results);
            dispatch(addNewMovies(json.results))
        }
         catch (error) {
            console.error("Failed to fetch top rated movies:", error);
        }
    }
    useEffect(() => {
        upComingMovies()
    }, [])
}

export default useUpcomingMovies