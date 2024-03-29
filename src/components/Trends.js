import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTrends } from '../actions/post.actions';
import { isEmpty } from './Utils';


const Trends = () => {
    const posts = useSelector((state) => state.postReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const trendList = useSelector((state) => state.trendingReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        
        if (!isEmpty(posts[0])) {
            
            const postsArr = Object.keys(posts).map((i) => posts[i]); // crééer un array avec comme base l'object
            let sortedArray = postsArr.sort((a, b) => {
                return b.likers.length - a.likers.length; // range dans l'ordre des plus liker au moins liker
            })
            sortedArray.length = 10;
            dispatch(getTrends(sortedArray))
            console.log("laaaaaaaaaaaaaaaaaaaaaaaaa", trendList);
        }

    }, [posts, dispatch])

    return (
        <div className="trending-container">
            <h4>Tendances</h4>
            <NavLink exact to="/trending">
                <ul>
                   {trendList.length &&
                    trendList.map((post) => {
                        return (
                            <li key={post.id}>
                                <div>
                                    {post.picture && <img src={`${process.env.REACT_APP_API_URL}${post.picture}`} alt="post-pic" /> }
                                    {post.video && (
                                        <iframe
                                            src={post.video}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={post.id}
                                      ></iframe>
                                    )}
                                    {isEmpty(post.picture) && isEmpty(post.video) && (
                                        <img src={usersData[0] && usersData.map((user) => {
                                            if (user.id === post.posterId) {
                                                return `${process.env.REACT_APP_API_URL}${user.picture}`;
                                            } else return null;
                                        }) 
                                        .join("")
                                    }   alt="profil-pic" />
                                    )}
                                </div>
                                <div className="trend-content">
                                    <p>{post.message}</p>
                                    <span>Lire</span>
                                </div>
                            </li>
                        )
                    })} 
                </ul>
            </NavLink>
            
        </div>
    );
};

export default Trends;