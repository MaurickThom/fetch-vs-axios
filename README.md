<h1>
<p align="center"><img src="https://github.com/Hume3/fetch-vs-axios/blob/master/banner.png?raw=true" width="400"></p>
</h1>
<br>

In this repository is made a comparison of the **native Fetch API** vs latest version of the **Axios library** (XMLhttprequest). 

**Procedures**

## Install all depedencies
```bash
npm install 
```
## Run the tests
```bash
npm run bench 
```
<br>

#### Benchmark demo

Cache status: **false** <br>
Total requests: **1000** <br>
Resource: **files/image.jpg** <br>
Content type: **image/jpg** <br>
Content length: **864069** <br>
#### Promedy time per request
Note: The difference increases based on the size of the data transferred <br>
`Axios` **±35 ms** <br>
`Fetch` **±10 ms** <br>
Percent difference: **250%** <br>

<br>

### Browser compatibility

<h1>
<p align="center"><img src="https://github.com/Hume3/fetch-vs-axios/blob/master/banner.png?raw=true" width="400"></p>
</h1>

### Chromium source code references

[Fetch API](https://github.com/chromium/chromium/tree/master/third_party/blink/renderer/core/fetch)
<br/>
[XMLHttpRequest object](https://github.com/chromium/chromium/tree/master/third_party/blink/renderer/core/xmlhttprequest)
