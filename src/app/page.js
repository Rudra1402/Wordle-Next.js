'use client'
import { useEffect, useState } from 'react';

export default function YourComponent() {
  const [fileContent, setFileContent] = useState([]);
  const [word, setWord] = useState(null);
  const [isGameCompleted, setIsGameCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWordCompleted, setIsWordCompleted] = useState({
    w1: false,
    w2: false,
    w3: false,
    w4: false,
    w5: false
  })

  useEffect(() => {
    const fetchFileContent = async () => {
      const res = await fetch('/api/readFile');
      const data = await res.json();
      setFileContent(data.content?.split('\n'));
    };
    fetchFileContent();
  }, []);

  const selectWord = () => {
    setLoading(true);
    if (fileContent?.length > 0) {
      let arrLen = fileContent?.length;
      const randomInt = Math.floor(Math.random() * arrLen);
      setWord(fileContent[randomInt].trim().toUpperCase());
      setLoading(false);
    }
  }

  useEffect(() => {
    selectWord();
  }, [fileContent])

  const handleReset = () => {
    setIsGameCompleted(false);
    setIsWordCompleted({
      w1: false,
      w2: false,
      w3: false,
      w4: false,
      w5: false
    });
    selectWord();
    let arr = document.getElementsByClassName('container1');
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.backgroundColor = 'transparent';
      arr[i].textContent = '';
    }
    arr = document.getElementsByClassName('container2');
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.backgroundColor = 'transparent';
      arr[i].textContent = '';
    }
    arr = document.getElementsByClassName('container3');
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.backgroundColor = 'transparent';
      arr[i].textContent = '';
    }
    arr = document.getElementsByClassName('container4');
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.backgroundColor = 'transparent';
      arr[i].textContent = '';
    }
    arr = document.getElementsByClassName('container5');
    for (let i = 0; i < arr.length; i++) {
      arr[i].style.backgroundColor = 'transparent';
      arr[i].textContent = '';
    }
  }

  const handleKeyboardInput = (idLetter) => {
    const enteredLetter = document.getElementById(idLetter).textContent;
    handleLetterEnter(enteredLetter);
  }

  const showResultDialog = (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 w-5/6 md:w-3/4 xl:w-1/2 bg-gray-200 text-gray-700 rounded-md flex items-center justify-center z-20'>
      <div
        className='text-5xl cursor-pointer leading-none rotate-45 absolute top-1 right-1 text-red-500'
        onClick={() => setShowResult(false)}
      >+</div>
      {isGameCompleted
        ? <div className='text-xl md:text-2xl leading-none'>Congratulations! You guessed it correct!</div>
        : null
      }
      {isWordCompleted.w5 && !isGameCompleted
        ? <div className='text-xl md:text-2xl leading-none'>OOPS! The correct word is {word}!</div>
        : null
      }
    </div>
  )

  const handleLetterEnter = (letter) => {
    if (!isGameCompleted && isWordCompleted.w5) {
      setShowResult(true);
    } else if (!isGameCompleted) {
      let containerArr;
      if (!isWordCompleted.w1) {
        containerArr = Array.from(document.getElementsByClassName('container1'));
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (containerElement.textContent === '') {
            containerElement.textContent = letter;
            break;
          }
        }
      } else if (!isWordCompleted.w2) {
        containerArr = Array.from(document.getElementsByClassName('container2'));
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (containerElement.textContent === '') {
            containerElement.textContent = letter;
            break;
          }
        }
      } else if (!isWordCompleted.w3) {
        containerArr = Array.from(document.getElementsByClassName('container3'));
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (containerElement.textContent === '') {
            containerElement.textContent = letter;
            break;
          }
        }
      } else if (!isWordCompleted.w4) {
        containerArr = Array.from(document.getElementsByClassName('container4'));
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (containerElement.textContent === '') {
            containerElement.textContent = letter;
            break;
          }
        }
      } else if (!isWordCompleted.w5) {
        containerArr = Array.from(document.getElementsByClassName('container5'));
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (containerElement.textContent === '') {
            containerElement.textContent = letter;
            break;
          }
        }
      }
    }
    else {
      setShowResult(true);
    }
  }

  const handleBackspacePress = () => {
    let containerArr;
    if (!isWordCompleted.w1) {
      containerArr = Array.from(document.getElementsByClassName('container1'));
      if (containerArr[0].textContent !== '') {
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (containerElement.textContent === '') {
            containerArr[i - 1].textContent = '';
            break;
          }
        }
        if (containerArr[4].textContent !== '') {
          containerArr[4].textContent = '';
        }
      }
    } else if (!isWordCompleted.w2) {
      containerArr = Array.from(document.getElementsByClassName('container2'));
      if (containerArr[0].textContent !== '') {
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (containerElement.textContent === '') {
            containerArr[i - 1].textContent = '';
            break;
          }
        }
        if (containerArr[4].textContent !== '') {
          containerArr[4].textContent = '';
        }
      }
    } else if (!isWordCompleted.w3) {
      containerArr = Array.from(document.getElementsByClassName('container3'));
      if (containerArr[0].textContent !== '') {
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (containerElement.textContent === '') {
            containerArr[i - 1].textContent = '';
            break;
          }
        }
        if (containerArr[4].textContent !== '') {
          containerArr[4].textContent = '';
        }
      }
    } else if (!isWordCompleted.w4) {
      containerArr = Array.from(document.getElementsByClassName('container4'));
      if (containerArr[0].textContent !== '') {
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (containerElement.textContent === '') {
            containerArr[i - 1].textContent = '';
            break;
          }
        }
        if (containerArr[4].textContent !== '') {
          containerArr[4].textContent = '';
        }
      }
    } else if (!isWordCompleted.w5) {
      containerArr = Array.from(document.getElementsByClassName('container5'));
      if (containerArr[0].textContent !== '') {
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (containerElement.textContent === '') {
            containerArr[i - 1].textContent = '';
            break;
          }
        }
        if (containerArr[4].textContent !== '') {
          containerArr[4].textContent = '';
        }
      }
    }
  }

  const handleEnterPress = () => {
    let containerArr;
    let countCorrect = 0;
    if (!isWordCompleted.w1) {
      containerArr = Array.from(document.getElementsByClassName('container1'));
      countCorrect = 0;
      if (containerArr[4].textContent !== '') {
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (word[i] === containerElement.textContent) {
            containerArr[i].style.backgroundColor = '#538d4e';
            countCorrect++;
          }
          else if (word.includes(containerElement.textContent))
            containerArr[i].style.backgroundColor = '#b59f3b';
        }
        setIsWordCompleted({ ...isWordCompleted, w1: true });
        if (countCorrect === 5) {
          setIsGameCompleted(true);
          setShowResult(true);
        }
      }
    } else if (!isWordCompleted.w2) {
      containerArr = Array.from(document.getElementsByClassName('container2'));
      countCorrect = 0;
      if (containerArr[4].textContent !== '') {
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (word[i] === containerElement.textContent) {
            containerArr[i].style.backgroundColor = '#538d4e';
            countCorrect++;
          }
          else if (word.includes(containerElement.textContent))
            containerArr[i].style.backgroundColor = '#b59f3b';
        }
        setIsWordCompleted({ ...isWordCompleted, w2: true });
        if (countCorrect === 5) {
          setIsGameCompleted(true);
          setShowResult(true);
        }
      }
    } else if (!isWordCompleted.w3) {
      containerArr = Array.from(document.getElementsByClassName('container3'));
      countCorrect = 0;
      if (containerArr[4].textContent !== '') {
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (word[i] === containerElement.textContent) {
            containerArr[i].style.backgroundColor = '#538d4e';
            countCorrect++;
          }
          else if (word.includes(containerElement.textContent))
            containerArr[i].style.backgroundColor = '#b59f3b';
        }
        setIsWordCompleted({ ...isWordCompleted, w3: true });
        if (countCorrect === 5) {
          setIsGameCompleted(true);
          setShowResult(true);
        }
      }
    } else if (!isWordCompleted.w4) {
      containerArr = Array.from(document.getElementsByClassName('container4'));
      countCorrect = 0;
      if (containerArr[4].textContent !== '') {
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (word[i] === containerElement.textContent) {
            containerArr[i].style.backgroundColor = '#538d4e';
            countCorrect++;
          }
          else if (word.includes(containerElement.textContent))
            containerArr[i].style.backgroundColor = '#b59f3b';
        }
        setIsWordCompleted({ ...isWordCompleted, w4: true });
        if (countCorrect === 5) {
          setIsGameCompleted(true);
          setShowResult(true);
        }
      }
    } else if (!isWordCompleted.w5) {
      containerArr = Array.from(document.getElementsByClassName('container5'));
      countCorrect = 0;
      if (containerArr[4].textContent !== '') {
        for (let i = 0; i < containerArr.length; i++) {
          const containerElement = containerArr[i];
          if (word[i] === containerElement.textContent) {
            containerArr[i].style.backgroundColor = '#538d4e';
            countCorrect++;
          }
          else if (word.includes(containerElement.textContent))
            containerArr[i].style.backgroundColor = '#b59f3b';
        }
        setIsWordCompleted({ ...isWordCompleted, w5: true });
        if (countCorrect === 5) {
          setIsGameCompleted(true);
        }
        setShowResult(true);
      }
    } else {
      setShowResult(true);
    }
  }

  const PopulateKeyboard = () => {
    return (
      <div className='flex flex-col gap-1.5 mt-4 items-center text-base scale-100 select-none'>
        <div className='flex gap-1.5 items-center'>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='q'
            onClick={() => handleKeyboardInput('q')}
          >Q</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='w'
            onClick={() => handleKeyboardInput('w')}
          >W</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='e'
            onClick={() => handleKeyboardInput('e')}
          >E</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='r'
            onClick={() => handleKeyboardInput('r')}
          >R</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='t'
            onClick={() => handleKeyboardInput('t')}
          >T</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='y'
            onClick={() => handleKeyboardInput('y')}
          >Y</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='u'
            onClick={() => handleKeyboardInput('u')}
          >U</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='i'
            onClick={() => handleKeyboardInput('i')}
          >I</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='o'
            onClick={() => handleKeyboardInput('o')}
          >O</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='p'
            onClick={() => handleKeyboardInput('p')}
          >P</div>
        </div>
        <div className='flex gap-1.5 items-center'>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='a'
            onClick={() => handleKeyboardInput('a')}
          >A</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='s'
            onClick={() => handleKeyboardInput('s')}
          >S</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='d'
            onClick={() => handleKeyboardInput('d')}
          >D</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='f'
            onClick={() => handleKeyboardInput('f')}
          >F</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='g'
            onClick={() => handleKeyboardInput('g')}
          >G</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='h'
            onClick={() => handleKeyboardInput('h')}
          >H</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='j'
            onClick={() => handleKeyboardInput('j')}
          >J</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='k'
            onClick={() => handleKeyboardInput('k')}
          >K</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='l'
            onClick={() => handleKeyboardInput('l')}
          >L</div>
          <div
            className='h-9 w-fit px-1.5 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white border border-gray-400'
            onClick={handleEnterPress}
          >Enter</div>
        </div>
        <div className='flex gap-1.5 items-center'>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='z'
            onClick={() => handleKeyboardInput('z')}
          >Z</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='x'
            onClick={() => handleKeyboardInput('x')}
          >X</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='c'
            onClick={() => handleKeyboardInput('c')}
          >C</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='v'
            onClick={() => handleKeyboardInput('v')}
          >V</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='b'
            onClick={() => handleKeyboardInput('b')}
          >B</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='n'
            onClick={() => handleKeyboardInput('n')}
          >N</div>
          <div
            className='h-9 w-6 border border-gray-400 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white'
            id='m'
            onClick={() => handleKeyboardInput('m')}
          >M</div>
          <div
            className='h-9 w-fit px-1.5 rounded-sm cursor-pointer flex items-center justify-center bg-gray-600 text-white border border-gray-400'
            onClick={handleBackspacePress}
          >Backspace</div>
        </div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-blue-900">
      {loading
        ? <div className='text-3xl leading-none'>Loading...</div>
        : <div className='flex flex-col gap-2 p-4 items-center justify-start text-xl min-h-screen w-full relative'>
          {showResult ? showResultDialog : null}
          <div className='p-2 tracking-wider mb-2 underline underline-offset-8'>WORDLE</div>
          <div className='flex gap-2 items-center'>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container1'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container1'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container1'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container1'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container1'
            ></div>
          </div>
          <div className='flex gap-2 items-center'>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container2'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container2'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container2'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container2'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container2'
            ></div>
          </div>
          <div className='flex gap-2 items-center'>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container3'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container3'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container3'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container3'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container3'
            ></div>
          </div>
          <div className='flex gap-2 items-center'>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container4'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container4'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container4'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container4'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container4'
            ></div>
          </div>
          <div className='flex gap-2 items-center'>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container5'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container5'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container5'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container5'
            ></div>
            <div
              className='h-10 w-10 bg-transparent border rounded flex items-center justify-center container5'
            ></div>
          </div>
          <PopulateKeyboard />
          {isGameCompleted || (!isGameCompleted && isWordCompleted.w5)
            ? <button
              className='border-none mt-4 bg-gray-100 px-4 py-1.5 text-gray-600 text-base rounded leading-none'
              onClick={handleReset}
            >Reset</button>
            : null
          }
        </div>
      }
    </main >
  );
}
