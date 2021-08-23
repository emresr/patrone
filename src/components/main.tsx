import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { Post } from '../types';
import Avatar from 'boring-avatars';
import FeedPost from './ui/FeedPost';

const Main: React.FC<{}> = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  const token = localStorage.getItem('token');

  async function fetchData() {
    await axios
      .get(`${process.env.REACT_APP_API_LINK}/feed`, {
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function getTagFeed(topic: string) {
    await axios
      .get(`${process.env.REACT_APP_API_LINK}/tag/${topic}`, {
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      })
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const topics: Array<string> = [
    'React',
    'Cities',
    'Cyber',
    'Art',
    'Cities',
    'Cyber',
    'Art',
    'Cities',
    'Cyber',
    'Art',
    'Cities',
    'Cyber',
  ];

  const [saved, setSaved] = useState<boolean>(false);
  return (
    <div>
      <div className="feed_container">
        {false && (
          <div className="greeting_container">
            <div className="greeting">
              <h1 className="slogan">
                White,read, <br /> and connect.
              </h1>
              <p className="subslogan">
                Anim excepteur Lorem est ipsum culpa eu reprehenderit anim est. Ipsum cillum amet et est eiusmod
                deserunt culpa eiusmod deserunt minim ea.
              </p>
              <button className="start_writing">Start Writing</button>
            </div>
          </div>
        )}
        <div>
          <div className="your_topics_container">
            <h1 className="your_topics">YOUR TOPICS</h1>

            {topics.length > 0 &&
              topics.map((topic) => (
                <button onClick={() => getTagFeed(topic)}>
                  {' '}
                  <div className="your_topics_topic">
                    <h1 className="your_topics_topic_title">{topic}</h1>
                  </div>
                </button>
              ))}
          </div>

          <div className="feed">{posts && posts.length > 0 && posts.map((post) => <FeedPost props={post} />)}</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
