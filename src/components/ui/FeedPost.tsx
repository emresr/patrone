import React, { useEffect, useState, FC } from 'react';

import { Post } from '../../types';
import Avatar from 'boring-avatars';
import { stampToDate } from '../../utils/time';
import { AnyNsRecord } from 'dns';

const FeedPost = (props: any) => {
  const [saved, setSaved] = useState<boolean>(false);

  return (
    <div className="post_container">
      <div className="post_top ">
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
      <div className="post_content">
        <a className="post_title" href={`/post/${props.props.id}`}>
          <h1>{props.props.title}</h1>
        </a>{' '}
        <p>
          Let’s say you have thousands of microservices and you need the access these services by their domain names.
          How to create these
        </p>
        <div className="post_footer">
          <h1>2 min read</h1>
          <div>
            <button
              className="footer_button"
              onClick={() => {
                setSaved(!saved);
              }}
            >
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" className="button_svg path">
                <path
                  d="M18 2.5a.5.5 0 0 1 1 0V5h2.5a.5.5 0 0 1 0 1H19v2.5a.5.5 0 1 1-1 0V6h-2.5a.5.5 0 0 1 0-1H18V2.5zM7 7a1 1 0 0 1 1-1h3.5a.5.5 0 0 0 0-1H8a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V7z"
                  fill={saved ? '#f1f' : '#f1f1f1'}
                ></path>
              </svg>
            </button>
            <button className="footer_button">
              <svg className="" width="25" height="25">
                <path
                  d="M5 12.5c0 .55.2 1.02.59 1.41.39.4.86.59 1.41.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41A1.93 1.93 0 0 0 7 10.5c-.55 0-1.02.2-1.41.59-.4.39-.59.86-.59 1.41zm5.62 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.42.59.55 0 1.02-.2 1.41-.59.4-.39.59-.86.59-1.41 0-.55-.2-1.02-.59-1.41a1.93 1.93 0 0 0-1.41-.59c-.55 0-1.03.2-1.42.59-.39.39-.58.86-.58 1.41zm5.6 0c0 .55.2 1.02.58 1.41.4.4.87.59 1.43.59.56 0 1.03-.2 1.42-.59.39-.39.58-.86.58-1.41 0-.55-.2-1.02-.58-1.41a1.93 1.93 0 0 0-1.42-.59c-.56 0-1.04.2-1.43.59-.39.39-.58.86-.58 1.41z"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPost;
