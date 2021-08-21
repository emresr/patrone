import React, { useEffect, useState, FC } from 'react';

const Tag = (topic: any) => {
  return (
    <div className="your_topics_topic">
      <h1 className="your_topics_topic_title">{topic.topic}</h1>
    </div>
  );
};

export default Tag;
