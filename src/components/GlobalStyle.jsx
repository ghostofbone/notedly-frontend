import {createGlobalStyle} from "styled-components";
import normalize from 'normalize.css'

export default createGlobalStyle`
    ${normalize}
    
    *, *:before, *:after {
        box-sizing: border-box;
    }
    
    body,
    html{
        height: 100%;
        margin: 0;
    }
    
    body{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #fff;
        line-height: 1.4;
    }
    a:link, a:visited{
        text-decoration: none;
        color: #0077cc;
        transition: all ease-in-out 0.4s;
    }
    a:hover, a:active{
        
    }
    code,
    pre{
        max-width: 100%;
    }
`