import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, timestampParser } from '../Utils';
import { NavLink } from 'react-router-dom';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';

const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [postPicture, setPostPicture] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    
    const handlePost = () => {

    }

    const handlePicture = () => {

    };


    const cancelPost = () => {
        setMessage('');
        setPostPicture('');
        setVideo('');
        setFile('');
    }

    const handleVideo = () => {
        let findLink = message.split(" "); //créer un tableau avec tout les élement séparés par un espace
        for (let i= 0; i < findLink.length; i++) { // intéroge chaque élément du tableau
            if (findLink[i].includes('https://www.youtube.com/') ||
                findLink[i].includes('https://youtube.com/') 
            ) { //si un élément inclut une de ces deux chaines de charactères
                let embed = findLink[i].replace('watch?v=', 'embed/'); // remplace la première chaine de charatères par la seconde -> "embed" permet d'inclure une vidéo youtube dans un autre site 
                setVideo(embed.split('&')[0]); //créer un tableau avec tout les élement séparés par un & -> le but étant de ne garder que le premier élément du tableau pour supprimer un éventuel timecode dans le lien
                findLink.splice(i, 1);
                setMessage(findLink.join(" "))
                setPostPicture('');
            }
        }
    }

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false);
        handleVideo();
    }, [userData, message, video])

    return (
        <div className="post-container">
            {isLoading ? (
                <i className="fas fa-spinner fa-pulse"></i>
            ) : (
                <>
                    <div className="data">
                        <p><span>{userData.following ? userData.following.length : 0}
                            </span> Abonnement{userData.following && userData.following.length > 1 ? "s" : null}
                        </p>

                        <p><span>{userData.followers ? userData.followers.length : 0}
                            </span> Abonné{userData.followers && userData.followers.length > 1 ? "s" : null}
                        </p>
                    </div>
                    <NavLink exact to="/profil">
                        <div className="user-info">
                            <img src={`${process.env.REACT_APP_API_URL}${userData.picture}`} alt="user-img" />
                        </div>
                    </NavLink>
                    <div className="post-form">
                        <textarea
                        name="message"
                        id="message"
                        placeholder="What's up ?"
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        />

                        {message || postPicture || video.length > 20 ? (
                            <li className="card-container">
                                <div className="card-left">
                                    <img src={`${process.env.REACT_APP_API_URL}${userData.picture}`} alt="user-img" />
                                </div>
                                <div className="card-right">
                                    <div className="card-header">
                                        <div className="pseudo">
                                            <h3>{userData.pseudo}</h3>
                                        </div>
                                        <span>
                                            {timestampParser(Date.now())}
                                        </span>
                                    </div>
                                    <div className="content">
                                        <p>{message}</p>
                                        <img src={postPicture} alt="" />
                                        {video && (
                                            <iframe
                                            src={video}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={video} //titre unique
                                        ></iframe>
                                        )} 
                                    </div>
                                </div>
                            </li>
                        ) : null}
                    
                        <div className="footer-form">
                            <div className="icon">
                                {isEmpty(video) && (
                                    <>
                                        <img src="./img/icons/picture.svg" alt="img" />
                                        <input 
                                            type="file"  
                                            id="file-upload" 
                                            name="file" 
                                            accept="jpg, jpeg, png, gif" 
                                            onChange={(e) => handlePicture(e)}
                                        />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo("")} >Supprimer vidéo </button>
                                )}
                            </div>
                            <div className="btn-send">
                                {message || postPicture || video.length > 20 ? (
                                    <button className="cancel" onClick={(cancelPost)}>Annuler</button>
                                ) : null}
                                <button className="send" onClick={handlePost}>Envoyer</button>

                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;