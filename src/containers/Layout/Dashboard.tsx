export default function Dashboard() {
  return (
    <>
      <div className="card-body h-full flex flex-col justify-between">
        <div>
          <h1 className="text-lg font-bold tracking-wide">
            Congratulations Moe!
          </h1>
          <p className="text-gray-600 mt-2">Best seller of the month</p>
        </div>

        <div className="flex flex-row mt-10 items-end">
          <div className="flex-1">
            <h1 className="font-extrabold text-4xl text-teal-400">$89k</h1>
            <p className="mt-3 mb-4 text-xs text-gray-500">
              You have done 57.6% more sales today.
            </p>
            <a
              href="#"
              className="btn-shadow py-3"
            >
              view sales
            </a>
          </div>

          <div className="flex-1 ml-10 w-32 h-32 lg:w-auto lg:h-auto overflow-hidden">
            <img
              className="object-cover"
              src="img/congrats.svg"
            />
          </div>
        </div>
      </div>
    </>
  );
}
