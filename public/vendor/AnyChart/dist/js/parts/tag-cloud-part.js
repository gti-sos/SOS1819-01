if(!_.tag_cloud_part){_.tag_cloud_part=1;(function($){var uja=function(a){var b=new $.Pg;b.parent(a);return b},vja=function(a,b){a.xn=b;a.xn.push("#000");a.dT=!!b;a.reset()},x7=function(a,b){$.Wv.call(this);this.Ia("tagCloud");this.Uq=["x","value"];this.ga="category";this.Ja=this.P=window.NaN;var c=[$.Y.g4],d={};$.R(d,[["fill",16,1],["fontFamily",16388,1],["fontStyle",16388,1],["fontVariant",16388,1],["fontWeight",16388,1],["fontSize",16388,1]]);var e={};$.R(e,[["fill",0,0],["fontFamily",0,0],["fontStyle",0,0],["fontVariant",0,0],["fontWeight",0,0],
["fontSize",0,0]]);this.ca=new $.Ew(this,d,$.Wk,c);this.ya=new $.Ew(this,e,$.ln,c);this.Da=new $.Ew(this,e,$.mn,c);this.ca.Ia(this.ma);$.V(this,"normal",this.ca);$.V(this,"hovered",this.ya);$.V(this,"selected",this.Da);this.state=new $.Cv(this);this.data(a||null,b);$.R(this.xa,[["mode",4,1],["fromAngle",8192,1],["toAngle",8192,1],["anglesCount",8192,1],["textSpacing",4,1]]);this.Ya()},y7=function(a,b){$.z(b)?(a.re("fill",b),a.re("fill-opacity",1)):(a.re("fill",b.color),a.re("fill-opacity",b.opacity))},
z7=function(a,b,c){if(c!=$.Wk){var d=c==$.ln?a.ya:a.Da;d=d.i(b);var e=$.kn(d);if(null!=d&&!$.E(d)&&!e)return d}var f=a.aa().j("item");c=a.ca.i(b);var h=$.kn(c);if(null==c||h){switch(b){case "fontFamily":var k=f.font;break;case "fill":k=f.fill;break;case "fontStyle":k=f.style;break;case "fontVariant":k=f.variant;break;case "fontWeight":k=f.weight;break;case "fontSize":k=f.size}c=k}else $.E(c)&&("fill"==b?k=a.me():(k=a.Ec(),k.sourceValue=c),c=c.call(k,k));if(d){if(e)return c*(0,window.parseFloat)(d)/
100;"fill"==b?k=a.me(c):(k=a.Ec(),k.sourceValue=c);return d.call(k,k)}return c},wja=function(a,b){if(b){var c=a.f/3,d=a.g/3,e=a.g/50,f=$.Ua(e,~~d+1),h=$.Na(f,function(a){a=$.Mf().measure(b.text,{fontStyle:b.style,fontFamily:b.font,fontSize:a,fontWeight:b.weight,fontVariant:b.variant});var e=$.un(a,"center");e=$.Jb($.ab(b.rotate),e.x,e.y);a=$.$l(a)||[];e.transform(a,0,a,0,4);a=$.am(a);e=a.width;a=a.height;return e>c||a>d?-1:e==c||a==d?0:1});0>h&&(h=~h-1);a.P=e;a.Ja=f[$.Ya(h,0,f.length)]}},xja=function(a,
b,c,d,e){if(!c.sD){var f=b.context,h=b.ratio;f.clearRect(0,0,2048/h,2048/h);var k=b=0,l=0,m=d.length;--e;for(var n=a.i("textSpacing");++e<m;){c=d[e];f.save();a="";"normal"!=c.style&&(a+=c.style+" ");"normal"!=c.weight&&(a+=c.weight+" ");"normal"!=c.variant&&(a+=c.variant+" ");f.font=a+~~((c.size+1)/h)+"px "+c.font;a=f.measureText(c.text).width*h;var q=c.size<<1;if(c.rotate){var r=Math.sin($.ab(c.rotate)),t=Math.cos($.ab(c.rotate)),u=a*t,v=a*r;t*=q;a=q*r;a=Math.max(Math.abs(u+a),Math.abs(u-a))+31>>
5<<5;q=~~Math.max(Math.abs(v+t),Math.abs(v-t))}else a=a+31>>5<<5;q>l&&(l=q);2048<=b+a&&(b=0,k+=l,l=0);if(2048<=k+q)break;f.translate((b+(a>>1))/h,(k+(q>>1))/h);c.rotate&&f.rotate($.ab(c.rotate));f.fillText(c.text,0,0);n&&(f.lineWidth=2*n,f.strokeText(c.text,0,0));f.restore();c.width=a;c.height=q;c.xha=b;c.Aha=k;c.$j=a>>1;c.af=q>>1;c.Zj=-c.$j;c.ve=-c.af;c.j_=!0;b+=a}f=f.getImageData(0,0,2048/h,2048/h).data;for(h=[];0<=--e;)if(c=d[e],c.j_){a=c.width;l=a>>5;q=c.af-c.ve;for(m=0;m<q*l;m++)h[m]=0;b=c.xha;
if(null==b)break;k=c.Aha;n=0;u=-1;for(v=0;v<q;v++){for(m=0;m<a;m++)r=f[2048*(k+v)+(b+m)<<2]?1<<31-m%32:0,h[l*v+(m>>5)]|=r,n|=r;n?u=v:(c.ve++,q--,v--,k++)}c.af=c.ve+u;c.sD=h.slice(0,(c.af-c.ve)*l)}}},yja=function(a,b){var c=a[0],d=a[1];b.x+b.Zj<c.x&&(c.x=b.x+b.Zj);b.y+b.ve<c.y&&(c.y=b.y+b.ve);b.x+b.$j>d.x&&(d.x=b.x+b.$j);b.y+b.af>d.y&&(d.y=b.y+b.af)},zja=function(a){var b=4*a.f/a.g,c=0,d=0;return function(a){var e=0>a?-1:1;switch(Math.sqrt(1+4*e*a)-e&3){case 0:c+=b;break;case 1:d+=4;break;case 2:c-=
b;break;default:d-=4}return[c,d]}},Aja=function(a){for(var b=[],c=-1;++c<a;)b[c]=0;return b},Bja=function(a,b,c,d,e){for(var f=c.x,h=c.y,k=0,l,m;l=a.Za(k);){k+=1;m=~~l[0];l=~~l[1];if(Math.min(Math.abs(m),Math.abs(l))>=e)break;c.x=f+m;c.y=h+l;if(!(m=0>c.x+c.Zj||0>c.y+c.ve||c.x+c.$j>a.f||c.y+c.af>a.g)&&(m=d))a:{m=a.f;m>>=5;l=c.sD;var n=c.width>>5;var q=c.x-(n<<4);for(var r=q&127,t=32-r,u=c.af-c.ve,v=(c.y+c.ve)*m+(q>>5),w=0;w<u;w++){for(var x=q=0;x<=n;x++)if((q<<t|(x<n?(q=l[w*n+x])>>>r:0))&b[v+x]){m=
!0;break a}v+=m}m=!1}if(!m&&(!d||c.x+c.$j>d[0].x&&c.x+c.Zj<d[1].x&&c.y+c.af>d[0].y&&c.y+c.ve<d[1].y)){d=c.sD;e=c.width>>5;a=a.f>>5;m=c.x-(e<<4);f=m&127;h=32-f;k=c.af-c.ve;m=(c.y+c.ve)*a+(m>>5);for(n=0;n<k;n++){for(r=l=0;r<=e;r++)b[m+r]=b[m+r]|l<<h|(r<e?(l=d[n*e+r])>>>f:0);m+=a}delete c.sD;return!0}}return!1},Cja=function(a){var b=a.aa(),c=a.Xm(),d=a.oa,e=a.xn,f=(0,window.parseFloat)(b.get("value")),h=b.get("category"),k=b.ka();if($.K(c,$.wx)&&$.p(h)){var l=h;b.j("category",h);b=a.ca.i("fill");$.E(b)&&
(a={sourceColor:a.Yb().ic(k),category:h},b=b.call(a,a));e.push($.Sb(b))}else a.Jb?l=f:(b.j("category",void 0),l=$.Sb(z7(a,"fill",0)),e.push(l),l=$.D(l)?l.color:l,b.j("category",l));c.Oc(l);d.Oc(f)},Dja=function(a,b){var c=new x7(a,b);c.lD(c.ma);return c},Eja={lla:"spiral",Y4:"rect"};$.H(x7,$.Wv);$.rp(x7,"fill fontFamily fontStyle fontVariant fontWeight fontSize".split(" "),"normal");x7.prototype.qa=$.Wv.prototype.qa|258064;var A7={};
$.ep(A7,[[0,"mode",function(a,b){return $.ij(Eja,a,b||"spiral")}],[0,"fromAngle",$.mp],[0,"toAngle",$.mp],[0,"anglesCount",$.mp],[0,"textSpacing",$.mp]]);$.S(x7,A7);$.g=x7.prototype;$.g.Qa=function(){return"tag-cloud"};$.g.sc=function(){return this};$.g.Cg=function(){return!0};$.g.Qj=function(){return!1};$.g.vi=function(){return!0};$.g.Ne=function(){return[this]};
$.g.Ad=function(a){var b=new $.Vy(this,a);this.aa().select(a)&&b.Yw()&&(a=b.get("value")/this.pg("sum"),b.Fa("yPercentOfTotal",$.Kl(100*a,2)),b.Fa("percentValue",a));return b};$.g.Hr=function(){return null};$.g.aa=function(){return this.Md||(this.Md=this.na.aa())};$.g.wc=function(){return this.Md=this.na.aa()};
$.g.Yb=function(a){if($.K(a,$.xr))return this.Hc($.xr,a),this;if($.K(a,$.ur))return this.Hc($.ur,a),this;$.D(a)&&"range"==a.type?this.Hc($.xr):($.D(a)||null==this.Aa)&&this.Hc($.ur);return $.p(a)?(this.Aa.K(a),this):this.Aa};$.g.Hc=function(a,b){if($.K(this.Aa,a))b&&this.Aa.K(b);else{var c=!!this.Aa;$.hd(this.Aa);this.Aa=new a;$.V(this,"palette",this.Aa);this.Aa.Rp();b&&this.Aa.K(b);$.L(this.Aa,this.Df,this);c&&this.u(512,1)}};$.g.Df=function(a){$.W(a,2)&&this.u(65536,129)};
$.g.me=function(a){var b=this.aa(),c=b.ka();a=a||this.Yb().ic(c)||"blue";c={};var d=this.Xm(),e=b.get("value");b=b.j("category");c.value=e;c.category=b;if(d){e=$.K(d,$.wx)&&$.p(b)?b:e;if(this.Jb||$.p(b))var f=d.cq(e);$.Kc(c,{scaledColor:f,colorScale:this.Jb})}c.sourceColor=a;return c};$.g.Xm=function(){return this.Jb||this.Ma||(this.Ma=$.xx())};
$.g.Ec=function(){var a=this.aa();this.Td||(this.Td=new $.$u);this.Td.lg(a).Vi([this.Ad(a.ka()),this]);a={x:{value:a.get("x"),type:"string"},value:{value:a.get("value"),type:"number"},name:{value:a.get("name"),type:"string"},index:{value:a.ka(),type:"number"},chart:{value:this,type:""}};$.Lt(this.Td,a);return this.Td};$.g.ek=function(){return this.Ec()};$.g.Gi=function(){var a=this.aa().j("item");return{value:{x:this.la+a.x*this.Ea,y:this.va+a.y*this.Ea}}};$.g.Ck=function(){};
$.g.Gj=function(a,b){var c=this.aa().j("item");if(c&&c.JB){var d=$.Uk(a),e=$.Sb(z7(this,"fill",d)),f=z7(this,"fontFamily",d),h=z7(this,"fontStyle",d),k=z7(this,"fontVariant",d),l=z7(this,"fontWeight",d),m=z7(this,"fontSize",d),n=this.O()?this.O().Ga():null,q=n&&!n.Ve();q&&n.suspend();y7(c.Di,e);c.Di.re("font-family",f);c.Di.re("font-style",h);c.Di.re("font-variant",k);c.Di.re("font-weight",l);c.Di.re("font-size",m);c.Di.zIndex(d==$.Wk?0:1E-6);q&&n.resume();return b}};$.g.zp=$.ia;
$.g.GJ=function(a){var b=this.Hj();a=$.B(a)?a.length?a[0]:window.NaN:a;if(b&&b.target()&&!(0,window.isNaN)(a)){var c=b.target().aa();c.select(a);a=this.Xm();c=$.K(a,$.wx)?c.j("category"):c.get(this.Uq[1]);$.qK(b,c)}};$.g.ez=function(){var a=this.Hj();a&&a.enabled()&&$.rK(a)};
$.g.tg=function(a){var b=a.type;switch(b){case "mouseout":b="pointmouseout";break;case "mouseover":b="pointmouseover";break;case "mousemove":b="pointmousemove";break;case "mousedown":b="pointmousedown";break;case "mouseup":b="pointmouseup";break;case "click":b="pointclick";break;case "dblclick":b="pointdblclick";break;default:return null}var c;"pointIndex"in a?c=a.pointIndex:"labelIndex"in a?c=a.labelIndex:"markerIndex"in a&&(c=a.markerIndex);c=$.N(c);a.pointIndex=c;return{type:b,actualTarget:a.target,
series:this,pointIndex:c,target:this,originalEvent:a,point:this.Ad(c)}};$.g.Tf=function(a){a=$.X.prototype.Tf.call(this,a);var b=$.hn(a.domTarget).index;if(!$.p(b)&&$.Gv(this.state,$.ln)){var c=$.Mv(this.state,$.ln);c.length&&(b=c[0])}b=$.N(b);(0,window.isNaN)(b)||(a.pointIndex=b);return a};$.g.Ql=function(){};$.g.vl=function(a){return $.p(a)?(a=$.jj(a),a!=this.N&&(this.N=a),this):this.N};$.g.kj=function(a){return $.p(a)?(this.Zc().selectionMode(a),this):this.Zc().i("selectionMode")};
$.g.Ai=function(a,b){if(!this.enabled())return this;var c=this.O()?this.O().Ga():null,d=c&&!c.Ve();d&&c.suspend();var e=!(b&&b.shiftKey);$.B(a)?(b||this.Pd(),this.state.oh($.mn,a,e?$.ln:void 0)):$.ea(a)&&this.state.oh($.mn,a,e?$.ln:void 0);d&&c.resume();return this};$.g.Pd=function(a){if(this.enabled()){var b=this.O()?this.O().Ga():null,c=b&&!b.Ve();c&&b.suspend();var d;$.p(a)?d=a:d=this.state.vc==$.Wk?window.NaN:void 0;this.state.xh($.mn,d);c&&b.resume()}};
$.g.ti=function(a){if(!this.enabled())return this;var b=this.O()?this.O().Ga():null,c=b&&!b.Ve();c&&b.suspend();if($.B(a)){for(var d=$.Mv(this.state,$.ln),e=0;e<d.length;e++)$.ya(a,d[e])||this.state.xh($.ln,d[e]);$.Kv(this.state,a)}else $.ea(a)&&(this.Cd(),$.Kv(this.state,a));c&&b.resume();return this};
$.g.Cd=function(a){var b;(b=$.Gv(this.state,$.ln))||(b=!!(this.state.uj()&$.ln));if(b&&this.enabled()){var c=(b=this.O()?this.O().Ga():null)&&!b.Ve();c&&b.suspend();var d;$.p(a)?d=a:d=this.state.vc==$.Wk?window.NaN:void 0;this.state.xh($.ln,d);c&&b.resume()}};
$.g.data=function(a,b){if($.p(a)){if(a){var c=a.title||a.caption;c&&this.title(c);a.rows&&(a=a.rows)}this.Vf!==a&&(this.Vf=a,$.hd(this.ed),$.K(a,$.oq)?this.na=this.ed=a.$i():$.K(a,$.yq)?this.na=this.ed=a.Yd():this.na=(this.ed=new $.yq($.B(a)||$.z(a)?a:null,b)).Yd(),$.L(this.na,this.xd,this),this.u(4352,1));return this}return this.na};$.g.xd=function(){this.u(4352,1)};$.g.GW=function(a){return $.p(a)?(a=$.B(a)?$.Ga(a):null,this.D!=a&&(this.D=a,this.u(16388,1)),this):this.D};
$.g.scale=function(a){if($.p(a)){if(a=$.Vr(this.oa,a,null,3,null,this.Xf,this)){var b=this.oa==a;this.oa=a;this.oa.da(b);b||this.u(131072,1)}return this}return this.oa};$.g.Xf=function(){this.u(131072,1)};$.g.pd=function(a){if($.p(a)){if(null===a&&this.Jb)this.Jb=null,this.u(65536,129);else if(a=$.Vr(this.Jb,a,null,48,null,this.gp,this)){var b=this.Jb==a;this.Jb=a;this.Jb.da(b);b||($.mK(this.Hj()),this.u(65536,129))}return this}return this.Jb};$.g.gp=function(a){$.W(a,6)&&this.u(65536,129)};
$.g.Ta=function(a){return $.p(a)?(this.ca.K(a),this):this.ca};$.g.lb=function(a){return $.p(a)?(this.ya.K(a),this):this.ya};$.g.selected=function(a){return $.p(a)?(this.Da.K(a),this):this.Da};$.g.Hj=function(a){this.Xb||(this.Xb=new $.lK,$.V(this,"colorRange",this.Xb),$.L(this.Xb,this.Qy,this),this.u(32772,1));return $.p(a)?(this.Xb.K(a),this):this.Xb};$.g.Qy=function(a){var b=0,c=0;$.W(a,1)&&(b|=32772,c|=1);$.W(a,8)&&(b|=4,c|=8);$.W(a,2)&&(b|=32768,c|=8);this.u(b,c)};
$.g.zu=function(a){return $.jn(this.Hj(),a)};$.g.Nl=function(a){var b,c=[],d;if("categories"==a&&(d=$.K(this.Xm(),$.wx)?this.Xm():void 0)){var e=d.Dq();a=0;for(b=e.length;a<b;a++){var f=e[a];"default"!==f.name&&c.push({text:f.name,iconEnabled:!0,iconType:"square",iconFill:f.color,disabled:!this.enabled(),sourceUid:$.oa(this),sourceKey:a,meta:{W:this,scale:d,te:f}})}}return c};$.g.Vr=function(a){return"categories"==a};
$.g.Lq=function(a,b){var c=a.j();if("categories"==this.Af().i("itemsSourceMode")){var d=c.W;var e=c.scale;if(e&&d){var f=[];c=c.te;for(var h=d.wc();h.advance();){var k=h.get("value"),l=h.j("category");c==e.Zm($.p(l)?l:k)&&f.push(h.ka())}"single"==this.Zc().i("hoverMode")?b.Ef={W:d,kd:f}:b.Ef=[{W:d,kd:f,fn:f[f.length-1],ie:{index:f[f.length-1],Rf:0}}]}}};
$.g.Ep=function(a,b){var c=a.j();if("categories"==this.Af().i("itemsSourceMode")){var d=c.W;var e=c.scale;if(e&&d){c=c.te;for(var f=d.wc(),h=[];f.advance();){var k=f.get("value"),l=f.j("category");c==e.Zm($.p(l)?l:k)&&h.push(f.ka())}if(e=$.hn(b.domTarget))"single"==this.Zc().i("hoverMode")?e.Ef={W:d,kd:h}:e.Ef=[{W:d,kd:h,fn:h[h.length-1],ie:{index:h[h.length-1],Rf:0}}];(d=$.hq(this,"colorRange"))&&d.enabled()&&d.target()&&$.qK(d,$.p(c.xo)?c.xo:(c.start+c.end)/2)}}};
$.g.Dp=function(a,b){var c=a.j();if("categories"==this.Af().i("itemsSourceMode")){if("single"==this.Zc().i("hoverMode")){var d=$.hn(b.domTarget);d&&(d.W=c.W)}(c=$.hq(this,"colorRange"))&&c.enabled()&&c.target()&&$.rK(c)}};$.g.Z9=function(a){return[this.f/this.g*(a*=.1)*Math.cos(a),a*Math.sin(a)]};
$.g.getContext=function(a){a.width=a.height=1;var b=Math.sqrt(a.getContext("2d").getImageData(0,0,1,1).data.length>>2);a.width=2048/b;a.height=2048/b;a=a.getContext("2d");a.fillStyle=a.strokeStyle="red";a.textAlign="center";return{context:a,ratio:b}};
$.g.mb=function(){var a=this.oa;if(a){var b,c=this.Xm();if(this.J(8192)){var d=this.i("anglesCount");var e=this.i("fromAngle");var f=this.i("toAngle");f-=e;this.ba=[];for(b=0;b<d;b++)this.ba.push(e+f/(1==d?d:d-1)*b);this.D||this.u(16388);this.I(8192)}if(this.J(4096)){var h=this.wc();this.U=[];this.b&&this.b.forEach(function(a,b){a.Di.parent(null);a.Ik.parent(null);a.Ik.Uk();this.U[b]=a},this);this.b=[];this.xn=[];a.fg();for(c.fg();h.advance();){b=String(h.get("x")).toLowerCase();e=(0,window.parseFloat)(h.get("value"));
f=h.get("category");var k=h.ka();var l=this.U[k]?this.U[k]:{};l.rowIndex=k;l.text=b;l.value=e;l.JB=!1;l.Vla=f;this.b.push(l);h.j("item",l);Cja(this)}a.ng();c.ng();this.Jb||($.Ja(this.xn,void 0,function(a){return $.D(a)?a.color+" "+a.opacity:a}),vja(c,this.xn));$.Pa(this.b,function(a,b){return b.value-a.value});this.u(16388);this.I(200704)}if(this.J(196608)){this.xn=[];h=this.wc();a.fg();for(c.fg();h.advance();)Cja(this);c.ng();this.Jb||($.Ja(this.xn,void 0,function(a){return $.D(a)?a.color+" "+a.opacity:
a}),vja(c,this.xn));this.J(65536)&&this.u(49680);this.J(131072)&&this.u(49156);this.I(196608)}if(this.J(16384)){var m=this.D?this.D:this.ba;var n=Math.max((0,$.xa)(m,0),0);d=m.length;a=this.b.length?this.b[0].value:window.NaN;h=this.aa();c=this.b.length;var q=0;this.b.forEach(function(a,b){var c=$.Uk($.Hv(this.state,a.rowIndex));h.select(a.rowIndex);var e=z7(this,"fontFamily",c),f=z7(this,"fontStyle",c),k=z7(this,"fontVariant",c),l=z7(this,"fontWeight",c);c=$.Sb(z7(this,"fill",c));a.font=e;a.style=
f;a.variant=k;a.weight=l;a.fill=c;a.rotate=m[(b+n+d)%d];q+=a.value},this);this.Fa("sum",q);this.Fa("max",a);this.Fa("min",this.b.length?this.b[c-1].value:window.NaN);this.Fa("average",q/c);this.Fa("pointsCount",c);this.I(16384)}}};$.g.vu=function(){this.mb()};
$.g.Ji=function(a){var b=this.scale(),c=$.hq(this,"colorRange");this.J(32768)&&c&&($.U(c),c.scale(this.Xm()),c.target(this),c.qb(this),c.da(!1),c.enabled()&&this.u(4));if(this.J(4)){c&&c.enabled()?(c.fa(a.clone().round()),this.o=c.nd()):this.o=a.clone();this.f=this.o.width;this.g=this.o.height;this.Za="spiral"==this.i("mode")?this.Z9:zja(this);a=this.b.length;var d=this.b[0],e=-1,f=null,h=this.getContext(this.canvas?this.canvas:this.canvas=window.document.createElement("canvas")),k=Aja((this.f>>5)*
this.g),l=Math.sqrt(this.f*this.f+this.g*this.g);wja(this,d);for(this.b.forEach(function(a){this.aa().select(a.rowIndex);delete a.size;delete a.sD;var c=$.Uk($.Hv(this.state,a.rowIndex));c=z7(this,"fontSize",c);var d=$.Ya(b.transform(a.value),0,1);d=~~(this.P+d*(this.Ja-this.P));a.size=null!=c?$.kn(c)?d*(0,window.parseFloat)(c)/100:c:d},this);++e<a;)d=this.b[e],d.x=this.f>>1,d.y=this.g>>1,xja(this,h,d,this.b,e),d.j_&&Bja(this,k,d,f,l)&&(f?yja(f,d):f=[{x:d.x+d.Zj,y:d.y+d.ve},{x:d.x+d.$j,y:d.y+d.af}],
d.x-=this.f>>1,d.y-=this.g>>1);a=f?Math.min(this.f/Math.abs(f[1].x-this.f/2),this.f/Math.abs(f[0].x-this.f/2),this.g/Math.abs(f[1].y-this.g/2),this.g/Math.abs(f[0].y-this.g/2))/2:1;this.yb||(this.yb=this.Ua.Nd());(e=$.hq(this,"background"))&&this.yb.zIndex((e.zIndex()||0)+1);this.G||(this.G=this.yb.Nd(),$.Ps(this,this.G));this.ue||(this.ue=this.yb.Nd());this.la=this.o.left+(this.f>>1);this.va=this.o.top+(this.g>>1);this.Ea=a;this.yb.nc(a,0,0,a,this.la,this.va);var m=this.yb.wd;this.b.forEach(function(a){var b=
[a.x,a.y];m.transform(b,0,b,0,1);if(b[0]+a.Zj<this.o.left||b[0]+a.$j>this.o.$a()||b[1]+a.ve<this.o.top||b[1]+a.af>this.o.Ra())a.JB&&(a.Di.parent(null),a.Ik.parent(null)),a.JB=!1;else{a.JB||(a.Di=a.Di?a.Di.parent(this.ue):uja(this.ue),a.Di.re("text-anchor","middle"),a.Di.td(!0),a.Di.text(a.text.toLowerCase()),a.Di.cursor("default"),a.Ik=a.Ik?a.Ik.parent(this.G):uja(this.G),a.Ik&&(a.Ik.tag={W:this,index:a.rowIndex}),a.Ik.re("fill","#fff"),a.Ik.re("opacity",1E-6),a.Ik.re("text-anchor","middle"),a.Ik.text(a.text.toLowerCase()),
a.Ik.cursor("default"),a.JB=!0);var c=$.Uk($.Hv(this.state,a.rowIndex));this.aa().select(a.rowIndex);b=$.Sb(z7(this,"fill",c));var d=z7(this,"fontFamily",c),e=z7(this,"fontStyle",c),f=z7(this,"fontVariant",c),h=z7(this,"fontWeight",c);c=z7(this,"fontSize",c);y7(a.Di,b);a.Di.re("font-family",d);a.Di.re("font-style",e);a.Di.re("font-variant",f);a.Di.re("font-weight",h);a.Di.re("font-size",c);a.Di.re("transform","translate("+[a.x,a.y]+")rotate("+a.rotate+")");a.Di.zIndex(0);a.Ik.re("font-family",d);
a.Ik.re("font-style",e);a.Ik.re("font-variant",f);a.Ik.re("font-weight",h);a.Ik.re("font-size",c);a.Ik.re("transform","translate("+[a.x,a.y]+")rotate("+a.rotate+")");a.Ik.zIndex(0)}},this);this.I(16);this.I(4)}this.J(32768)&&(c&&($.U(c),c.O(this.Ua),c.X(),c.da(!1)),this.I(32768));if(this.J(16)){var n=this.wc();this.b.forEach(function(a){var b=$.Uk($.Hv(this.state,a.rowIndex));n.select(a.rowIndex);a.JB&&a.Di&&y7(a.Di,$.Sb(z7(this,"fill",b)))},this);this.I(16)}};$.g.WB=function(){return["x"]};
$.g.XB=function(a){return a.get("x")};$.g.VB=function(a){a=a.get("name");return $.z(a)?a:null};$.g.xF=function(){return this.data().Yc("category")?["value","category"]:["value"]};$.g.ej=function(){return!this.aa().Eb()};$.g.gv=function(a){var b;$.z(a)?(b=$.Pr(a,null))||(b=null):$.D(a)?(b=$.Pr(a.type,!0),b.K(a)):b=null;return b};$.g.lD=function(a){var b=a.scale;(b=this.gv(b))&&this.scale(b);b=a.colorScale;(b=this.gv(b))&&this.pd(b)};
$.g.Y=function(a,b){x7.B.Y.call(this,a,b);$.tp(this,A7,a,b);this.lD(a);this.data(a.data);this.GW(a.angles);this.Yb(a.palette);this.Hj().ja(!!b,a.colorRange);this.ca.ja(!!b,a);this.ca.ja(!!b,a.normal);this.ya.ja(!!b,a.hovered);this.Da.ja(!!b,a.selected)};
$.g.F=function(){var a=x7.B.F.call(this);$.Bp(this,A7,a);a.data=this.data().F();$.p(this.D)&&(a.angles=this.D);a.scale=this.scale().F();this.pd()&&(a.colorScale=this.pd().F());a.colorRange=this.Hj().F();a.palette=this.Yb().F();a.normal=this.ca.F();a.hovered=this.ya.F();a.selected=this.Da.F();return{chart:a}};
$.g.R=function(){for(var a=0;a<this.b.length;a++){var b=this.b[a];$.hd(b.Di);$.hd(b.Ik);$.hd(b.sD)}$.jd(this.ue,this.G,this.yb,this.ca,this.ya,this.Da,this.Xb,this.state,this.Aa,this.na,this.ed);this.Aa=this.state=this.oa=this.Jb=this.Xb=this.Da=this.ya=this.ca=this.yb=this.G=this.ue=null;delete this.na;this.ed=null;x7.B.R.call(this)};var B7=x7.prototype;B7.getType=B7.Qa;B7.data=B7.data;B7.angles=B7.GW;B7.scale=B7.scale;B7.colorScale=B7.pd;B7.colorRange=B7.Hj;B7.palette=B7.Yb;B7.normal=B7.Ta;
B7.hovered=B7.lb;B7.selected=B7.selected;B7.hover=B7.ti;B7.unhover=B7.Cd;B7.select=B7.Ai;B7.unselect=B7.Pd;B7.getPoint=B7.Ad;$.Fo["tag-cloud"]=Dja;$.F("anychart.tagCloud",Dja);}).call(this,$)}