(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,n,t){e.exports=t(41)},40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),r=t(16),c=t.n(r),o=t(6),l=t(17),i=t(2),m=function(e){var n=e.filterInput,t=e.handleFilter;return u.a.createElement("div",null,"filter shown with ",u.a.createElement("input",{value:n,onChange:t}))},s=function(e){var n=e.handleInput,t=e.newName,a=e.newNumber,r=e.addPerson;return u.a.createElement("div",null,u.a.createElement("form",{onSubmit:r},u.a.createElement("div",null,"name: ",u.a.createElement("input",{value:t,onChange:n,name:"name"})),u.a.createElement("div",null,"number:",u.a.createElement("input",{value:a,onChange:n,name:"number"})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"add"))))},f=function(e){var n=e.list,t=e.deletePerson;return u.a.createElement("div",null,n.map((function(e){return u.a.createElement("p",{key:e.name},e.name," ",e.number,u.a.createElement("button",{onClick:function(){return t(e.name,e.id)}},"delete"))})))},d=t(4),b=t.n(d),p="/api/persons",h=function(){return b.a.get("".concat(p)).then((function(e){return e.data}))},g=function(e){return b.a.post("".concat(p),e).then((function(e){return e.data}))},E=function(e){return b.a.put("".concat(p,"/").concat(e.id),e).then((function(e){return e.data}))},v=function(e){return b.a.delete("".concat(p,"/").concat(e))},w=(t(40),function(e){var n=e.msg;return null===n?null:"success"===n.type?u.a.createElement("div",{className:"msg success"},n.msg):"fail"===n.type?u.a.createElement("div",{className:"msg fail"},n.msg.error):null}),j=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),d=Object(i.a)(c,2),b=d[0],p=d[1],j=Object(a.useState)(""),O=Object(i.a)(j,2),y=O[0],k=O[1],N=Object(a.useState)(""),S=Object(i.a)(N,2),T=S[0],C=S[1],P=Object(a.useState)(null),I=Object(i.a)(P,2),A=I[0],D=I[1];Object(a.useEffect)((function(){h().then((function(e){return r(e)})).catch((function(e){D({msg:e.response.data,type:"fail"}),setTimeout((function(){return D(null)}),5e3)}))}),[]);var F=function(e){var n=t.find((function(n){return n.name===e.name}));console.log(n);var a=Object(o.a)(Object(o.a)({},n),{},{number:e.number});E(a).then((function(){r(t.map((function(e){return e.id!==a.id?e:a}))),console.log(t),D({msg:"Number changed for ".concat(a.name," to ").concat(a.number),type:"success"}),setTimeout((function(){return D(null)}),5e3)})).catch((function(e){console.log(e),D({msg:e.response.data,type:"fail"}),setTimeout((function(){return D(null)}),5e3)}))},J=T.length>0?t.filter((function(e){return e.name.toLowerCase().includes(T.toLowerCase())})):t;return u.a.createElement("div",null,u.a.createElement("h2",null,"Phonebook"),u.a.createElement(w,{msg:A}),u.a.createElement(m,{filterInput:T,handleFilter:function(e){C(e.target.value)}}),u.a.createElement("h3",null,"Add a new"),u.a.createElement(s,{newName:b,newNumber:y,handleInput:function(e){return"name"===e.target.name?p(e.target.value):"number"===e.target.name?k(e.target.value):null},addPerson:function(e){e.preventDefault();var n={name:b,number:y};if(t.find((function(e){return e.name===n.name&&e.number!==n.number})))return window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))?F(n):null;t.find((function(e){return e.name===n.name&&e.number===n.number}))?alert("Please change number to update this person."):g(n).then((function(e){r([].concat(Object(l.a)(t),[e])),D({msg:"Added ".concat(e.name),type:"success"}),setTimeout((function(){return D(null)}),5e3),k("")})).catch((function(e){D({msg:e.response.data,type:"fail"}),setTimeout((function(){return D(null)}),5e3)}))}}),u.a.createElement("h3",null,"Numbers"),u.a.createElement(f,{list:J,deletePerson:function(e,n){return window.confirm("Delete ".concat(e,"?"))?v(n).then((function(){r(t.filter((function(e){return e.id!==n}))),D({msg:"".concat(e," deleted"),type:"success"}),setTimeout((function(){return D(null)}),5e3)})).catch((function(e){D({msg:e.response.data,type:"fail"}),setTimeout((function(){return D(null)}),5e3),r(t.filter((function(e){return e.id!==n})))})):null}}))};c.a.render(u.a.createElement(u.a.StrictMode,null,u.a.createElement(j,null)),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.66a4cceb.chunk.js.map