import axios from "axios";

// Pour les posts
export const GET_POSTS = "GET_POSTS";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST ="ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// Pour les comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

// Pour les trends (tendances)
export const GET_TRENDS = "GET_TRENDS";

// Pour les erreurs
export const GET_POST_ERRORS = "GET_POST_ERRORS";


// Récupère la data et l'envois dans le store
export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}api/post/`)
            .then((res) => {
              const posts = res.data.map((p) => {
                return {
                  ...p,
                  likers: p.likes.map(l => l.likerId)
                }
              })

              dispatch({ type: GET_POSTS, payload: posts.slice(0, num) }); // array à la place de res.data 
              dispatch({ type: GET_ALL_POSTS, payload: posts });
            })
            .catch((err) => console.log(err))
    }
}

export const addPost =(data) => {
  return (dispatch) => {
    return axios
        .post(`${process.env.REACT_APP_API_URL}api/post/`, data)
        .then((res) => {
          if (res.data.errors) {
            dispatch({ type: GET_POST_ERRORS, payload: res.data.errors })
          } else {
            dispatch({ type: GET_POST_ERRORS, payload: ''});
          }
        })

  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/like`,
      data: { id: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, message) => {
  return (dispatch) => {
    return axios ({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { message }
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { message, postId }});
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios ({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { postId }});
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/comment`,
      data: { commenterId, text, commenterPseudo },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const editComment = (postId, commentId, text) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/comment/${commentId}`,
      data: { text },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: { postId, commentId, text } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/comment/${commentId}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};

export const getTrends = (sortedArray) => {
  return (dispatch) => {
    dispatch({ type: GET_TRENDS, payload: sortedArray})
  };
};