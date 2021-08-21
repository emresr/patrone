import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const Main: React.FC<{}> = () => {
  const { name }: any = useParams();

  const [tag, setTag] = useState<any>();

  const fetchData = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_LINK}/tag/${name}`, {
      headers: { Accept: 'application/json' },
    });
    setTag(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {tag && (
        <div className="tag_container">
          <h1 className="tag_title">{tag.name}</h1>
          {tag.posts.map((post: any) => (
            <div className="tag_post_container">
              <h1>{post.title}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
