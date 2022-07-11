/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import OutlinedButtons from './components/buton';
import { useRouter } from 'next/router';

export const getStaticProps: GetStaticProps = async (ctx) => { 
  const qntPerPage = 99;
  const currentPage:number = ctx.params?.currentPage !== undefined ? parseInt(ctx.params?.currentPage as string) : 0

  const min = currentPage == 0 ? 1 : ((currentPage * qntPerPage) + 1);
  const max = currentPage == 0 ? qntPerPage : ((currentPage + 1) * qntPerPage);
  console.log(min)
  console.log(max)
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`,
  );

  const pokemonList = await resp.json()
  var filtered = pokemonList.filter(currentPage === 0 ? pokemon => pokemon.id >= min && pokemon.id <= max : pokemon => pokemon.id  >= min && pokemon.id <= max);

  return {
    props: {
      pokemon: filtered,
    },
  };
}

export default function Home({ pokemon }) {
  const currenRoute = useRouter() //htpsss://localhost:3000/3
  const pageIndex = currenRoute.query.currentPage === undefined ? 0 :  parseFloat(currenRoute.query.currentPage as string)

  return (
    <div className="bg-gray-50 ">
            <OutlinedButtons numeroDaRota={pageIndex}></OutlinedButtons>
      <p className="text-center text-2xl ">BEM VINDO A POKEDEX MAIS GIGANTE DO MUNDO</p>
      <div className="bg-gray-50 grid grid-cols-3 gap-4 ">

        {pokemon.map((pokemon, idx) => (
          <div key={idx} className="mx-auto px-4 before:max-w-md overflow-hidden rounded-xl bg-white shadow-2xl md:max-w-1x1 ">
            <div className="md:flex">
              <div className="md:shrink-1">
                <div>
                  <Link href={`/pokemon/${pokemon.id}`}>
                    <div className="h-72">
                      <a className="cursor-pointer">
                        <img className="h-48 pt-8 w-full object-contain md:w-48"
                          src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                        />
                        <p></p>
                        <div className="p-8">
                          <div className="text-sm text-center font-semibold uppercase tracking-wide">{pokemon.name}</div>
                        </div>
                      </a>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  );
}