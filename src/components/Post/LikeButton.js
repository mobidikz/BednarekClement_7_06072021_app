import React, { useEffect, useContext, useState } from 'react';
import { UidContext } from "../AppContext";
import Popup from 'reactjs-popup';
import'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like = () => {
        dispatch(likePost(post.id, uid))
        setLiked(true); //juste accélérer le visuel (avant retour de l'api) ?
    };

    const unlike = () => {
        dispatch(unlikePost(post.id, uid))
        setLiked(false);
    };

    //Sert à rien ? Doublon ?
    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers, liked]); //relance le use effect quand : il a une uid ou le tableau des post.likers ou si liked est incrémenté

    return (
        <div className="like-container">
          {uid === null && (
            <Popup
              trigger={<img src="./img/icons/heart.svg" alt="like" />}
              position={["bottom center", "bottom right", "bottom left"]}
              closeOnDocumentClick
            >
              <div>Connectez-vous pour aimer un post !</div>
            </Popup>
          )}
          {uid && liked === false && (
            <img src="./img/icons/heart.svg" onClick={like} alt="like" />
          )}
          {uid && liked && (
            <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
          )}
          <span>{post.likers.length}</span>
          
        </div>
      );
};

export default LikeButton;