"use client";
import { useContext, useState } from "react";
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from "@headlessui/react";
import { UserIcon, UserPlusIcon, Bars3Icon, XMarkIcon, PowerIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import GlobalContext from "../../context/globalContext";

const blogs = [
  {
    name: "ورود",
    href: "/login",
    icon: UserIcon,
  },
  {
    name: "ثبت نام",
    href: "/register",
    icon: UserPlusIcon,
  },
];

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<Boolean>(false);

  const globalContext = useContext(GlobalContext);

  return (
    <header className="bg-white shadow-md dark:bg-slate-900">
      <div className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6 dark:text-gray-100" aria-hidden="true" />
          </button>
        </div>
        <div className="flex lg:flex-1">
          <div className="lg:hidden me-4">
            <DarkModeSwitch checked={globalContext.dark} onChange={globalContext.changeTheme} sunColor={"#474646"} moonColor={"#dbd9d9"} size={25} />
          </div>
          <Link to="/" className="-m-1.5 p-1.5">
            {/* logo */}
            <svg className="h-6 w-auto" viewBox="0 0 256 150">
              <defs>
                <linearGradient id="logosMeilisearch0" x1="153.821%" x2="19.172%" y1="-7.638%" y2="89.239%">
                  <stop offset="0%" stopColor="#ff5caa"></stop>
                  <stop offset="100%" stopColor="#ff4e62"></stop>
                </linearGradient>
                <linearGradient id="logosMeilisearch1" x1="117.325%" x2="-17.323%" y1="-7.638%" y2="89.238%">
                  <stop offset="0%" stopColor="#ff5caa"></stop>
                  <stop offset="100%" stopColor="#ff4e62"></stop>
                </linearGradient>
                <linearGradient id="logosMeilisearch2" x1="80.828%" x2="-53.821%" y1="-7.638%" y2="89.238%">
                  <stop offset="0%" stopColor="#ff5caa"></stop>
                  <stop offset="100%" stopColor="#ff4e62"></stop>
                </linearGradient>
              </defs>
              <path fill="url(#logosMeilisearch0)" d="M0 149.288L47.297 28.277A44.462 44.462 0 0 1 88.708 0h28.515L69.926 121.012a44.462 44.462 0 0 1-41.411 28.276z"></path>
              <path fill="url(#logosMeilisearch1)" d="m69.386 149.289l47.297-121.012A44.462 44.462 0 0 1 158.095 0h28.514l-47.297 121.012a44.462 44.462 0 0 1-41.411 28.277z"></path>
              <path fill="url(#logosMeilisearch2)" d="m138.777 149.289l47.297-121.012A44.46 44.46 0 0 1 227.484 0H256l-47.297 121.012a44.463 44.463 0 0 1-41.412 28.277z"></path>
            </svg>
          </Link>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm leading-6 text-gray-900 dark:text-gray-50">
            صفحه اصلی
          </Link>
          <Link to="/ads/ad-new" className="text-sm leading-6 text-gray-900 dark:text-gray-50">
            افزودن آگهی
          </Link>
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm leading-6 text-gray-900 dark:text-gray-50">
              حساب کاربری
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </PopoverButton>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel className="absolute top-full z-10 mt-3 w-md max-w-md overflow-hidden rounded-3xl bg-white dark:bg-slate-800 ring-1 ring-gray-900/5">
                <div className="p-4">
                  {globalContext.isLoggedIn === true ? (
                    <>
                      <div className="group relative flex items-center gap-x-4 rounded-lg p-2 text-sm leading-0 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <UserIcon className="h-6 w-6 text-gray-600 group-hover:text-pink-500" aria-hidden="true" />
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-gray-50">{globalContext.userInfo?.email}</div>
                      </div>
                      <div className="group relative flex items-center gap-x-4 rounded-lg p-2 text-sm leading-0 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <PowerIcon className="h-6 w-6 text-gray-600 group-hover:text-pink-500" aria-hidden="true" />
                        </div>
                        <button className="font-semibold text-gray-900 dark:text-gray-50" onClick={globalContext.logout}>
                          خروج
                        </button>
                      </div>
                    </>
                  ) : (
                    blogs.map((item) => (
                      <div key={item.name} className="group relative flex w-lg w-max items-center gap-x-4 rounded-lg p-2 text-sm leading-0 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-pink-500" aria-hidden="true" />
                        </div>
                        <Link to={item.href} className="block font-semibold text-gray-900 dark:text-gray-50">
                          {item.name}
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </PopoverPanel>
            </Transition>
          </Popover>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <DarkModeSwitch checked={globalContext.dark} onChange={globalContext.changeTheme} sunColor={"#474646"} moonColor={"#dbd9d9"} size={25} />
        </div>
      </div>
      <Dialog className="lg:hidden" open={Boolean(mobileMenuOpen)} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              {/* logo */}
              <svg className="h-6 w-auto" viewBox="0 0 256 150">
                <defs>
                  <linearGradient id="logosMeilisearch0" x1="153.821%" x2="19.172%" y1="-7.638%" y2="89.239%">
                    <stop offset="0%" stopColor="#ff5caa"></stop>
                    <stop offset="100%" stopColor="#ff4e62"></stop>
                  </linearGradient>
                  <linearGradient id="logosMeilisearch1" x1="117.325%" x2="-17.323%" y1="-7.638%" y2="89.238%">
                    <stop offset="0%" stopColor="#ff5caa"></stop>
                    <stop offset="100%" stopColor="#ff4e62"></stop>
                  </linearGradient>
                  <linearGradient id="logosMeilisearch2" x1="80.828%" x2="-53.821%" y1="-7.638%" y2="89.238%">
                    <stop offset="0%" stopColor="#ff5caa"></stop>
                    <stop offset="100%" stopColor="#ff4e62"></stop>
                  </linearGradient>
                </defs>
                <path fill="url(#logosMeilisearch0)" d="M0 149.288L47.297 28.277A44.462 44.462 0 0 1 88.708 0h28.515L69.926 121.012a44.462 44.462 0 0 1-41.411 28.276z"></path>
                <path fill="url(#logosMeilisearch1)" d="m69.386 149.289l47.297-121.012A44.462 44.462 0 0 1 158.095 0h28.514l-47.297 121.012a44.462 44.462 0 0 1-41.411 28.277z"></path>
                <path fill="url(#logosMeilisearch2)" d="m138.777 149.289l47.297-121.012A44.46 44.46 0 0 1 227.484 0H256l-47.297 121.012a44.463 44.463 0 0 1-41.412 28.277z"></path>
              </svg>
            </Link>
            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 dark:text-gray-100" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root text-right">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link to="/" className="-mx-3 block rounded-lg px-3 py-2 leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700">
                  صفحه اصلی
                </Link>
                <Link to="/ads/ad-new" className="-mx-3 block rounded-lg px-3 py-2 leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700">
                  ثبت آگهی
                </Link>
                {globalContext.isLoggedIn === true ? (
                  <>
                    <div className="group relative flex items-center justify-end gap-x-4 rounded-lg p-2 text-sm leading-0 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <button className="font-semibold text-base text-gray-900 dark:text-gray-50" onClick={globalContext.logout}>
                        خروج
                      </button>
                      <PowerIcon className="h-5 w-5 text-gray-600 group-hover:text-pink-500" aria-hidden="true" />
                    </div>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2 leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-100">
                      ورود
                    </Link>
                    <Link to="/register" className="-mx-3 block rounded-lg px-3 py-2 leading-7 text-gray-900 dark:text-gray-50 hover:bg-gray-100">
                      ثبت نام
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default Header;
