import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { Post, Tag } from '../types';
import Avatar from 'boring-avatars';
import FeedPost from './ui/FeedPost';

const Main: React.FC<{}> = () => {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [tags, setTags] = useState<Array<Tag>>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');

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
  async function fetchTags() {
    await axios
      .get(`${process.env.REACT_APP_API_LINK}/me/tags`, {
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      })
      .then((response) => {
        setTags(response.data.followedTags);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function getTagFeed(tag: string) {
    await axios
      .get(`${process.env.REACT_APP_API_LINK}/tag/${tag}`, {
        headers: { 'Content-Type': 'application/json', 'x-access-token': token },
      })
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function clickTag(tag: string) {
    if (selectedTag !== tag) {
      setSelectedTag(tag);
      getTagFeed(tag);
    } else {
      setSelectedTag('');

      fetchData();
    }
  }

  useEffect(() => {
    fetchData();
    fetchTags();
  }, []);

  return (
    <div>
      <div className="feed_container">
        <div>
          <div className="your_topics_container">
            <h1 className="your_topics">YOUR TOPICS</h1>

            {tags.length > 0 ? (
              tags.map((tag) => (
                <button
                  onClick={() => {
                    clickTag(tag.name);
                  }}
                  className={`your_topics_topic ${selectedTag === tag.name && 'selected_tag'} `}
                >
                  <h1 className="your_topics_topic_title">{tag.name}</h1>
                </button>
              ))
            ) : (
              <div>Start following tags.</div>
            )}
          </div>

          <div className="feed">{posts && posts.length > 0 && posts.map((post) => <FeedPost props={post} />)}</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
