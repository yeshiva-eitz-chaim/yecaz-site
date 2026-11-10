(function(){
  var f=document.getElementById('yg-form'); if(!f) return;
  var q=new URLSearchParams(location.search), src=q.get('src')||'';
  try{ if(src) sessionStorage.setItem('yg_src',src); else src=sessionStorage.getItem('yg_src')||''; }catch(x){}
  var s=document.getElementById('yg-src'); if(s) s.value=src;
  f.addEventListener('submit',function(ev){
    var v=function(n){var el=f.elements[n]; return el? String(el.value||'').trim() : '';};
    var sto=(f.querySelector('input[name=sto]:checked')||{}).value||'';
    var email=v('email');
    if(!v('name')||!v('phone')||!sto||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      ev.preventDefault(); var e=document.getElementById('yg-err'); e.style.display='block'; e.scrollIntoView({behavior:'smooth',block:'center'}); return;
    }
    var p={_subject:'Tax Credit Call Request: '+v('name'),_template:'table',_captcha:'false',_replyto:email,
      Name:v('name'),Email:email,Phone:v('phone'),'Already giving to an STO?':sto==='yes'?'Yes':'No',
      'Best time to talk':v('best_time'),Note:v('note'),Source:src,'Submitted from':location.origin};
    try{ sessionStorage.setItem('yg_pending',JSON.stringify(p)); }catch(x){}
    var b=f.querySelector('button[type=submit]'); if(b){ b.disabled=true; b.textContent='Sending…'; }
  });
})();
