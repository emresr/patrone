import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { stampToDate } from '../utils/time';
import { Tag } from '../types';
import TagItem from './ui/TagItem';
const Post: FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [post, setPost] = useState<any>();
  const [error, setError] = useState<string>('');
  const [isLiked, setIsLiked] = useState<boolean>();
  const [isSaved, setIsSaved] = useState<boolean>();

  const token = localStorage.getItem('token');

  console.log(post);

  async function addView() {
    await axios
      .put(
        `${process.env.REACT_APP_API_LINK}/post/${id}/addview`,
        {},
        {
          headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        },
      )
      .then((response) => {})
      .catch((err) => {
        console.error(err);
      });
  }

  async function fetchData() {
    await axios
      .get(`${process.env.REACT_APP_API_LINK}/post/${id}`, {
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }

  async function like() {
    await axios
      .put(
        `${process.env.REACT_APP_API_LINK}/like/${id}`,
        {},
        {
          headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        },
      )
      .then((response) => {
        setIsLiked(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  async function save() {
    await axios
      .put(
        `${process.env.REACT_APP_API_LINK}/save/${id}`,
        {},
        {
          headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        },
      )
      .then((response) => {
        setIsSaved(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchData();
    addView();
  }, []);
  //önce post style sonra spinner
  return (
    <div className="post_container">
      {post ? (
        <div className="main_content">
          <div>
            <div className="post_header">
              {' '}
              <div>
                <h1 className="date">{stampToDate(post.createdAt)}</h1>
              </div>
              <div>
                <button className="post_button" onClick={like}>
                  {isLiked ? 'Unlike' : 'Like'}
                </button>
                <button className="post_button" onClick={save}>
                  {isSaved ? 'Unsave' : 'Save'}
                </button>
              </div>
            </div>
            <h1 className="author">{post.author.name}</h1>

            <div className="tags">{post && post.tags.map((tag: any) => <TagItem props={tag} />)}</div>

            <div className="count_container">
              <h1>
                {post.viewCount} views - {post.likedBy.length} likes
              </h1>
            </div>
            <h1 className="title">{post.title}</h1>
            <h1 className="description">{post.abstract} </h1>
            <img className="rounded w-full" src="https://picsum.photos/400/200/?random" />
          </div>

          <div className="content_container">
            <p>{post.content} </p>
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
