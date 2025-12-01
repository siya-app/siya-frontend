import { CheckIcon } from "lucide-react";

interface InfoDivBulletsProps {
    list: string[] | React.ReactNode[],
    title: string,
    customClass?: string,
}

function InfoDivBullets({ list, title, customClass }: InfoDivBulletsProps) {

    return (
        <div className={`flex flex-col justify-center items-center
        m-10 text-lg text-siya-principal montserrat-siya border-2 rounded-xl p-5
        border-l- border-r-10 border-t- border-b-10 border-siya-dark-green shadow-lg hover:shadow-none
        lg:w-2/3 lg:mx-auto ${customClass}
        `}>
            <h3 className="text-3xl m-2 mb-5 font-bold text-left">{title}</h3>
            <ul className="flex flex-col w-full text-left text-balance">
                {Array.isArray(list) && list.map((l, index) => (
                    <li key={index} className="list-none flex items-start gap-3 mb-2">
                        <CheckIcon className="w-6 h-6 flex-shrink-0 mt-1" />
                        <span className="leading-snug mb-2">{typeof l === 'string' ? l : l}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default InfoDivBullets