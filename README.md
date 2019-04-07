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

<font color="green">
    <h1>Fetch pros😎 </h1> 
</font>
<br>

- Is **native**
- Is **most faster**
- Is friendly and easy to lern
- Is compatible in most of the most used browsers
- Is modern and the remplace of XMLhttprequest object 
- Reduces javascript VM read and execution times
- Reduces compilation times, like webpack bundles
- Has more control of browser cache [Cache control](https://hacks.mozilla.org/2016/03/referrer-and-cache-control-apis-for-fetch/)
- It is built in low level from scratch [Fetch API source code](https://github.com/chromium/chromium/tree/master/third_party/blink/renderer/core/fetch)
- It is not necessary to load it from an external source
- It consumes less resources of server/client when, solving requests in less time
- No extra Javascript code 
- **0%** of unused Javascript, check nyc code coverage 
- Great handling of binary data type array buffers, blobs, etc 
- Request can be aborted by the AbortController [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort) 
- You can create and handle, Readable Streams similar to Node.js [Using readable streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams)

<br>

<font color="red">
    <h1>Fetch cons 💩</h1>
</font>

- Is it's a bit verbose, but u can use a really cool library called [**ky**](https://github.com/sindresorhus/ky) 🌳

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

### Code coverage
<h1>
<p align="center"><img src="https://github.com/Hume3/fetch-vs-axios/blob/master/resources/code-coverage.png" width="800"></p>
</h1>

24.1% is generally unused code, since Axios has features that nobody uses hehe.

<br>


### Fetch API browser compatibility

<h1>
<a href="https://developer.mozilla.org/es/docs/Web/API/Fetch_API">
<p align="center"><img src="https://github.com/Hume3/fetch-vs-axios/blob/master/resources/compatibily-table.png" width="800"></p>
</a>
</h1>

The first query is the most critical, if many customers make a query for the first time, 
this will generate a big load, all resources will be loaded completely from the server, this is where the miliseconds begin to gain relevance, the longer it takes to resolve a query, more resources of server and client are going to keep busy.

The size of Axios library minimized is of 13.3 KB, is really small, but combined whit others libraries of an project, can be increment the loading and compiling times of an application.

Making an analogy, we could say that three drops of water are nothing inside a glass but with a lot of drops it, he can be filled.

### Chromium source code references

[Fetch API](https://github.com/chromium/chromium/tree/master/third_party/blink/renderer/core/fetch)
<br/>
[XMLHttpRequest object](https://github.com/chromium/chromium/tree/master/third_party/blink/renderer/core/xmlhttprequest)

 