'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import PromptCard from './PromptCard';
import { debounce, has } from 'lodash';
import OutputPopUp from './OutputPopUp';

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [postList, setPostList] = useState([]);
  const [prompt, setPrompt] = useState('');
  const searchInputRef = useRef();
  const [showGenAIOutput, setShowGenAIOutput] = useState(false);

  const fetchSearchResults = async (string) => {
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({
          q: string,
        }),
      });
      const results = await res.json();
      setPostList(results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = debounce((e) => {
    // Debouncing is done to reduce redundant sequential funtion calls and delay it by mentioned time
    const string = e.target.value;
    setSearchText(string);
    fetchSearchResults(string);
  }, 500);

  const hashTagClick = (tag) => {
    setSearchText(tag);
    searchInputRef.current.value = tag;
    fetchSearchResults(tag);
  };

  const genAIOutputPopUp = (prompt) => {
    setPrompt(prompt);
    setShowGenAIOutput((prev) => !prev);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch('/api/prompt');
        setPostList(await res.json());
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  return (
    <section
      className='flex flex-wrap w-full gap-5 my-5'
    >
      <input
        type='text'
        className='form_input'
        placeholder='Search username, #tag or keyword...'
        onChange={handleSearch}
        ref={searchInputRef}
      />
      {postList.map((post) => {
        return (
          <PromptCard
            post={post}
            key={post._id}
            hashTagClick={hashTagClick}
            genAIOutputPopUp={genAIOutputPopUp}
          />
        );
      })}
      {showGenAIOutput && (
        <OutputPopUp setShowGenAIOutput={setShowGenAIOutput} prompt={prompt} />
      )}
    </section>
  );
};

export default Feed;
