interface IFloatingLabel<T> {
  type: string;
  label: string;
  value: string | number;
  disabled: boolean;
  property: keyof T;
  action: (property: string, value: string | number) => void;
  errors: Partial<T>;
}

const FloatingLabel = <T,>({
  type,
  label,
  value,
  disabled = false,
  action,
  property,
  errors,
}: IFloatingLabel<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      event.target.type === "number" ? +event.target.value : event.target.value;
    action(property.toString(), newValue);
  };

  const formattedValue = () => {
    let result: string = "";
    switch (type) {
      case "date":
        // eslint-disable-next-line no-case-declarations
        const dateObject: Date = new Date(value);
        result = !isNaN(dateObject.getTime())
          ? dateObject.toISOString().split("T")[0]
          : "";
        break;
      case "number":
        result = value.toString();
        break;
      default:
        result = value ? value.toString() : "";
        break;
    }

    return result;
  };

  return (
    <div className="relative z-0">
      <input
        id={property.toString()}
        type={type}
        name={property.toString()}
        value={formattedValue()}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
        className={`${errors[property] ? "border-red-500" : ""} ${
          !disabled
            ? "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            : "block py-2.5 px-0 w-full text-sm text-gray-300 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-sky-600 peer"
        }`}
        placeholder=" "
      />
      <label
        htmlFor={property.toString()}
        className={`${errors[property] ? "text-red-500" : ""}
        ${
          !disabled
            ? "absolute text-sm text-sky-700  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-sky-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            : "absolute text-sm text-gray-400  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
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
