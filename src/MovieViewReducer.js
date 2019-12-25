export const initialState = {
  loading: false,
  movie: null,
  errorMessage: null
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD_MOVIE_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        movie: null
      };
    case "LOAD_MOVIE_SUCCESS":
      return {
        ...state,
        loading: false,
        movie: action.payload.movie,
        errorMessage: null
      };
    case "LOAD_MOVIE_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
        movie: null
      };
    default:
      return state;
  }
};