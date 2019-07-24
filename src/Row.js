import React, {useState, useEffect} from "react";
import {combineLatest, fromEvent, merge} from "rxjs";
import {debounceTime, flatMap, map, startWith} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";
import {reject, resolve} from "q";
import {getCloseButtonStream} from "./Observe";

const suggestionStyle = {"padding": "5px"};

const linkStyle = {
    "display": "inline-block",
    "position": "relative",
    // "bottom": "15px",
    "left": "5px"
};

function Row(props) {

    const [name, setName] = useState("");

    const rowId = "closeBtn"+props.btnId;

    useEffect(() => {

        var thing = getCloseButtonStream(rowId)
            .subscribe(json => {
                setName(json.login)
            });

        // returned function will be called when the component unmounts
        return () => thing.unsubscribe();

        // an input of empty array means useEffect will only be called once
    }, []);

    return (
        <li style={suggestionStyle}>
            {name === undefined ? "LOADING..." : name}
            <a href="#" id={rowId} style={linkStyle}>x</a>
        </li>
    )
}

export default Row