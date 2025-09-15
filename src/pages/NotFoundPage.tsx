import fallenIceCream from '../assets/fallen-icecream.jpg';

function NotFoundPage() {

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat m-0"
            style={{ backgroundImage: `url(${fallenIceCream})` }}>

            <h1 className='text-7xl md:text-8xl siyaLight-text mx-6 my-0 text-wrap montserrat-siya'>Ups! Ens hem perdut :(</h1>
            <div className='w-full h-70 md:h-100'></div>
            <p className='absolute left-3 bottom-3 md:left-6 md:bottom-6 text-xs text-gray-400'>Fotografia: Ramon Karolan</p>
        </div>
    )
}

export default NotFoundPage