if(!_.heatmap_part){_.heatmap_part=1;(function($){var vK=function(a){$.$y.call(this,a)},wK=function(a,b,c){if(c){var d=b==$.Wk?"normal":b==$.ln?"hover":"select";b=a.j(d+"X");var e=a.j(d+"Y"),f=a.j(d+"Width");a=a.j(d+"Height");a=new $.I(b,e,f,a);c.rect.nf(a);c.hatchRect.nf(a)}},xK=function(a,b,c,d,e){$.Hz.call(this,a,b,c,d,e);$.jt(this.Ta().labels(),"same");this.Ta().labels().qb(this);this.b=$.Sk("stroke",2,!0);this.ca.Zn("stroke",[1024,65,4294967295])},yK=function(a,b,c,d,e){if(a=$.Bz(a,[a.Ta().labels,a.lb().labels,a.selected().labels],[],["label",
"hoverLabel","selectLabel"],a.QC(),!0,null,b,c,!1))if(c=$.qt(a),c.adjustByHeight||c.adjustByHeight){var f=b.j(d+"Width");b=b.j(d+"Height");d=(new $.dt).K(c.padding);f-=d.i("left")+d.i("right");b-=d.i("top")+d.i("bottom");$.hd(d);b=$.Ft(a,f,b,c.minFontSize,c.maxFontSize,c.adjustByWidth,c.adjustByHeight);e=Math.min(e||window.Infinity,b)}return e},zK=function(a,b){$.cA.call(this,!1);this.Ia("heatMap");this.Zd="heat-map";this.pa("defaultSeriesType","heat-map");this.Na=this.de(this.i("defaultSeriesType"),
a||null,b);$.R(this.xa,[["labelsDisplayMode",32768,1,0,function(){this.Na.u(256)}]])},AK=function(a,b){var c={},d=0,e=a.values(),f=[];if(e)for(var h=0;h<e.length;h++){var k=e[h],l=a.transform(k,0),m=a.transform(k,1);if(!b||1>=Math.min(l,m)&&0<=Math.max(l,m))c[$.fn(k)]=d++,f.push(String(k))}return{values:c,names:f}},BK=function(a,b,c){if($.ea(b))var d=c[b];else $.z(b)?(d=$.Pr(b,null))||(d=c[b]):$.D(b)?(d=$.Pr(b.type,null))&&d.K(b):d=null;d&&a.pd(d)},CK=function(a,b){var c=new zK(a,b);BK(c,c.ef("colorScale"),
c.jt());c.ug();c.pe();return c};$.H(vK,$.$y);$.mE[30]=vK;$.g=vK.prototype;$.g.type=30;$.g.flags=512;$.g.$o=["y"];$.g.lh={rect:"rect",hatchRect:"rect"};$.g.Pf=function(a,b){var c=this.Pc.Sc(b);wK(a,b,c)};$.g.EA=function(a,b){var c=a.j("shapes");wK(a,b,c)};$.H(xK,$.Hz);$.g=xK.prototype;$.g.TN=1.3E-5;$.g.ND={"%XValue":"x"};$.g.Ya=function(a){var b=this.za.Ya(a);return $.p(a)?this:b};
$.g.jO=function(){var a=this.Ta().labels(),b=this.lb().labels(),c=this.selected().labels(),d=a.enabled(),e=d||b.enabled(),f=d||c.enabled(),h=a.SA();e=(h||b.SA())&&e;f=(h||c.SA())&&f;h=d&&h;var k,l;d=k=l=window.NaN;$.hK(a,null);$.hK(b,null);$.hK(c,null);if(h||e||f){var m=this.aa();for(m.reset();m.advance();)m.j("missing")||(h&&(d=yK(this,m,$.Wk,"normal",d)),e&&(k=yK(this,m,$.ln,"hover",k)),f&&(l=yK(this,m,$.mn,"select",l)))}h?$.hK(a,d):$.hK(a,null);e?$.hK(b,k):$.hK(b,null);f?$.hK(c,l):$.hK(c,null)};
$.g.uda=function(a,b,c,d){b=a.j("left");var e=a.j("right");c=a.j("top");var f=a.j("bottom"),h=this.b(this,$.Wk),k=this.b(this,$.ln),l=this.b(this,$.mn);h=$.Xb(h)/2;k=$.Xb(k)/2;l=$.Xb(l)/2;e-=b;f-=c;a.j("normalX",b+h);a.j("normalY",c+h);a.j("normalWidth",e-h-h);a.j("normalHeight",f-h-h);a.j("hoverX",b+k);a.j("hoverY",c+k);a.j("hoverWidth",e-k-k);a.j("hoverHeight",f-k-k);a.j("selectX",b+l);a.j("selectY",c+l);a.j("selectWidth",e-l-l);a.j("selectHeight",f-l-l);return d};
$.g.tC=function(a){var b=this.Lk(),c=this.bb(),d=a.get("x"),e=a.get("y"),f=b.transform(d,0),h=b.transform(d,1),k=c.transform(e,0);c=c.transform(e,1);if(0>f&&0>h||0>k&&0>c||1<f&&1<h||1<k&&1<c)return!1;var l=Math.round(this.ye(f,!0)),m=Math.round(this.ye(k,!1)),n=Math.round(this.ye(h,!0)),q=Math.round(this.ye(c,!1));k=this.g/2;f=this.f/2;e=Math.min(l,n);l=Math.max(l,n);n=Math.min(m,q);m=Math.max(m,q);e+=Math.ceil(k);n+=Math.floor(f);l-=1==h?Math.ceil(k):Math.floor(k);m-=1==c?Math.floor(f):Math.ceil(f);
a.j("left",e);a.j("top",n);a.j("right",l);a.j("bottom",m);a.j("x",b.transform(d,.5));return!0};$.g.gH=function(a,b){this.fj.length=0;this.fj.push(this.uda);var c=this.aa();for(c.reset();c.advance();)this.Mz(c,a,b);this.fj.length=0};$.g.PE=function(a){var b=this.aa(),c=b.j("left"),d=b.j("top"),e=b.j("right");b=b.j("bottom");a=$.un(new $.I(c,d,e-c,b-d),a);a.x=Math.floor(a.x);a.y=Math.floor(a.y);return a};
$.g.pf=function(a,b,c){var d=this.za.i("labelsDisplayMode"),e=$.Bz(this,[this.Ta().labels,this.lb().labels,this.selected().labels],[],["label","hoverLabel","selectLabel"],this.QC(),!0,null,a,b,!1);if(e){var f=b==$.Wk?"normal":b==$.ln?"hover":"select";b=a.j(f+"X");var h=a.j(f+"Y"),k=a.j(f+"Width");f=a.j(f+"Height");h=$.Zl(b,h,k,f);b=this.Ta().labels();"drop"==d&&(k=$.qt(e),k.width=null,k.height=null,k=b.measure(e.Nf(),e.Cc(),k),h.left>k.left+.5||h.$a()<k.$a()-.5||h.top>k.top+.5||h.Ra()<k.Ra()-.5)&&
(b.clear(e.ka()),e=null);e&&((d="always-show"==d?this.ia:$.nb(this.ia,h))?(e.clip(d),c&&e.X()):b.clear(e.ka()))}a.j("label",e)};$.g.SU=function(a,b,c,d,e,f,h){$.At(a,$.cn([h,0,f,$.Zm,d,0,c,$.Zm,a,$.Zm,f||c,$.an,f,$.$m,a,$.an,c,$.$m]))};$.g.SC=function(){var a=this.sc();a=$.Fa(a.vg,a.wg);for(var b=0,c=0,d=0,e=a.length;d<e;d++){var f=a[d];if(f&&f.enabled()){var h=$.Xb(f.i("stroke"));f.Fb()?h>c&&(c=h):h>b&&(b=h)}}this.g=b;this.f=c;xK.B.SC.call(this)};
$.g.yX=function(a){var b=this.ia,c=b.Ra()-this.cp().bottom();b=b.$b()+this.cp().top();return $.Ya(a,b,c)};$.g.SP=function(){return[this,this.sc()]};$.g.fR=function(){return{}};
$.g.pm=function(a,b){var c={chart:{value:this.sc(),type:""},series:{value:this,type:""},scale:{value:this.Wa(),type:""},index:{value:b.ka(),type:"number"},x:{value:b.get("x"),type:"string"},y:{value:b.get("y"),type:"string"},heat:{value:b.get("heat"),type:"number"},seriesName:{value:this.name(),type:"string"}},d=this.sc().pd();if(d){var e=b.get("heat");if($.K(d,$.wx)){var f=d.Zm(e);f&&(c.colorRange={value:{color:f.color,end:f.end,name:f.name,start:f.start,index:f.sourceIndex},type:""});c.color={value:d.cq(e),
type:""}}}return c};$.g.me=function(a,b,c){b=xK.B.me.call(this,a,b,c);c=$.Kt(b);var d=b.lg();c.x={value:d.get("x"),type:"string"};c.y={value:d.get("y"),type:"string"};c.heat={value:d.get("heat"),type:"number"};var e;a=a||this.i("color")||"blue";var f=this.sc().pd();f&&(d=d.get("heat"),$.p(d)&&(e=f.cq(d)),c.scaledColor={value:e,type:""});c.colorScale={value:f,type:""};c.sourceColor={value:e||a,type:""};return $.Lt(b,c)};var DK=xK.prototype;DK.tooltip=DK.Ya;$.H(zK,$.cA);zK.prototype.qa=$.cA.prototype.qa|-2147483648;var EK={};EK["heat-map"]={zb:30,Db:2,Ib:[{name:"rect",Lb:"rect",Pb:"fill",Rb:"stroke",Vb:!0,Ab:!1,zIndex:0},{name:"hatchRect",Lb:"rect",Pb:"hatchFill",Rb:null,Vb:!0,Ab:!0,zIndex:1E-6}],Hb:null,Bb:null,vb:$.nE|5767168,Cb:"y",wb:"y"};zK.prototype.Bi=EK;var FK=["normal","hovered","selected"],GK=["data","tooltip"];
(function(){function a(a,b){for(var c=[],d=1;d<arguments.length;d++)c.push(arguments[d]);d=this.Zh(0);d=d[a].apply(d,c);return $.p(c[0])?this:d}for(var b=0;b<FK.length;b++){var c=FK[b];zK.prototype[c]=$.qa(a,c)}})();$.rp(zK,["fill","stroke","hatchFill","labels","markers"],"normal");var HK={};$.dp(HK,0,"labelsDisplayMode",$.jK);$.S(zK,HK);$.g=zK.prototype;$.g.ds=function(){return"heat-map"};$.g.av=function(a){return this.jk()?null:zK.B.av.call(this,a)};
$.g.Os=function(a,b){return new xK(this,this,a,b,!0)};$.g.wz=function(){return $.Nr};$.g.eC=function(){return["HeatMap chart scale","ordinal"]};$.g.NF=function(){return"ordinal"};$.g.Ct=function(){this.Na.u(1024);this.u(8421376,1)};$.g.pd=function(a){if($.p(a)){if(null===a&&this.Jb)this.Jb=null,this.u(-2147483136,1);else if(a=$.Vr(this.Jb,a,null,48,["HeatMap chart color scale","ordinal-color, linear-color"],this.gp,this)){var b=this.Jb==a;this.Jb=a;this.Jb.da(b);b||this.u(-2147483136,1)}return this}return this.Jb};
$.g.gp=function(a){$.W(a,6)&&this.u(-2147483136,1)};$.g.Nl=function(a){var b,c=[];if("categories"==a){this.mb();var d=this.pd();if(d&&$.K(d,$.wx)){var e=this.Na,f=d.Dq();a=0;for(b=f.length;a<b;a++){var h=f[a];"default"!==h.name&&c.push({text:h.name,iconEnabled:!0,iconType:"square",iconFill:h.color,disabled:!this.enabled(),sourceUid:$.oa(this),sourceKey:a,meta:{W:e,scale:d,te:h}})}}}return c};$.g.Vr=function(a){return"categories"==a};
$.g.Lq=function(a,b){var c=a.j();if("categories"==this.Af().i("itemsSourceMode")){var d=c.W;var e=c.scale;if(e&&d){var f=[];c=c.te;for(var h=d.wc();h.advance();){var k=h.get("heat");c==e.Zm(k)&&f.push(h.ka())}if(e=$.hn(b.domTarget))"single"==this.Zc().i("hoverMode")?e.Ef={W:d,kd:f}:e.Ef=[{W:d,kd:f,fn:f[f.length-1],ie:{index:f[f.length-1],Rf:0}}]}}};
$.g.Ep=function(a,b){var c=a.j();if("categories"==this.Af().i("itemsSourceMode")){var d=c.W;var e=c.scale;if(e&&d){var f=c.te,h=d.wc();for(c=[];h.advance();){var k=h.get("heat");f==e.Zm(k)&&c.push(h.ka())}if(e=$.hn(b.domTarget))"single"==this.Zc().i("hoverMode")?e.Ef={W:d,kd:c}:e.Ef=[{W:d,kd:c,fn:c[c.length-1],ie:{index:c[c.length-1],Rf:0}}]}}};$.g.Dp=function(a,b){var c=a.j();if("categories"==this.Af().i("itemsSourceMode")&&"single"==this.Zc().i("hoverMode")){var d=$.hn(b.domTarget);d&&(d.W=c.W)}};
$.g.OE=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++){var f=a[d],h;f.ie?h={index:f.ie.index,distance:f.ie.Rf}:h={index:window.NaN,distance:window.NaN};c.push({series:f.W,points:b?[]:f.kd?$.Ga(f.kd):[],nearestPointToCursor:h})}return c};$.g.BC=function(a,b,c){a=zK.B.BC.call(this,a,b,c);a.series=this;return a};$.g.Ad=function(a){return this.Na.Ad(a)};$.g.cu=function(){return!0};$.g.ek=function(){return this.Na.ek()};
$.g.uP=function(){var a=this.J(327680);zK.B.uP.call(this);if(a){var b=null,c=null,d=this.bb(),e=this.Wa(),f=$.qs(e),h=$.qs(d);if(f||h){if(f){var k=f;b=[]}if(h){var l=h;c=[]}for(var m=this.Na.wc();m.advance();){if(f){a=e.ex(m.get("x"));var n=m.get(k);$.p(b[a])||(b[a]=n||m.get("x")||m.get("heat"))}h&&(a=d.ex(m.get("y")),n=m.get(l),$.p(c[a])||(c[a]=n||m.get("y")||m.get("heat")))}f&&(e.ck=b);h&&(d.ck=c)}this.u(-2147483648)}if(this.J(-2147483648)){if(this.Jb&&this.Jb.Cf()){this.Jb.fg();m=this.Na.aa();
for(m.reset();m.advance();)this.Jb.Oc(m.get("heat"));this.Jb.ng()}this.Na&&this.Na.u(2048);this.u(32768);this.I(-2147483648)}};$.g.data=function(a,b){if($.p(a)){if(a){var c=a.title||a.caption;c&&this.title(c);a.rows&&(a=a.rows)}this.Na.data(a,b);return this}return this.Na.data()};$.g.xj=function(a){this.Na.xj(a);return this};$.g.select=function(a){this.Na.select(a);return this};
$.g.oK=function(a){this.mb();var b="selected"==a,c=AK(this.Wa(),b);a=c.values;var d=c.names;c=AK(this.bb(),b);b=c.values;var e=c.names;c=[];for(var f=0;f<e.length;f++)c.push([e[f]]);for(e=this.Na.If();e.advance();){f=a[$.fn(e.get("x"))];var h=b[$.fn(e.get("y"))],k=String(e.get("heat"));(0,window.isNaN)(f)||(0,window.isNaN)(h)||(c[h][f+1]=k)}d.unshift("#");return{headers:d,data:c}};
$.g.F=function(){var a=zK.B.F.call(this),b=a.chart;delete b.barsPadding;delete b.barGroupsPadding;delete b.crosshair;delete b.defaultSeriesType;return a};$.g.qs=function(a,b,c){BK(this,a.colorScale,b);zK.B.qs.call(this,a,b,c);$.tp(this,HK,a)};$.g.ps=function(a,b,c){zK.B.ps.call(this,a,b,c);$.Bp(this,HK,a);$.sy(a,"colorScale",this.pd(),b,c)};
$.g.HM=function(a,b,c){b={};var d=FK,e;for(e=0;e<d.length;e++){var f=d[e];$.p(a[f])&&(b[f]=a[f])}d=GK;for(e=0;e<d.length;e++)f=d[e],$.p(a[f])&&(b[f]=a[f]);this.Na.Y(b,c)};$.g.BM=function(a){var b=this.Na.F(),c=FK,d;for(d=0;d<c.length;d++){var e=c[d];$.p(b[e])&&(a[e]=b[e])}c=GK;for(d=0;d<c.length;d++)e=c[d],$.p(b[e])&&(a[e]=b[e])};$.g.R=function(){zK.B.R.call(this);this.Na=null};var IK=zK.prototype;IK.getType=IK.Qa;IK.xGrid=IK.Im;IK.yGrid=IK.Jm;IK.xAxis=IK.ah;IK.yAxis=IK.fi;IK.xScale=IK.Wa;
IK.yScale=IK.bb;IK.hover=IK.xj;IK.select=IK.select;IK.unhover=IK.Cd;IK.unselect=IK.Pd;IK.data=IK.data;IK.colorScale=IK.pd;IK.xZoom=IK.fq;IK.yZoom=IK.gq;IK.xScroller=IK.Zo;IK.yScroller=IK.ir;IK.annotations=IK.bk;$.Fo["heat-map"]=CK;$.F("anychart.heatMap",CK);}).call(this,$)}
