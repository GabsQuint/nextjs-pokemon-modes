/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from "next";
import Link from "next/link";
import React from "react";
import OutlinedButtons from './components/buton';
import { useRouter } from 'next/router';

export const getStaticProps: GetStaticProps = async (ctx) => {
  const qntPerPage = 66;
  const currentPage: number = ctx.params?.currentPage !== undefined ? parseInt(ctx.params?.currentPage as string) : 0

  const min = currentPage == 0 ? 1 : ((currentPage * qntPerPage) + 1);
  const max = currentPage == 0 ? qntPerPage : ((currentPage + 1) * qntPerPage);
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`,
  );

  const pokemonList = await resp.json()
  var filtered = pokemonList.filter(currentPage === 0 ? pokemon => pokemon.id >= min && pokemon.id <= max : pokemon => pokemon.id >= min && pokemon.id <= max);

  return {
    props: {
      pokemon: filtered,
    },
  };
}

export default function Home({ pokemon }) {
  const currenRoute = useRouter() //htpsss://localhost:3000/3
  const pageIndex = currenRoute.query.currentPage === undefined ? 0 : parseFloat(currenRoute.query.currentPage as string)


  const handleClick = (e) => {
    e.preventDefault()
    currenRoute.push(`/${pageIndex}`)
  }

  return (
    <div className="bg-gray-50 ">
      <p className="text-center text-2xl">BEM VINDO A POKEDEX MAIS GIGANTE DO MUNDO</p>
      <div className="bg-gray-50 gap-4 grid iphone:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5">

        {pokemon.map((pokemon, idx) => (
          <div key={idx} className="mx-auto px-4 overflow-hidden rounded-xl bg-white shadow-2xl ">
            <div className="flex">
              <div className="shrink-1">
                <div>
                  <Link href={`/pokemon/${pokemon.id}`}>
                    <div className="h-72">
                      <a className="cursor-pointer">
                        <img className="pt-8 w-full object-contain  iphone:w-48 iphone:h-48 sm:w-48 sm:h-48 md:w-48 md:h-48 lg:w-48 lg:h-48 xl:w-48 xl:h-48 2xl:w-48 2xl:h-48"
                          src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                        />
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
      <div className="bg-gray-50 grid justify-items-center ">
        <div className="bg-transparent">
          <OutlinedButtons numeroDaRota={pageIndex}></OutlinedButtons>
        </div>
      </div>
    </div>
  );
}