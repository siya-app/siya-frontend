import notFoundImg from '../assets/notFound.svg';
import fallenIceCream from '../assets/pexels-ramonkaphotography-31266820.jpg';

function NotFoundPage() {

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat m-0"
            style={{ backgroundImage: `url(${fallenIceCream})` }}
        >

            <h1 className='text-7xl siyaLight-text mx-6 my-0 text-balance'>Ups! Ens hem perdut :(</h1>
            {/* <img
                src={fallenIceCream}
                className='min-h-full min-w-full'
            /> */}
        </div>
    )
}

export default NotFoundPage