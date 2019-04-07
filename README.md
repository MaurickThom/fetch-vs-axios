<h1>
<p align="center"><img src="https://github.com/Hume3/fetch-vs-axios/blob/master/resources/banner.png" width="400"></p>
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

#### Fetch pros
- Is **native**
- Is **most faster**
- Is reduces compilation times, like webpack bundles
- Is reduces javascript VM read times
- Is modern and the remplace of XMLhttprequest object 
- Has more control of cache
- It is not necessary to load it from an external source
- It consumes less resources of server/client when, solving request in less time
- No unused Javascript code 
- Great handling of binary data type array buffers, blobs, etc 
- Request can be controled by the Controller 
- You can create and handle, Readable Streams similar to Node.js

#### Fetch pros
- Is it's a bit verbose, but u can use a library called [**ky** ](https://github.com/sindresorhus/ky)

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

### Fetch API browser compatibility

<h1>
<a href="https://developer.mozilla.org/es/docs/Web/API/Fetch_API">
<p align="center"><img src="https://github.com/Hume3/fetch-vs-axios/blob/master/resources/compatibily-table.png" width="800"></p>
</a>
</h1>

### Chromium source code references

[Fetch API](https://github.com/chromium/chromium/tree/master/third_party/blink/renderer/core/fetch)
<br/>
[XMLHttpRequest object](https://github.com/chromium/chromium/tree/master/third_party/blink/renderer/core/xmlhttprequest)
