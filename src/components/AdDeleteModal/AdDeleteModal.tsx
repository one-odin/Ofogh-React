import { useContext, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { showToastError, showToastSuccess } from "../../utils/ShowToast";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../context/globalContext";
import { ToastContainer } from "react-toastify";

type AdDeleteProps = {
  adID: string | undefined;
};

const AdDelete: React.FC<AdDeleteProps> = ({ adID }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const globalContext = useContext(GlobalContext);

  const deletePostHandler = () => {
    if (!globalContext.isLoggedIn) {
      navigate("/login");
    } else {
      fetch(`http://localhost:3000/ads/${adID}`, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) {
          showToastError("عملیات انجام نشد، بعدا تلاش نمایید");
        }
        showToastSuccess("آگهی مورد نظر با موفقيت حذف گرديد");
        setShowModal(false);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      });
    }
  };

  return (
    <>
      <TrashIcon type="button" onClick={() => setShowModal(true)} className="text-red-700 w-6 cursor-pointer" />
      <ToastContainer />
      <Dialog open={showModal} onClose={setShowModal} className="relative" style={{ zIndex: "1000" }}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="max-w-lg space-y-4 border bg-white dark:bg-slate-700 dark:border-gray-600 px-12 py-9 rounded-3xl">
              <DialogTitle className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div className="text-lg font-normal text-gray-500 dark:text-gray-300">آيا از حذف آگهی اطمينان داريد ؟</div>
              </DialogTitle>
              <div className="flex gap-4">
                <button
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={() => {
                    deletePostHandler();
                  }}
                >
                  بله، مطمئنم
                </button>
                <button
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  onClick={() => setShowModal(false)}
                >
                  خير، بستن
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AdDelete;
