import { PiInstagramLogoBold } from "react-icons/pi";
import { AiFillMail } from "react-icons/ai";
import calling from '../assets/calling.png';
import agreement from '../assets/agreement.png'



function contactUsPage() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="
            bg-gray-100
            place-items-center
            text-wrap
            mt-6 text-gray-700
            rounded-xl
            border-siya-principal
            border-r-4 border-b-4
            w-fit p-4">
                <p>
                    <AiFillMail className="inline-icon me-2"/>
                    siya.bcn.app@gmail.com</p>
            </div>
            <div className="
            bg-gray-100
            place-items-center
            text-wrap
            mt-6 text-gray-700
            rounded-xl
            border-siya-principal
            border-r-4 border-b-4
            w-fit p-4">
                <a href="https://www.instagram.com/siya__app/">
                <PiInstagramLogoBold className="inline-icon me-2"/>
                    @siya__app</a>
            </div>
            <img className="animate-bounce w-1/2 mt-15" src={agreement}></img>
        </div>
    )
}

export default contactUsPage