import React, {useState} from "react";
import {DataImport} from "@heuron/vtk-module";

function App(){
    const [volume, setVolume] = useState(null);

    const callbackData = (data: any) => {
        console.log('data', data);
    };

    return (<div><DataImport callbackData={callbackData}/></div>);
}

export default App;
