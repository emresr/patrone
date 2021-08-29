import axios from 'axios';
import React, { useEffect, useState, FC } from 'react';
import { Tag } from '../../types';

const TagItem = (props: any) => {
  const [isFollowed, setIsFollowed] = useState<boolean>();

  const token = localStorage.getItem('token');
  async function checkFollow() {
    await axios
      .get(
        `${process.env.REACT_APP_API_LINK}/isFollowing/${props.props.name}`,

        {
          headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        },
      )
      .then((response) => {
        setIsFollowed(response.data);
        console.log('res', response);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  async function follow() {
    await axios
      .put(
        `${process.env.REACT_APP_API_LINK}/follow/${props.props.name}`,
        {},
        {
          headers: { 'Content-Type': 'application/json', 'x-access-token': token },
        },
      )
      .then((response) => {
        checkFollow();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  
  useEffect(() => {
    checkFollow();
  }, []);
  return (
    <div className="tag_container">
      <button className="tag_button">
        <h1 className="tag_name">{props.props.name}</h1>
      </button>

      <div className="tag_info">
        <button className={` follow_button ${isFollowed && 'followed'}`} onClick={follow}>
          {isFollowed ? 'Followed' : 'Follow'}
        </button>
      </div>
    </div>
  );
};
export default TagItem;
