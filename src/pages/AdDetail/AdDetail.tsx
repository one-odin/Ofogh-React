import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MapComponent from "../../components/MapComponent/MapComponent";

import { adPropsTypes } from "../../types/Ad.types";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import AdDeleteModal from "../../components/AdDeleteModal/AdDeleteModal";

const AdDetail: React.FC = () => {
  const [adDetail, setAdDetail] = useState<adPropsTypes>();
  const [lat, setLat] = useState<number | undefined>(undefined);
  const [lng, setLng] = useState<number | undefined>(undefined);

  const adID = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/ads/${adID.id}`)
      .then((res) => res.json())
      .then((data) => {
        setAdDetail(data);
        setLat(data.lat);
        setLng(data.lng);
        console.log(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-12 p-16">
      <div className="text-gray-950 dark:text-gray-400">
        <div className="flex justify-between">
          <div>
            <div className="text-3xl font-bold mb-3 dark:text-gray-300">{adDetail?.title}</div>
            <div className="mb-5 text-xl">{adDetail?.address}</div>
            <div className="mb-5 text-xl">
              شماره تماس: <span className="dark:text-gray-200">{adDetail?.mobile}</span>
            </div>
          </div>
          <div>
            <div className="flex gap-3">
              <Link to={`/ads/ad-edit/${adDetail?.id}`}>
                <PencilSquareIcon className="text-blue-700 w-6" />
              </Link>
              <AdDeleteModal adID={adID.id} />
            </div>
          </div>
        </div>

        <div className="whitespace-pre-line border border-gray-400 dark:border-gray-700 rounded-2xl p-7">
          <div className="mb-4">توضیحات :</div>
          {adDetail?.description}
        </div>
      </div>
      <div className="text-gray-950 dark:text-gray-400 border border-gray-400 dark:border-gray-700 text-xl rounded-2xl p-7">
        {lat !== undefined && lng !== undefined ? (
          <MapComponent lat={lat} lng={lng} />
        ) : (
          <p>در حال بارگذاری...</p> // پیام بارگذاری یا کامپوننت دیگری
        )}
      </div>
    </div>
  );
};

export default AdDetail;
