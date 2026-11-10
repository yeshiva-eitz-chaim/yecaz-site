(function(){
  var FS='https://formsubmit.co/ajax/school@yecaz.org';
  var e=new URLSearchParams(location.search).get('e')||'';
  var p=null; try{p=JSON.parse(sessionStorage.getItem('yg_pending')||'null')}catch(x){}
  if(!p) return;
  var first=String(p.Name||'').split(/\s+/)[0]; var t=document.getElementById('yg-tname'); if(t&&first) t.textContent=', '+first;
  p['Entry id']=e;
  function report(st){ try{ fetch('https://yecaz-copy.sites.tab.bot/give/mail-status',{method:'POST',headers:{'Content-Type':'text/plain'},body:JSON.stringify({e:e,status:st}),keepalive:true}); }catch(x){} }
  var body=new URLSearchParams(); Object.keys(p).forEach(function(k){body.append(k,p[k]==null?'':String(p[k]))});
  fetch(FS,{method:'POST',headers:{'Accept':'application/json'},body:body,keepalive:true})
    .then(function(r){return r.json()}).then(function(j){
      var ok=j&&(j.success===true||j.success==='true');
      report(ok?'sent':'failed: '+String((j&&j.message)||'').slice(0,140));
      try{sessionStorage.removeItem('yg_pending')}catch(x){}
    }).catch(function(err){report('failed: '+String(err).slice(0,140))});
})();
