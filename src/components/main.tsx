import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { Post } from '../../types/';
import Avatar from 'boring-avatars';
import FeedPost from './ui/FeedPost';
import Tag from './ui/Tag';

const Main: React.FC<{}> = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);

  const fetchData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_LINK}/trending`, {
      headers: { Accept: 'application/json' },
    });
    setPosts(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const topics: Array<string> = [
    'Art',
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

  const recommended: Array<string> = [
    'Science',
    'Biology',
    'Chemistry',
    'Science',
    'Biology',
    'Chemistry',
    'Science',
    'Biology',
    'Chemistry',
    'Science',
    'Biology',
    'Chemistry',
  ];

  const [saved, setSaved] = useState<boolean>(false);
  return (
    <div className="main_container">
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

            {topics.length > 0 && topics.map((topic) => <Tag topic={topic} />)}
          </div>

          <div className="feed">{posts && posts.length > 0 && posts.map((post) => <FeedPost props={post} />)}</div>
        </div>
      </div>
      <div className="trending_container">ewr</div>
    </div>
  );
};

export default Main;
