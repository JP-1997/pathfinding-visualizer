import React from 'react';
import Grid from './containers/Grid/Grid';
import './App.css';
import Layout from './hoc/Layout/Layout';


const App = () => {

  const gridRef = React.useRef();
  const xs = window.matchMedia("(max-width: 576px)").matches;
  const sm = window.matchMedia("(min-width: 576px)").matches;
  const md = window.matchMedia("(min-width: 768px)").matches;
  const lg = window.matchMedia("(min-width: 960px)").matches;
  const xl = window.matchMedia("(min-width: 1200px)").matches;

  const getNumberOfRows = () => {
    if (xl) return 41;
    if (lg) return 37;
    if (md) return 39;
    if (sm) return 43;
    if (xs) return 43;
    return 60;
  };

  const getNumberOfColumns = () => {
    if (xl) return 61;
    if (lg) return 45;
    if (md) return 51;
    if (sm) return 41;
    if (xs) return 31;
    return 100;
  };

  return (
    <div className="app">
      <Layout>
      </Layout>
        <div className="content">
          <Grid ref={gridRef} rows={getNumberOfRows()} columns={getNumberOfColumns()} />
        </div>
    </div>

  );

};

export default App;
