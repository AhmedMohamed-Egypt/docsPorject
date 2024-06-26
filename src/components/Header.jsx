import { useState } from "react";
import Dropdown from "./Dropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { UseTranslate } from "../context/TranslateContext";

function Header() {
  const [word, setWord] = useState("");
  const [showList, setShowList] = useState(false);
  const { dataLang,setActivateCategory } = UseTranslate();
  const handleChange = (e) => {
    setWord(e.target.value);
    setShowList(false);
  };
  const mainList = Object.keys(dataLang.maindocs).map((key) => {
    return { ...dataLang.maindocs[key][0] };
  });
  

  const searchedList =
    word.length > 0
      ? mainList.filter((item) => {
          return (
            item.title?.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
            item.titleNavBar?.toLowerCase().indexOf(word.toLowerCase()) > -1 ||
            item.firstText?.toLowerCase().indexOf(word.toLocaleLowerCase()) >-1 ||      
            item.secondText?.toLowerCase().indexOf(word.toLocaleLowerCase()) >-1||
            
            item.categoreyOne?.map((item)=>item.firstText.toLowerCase().indexOf(word.toLowerCase())>-1)||
            item.categoreyTwo?.map((item)=>item.firstText.toLowerCase().indexOf(word.toLowerCase())>-1)  
          );
        })
      : [];

  

  return (
    <div className="header-adrop d-flex  pdl-50 pdr-50  pdtop-9 pdb-9 align-items-center">
      <a
        className="header-adrop__logo white d-flex align-items-center"
        href="#"
      >
        <img src="/images/logo.png" />
        <p className="d-flex flex-column shrinkLineHeight">
          <span className="cairoBold size-36">MR.Gain</span>
          <span className=" size-12 lhf-font text-center">
            You can get profit!
          </span>
        </p>
      </a>
      <div className="searchBar d-flex align-items-center">
        <span>
          <svg
            enableBackground="new 0 0 32 32"
            id="Glyph"
            version="1.1"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
              id="XMLID_223_"
            />
          </svg>
        </span>
        <div className="input-search">
          <input
            type="text"
            placeholder={dataLang.search}
            onChange={(e) => handleChange(e)}
          />
          {searchedList.length > 0 && !showList && (
            <>
              <ul className="searchList">
                {searchedList.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      onClick={() => {setShowList((showList) => !showList);setActivateCategory(false)}}
                      to={`${item.path}`}
                    >{`${item.titleNavBar}/${item.title}`}</NavLink>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <p className="lghtv size-18 violietBorder align-self-center mrt-15">
        {dataLang.docs}
      </p>
      <Dropdown />
    </div>
  );
}

export default Header;
