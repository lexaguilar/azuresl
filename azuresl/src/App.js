import React, { useEffect, useState } from 'react'
import logo from './logo.svg';

import './App.css';

function App() {

  const [vars, setVars] = useState([]);
  const [env, setEnv] = useState({});
  const [app, setApp] = useState('');

  const token = 'Om5pb2tmaTM3MmNlcWtpZzJ0dmdiNWZyZGdrbzQ0Z2hvaHJqZWhraGk0NmN4bTVxbXlhdnE=';

  const getData = async () =>{

    const headers=  {
      'Content-Type': 'application/json',     
      'Authorization': 'Basic ' + token,     
    };

    const urlDev = `http://ni-aws-ads-slf1/SistemasIntegrados/POSVirtual/_apis/release/definitions/${4}?api-version=5.0`
    const urlPre = `http://ni-aws-ads-slf1/SistemasIntegrados/POSVirtual/_apis/release/definitions/${5}?api-version=5.0`
    const urlPro = `http://ni-aws-ads-slf1/SistemasIntegrados/POSVirtual/_apis/release/definitions/${6}?api-version=5.0`

    const [
      _dev, _pre, _pro
    ] = await Promise.all([
      fetch(urlDev, { headers }).then(x => x.json()),
      fetch(urlPre, { headers }).then(x => x.json()),
      fetch(urlPro, { headers }).then(x => x.json())
    ]);    

    const _vars = [...new Set([      
      ...Object.entries(_dev.variables).map(x => x[0]),
      ...Object.entries(_pre.variables).map(x => x[0]),
      ...Object.entries(_pro.variables).map(x => x[0])
    ])];     
    
    setEnv({
      dev: _dev.variables,
      pre: _pre.variables,
      pro: _pro.variables
    });

    setVars(_vars);

  }

  useEffect(() => {   

    getData();
   
  }, [0]);

  console.log(env)

  return (
    <div className="App">
       <table>
          <thead>
            <tr>
              <th>Variables</th>
              <th>Dev</th>
              <th>Pre</th>
              <th>Pro</th>
            </tr>
          </thead>
          <tbody>
            {
              vars.map(currentVar => {

                console.log(env.dev[currentVar].value )

                const allIquals =   env.dev[currentVar].value == env.pre[currentVar].value && env.dev[currentVar].value == env.pro[currentVar].value

                const varDiff = allIquals ?  '' : 'var-diff'

                return <tr key={currentVar} className={varDiff}>
                  <td>{currentVar}</td>
                  <td>{env.dev[currentVar].value}</td>
                  <td>{env.pre[currentVar].value}</td>
                  <td>{env.pro[currentVar].value}</td> 
                </tr>

              })
            }
          </tbody>
       </table>
    </div>
  );
}

export default App;
