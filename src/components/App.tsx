import { useState } from "react";
import st from "./App.module.scss";

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div className={st.container}>
            <h1 className={st.title}>Hello world</h1>
            <h3 className={st.counter}>{count}</h3>
            <button
                className={st.increaser}
                onClick={() => setCount((prev) => prev + 1)}
            >
                count++
            </button>
        </div>
    );
};

export default App;
