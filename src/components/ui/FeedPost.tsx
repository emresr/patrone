import React, { useEffect, useState, FC } from 'react';

import { Post } from '../../types';
import Avatar from 'boring-avatars';
import { stampToDate } from '../../utils/time';

const FeedPost = (props: any) => {
  const [saved, setSaved] = useState<boolean>(false);

  return (
    <div className="post_container">
      <div className="post_top ">
        <div style={{ display: 'flex' }}>
          {' '}
          <div className="avatar">
            <Avatar
              size={16}
              name="Maria Mitchell"
              variant="beam"
              colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
            />
          </div>
          <h1 className="vertically-centered">
            {props.props.author.email} <span>· {stampToDate(props.props.createdAt)}</span>
          </h1>
        </div>
        <h1>2 min read</h1>
      </div>

      <div className="post_content">
        <a className="post_title" href={`/post/${props.props.id}`}>
          <h1>{props.props.title}</h1>
        </a>{' '}
        <p>{props.props.abstract}</p>
      </div>
    </div>
  );
};

export default FeedPost;
