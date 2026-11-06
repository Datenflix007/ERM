/* Fachlogik: Positionen sind absichtlich nicht Teil der Bewertung. */
window.ERMValidator = (() => {
 const norm = s => (s||'').toLowerCase().replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss').replace(/[^a-z0-9]/g,'');
 const aliases={schueler:['schueler','schüler'],lehrkraft:['lehrkraft','lehrer','lehrerin'],klasse:['klasse'],ag:['ag','arbeitsgemeinschaft'],sammelkarte:['sammelkarte','kartentyp','karte'],sammlung:['sammlung'],exemplar:['kartenexemplar','exemplar'],person:['person','besitzer','besitzerin'],projekt:['projekt'],raum:['raum']};
 const has=(nodes,name)=>nodes.some(n=>n.type==='entity'&&aliases[name].some(a=>norm(n.label)===norm(a)));
 const find=(nodes,name)=>nodes.find(n=>n.type==='entity'&&aliases[name].some(a=>norm(n.label)===norm(a)));
 const linked=(model,a,b)=> {let A=find(model.nodes,a),B=find(model.nodes,b); if(!A||!B)return null; let rel=model.nodes.find(r=>r.type==='relation'&&model.edges.some(e=>e.a===r.id&&(e.b===A.id||e.b===B.id))&&model.edges.some(e=>e.a===r.id&&(e.b===A.id||e.b===B.id))); return rel;};
 const attr=(model,entity,terms,key=false)=>{let E=find(model.nodes,entity); if(!E)return false; return model.nodes.some(a=>a.type==='attribute'&&model.edges.some(e=>(e.a===a.id&&e.b===E.id)||(e.b===a.id&&e.a===E.id))&&terms.some(t=>norm(a.label)===norm(t))&&(!key||a.key));};
 const specs=[
  {title:'Sammelkarte modellieren', entities:['sammelkarte'], attrs:[['sammelkarte',['kartenid','karteid'],true],['sammelkarte',['name']],['sammelkarte',['kategorie']],['sammelkarte',['seltenheit']] ]},
  {title:'Schüler und Klasse',entities:['schueler','klasse'],rels:[['schueler','klasse','1:n']]},
  {title:'Schüler und AG',entities:['schueler','ag'],rels:[['schueler','ag','n:m']]},
  {title:'Sammelkarten-Sammlung',entities:['sammlung','sammelkarte','exemplar','person'],rels:[['sammelkarte','exemplar','1:n'],['person','exemplar','1:n']]},
  {title:'Projekttage',entities:['projekt','lehrkraft','schueler','raum'],rels:[['projekt','lehrkraft','n:1'],['projekt','raum','n:1'],['projekt','schueler','n:m']]}
 ];
 function validate(model,task){ const s=specs[task], good=[],check=[],next=[]; s.entities.forEach(x=>has(model.nodes,x)?good.push(`Entitätstyp „${x==='schueler'?'Schüler':x==='ag'?'AG':x[0].toUpperCase()+x.slice(1)}“ ist vorhanden.`):check.push(`Der Entitätstyp „${x==='schueler'?'Schüler':x==='ag'?'AG':x}“ fehlt.`)); (s.attrs||[]).forEach(([e,ts,key])=>attr(model,e,ts,key)?good.push(`${key?'Schlüsselattribut ':'Attribut '}„${ts[0]}“ ist korrekt zugeordnet.`):check.push(`${key?'Das Schlüsselattribut':'Das Attribut'} „${ts[0]}“ fehlt oder ist nicht korrekt verbunden.`)); (s.rels||[]).forEach(([a,b,card])=>{let r=linked(model,a,b); if(!r)check.push(`Verbinde „${a}“ und „${b}“ über eine Beziehung.`); else if(r.card!==card)check.push(`Die Beziehung zwischen „${a}“ und „${b}“ braucht die Kardinalität ${card}, nicht ${r.card||'keine Angabe'}.`); else good.push(`„${a}“ und „${b}“ sind mit ${card} richtig verbunden.`)}); if(check.length)next.push(check[0]); else next.push('Sehr gut! Lies deine Beziehungsnamen noch einmal als Satz und begründe sie mit der Aufgabenstellung.'); return {good,check,next,complete:!check.length}; }
 return {validate,specs};
})();
