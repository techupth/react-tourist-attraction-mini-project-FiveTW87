import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
function App() {
  const [tourist, setTourist] = useState([]);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [inputSearch, setInputSearch] = useState("");
  const getTourist = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const results = await axios.get(
        `http://localhost:4001/trips?keywords=${inputSearch}`
      );
      setTourist(results.data.data);
      console.log(results.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };
  useEffect(() => {
    getTourist();
  }, [inputSearch]);
  return (
    <div className=" p-8 w-screen">
      <header className=" flex flex-col  gap-4 p-8">
        <h1 className=" text-5xl  text-sky-500 text-center">เที่ยวไหนดี</h1>
        <div className=" text-left">ค้นหาที่เที่ยว</div>
        <input
          className=" w-11/12 text-center w-fit"
          id="seach-tourist"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
          value={inputSearch}
        />
      </header>
      <main className="flex flex-col gap-4 w-screen">
        {tourist.map((item, index) => {
          const desciption = item.description.slice(0, 100) + "...";
          return (
            <div className="tourist-box flex gap-8" key={index}>
              <div className="tourist-big-img w-1/3">
                <img
                  className="rounded-lg h-96 w-fit "
                  src={item.photos[0]}
                  alt="torist-img-1"
                />
              </div>
              <div className="tourist-detail flex flex-col">
                <h1 className=" text-xl font-black">{item.title}</h1>
                <div className=" text-gray-400">{desciption}</div>
                <a
                  className=" text-sky-500 underline"
                  href={item.url}
                  target="_blank"
                >
                  อ่านต่อ
                </a>
                <div className="flex gap-4 text-gray-400">
                  หมวด{" "}
                  <div>
                    {item.tags.map((tag, index) => (
                      <span key={index}>
                        <span className="underline">{tag}</span>
                        {index !== item.tags.length - 1
                          ? index === item.tags.length - 2
                            ? " และ "
                            : " "
                          : ""}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-8 ">
                  <img
                    className="rounded-lg"
                    src={item.photos[1]}
                    alt="torist-img-1"
                    width="250"
                    height="250"
                  />
                  <img
                    className="rounded-lg"
                    src={item.photos[2]}
                    alt="torist-img-1"
                    width="250"
                    height="250"
                  />
                  <img
                    className="rounded-lg"
                    src={item.photos[3]}
                    alt="torist-img-1"
                    width="250"
                    height="250"
                  />
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error fetching data.</p>}
      </main>
    </div>
  );
}

export default App;
