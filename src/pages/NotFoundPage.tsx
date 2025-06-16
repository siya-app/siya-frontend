import notFoundImg from '../assets/notFound.svg'

function NotFoundPage() {
    return (
        <div>
            <h1 className='text-7xl m-6'>Ups! Ens hem perdut.</h1>
            <img src={notFoundImg}/>
        </div>
    )
}

export default NotFoundPage