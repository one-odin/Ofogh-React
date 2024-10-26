import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { adPropsTypes } from "../../types/Ad.types";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

const Index: React.FC = () => {
  const [allAds, setAllAds] = useState<adPropsTypes[]>([]);
  const [showItemsPagination, setShowItemsPagination] = useState<adPropsTypes[] | null>(null);

  const getAllData = async (): Promise<void> => {
    await fetch("http://localhost:3000/ads")
      .then((res) => res.json())
      .then((data) => {
        setAllAds(data);

        if (showItemsPagination) {
          setShowItemsPagination(data);
        }
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 mx-auto px-3">
        {/* header */}
        <h1 className="mb-4 mt-20 text-center text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-4xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-sky-400">آگهی ها</span>
        </h1>
        <p className="text-center font-normal text-gray-500 dark:text-gray-400">لیست آخرین آگهی های فروش و اجاره</p>

        {/* loading */}
        {!allAds && (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="max-w-sm p-10 text-center bg-gray-100 dark:bg-slate-700 rounded-3xl mx-auto h-96 w-72 animate-pulse"></div>
            <div className="max-w-sm p-10 text-center bg-gray-100 dark:bg-slate-700 rounded-3xl mx-auto h-96 w-72 animate-pulse"></div>
            <div className="max-w-sm p-10 text-center bg-gray-100 dark:bg-slate-700 rounded-3xl mx-auto h-96 w-72 animate-pulse"></div>
            <div className="max-w-sm p-10 text-center bg-gray-100 dark:bg-slate-700 rounded-3xl mx-auto h-96 w-72 animate-pulse"></div>
          </div>
        )}
        {/* posts */}
        <div className="text-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 justify-items-stretch p-16">
            {showItemsPagination?.map((item) => (
              <div key={item.id} className="w-full p-10 text-center bg-white dark:bg-slate-700 border border-gray-200 dark:border-gray-500 rounded-3xl mx-auto">
                <Link to={`/ads/ad-detail/${item.id}`}>
                  <h5 className="mb-8 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-300">{item.title}</h5>
                </Link>
                <p className="mb-5 font-normal text-gray-500 dark:text-gray-400 break-words">{item.address}</p>
                <Link to={`/ads/ad-detail/${item.id}`} className="inline-flex font-medium items-center group text-pink-500 hover:underline">
                  ادامه
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2 group-hover:transform group-hover:-translate-x-2 transition duration-300" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
        {allAds && <Pagination AllItems={allAds} setShowItemsPagination={setShowItemsPagination} itemPerPage={8} />}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
