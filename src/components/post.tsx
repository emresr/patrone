import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { stampToDate } from '../utils/time';
import { Tag } from '../types';

const Post: FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [post, setPost] = useState<any>();
  const [error, setError] = useState<string>('');
  console.log(post);
  const fetchData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_LINK}/post/${id}`, {
        headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="post_container">
      {post ? (
        <div className="main_content">
          <div>
            <h1 className="author">John Carvin</h1>
            <div>
              <h1 className="date">{stampToDate(post.createdAt)}</h1>
            </div>
            <div className="count_container">
              <h1>
                {post.viewCount} views - {post.likedBy.length} likes
              </h1>
            </div>
            <h1 className="title">Fugiat consectetur magna amet ea reprehenderit nisi sit aliqua duis.</h1>
            <h1 className="description">
              Magna amet sint officia mollit exercitation ipsum qui culpa voluptate dolore veniam non in cillum.
            </h1>
            <img className="image" src="baby.jpeg" width="200px" height="150px" />
          </div>

          <div className="content_container">
            <p>{post.content} </p>
          </div>
          <div className="post_footer">
            <div className="tags">
              {post &&
                post.tags.map((tag: Tag) => (
                  <a href={`/tag/${tag.name}`} className="tag">
                    {tag.name}
                  </a>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1>Post not found </h1>
          <h1>{error}</h1>
        </div>
      )}
    </div>
  );
};

export default Post;
