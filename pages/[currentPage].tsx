import { GetStaticPaths } from 'next';
import Index, { getStaticProps } from './';

export default Index;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {

    const resp = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`,
      );
    const pokemonTotal = await resp.json()
    var pagTotal = pokemonTotal.length;
    const numberOfPages = Math.ceil(pagTotal / 12.0);

    const paths = Array(numberOfPages- 1).fill('').map((_, index) => {
        return { params: {currentPage: (index + 1).toString()}}
      })

    return {
        fallback: false,
        paths: paths,
    }
}