import React from 'react';
import { useRouter } from 'next/router';

export default function OutlinedButtons({ numeroDaRota }) { //sempre numérico

    const router = useRouter()
  
    return (
      <div>
        {numeroDaRota == 1 ?
          <button className= " bg-sky-600 hover:bg-sky-700 " variant="outlined" onClick={() => router.push(`/`)}>
            Previus
          </button>
          : 
          <>
            {numeroDaRota !== 0 &&
              <button className= " bg-sky-600 hover:bg-sky-700 " variant="outlined" onClick={() => router.push(`/${numeroDaRota - 1}`)}>
                Previus
              </button>
            }
          </>
        }
        {numeroDaRota != 8 &&
          <button className= " bg-sky-600 hover:bg-sky-700 " variant="outlined" onClick={() => router.push(`/${numeroDaRota + 1}`)}>
            Next
          </button>
        }
      </div>
  
    );
  }