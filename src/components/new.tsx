import React, { useMemo, useState, useRef } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

const New: React.FC<{}> = () => {
  const [text, setText] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const history = useHistory();

  function Submit() {
    if (!title) {
      return;
    }
    if (!text) {
      return;
    }
    const data = {
      title: title,
      content: text,
      authorEmail: 'emre',
    };

    const response: any = axios
      .post(`${process.env.REACT_APP_API_LINK}/post`, data)
      .then(function (response) {
        console.log(response);
        history.push(`/post/${response.data.id}`);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  return (
    <div className="new_container">
      <h1 className="new_post">New Post</h1>
      <form>
        <input
          placeholder="Titlte"
          className="new_title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          className="editor"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </form>{' '}
      <button className="submit" onClick={Submit}>
        Share
      </button>{' '}
    </div>
  );
};

export default New;
