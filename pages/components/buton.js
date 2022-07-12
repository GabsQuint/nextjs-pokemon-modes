import React from 'react';
import { useRouter } from 'next/router';

export default function OutlinedButtons({ numeroDaRota }) { //sempre numérico

  const router = useRouter()
  return (
    <div className="grid gap-4">
      <div>
        {numeroDaRota == 1 ?
          <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none rounded-full px-10 text-white text-xl" variant="outlined" onClick={() => router.push(`/`)}>
            Previus
          </button>
          :
          <>
            {numeroDaRota !== 0 &&
              <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none  rounded-full px-10 text-white text-xl" variant="outlined" onClick={() => router.push(`/${numeroDaRota - 1}`)}>
                Previus
              </button>
            }
          </>
        }
        {numeroDaRota != 12 &&
          <button className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none rounded-full px-10 text-white text-xl" variant="outlined" onClick={() => router.push(`/${numeroDaRota + 1}`)}>
            Next
          </button>
        }
      </div>
    </div>
  );
}