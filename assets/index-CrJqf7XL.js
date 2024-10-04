(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=n(i);fetch(i.href,o)}})();var S;(function(e){e.STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object"})(S||(S={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var b;(function(e){e.LANGUAGE_UNSPECIFIED="language_unspecified",e.PYTHON="python"})(b||(b={}));var T;(function(e){e.OUTCOME_UNSPECIFIED="outcome_unspecified",e.OUTCOME_OK="outcome_ok",e.OUTCOME_FAILED="outcome_failed",e.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded"})(T||(T={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N=["user","model","function","system"];var M;(function(e){e.HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",e.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",e.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",e.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",e.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT"})(M||(M={}));var L;(function(e){e.HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",e.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",e.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",e.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",e.BLOCK_NONE="BLOCK_NONE"})(L||(L={}));var x;(function(e){e.HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",e.NEGLIGIBLE="NEGLIGIBLE",e.LOW="LOW",e.MEDIUM="MEDIUM",e.HIGH="HIGH"})(x||(x={}));var G;(function(e){e.BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",e.SAFETY="SAFETY",e.OTHER="OTHER"})(G||(G={}));var _;(function(e){e.FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",e.STOP="STOP",e.MAX_TOKENS="MAX_TOKENS",e.SAFETY="SAFETY",e.RECITATION="RECITATION",e.LANGUAGE="LANGUAGE",e.OTHER="OTHER"})(_||(_={}));var D;(function(e){e.TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",e.RETRIEVAL_QUERY="RETRIEVAL_QUERY",e.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",e.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",e.CLASSIFICATION="CLASSIFICATION",e.CLUSTERING="CLUSTERING"})(D||(D={}));var H;(function(e){e.MODE_UNSPECIFIED="MODE_UNSPECIFIED",e.AUTO="AUTO",e.ANY="ANY",e.NONE="NONE"})(H||(H={}));/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f extends Error{constructor(t){super(`[GoogleGenerativeAI Error]: ${t}`)}}class C extends f{constructor(t,n){super(t),this.response=n}}class B extends f{constructor(t,n,s,i){super(t),this.status=n,this.statusText=s,this.errorDetails=i}}class E extends f{}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V="https://generativelanguage.googleapis.com",J="v1beta",W="0.20.0",X="genai-js";var m;(function(e){e.GENERATE_CONTENT="generateContent",e.STREAM_GENERATE_CONTENT="streamGenerateContent",e.COUNT_TOKENS="countTokens",e.EMBED_CONTENT="embedContent",e.BATCH_EMBED_CONTENTS="batchEmbedContents"})(m||(m={}));class z{constructor(t,n,s,i,o){this.model=t,this.task=n,this.apiKey=s,this.stream=i,this.requestOptions=o}toString(){var t,n;const s=((t=this.requestOptions)===null||t===void 0?void 0:t.apiVersion)||J;let o=`${((n=this.requestOptions)===null||n===void 0?void 0:n.baseUrl)||V}/${s}/${this.model}:${this.task}`;return this.stream&&(o+="?alt=sse"),o}}function Q(e){const t=[];return e!=null&&e.apiClient&&t.push(e.apiClient),t.push(`${X}/${W}`),t.join(" ")}async function Z(e){var t;const n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",Q(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let s=(t=e.requestOptions)===null||t===void 0?void 0:t.customHeaders;if(s){if(!(s instanceof Headers))try{s=new Headers(s)}catch(i){throw new E(`unable to convert customHeaders value ${JSON.stringify(s)} to Headers: ${i.message}`)}for(const[i,o]of s.entries()){if(i==="x-goog-api-key")throw new E(`Cannot set reserved header name ${i}`);if(i==="x-goog-api-client")throw new E(`Header name ${i} can only be set using the apiClient field`);n.append(i,o)}}return n}async function ee(e,t,n,s,i,o){const a=new z(e,t,n,s,o);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},se(o)),{method:"POST",headers:await Z(a),body:i})}}async function O(e,t,n,s,i,o={},a=fetch){const{url:r,fetchOptions:d}=await ee(e,t,n,s,i,o);return te(r,d,a)}async function te(e,t,n=fetch){let s;try{s=await n(e,t)}catch(i){ne(i,e)}return s.ok||await ie(s,e),s}function ne(e,t){let n=e;throw e instanceof B||e instanceof E||(n=new f(`Error fetching from ${t.toString()}: ${e.message}`),n.stack=e.stack),n}async function ie(e,t){let n="",s;try{const i=await e.json();n=i.error.message,i.error.details&&(n+=` ${JSON.stringify(i.error.details)}`,s=i.error.details)}catch{}throw new B(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${n}`,e.status,e.statusText,s)}function se(e){const t={};if((e==null?void 0:e.signal)!==void 0||(e==null?void 0:e.timeout)>=0){const n=new AbortController;(e==null?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),e!=null&&e.signal&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function A(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),I(e.candidates[0]))throw new C(`${g(e)}`,e);return oe(e)}else if(e.promptFeedback)throw new C(`Text not available. ${g(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),I(e.candidates[0]))throw new C(`${g(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),U(e)[0]}else if(e.promptFeedback)throw new C(`Function call not available. ${g(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),I(e.candidates[0]))throw new C(`${g(e)}`,e);return U(e)}else if(e.promptFeedback)throw new C(`Function call not available. ${g(e)}`,e)},e}function oe(e){var t,n,s,i;const o=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const a of(i=(s=e.candidates)===null||s===void 0?void 0:s[0].content)===null||i===void 0?void 0:i.parts)a.text&&o.push(a.text),a.executableCode&&o.push("\n```"+a.executableCode.language+`
`+a.executableCode.code+"\n```\n"),a.codeExecutionResult&&o.push("\n```\n"+a.codeExecutionResult.output+"\n```\n");return o.length>0?o.join(""):""}function U(e){var t,n,s,i;const o=[];if(!((n=(t=e.candidates)===null||t===void 0?void 0:t[0].content)===null||n===void 0)&&n.parts)for(const a of(i=(s=e.candidates)===null||s===void 0?void 0:s[0].content)===null||i===void 0?void 0:i.parts)a.functionCall&&o.push(a.functionCall);if(o.length>0)return o}const ae=[_.RECITATION,_.SAFETY,_.LANGUAGE];function I(e){return!!e.finishReason&&ae.includes(e.finishReason)}function g(e){var t,n,s;let i="";if((!e.candidates||e.candidates.length===0)&&e.promptFeedback)i+="Response was blocked",!((t=e.promptFeedback)===null||t===void 0)&&t.blockReason&&(i+=` due to ${e.promptFeedback.blockReason}`),!((n=e.promptFeedback)===null||n===void 0)&&n.blockReasonMessage&&(i+=`: ${e.promptFeedback.blockReasonMessage}`);else if(!((s=e.candidates)===null||s===void 0)&&s[0]){const o=e.candidates[0];I(o)&&(i+=`Candidate was blocked due to ${o.finishReason}`,o.finishMessage&&(i+=`: ${o.finishMessage}`))}return i}function w(e){return this instanceof w?(this.v=e,this):new w(e)}function re(e,t,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var s=n.apply(e,t||[]),i,o=[];return i={},a("next"),a("throw"),a("return"),i[Symbol.asyncIterator]=function(){return this},i;function a(l){s[l]&&(i[l]=function(c){return new Promise(function(u,v){o.push([l,c,u,v])>1||r(l,c)})})}function r(l,c){try{d(s[l](c))}catch(u){y(o[0][3],u)}}function d(l){l.value instanceof w?Promise.resolve(l.value.v).then(h,p):y(o[0][2],l)}function h(l){r("next",l)}function p(l){r("throw",l)}function y(l,c){l(c),o.shift(),o.length&&r(o[0][0],o[0][1])}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;function ce(e){const t=e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0})),n=ue(t),[s,i]=n.tee();return{stream:le(s),response:de(i)}}async function de(e){const t=[],n=e.getReader();for(;;){const{done:s,value:i}=await n.read();if(s)return A(fe(t));t.push(i)}}function le(e){return re(this,arguments,function*(){const n=e.getReader();for(;;){const{value:s,done:i}=yield w(n.read());if(i)break;yield yield w(A(s))}})}function ue(e){const t=e.getReader();return new ReadableStream({start(s){let i="";return o();function o(){return t.read().then(({value:a,done:r})=>{if(r){if(i.trim()){s.error(new f("Failed to parse stream"));return}s.close();return}i+=a;let d=i.match(k),h;for(;d;){try{h=JSON.parse(d[1])}catch{s.error(new f(`Error parsing JSON response: "${d[1]}"`));return}s.enqueue(h),i=i.substring(d[0].length),d=i.match(k)}return o()})}}})}function fe(e){const t=e[e.length-1],n={promptFeedback:t==null?void 0:t.promptFeedback};for(const s of e){if(s.candidates)for(const i of s.candidates){const o=i.index;if(n.candidates||(n.candidates=[]),n.candidates[o]||(n.candidates[o]={index:i.index}),n.candidates[o].citationMetadata=i.citationMetadata,n.candidates[o].finishReason=i.finishReason,n.candidates[o].finishMessage=i.finishMessage,n.candidates[o].safetyRatings=i.safetyRatings,i.content&&i.content.parts){n.candidates[o].content||(n.candidates[o].content={role:i.content.role||"user",parts:[]});const a={};for(const r of i.content.parts)r.text&&(a.text=r.text),r.functionCall&&(a.functionCall=r.functionCall),r.executableCode&&(a.executableCode=r.executableCode),r.codeExecutionResult&&(a.codeExecutionResult=r.codeExecutionResult),Object.keys(a).length===0&&(a.text=""),n.candidates[o].content.parts.push(a)}}s.usageMetadata&&(n.usageMetadata=s.usageMetadata)}return n}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function P(e,t,n,s){const i=await O(t,m.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),s);return ce(i)}async function Y(e,t,n,s){const o=await(await O(t,m.GENERATE_CONTENT,e,!1,JSON.stringify(n),s)).json();return{response:A(o)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function q(e){if(e!=null){if(typeof e=="string")return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function R(e){let t=[];if(typeof e=="string")t=[{text:e}];else for(const n of e)typeof n=="string"?t.push({text:n}):t.push(n);return he(t)}function he(e){const t={role:"user",parts:[]},n={role:"function",parts:[]};let s=!1,i=!1;for(const o of e)"functionResponse"in o?(n.parts.push(o),i=!0):(t.parts.push(o),s=!0);if(s&&i)throw new f("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!s&&!i)throw new f("No content is provided for sending chat message.");return s?t:n}function ge(e,t){var n;let s={model:t==null?void 0:t.model,generationConfig:t==null?void 0:t.generationConfig,safetySettings:t==null?void 0:t.safetySettings,tools:t==null?void 0:t.tools,toolConfig:t==null?void 0:t.toolConfig,systemInstruction:t==null?void 0:t.systemInstruction,cachedContent:(n=t==null?void 0:t.cachedContent)===null||n===void 0?void 0:n.name,contents:[]};const i=e.generateContentRequest!=null;if(e.contents){if(i)throw new E("CountTokensRequest must have one of contents or generateContentRequest, not both.");s.contents=e.contents}else if(i)s=Object.assign(Object.assign({},s),e.generateContentRequest);else{const o=R(e);s.contents=[o]}return{generateContentRequest:s}}function F(e){let t;return e.contents?t=e:t={contents:[R(e)]},e.systemInstruction&&(t.systemInstruction=q(e.systemInstruction)),t}function Ee(e){return typeof e=="string"||Array.isArray(e)?{content:R(e)}:e}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],me={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]};function pe(e){let t=!1;for(const n of e){const{role:s,parts:i}=n;if(!t&&s!=="user")throw new f(`First content should be with role 'user', got ${s}`);if(!N.includes(s))throw new f(`Each item should include role field. Got ${s} but valid roles are: ${JSON.stringify(N)}`);if(!Array.isArray(i))throw new f("Content should have 'parts' property with an array of Parts");if(i.length===0)throw new f("Each Content should have at least one part");const o={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(const r of i)for(const d of j)d in r&&(o[d]+=1);const a=me[s];for(const r of j)if(!a.includes(r)&&o[r]>0)throw new f(`Content with role '${s}' can't contain '${r}' part`);t=!0}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $="SILENT_ERROR";class ye{constructor(t,n,s,i={}){this.model=n,this.params=s,this._requestOptions=i,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=t,s!=null&&s.history&&(pe(s.history),this._history=s.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(t,n={}){var s,i,o,a,r,d;await this._sendPromise;const h=R(t),p={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(o=this.params)===null||o===void 0?void 0:o.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(d=this.params)===null||d===void 0?void 0:d.cachedContent,contents:[...this._history,h]},y=Object.assign(Object.assign({},this._requestOptions),n);let l;return this._sendPromise=this._sendPromise.then(()=>Y(this._apiKey,this.model,p,y)).then(c=>{var u;if(c.response.candidates&&c.response.candidates.length>0){this._history.push(h);const v=Object.assign({parts:[],role:"model"},(u=c.response.candidates)===null||u===void 0?void 0:u[0].content);this._history.push(v)}else{const v=g(c.response);v&&console.warn(`sendMessage() was unsuccessful. ${v}. Inspect response object for details.`)}l=c}),await this._sendPromise,l}async sendMessageStream(t,n={}){var s,i,o,a,r,d;await this._sendPromise;const h=R(t),p={safetySettings:(s=this.params)===null||s===void 0?void 0:s.safetySettings,generationConfig:(i=this.params)===null||i===void 0?void 0:i.generationConfig,tools:(o=this.params)===null||o===void 0?void 0:o.tools,toolConfig:(a=this.params)===null||a===void 0?void 0:a.toolConfig,systemInstruction:(r=this.params)===null||r===void 0?void 0:r.systemInstruction,cachedContent:(d=this.params)===null||d===void 0?void 0:d.cachedContent,contents:[...this._history,h]},y=Object.assign(Object.assign({},this._requestOptions),n),l=P(this._apiKey,this.model,p,y);return this._sendPromise=this._sendPromise.then(()=>l).catch(c=>{throw new Error($)}).then(c=>c.response).then(c=>{if(c.candidates&&c.candidates.length>0){this._history.push(h);const u=Object.assign({},c.candidates[0].content);u.role||(u.role="model"),this._history.push(u)}else{const u=g(c);u&&console.warn(`sendMessageStream() was unsuccessful. ${u}. Inspect response object for details.`)}}).catch(c=>{c.message!==$&&console.error(c)}),l}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ve(e,t,n,s){return(await O(t,m.COUNT_TOKENS,e,!1,JSON.stringify(n),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ce(e,t,n,s){return(await O(t,m.EMBED_CONTENT,e,!1,JSON.stringify(n),s)).json()}async function _e(e,t,n,s){const i=n.requests.map(a=>Object.assign(Object.assign({},a),{model:t}));return(await O(t,m.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:i}),s)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(t,n,s={}){this.apiKey=t,this._requestOptions=s,n.model.includes("/")?this.model=n.model:this.model=`models/${n.model}`,this.generationConfig=n.generationConfig||{},this.safetySettings=n.safetySettings||[],this.tools=n.tools,this.toolConfig=n.toolConfig,this.systemInstruction=q(n.systemInstruction),this.cachedContent=n.cachedContent}async generateContent(t,n={}){var s;const i=F(t),o=Object.assign(Object.assign({},this._requestOptions),n);return Y(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},i),o)}async generateContentStream(t,n={}){var s;const i=F(t),o=Object.assign(Object.assign({},this._requestOptions),n);return P(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(s=this.cachedContent)===null||s===void 0?void 0:s.name},i),o)}startChat(t){var n;return new ye(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:(n=this.cachedContent)===null||n===void 0?void 0:n.name},t),this._requestOptions)}async countTokens(t,n={}){const s=ge(t,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),i=Object.assign(Object.assign({},this._requestOptions),n);return ve(this.apiKey,this.model,s,i)}async embedContent(t,n={}){const s=Ee(t),i=Object.assign(Object.assign({},this._requestOptions),n);return Ce(this.apiKey,this.model,s,i)}async batchEmbedContents(t,n={}){const s=Object.assign(Object.assign({},this._requestOptions),n);return _e(this.apiKey,this.model,t,s)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(t){this.apiKey=t}getGenerativeModel(t,n){if(!t.model)throw new f("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new K(this.apiKey,t,n)}getGenerativeModelFromCachedContent(t,n,s){if(!t.name)throw new E("Cached content must contain a `name` field.");if(!t.model)throw new E("Cached content must contain a `model` field.");const i=["model","systemInstruction"];for(const a of i)if(n!=null&&n[a]&&t[a]&&(n==null?void 0:n[a])!==t[a]){if(a==="model"){const r=n.model.startsWith("models/")?n.model.replace("models/",""):n.model,d=t.model.startsWith("models/")?t.model.replace("models/",""):t.model;if(r===d)continue}throw new E(`Different value for "${a}" specified in modelParams (${n[a]}) and cachedContent (${t[a]})`)}const o=Object.assign(Object.assign({},n),{model:t.model,tools:t.tools,toolConfig:t.toolConfig,systemInstruction:t.systemInstruction,cachedContent:t});return new K(this.apiKey,o,s)}}const Re={BASE_URL:"/Summify/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};async function Oe(e,t){console.log(Re);const s=new we(void 0).getGenerativeModel({model:"gemini-1.5-flash",systemInstruction:"You are an expert at content summarisation good at giving concise and meaningful summary of contents by preserving key information, main ideas, and essential details omiting unnecessary information, redundant phrases, and trivial details maintaining objectivity and neutrality, avoiding bias and personal opinions ensuring the summary is easy to understand, clear, and free of jargon."}),i=`Generate a ${t} length summarisation of the document below: `;try{const a=(await s.generateContent(i+`
`+e)).response.text();document.getElementById("output").innerText=a}catch(o){return console.log(o),!1}}Oe(`The Curious Life of Albert Einstein

In the quaint town of Ulm, Germany, on March 14, 1879, a spark of genius ignited. Albert Einstein, the future icon of modern physics, was born to Hermann and Pauline Einstein. Little did they know that their curious, mischievous child would one day revolutionize our understanding of space, time, and the universe.

Early Years: A Curious Mind

Young Albert's fascination with science and mathematics began with a compass his father gave him. The mysterious needle, always pointing north, captivated him. He spent hours pondering the invisible forces at play. This curiosity would become the hallmark of his life's work.

As a child, Einstein was a slow learner, but his passion for knowledge drove him to devour books on mathematics, physics, and philosophy. He taught himself calculus, geometry, and astronomy, often neglecting his schoolwork. His parents worried, but Albert's thirst for knowledge couldn't be contained.

*The Swiss Years: Education and Inspiration*

In 1894, Einstein moved to Switzerland to attend the Swiss Federal Polytechnic University. Here, he immersed himself in theoretical physics, studying the works of Maxwell, Lorentz, and Planck. His imagination was sparked by the ideas of space and time.

During his studies, Einstein befriended Michele Besso, a fellow physicist who shared his enthusiasm for theoretical discussions. These conversations laid the groundwork for some of Einstein's most groundbreaking ideas.

*Patent Clerk and Theoretical Physicist*

After graduating, Einstein struggled to find academic employment. He took a job as a patent clerk in Bern, Switzerland, evaluating inventions related to electrical and mechanical engineering. This seemingly mundane work allowed him to ponder the mysteries of the universe.

In 1905, Einstein's annus mirabilis (miracle year), he published four revolutionary papers:

1. *Special Relativity*: Introduced the concept of time dilation and length contraction.
2. *Photoelectric Effect*: Explained the behavior of light and electrons.
3. *Brownian Motion*: Provided evidence for the existence of atoms.
4. *Equivalence of Energy and Mass*: Proposed the famous equation E=mc².

*Rise to Fame and International Recognition*

Einstein's work caught the attention of the scientific community. In 1915, he expanded his theory of relativity to include gravity with his *General Theory of Relativity*. This groundbreaking work predicted phenomena such as gravitational waves and black holes.

As his reputation grew, so did his travels. Einstein lectured in Europe, Asia, and the United States, spreading his ideas and inspiring a new generation of physicists.

*Personal Life and Turbulent Times*

Einstein's personal life was marked by turmoil. He married Mileva Marić in 1903, and they had two sons, Hans Albert and Eduard. However, their relationship was complicated, and they divorced in 1919. Einstein later married Elsa Löwenthal.

During World War I, Einstein's pacifist views and Jewish heritage made him a target for anti-Semitic attacks. He emigrated to the United States in the 1930s, settling in Princeton, New Jersey.

*Later Years: Reflections and Legacy*

In his later years, Einstein continued to work on unified field theories, seeking to merge gravity, electromagnetism, and the strong and weak nuclear forces. Though he didn't complete this quest, his efforts paved the way for modern physics.

As the world faced the threat of nuclear war, Einstein's voice resonated against the development of atomic bombs. His famous letter to President Franklin D. Roosevelt warned of the dangers of nuclear proliferation.

On April 18, 1955, Albert Einstein passed away, leaving behind a legacy that transformed humanity's understanding of the universe.

*Einstein's Legacy*

Today, Einstein's theories underpin modern physics, from GPS technology to cosmology. His name has become synonymous with genius, inspiring generations to explore the mysteries of the universe.

As we reflect on Einstein's life, we're reminded that curiosity, creativity, and perseverance can lead to revolutionary breakthroughs. His story encourages us to challenge conventional wisdom, explore the unknown, and push the boundaries of human knowledge.`,"medium");
