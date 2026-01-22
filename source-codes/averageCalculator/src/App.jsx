import { useState } from "react";
import "./App.css";

function App() {

  const [count, setCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [result, setResult] = useState(null);

  const points = {
    AA: 4,
    BA: 3.5,
    BB: 3,
    CB: 2.5,
    CC: 2,
    DC: 1.5,
    DD: 1,
    FD: 0.5,
    FF: 0
  };

  const handleCount = (n) => {
    const num = Number(n);
    setCount(num);
    setCourses(Array.from({ length: num }, () => ({ name: "", credit: "", grade: "" })));
    setResult(null);
  };

  const calculate = () => {
    let total = 0;
    let creditSum = 0;

    for (let i = 0; i < courses.length; i++) {
      const c = courses[i];

      if (!c.credit || !c.grade) {
        alert(`Lütfen ${i + 1}. ders için kredi ve harf notunu doldurun!`);
        return;
      }

      total += points[c.grade] * Number(c.credit);
      creditSum += Number(c.credit);
    }

    setResult((total / creditSum).toFixed(2));
  };


  return (
    <>
      <header>Başardım Mı?</header>

      <div className="page">
        <div className="courseNumber">
          <h2>Ders Dönem Sayısı:</h2>
          <select onChange={(e) => handleCount(e.target.value)}>
            <option value="">Seçiniz</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
          </select>
        </div>

        {courses.length > 0 && (
          <div className="courseHeaders">
            <div>Ders İsmi</div>
            <div>Kredi</div>
            <div>Harf Notu</div>
          </div>
        )}

        {courses.map((c, i) => (
          <div key={i} className="courses">
            <input
              type="text"
              placeholder="Ders İsmi"
              value={c.name}
              onChange={(e) => {
                const list = [...courses];
                list[i].name = e.target.value;
                setCourses(list);
              }}
            />

            <select
              value={c.credit}
              onChange={(e) => {
                const list = [...courses];
                list[i].credit = e.target.value;
                setCourses(list);
              }}
            >
              <option value="">Seçiniz</option>
              <option value={1}>1 Kredi</option>
              <option value={2}>2 Kredi</option>
              <option value={3}>3 Kredi</option>
              <option value={4}>4 Kredi</option>
              <option value={5}>5 Kredi</option>
              <option value={6}>6 Kredi</option>
              <option value={7}>7 Kredi</option>
              <option value={8}>8 Kredi</option>
              <option value={9}>9 Kredi</option>
            </select>

            <select
              value={c.grade}
              onChange={(e) => {
                const list = [...courses];
                list[i].grade = e.target.value;
                setCourses(list);
              }}
            >
              <option value="">Seçiniz</option>
              <option value="AA">AA</option>
              <option value="BA">BA</option>
              <option value="BB">BB</option>
              <option value="CB">CB</option>
              <option value="CC">CC</option>
              <option value="DC">DC</option>
              <option value="DD">DD</option>
              <option value="FD">FD</option>
              <option value="FF">FF</option>
            </select>
          </div>
        ))}

        <button onClick={calculate}>Sonucu Hesapla</button>

        {result && (
          <div className="result-box">
            <h2>Ortalama</h2>
            <p>{result}</p>
          </div>
        )}

      </div>

      <footer>© 2026 Başardım Mı? | Geliştiren: Güray Topağaç</footer>
    </>
  );
}

export default App;