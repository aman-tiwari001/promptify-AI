import { generateText } from '@utils/gemini';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formatText } from '@utils/formatText';
import Markdown from 'markdown-to-jsx';

const OutputPopUp = ({ prompt, setShowGenAIOutput }) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  useEffect(() => {
    setLoading(true);
    const genAI = async () => {
      const resp = await generateText(prompt);
      setText(resp);
      setLoading(false);
    };
    genAI();
  }, [prompt]);
  return (
    <div className='w-screen h-screen fixed top-0 left-0 backdrop-filter backdrop-brightness-[0.2]'>
      <div className='rounded-lg w-[87%] sm:w-[65%] shadow-xl p-4 bg-white fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 max-h-[80vh] min-h-20 overflow-y-auto'>
        <div className='flex justify-between items-center'>
          <div></div>
          <h2 className='text-orange-600 font-bold text-xl'>
            GEN AI : Powered by <span className='blue_gradient'> Gemini</span>
          </h2>
          <Image
            src='/assets/icons/cross.png'
            width={40}
            height={40}
            alt='cross'
            className='hover:opacity-70'
            onClick={() => setShowGenAIOutput(false)}
          />
        </div>
        <div className='desc p-2 text-wrap text-left'>
          <p className='mb-3 text-black font-bold text-xl'>{prompt}</p>
          <p className='text-lg'>
            <Markdown>{text}</Markdown>
          </p>
        </div>

        {loading && (
          <Image
            src='/assets/images/ai-loader.gif'
            width={100}
            height={100}
            alt='cross'
            className='mx-auto'
            onClick={() => setShowGenAIOutput(false)}
          />
        )}
      </div>
    </div>
  );
};

export default OutputPopUp;
