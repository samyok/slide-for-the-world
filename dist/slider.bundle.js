!function(t){var i={};function s(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=i,s.d=function(t,i,e){s.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:e})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,i){if(1&i&&(t=s(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(s.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var n in t)s.d(e,n,function(i){return t[i]}.bind(null,n));return e},s.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(i,"a",i),i},s.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},s.p="",s(s.s=138)}({138:function(t,i){t.exports=class{constructor(t){this.mini=t.mini,0===$(t.parent).length&&console.warn("Parent doesn't exist");let i=$(t.parent),s=t.size?t.size:5;console.log(s),this.size=s;let e=[];for(let t=0;t<this.size;t++)for(let i=0;i<this.size;i++){let s=t*this.size+i+1;s!==this.size**2?e.push(s):e.push(0)}return this.blank={x:s-1,y:s-1},this.board=e,this.imageURL=t.imageURL?t.imageURL:"/img/flowers.jpg",this.element=$("<div/>").addClass("slider").appendTo(i).css("width",52*s+"px").css("grid-template-columns","repeat("+s+",1fr)"),this.onSuccess=t.onFinish,this.onMove=t.onMove,this.onInit=t.onInit,this.moves=0,t.board?(this.board=t.board,this.blank=t.blank):this.randomize(t.size**2*10),this.init(),this}init(){let t=this.element;$(t).html("");let i=this,s=this.imageURL,e=this.size;this.board.forEach((n,a)=>{let l=$("<div/>").addClass("tile").css("background-image",`url(${s})`).css("background-size",`${50*e}px ${50*e}px`).css("order",a).css("background-position",`-${(n-1)%e*50}px -${50*Math.floor((n-1)/e)}px`);0===n?l.addClass("blank").text("").appendTo(t).css("background-image",""):l.text(n).appendTo(t);let o=Math.floor(a/e),h=a%e;i.blank.x===h&&i.blank.y!==o?(this.mini||l.addClass("clickable"),l.click(function(){if(i.blank.y<o)for(;i.blank.y<o;)i.move(1);else for(;i.blank.y>o;)i.move(3)})):i.blank.x!==h&&i.blank.y===o&&(this.mini||l.addClass("clickable"),l.click(function(){if(i.blank.x<h)for(;i.blank.x<h;)i.move(2);else for(;i.blank.x>h;)i.move(0)}))}),this.onInit(this.getPercentDone(),this.board,this.blank)}html(){let t=this.element,i=this,s=this.size,e=this.isFinished();$(t).find(".tile").toArray().forEach((t,n)=>{let a=$(t),l=a.text()?parseInt(a.text()):0,o=i.board.indexOf(l);a.css("order",o);let h=o%s,r=Math.floor(o/s);a.off(),this.mini||(i.blank.x!==h||i.blank.y===r||e?i.blank.x===h||i.blank.y!==r||e?(a.off(),a.removeClass("clickable")):(a.addClass("clickable"),a.click(function(){if(i.blank.x<h)for(;i.blank.x<h;)i.move(2);else for(;i.blank.x>h;)i.move(0)})):(a.addClass("clickable"),a.click(function(){if(i.blank.y<r)for(;i.blank.y<r;)i.move(1);else for(;i.blank.y>r;)i.move(3)})))})}randomize(t){let i=0;for(;i<t;){let t=this.availableMoves();this.move(t[Math.floor(Math.random()*t.length)],!0),i++}}availableMoves(){let t=[];return 0!==this.blank.x&&t.push(0),0!==this.blank.y&&t.push(3),this.blank.x!==this.size-1&&t.push(2),this.blank.y!==this.size-1&&t.push(1),t}move(t,i){if(!this.availableMoves().includes(t)||![0,1,2,3].includes(t))throw"Not a valid move";switch(t){case 0:this.board[this.blank.x+this.size*this.blank.y]=this.board[this.blank.x+this.size*this.blank.y-1],this.board[this.blank.x+this.size*this.blank.y-1]=0,this.blank={x:this.blank.x-1,y:this.blank.y};break;case 1:this.board[this.blank.x+this.size*this.blank.y]=this.board[this.blank.x+this.size*(this.blank.y+1)],this.board[this.blank.x+this.size*(this.blank.y+1)]=0,this.blank={x:this.blank.x,y:this.blank.y+1};break;case 2:this.board[this.blank.x+this.size*this.blank.y]=this.board[this.blank.x+this.size*this.blank.y+1],this.board[this.blank.x+this.size*this.blank.y+1]=0,this.blank={x:this.blank.x+1,y:this.blank.y};break;case 3:this.board[this.blank.x+this.size*this.blank.y]=this.board[this.blank.x+this.size*(this.blank.y-1)],this.board[this.blank.x+this.size*(this.blank.y-1)]=0,this.blank={x:this.blank.x,y:this.blank.y-1};break;default:throw"Not a valid move"}if(i)return this;if(this.moves++,this.isFinished())this.onSuccess(this.moves,this.board,this.blank);else{let t=this.getPercentDone();this.onMove(t,this.moves,this.board,this.blank)}return this.html(),this}isFinished(){let t=this.board;for(let i=0;i<t.length;i++)if(t[i]!==i+1&&0!==t[i])return!1;return!0}getPercentDone(){let t=this.board,i=0;for(let s=0;s<t.length;s++)t[s]!==s+1&&0!==t[s]&&i++;return Math.floor(1e4*(t.length-i)/t.length)/100}}}});