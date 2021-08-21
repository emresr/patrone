import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { stampToDate } from '../utils/time';

const Post: FC = () => {
  const apiLink = 'http://localhost:4000';
  const { id }: any = useParams();
  const [post, setPost] = useState<any>();
  console.log(post);

  const fetchData = async () => {
    const response = await axios.get(`${apiLink}/post/${id}`, {
      headers: { Accept: 'application/json' },
    });

    setPost(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="post_container">
      {post && (
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
                post.tags.map((tag: any) => (
                  <a href={`/tag/${tag.name}`} className="tag">
                    {tag.name}
                  </a>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
