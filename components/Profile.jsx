'use client';

import PromptCard from '@components/PromptCard';
import { useEffect, useState } from 'react';

const Profile = ({ name, desc, posts, handleDel, handleEdit }) => {
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    if ((typeof window !== undefined) && (localStorage.getItem('postData'))) {
      const storedData = JSON.parse(localStorage.getItem('postData'));
      setLocalData(storedData);
    }
  }, []);

  return (
    <section className='w-full'>
      <h1 className='head_text text-left blue_gradient py-3'>
        {name}
        {"'s"} Profile
      </h1>
      <p className='desc'>{desc}</p>
      <div className='flex flex-wrap gap-5 my-8'>
        {(posts.length > 0 ? posts : localData).reverse().map((post) => {
          return (
            <PromptCard
              handleDel={handleDel}
              handleEdit={handleEdit}
              post={post}
              key={post._id}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Profile;
