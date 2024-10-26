export default function Footer() {
  return (
    <div className="p-6 mt-12 border-t border-gray-300 w-screen dark:bg-slate-900 dark:border-slate-800">
      <div className="text-center sm:flex sm:justify-between sm:text-left">
        <p className="text-sm leading-6 text-gray-900 dark:text-gray-100">
          <span className="block sm:inline">تمامی حقوق محفوظ است.</span>
        </p>

        <p className="text-sm leading-6 text-gray-900 dark:text-gray-100 me-5">&copy; 2024</p>
      </div>
    </div>
  );
}
