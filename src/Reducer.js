export const initialState = {
  loading: false,
  movies: [],
  errorMessage: null,
  page: 0,
  searchValue: ""
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
        movies: []
      };
    case "LOAD_MORE_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        page: action.payload.page,
        searchValue: action.payload.searchValue,
        totalResults: action.payload.totalResults
      };
    case "LOAD_MORE_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        page: action.payload.page
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
        movies: [],
        page: null,
        searchValue: null
      };
    default:
      return state;
  }
};