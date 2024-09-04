interface IFloatingLabel<T> {
  type: string;
  label: string;
  value: string | number;
  property: keyof T;
  action: (property: string, value: string | number) => void;
  errors: Partial<T>;
}

const FloatingLabel = <T,>({
  type,
  label,
  value,
  action,
  property,
  errors,
}: IFloatingLabel<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.type === "number" ? +event.target.value : event.target.value;
    action(property.toString(), newValue);
  };

  return (
    <div className="relative">
      <input
        id={property.toString()}
        type={type}
        name={property.toString()}
        value={value ?? ""}
        onChange={handleChange}
        className={`block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer ${
          errors[property] ? "border-red-500" : ""
        }`}
        placeholder=""
        autoComplete="false"
      />
      <label
        htmlFor={property.toString()}
        className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto ${
          errors[property] ? "text-red-500" : ""
        }`}
      >
        {label}
      </label>
      {errors && errors[property] && (
        <p className="text-red-500 text-xs italic mt-2">
          {String(errors[property])}
        </p>
      )}
    </div>
  );
};
export default FloatingLabel;
