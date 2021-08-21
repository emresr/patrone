import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

const Profile: React.FC<{}> = () => {
  const [me, setMe] = useState<any>();

  useEffect(() => {}, []);
  return <div className="profile_container"></div>;
};

export default Profile;
