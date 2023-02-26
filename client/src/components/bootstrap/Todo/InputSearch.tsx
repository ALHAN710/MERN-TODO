import React from "react";

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
};
const InputSearch: React.FC<Props> = ({ show, setShow, setSearchFilter }) => {
  const [textSearch, setTextSearch] = React.useState("");

  const toggleMenu = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setShow(!show);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
    setSearchFilter(e.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        className="form-control input-search"
        placeholder="Search Task..."
        value={textSearch}
        onChange={handleChange}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-menu mail-menu d-lg-none cursor-pointer"
        onClick={toggleMenu}
      >
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </div>
  );
};

export default InputSearch;
