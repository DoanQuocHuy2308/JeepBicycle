import styleLienHe from "@/styles/lienhe.module.css"
import Link from "next/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhoneVolume, faEnvelope } from '@fortawesome/free-solid-svg-icons';
export default function lienhe() {
    return (
        <div>
            <div className={`${styleLienHe.background} w-full h-55 flex items-center justify-center`}>
                <div className="text-center">
                    <h2 className={styleLienHe.title}>Liên Hệ</h2>
                    <p className={styleLienHe.content}><Link href="/nguoidung/trangchu">Trang Chủ</Link> » Liên Hệ về JeepBicycle Việt Nam</p>
                </div>
            </div>
            <div className="w-full max-w-[540px] sm:max-w-[720px] text-center md:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto pt-10 pb-5 px-4 flex justify-center">
                <div className="grid grid-cols-3 space-x-8">
                    <div className="p-5 shadow shadow-gray-600 border-2 border-white">
                        <FontAwesomeIcon icon={faLocationDot} className="text-5xl m-5" />
                        <h3 className={styleLienHe.heading}>Địa Chỉ:</h3>
                        <p className={styleLienHe.text}>Toà nhà Vinahud, 105 đường Nguyễn Bá Khoản, Phường Trung Hòa, Quận Cầu Giấy</p>
                    </div>
                    <div className="p-5 shadow shadow-gray-600 border-2 border-white">
                        <FontAwesomeIcon icon={faEnvelope} className="text-5xl m-5" />
                        <h3 className={styleLienHe.heading}>Email:</h3>
                        <p className={styleLienHe.text}>infojeepbicycle@gmail.com</p>
                    </div>
                    <div className="p-5 shadow shadow-gray-600 border-2 border-white">
                        <FontAwesomeIcon icon={faPhoneVolume} className="text-5xl m-5" />
                        <h3 className={styleLienHe.heading}>Phone:</h3>
                        <p className={styleLienHe.text}>19003395 – 0792.66.88.99</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto relative max-w-[540px]  sm:max-w-[720px] md:max-w-[960px] lg:max-w-[1140px] xl:max-w-[1320px] mx-auto px-4 pb-10 flex justify-center">
                <div className="grid w-full grid-cols-2 space-x-5">
                    <div className="shadow-lg shadow-gray-600 h-[700px] border-2 border-white rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d286127.6826565675!2d105.88981459067634!3d20.706155008878095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313595dc0a211a01%3A0x98e07e982f7ad098!2zeGUgxJHhuqFwIMSRaeG7h24gSG9hbiBIb2E!5e1!3m2!1svi!2s!4v1742319031798!5m2!1svi!2s"
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="rounded-xl absolute left-[45%] top-[5%] h-[630px] w-[650px] shadow-2xl shadow-gray-600 bg-white border-2 border-white">
                        <form className=" mx-auto w-full h-full p-6 bg-white rounded-lg shadow-md">
                            <div className="mb-6">
                                <input type="text" id="name" placeholder="Doãn Quốc H" className="border border-gray-400 outline-none p-3 w-full rounded" required />
                            </div>
                            <div className="mb-6">
                                <input type="text" id="phone" placeholder="09********"  className="border p-3 border-gray-400 outline-none w-full rounded" required />
                            </div>
                            <div className="mb-6">
                                <input type="email" id="email" placeholder="doanquoch@gmail.com" className="border border-gray-400 outline-none p-3  w-full rounded" required />
                            </div>
                            <div className="mb-6">
                                <textarea name="content" id="content" className="border p-3 h-[200px] border-gray-400 w-full outline-none rounded"></textarea>
                            </div>
                            <div className="flex items-center mb-6">
                                <input type="checkbox" id="agree"  className="mr-2" required />
                                <label htmlFor="agree" className="text-xm font-medium text-gray-900">Chấp nhận điều khoản và điều kiện</label>
                            </div>
                            <button type="submit" className="bg-gray-700 hover:bg-black text-white p-2 rounded w-1/3">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};
