import notFoundImg from '../assets/notFound.svg'

function NotFoundPage() {
    return (
        <div>
            <h2>Ups! Ens hem perdut.</h2>
            <img src={notFoundImg}/>
        </div>
    )
}

export default NotFoundPage