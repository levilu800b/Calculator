(this.webpackJsonpcalculator=this.webpackJsonpcalculator||[]).push([[0],{21:function(t,e,n){},22:function(t,e,n){},24:function(t,e,n){},28:function(t,e,n){"use strict";n.r(e);var r=n(3),a=n(0),i=n.n(a),s=n(7),o=n.n(s),c=(n(21),n(8)),u=n(9),l=n(11),h=n(10),y=(n(22),function(t){Object(l.a)(n,t);var e=Object(h.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).state={historyLines:[]},r}return Object(u.a)(n,[{key:"addToHistory",value:function(t){this.setState((function(e){return{historyLines:e.historyLines.concat([t])}}))}},{key:"generateRows",value:function(){return this.state.historyLines.map((function(t,e){return Object(r.jsx)("tr",{children:Object(r.jsx)("td",{children:t})},e)}))}},{key:"render",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:" History"}),Object(r.jsx)("table",{children:Object(r.jsx)("tbody",{children:this.generateRows()})})]})}}]),n}(i.a.Component)),p=n(31),f=n(35),d=n(32),m=n(33),g=n(34),j=(n(23),n(24),function(t){Object(l.a)(n,t);var e=Object(h.a)(n);function n(t){var r;return Object(c.a)(this,n),(r=e.call(this,t)).buttons=["MC","M+","M-","MR","CE","C","/","X","Del","7","8","9","-","4","5","6","+","1","2","3","=","%","0","."],r.state={answer:"",runningTotal:0,operation:"",memory:0,memRecall:!1,historyString:""},r.history=i.a.createRef(),r}return Object(u.a)(n,[{key:"applyOperation",value:function(t){var e=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];""===this.state.answer?this.setState({operation:t}):this.setState((function(r){var a;return a=n?r.historyString+" "+100*r.answer+"%  of ":r.historyString+" "+r.answer+" "+t,{runningTotal:e.calculateRunningTotal(r.operation,r.runningTotal,parseFloat(r.answer)),operation:t,answer:"",historyString:a}}))}},{key:"equals",value:function(){var t=this;""===this.state.answer?this.setState((function(t){return{answer:t.runningTotal,operation:"="}})):this.setState((function(e){var n=t.calculateRunningTotal(e.operation,e.runningTotal,parseFloat(e.answer));return{answer:n,runningTotal:0,operation:"=",historyString:e.historyString+" "+e.answer+" = "+n}}),(function(){t.history.current.addToHistory(t.state.historyString),t.setState({historyString:""})}))}},{key:"applyPercentOperation",value:function(t,e,n){var r=this;this.setState((function(a){var i=r.calculateRunningTotal(t,e,n);return{answer:i,operation:"=",runningTotal:0,historyString:a.historyString+" "+a.answer+"% = "+i}}),(function(){r.history.current.addToHistory(r.state.historyString),r.setState({historyString:""})}))}},{key:"percentageOf",value:function(t){this.setState({runningTotal:t,answer:t}),this.applyOperation("X",!0)}},{key:"percent",value:function(){var t=this.state.answer/100,e=t*this.state.runningTotal;""===this.state.operation?this.percentageOf(t):"X"===this.state.operation||"/"===this.state.operation?this.applyPercentOperation(this.state.operation,this.state.runningTotal,t):this.applyPercentOperation(this.state.operation,this.state.runningTotal,e)}},{key:"calculateRunningTotal",value:function(t,e,n){if("+"===t)return e+n;if("-"===t)return e-n;if("X"===t)return e*n;if("/"===t)return e/n;if(""===t||"="===t)return n;throw new Error("invalid operation")}},{key:"memoryChange",value:function(t){var e=this;this.setState((function(n){return{memory:e.calculateRunningTotal(t,n.memory,parseFloat(n.answer))}}))}},{key:"memoryClear",value:function(){this.setState({memory:0})}},{key:"memoryRecall",value:function(){this.setState((function(t){return{answer:t.memory,memRecall:!0}}))}},{key:"clear",value:function(){this.setState({operation:"",runningTotal:0,answer:"",memRecall:!1,historyString:""})}},{key:"delete",value:function(){""!==this.state.answer&&this.setState((function(t){return{answer:t.answer.substring(0,t.answer.length-1)}}))}},{key:"handleNumbers",value:function(t){this.setState((function(e){return"="===e.operation?{operation:"",answer:t}:e.memRecall?{answer:t,memRecall:!1}:"."===e.answer+t?{answer:"0."}:{answer:e.answer+t}}))}},{key:"handleOperators",value:function(t){"+"===t||"-"===t||"/"===t||"X"===t?this.applyOperation(t):"%"===t?this.percent():"="===t?this.equals():"C"===t?this.clear():"Del"===t?this.delete():"CE"===t?this.clearEntry():"M+"===t?this.memoryChange("+"):"M-"===t?this.memoryChange("-"):"MR"===t?this.memoryRecall():"MC"===t?this.memoryClear():console.error("unsupported function",t)}},{key:"buttonClicked",value:function(t){t.match(/^(\d|\.)$/)?this.handleNumbers(t):this.handleOperators(t)}},{key:"renderButtons",value:function(){for(var t=this,e=[],n=Array.from(this.buttons),a=0;n.length>0;){a++;var i=n.splice(0,4).map((function(e){return Object(r.jsx)(p.a,{sm:"3",className:"buttonSet",children:Object(r.jsx)(f.a,{onClick:function(){return t.buttonClicked(e)},children:e})},e)}));e.push(Object(r.jsx)(d.a,{children:i},a))}return Object(r.jsx)("div",{className:"buttons",children:e})}},{key:"render",value:function(){return console.log(this.state.historyString),Object(r.jsxs)(m.a,{children:[Object(r.jsx)(g.a,{bg:"dark",variant:"dark",children:Object(r.jsx)(g.a.Brand,{href:"#home",children:"Simple Calculator"})}),Object(r.jsx)(d.a,{children:Object(r.jsxs)(p.a,{className:"answer",children:[Object(r.jsx)("input",{type:"text",value:this.state.answer,readOnly:!0}),Object(r.jsx)("div",{className:"operator",children:this.state.operation})]})}),this.renderButtons(),Object(r.jsx)(y,{ref:this.history})]})}}]),n}(i.a.Component)),b=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,36)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,i=e.getLCP,s=e.getTTFB;n(t),r(t),a(t),i(t),s(t)}))};o.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(j,{})}),document.getElementById("root")),b()}},[[28,1,2]]]);
//# sourceMappingURL=main.57801257.chunk.js.map