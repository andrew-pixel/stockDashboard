
import { useEffect, useState } from 'react';
import './App.css';
import { GetData, GetWeekData } from './stock'
import List from './components/List';
import View from './components/View';
import { StockContext } from './stockContext';
function App() {

  const [stocks, setStocks] = useState([]);
  const [activeStock, setActiveStock] = useState("")
  const [weekData, setWeekData] = useState("")
  const [ticker, setTicker] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (stocks.length != 0) {
      localStorage.setItem("stocks", JSON.stringify(stocks)); //stores when array updates
    }
  }, [stocks]);

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('stocks'));

    if (res != null) {
      setStocks(res)
    }
  }, []);
  useEffect(() => {

    var result2;
    const getData = async () => {
      if (activeStock != "") {
        var result2 = await GetWeekData(activeStock.T);
        setWeekData(result2);
      }
    }
    getData()

  }, [activeStock]);
  function addToList(tickerName) {

    var result = GetData(tickerName)
    if (!stocks.find(key => key.T === tickerName)) {
      if (result != 0) {
        setStocks([...stocks, result]);
      }
    }
  }
  function setView(e) {
    e.preventDefault();
    setErr("")
    var result = GetData(ticker)

    if (result != 0) {
      setActiveStock(result)

      setTicker("")
    }
    else {
      setErr("Error: Check Ticker")
    }
  }
  function removeStock(tickerName) {
    setStocks(stocks.filter(s => s.T != tickerName))
  }
  return (
    <StockContext.Provider value={[activeStock, setActiveStock]}>
      <div className="container">

        <div>
          <List stocks={stocks} removeStock={removeStock} key={stocks.length} />
        </div>
        <div>
          <form onSubmit={setView}>
            <label>
              <input type="text" onChange={(e) => setTicker(e.target.value)} value={ticker} placeholder='Search for a ticker' />
              <p>{err}</p>
            </label>
            <input type="submit" value="Submit" />
          </form>
          <View active={activeStock} week={weekData} addToList={addToList} />
        </div>
      </div>
    </StockContext.Provider>
  );
}

export default App;
