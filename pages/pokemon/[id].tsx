/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Head from "../../node_modules/next/head";
import Link from "../../node_modules/next/link";
import { useRouter } from "../../node_modules/next/router";

export default function Details() {
  const {
    query: { id },
  } = useRouter();

  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function getPokemon() {
      const resp = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
      );
      setPokemon(await resp.json());
    }
    if (id) {
      getPokemon();
    }
  }, [id]);

  if (!pokemon) {
    return null;
  }
  

  const handleClick = (e) => {
    window.history.back()
  }



  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative bg-white px-6 pt-10 shadow-xl ring-1 ring-gray-900/5 iphone:mx-auto iphone:max-w-lg iphone:rounded-lg iphone:px-10 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10 md:mx-auto md:max-w-lg md:rounded-lg md:px-10 lg:mx-auto lg:max-w-lg lg:rounded-lg lg:px-10 xl:mx-auto xl:max-w-lg xl:rounded-lg xl:px-10 2xl:mx-auto 2xl:max-w-lg 2xl:rounded-lg 2xl:px-10">
        <div className="mx-auto max-w-md">
          <Head>
            <title>{pokemon.name}</title>
          </Head>
            <a onClick = {handleClick} className="text-lg italic font-normal hover:underline p-4 cursor-pointer">Back Home</a>

          <img className="h-48 w-full object-contain md:h-72 p-2"
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} />
        </div>
        <div className="p-8 w-full">
          <div className="text-2xl font-bold uppercase tracking-wide text-black text-center">{pokemon.name}</div>
          <div className="mt-1 block text-sm leading-tight text-black text-center">{pokemon.type.join(", ")}</div>
          <div className="p-8 w-full">
            <table className="w-full border-separate border-spacing-2 border border-slate-500 rounded-xl">
              <thead>
                <tr>
                  <th className="border border-slate-600 rounded-xl iphone:text-xs">Name</th>
                  <th className="border border-slate-600 rounded-xl iphone:text-xs">Value</th>
                </tr>
              </thead>
              <tbody>
                {pokemon.stats.map(({ name, value }) => (
                  <tr key={name}>
                    <td className="border border-slate-600 font-bold uppercase tracking-wide text-black p-1 rounded-xl iphone:text-xs">{name}</td>
                    <td className="border border-slate-600 p-1 rounded-xl ">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}