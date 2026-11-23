from pathlib import Path
import xml.etree.ElementTree as E,copy,re,base64,io,hashlib,json,subprocess,zlib
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
P=Path(__file__).resolve().parent
S='http://www.w3.org/2000/svg';X='http://www.w3.org/1999/xlink'
E.register_namespace('',S);E.register_namespace('xlink',X)
def clone(n):return copy.deepcopy(n)
def el(tag,attrs=None):return E.Element('{'+S+'}'+tag,attrs or {})
def serial(n):return E.tostring(n,encoding='unicode')
R=[E.parse(P/f'state-{i}.svg').getroot() for i in range(4)]
N=R[3][0];C=R[2][0];U=R[1][0];A=R[0][0];card=N[1];succ=U[1]
# Source original image dimensions and pattern transforms remain intact. Only encoded pixels are optimized.
for r in R:
 for n in r.iter('{'+S+'}image'):
  k='{'+X+'}href';raw=base64.b64decode(n.get(k).split(',')[1]);im=Image.open(io.BytesIO(raw)).convert('RGBA')
  image_id=n.get('id','')
  # Screen-space source art: success decorations <=194px wide; gift 131px; seal 96px; tiny badge 17px.
  # Keep SVG intrinsic dimensions/pattern transforms, only resample the decoded texture (>2x display).
  limits={'image0_10085_14724':304,'image1_10085_14724':328,'image2_10085_14724':392,'image4_10085_14724':312,'image0_10085_14601':64,'image1_10085_14601':300,'image1_10085_14417':200}
  limit=limits.get(image_id,392)
  im.thumbnail((limit,limit),Image.Resampling.LANCZOS)
  b=io.BytesIO();im.save(b,format='WEBP',quality=92,method=6,exact=True);n.set(k,'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode())
all_defs=el('defs')
for r in R:
 for n in r[-1]:all_defs.append(clone(n))
def svg(nodes,view='0 0 375 812',css='',id=None,style=''):
 a={'viewBox':view,'fill':'none','aria-hidden':'true'}
 if css:a['class']=css
 if id:a['id']=id
 if style:a['style']=style
 r=el('svg',a)
 for n in nodes:r.append(clone(n))
 return serial(r)
def group(nodes,id=None):
 g=el('g',{'id':id} if id else {})
 for n in nodes:g.append(clone(n))
 return g
# A single shared coordinate system; the two envelope surfaces are distinct animated layers.
back=clone(N[0]);back[0].set('d','M0 565.977V761H375V565.977C375 563.472 373.827 561.112 371.83 559.6H3.16992C1.17328 561.112 0 563.472 0 565.977Z');back.set('id','env-back')
flap=clone(N[0]);flap[0].set('d','M3.16992 559.6L187.5 420L371.83 559.6C373.827 561.112 375 563.472 375 565.977H0C0 563.472 1.17328 561.112 3.16992 559.6Z');flap.set('id','flap-back')
# Normal form art excludes all outlined text, input value and input background.
ribbon=clone(card[1]);ribbon[:]=[group(list(ribbon),'card-ribbon')]
right_leaf=group([card[7],card[8]],'gift-leaf-right')
left_leaf=group([card[9]],'gift-leaf-left')
form_art=[ribbon,right_leaf,left_leaf,card[13]]
button_art=clone(card[6]);button_art.remove(button_art[-1])
# Header is present in the empty-input source only, not added to the other three states.
nav=svg([A[0],A[1]],css='stage-navigation')
# Success split: foliage, banner, animated cup, editable description, landscape and pie.
succ_top=clone(succ[1]);banner=clone(succ_top[-1]);succ_top.remove(succ_top[-1])
succ_art=[succ_top,U[2],U[4]]
source_card_view='24 151 327 573'
form=f'''<div class="card-form-view" id="card-form-view">
{svg(form_art,source_card_view,'form-art')}
{svg([card[i] for i in (10,11,12)],source_card_view,'promo-art')}
<h1 class="card-title">Invitation Letter</h1>
<p class="card-desc">With the Invite Code<br>you can get <strong>200 Sapphires</strong>.</p>
<div class="input-wrapper" id="input-wrapper"><input id="invite-input" class="invite-input" type="text" value="ERKC6B8A" placeholder="" aria-label="Invite code" maxlength="8" pattern="[A-Za-z0-9]{{0,8}}" inputmode="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" oninput="handleInputChange(event)"><div class="error-row" id="error-row" role="alert"><span aria-hidden="true">ⓘ</span><span>Invalid code. Please check and try again</span></div></div>
<div class="btn-container" id="btn-container"><button class="redeem-btn" id="redeem-btn" onclick="handleRedeem()">{svg([button_art],'48 539 279 51','redeem-art')}<span>Redeem Now!</span></button></div>
</div>'''
success=f'''<div class="card-success-view" id="card-success-view" aria-label="Code applied successfully">
{svg(succ_art,source_card_view,'success-art')}
<div class="success-badge" id="success-badge" role="img" aria-label="Plus 200 sapphires">{svg([banner],source_card_view,'badge-art')}</div>
<div class="cup-lottie-container" id="cup-lottie-container" onclick="replayCupAnimation()" role="button" tabindex="0" aria-label="Replay sapphire animation"><div id="cup-lottie"></div></div>
<p class="success-desc" id="success-desc">Invite Code applied. 200 Sapphires<br>have been added to your balance.</p></div>'''
# One lower envelope/pumpkin group shared in all four states; duplicate export copies are intentionally removed.
front=[N[2]]+[N[i] for i in range(3,8)]+[N[13],N[14]]
seal=clone(C[10]);seal.attrib.pop('filter',None)
# Retain the immutable 750x1624 front-pocket raster, with exact alpha in WebP.
front_image=Image.open(P/'front-pocket-cache-2x.png').convert('RGBA');front_bytes=io.BytesIO()
front_image.save(front_bytes,format='WEBP',quality=92,method=6,exact=True)
front_cache='data:image/webp;base64,'+base64.b64encode(front_bytes.getvalue()).decode()
# Sample maple-leaf rects N[8..10] are replaced by the ambient #autumn-leaves motion layer.
stage=f'''<div class="motion-stage" id="motion-stage" data-view="filled">
<div id="autumn-leaves" aria-hidden="true"></div>
{nav}
{svg([flap],css='env-svg-layer',style='z-index:0;')}
{svg([back],css='env-svg-layer',style='z-index:1;')}
<div class="letter-card" id="letter-card">{svg([card[0]],source_card_view,'card-base')}{form}{success}</div>
<img class="env-svg-layer" id="envelope-front-art" style="z-index:3;" width="375" height="812" src="{front_cache}" alt="" decoding="sync" draggable="false" aria-hidden="true">
{svg([C[9]],css='env-svg-layer',id='flap-front',style='z-index:4;')}
<button id="wax-seal" onclick="replayAnimation()" aria-label="Open invitation">{svg([seal],'141 664 96 88.0122','seal-art')}</button>
</div>'''
# Resolve and deduplicate only referenced definitions, not four duplicated full-screen assets.
refs=lambda s:set(re.findall(r'url\(#([^)]*)\)|(?:xlink:href|href)="#([^\"]*)"',s))
def ids_used(s):return {a or b for a,b in refs(s)}
byid={n.get('id'):n for n in all_defs}
needed=ids_used(stage);last=None
while last!=needed:
 last=needed.copy()
 for k in list(needed):
  if k in byid:needed |= ids_used(serial(byid[k]))
defs=el('defs')
for n in all_defs:
 if n.get('id') in needed:defs.append(clone(n))
images={};remap={}
for n in list(defs):
 if n.tag.endswith('image'):
  key=(n.get('width'),n.get('height'),n.get('{'+X+'}href'))
  if key in images:remap[n.get('id')]=images[key];defs.remove(n)
  else:images[key]=n.get('id')
defstr=serial(defs)
for old,new in remap.items():defstr=defstr.replace('#'+old+'"','#'+new+'"')
# Build from the original, leaving original controls and timeline implementation intact.
original=(P/'original.html').read_text()
style=re.search(r'<style>(.*?)</style>',original,re.S).group(1)
# Repair two orphaned fragments already present in the supplied stylesheet.
style=style.replace("      100% {\n        opacity: 1;\n        transform: translateX(-50%) rotate(0deg) scale(1);\n      }\n    }", "")
style=style.replace("    }\n    }\n\n    \n\n  ", "    }\n\n  ")
controls=original[original.index('    <!-- Bottom Control Dashboard -->'):original.index('  <script>',original.index('    <!-- Bottom Control Dashboard -->'))]
# Original script is preserved except explicitly documented adaptation patches below.
scripts='\n'.join(m.group(1) for m in re.finditer(r'<script(?:\s[^>]*)?>(.*?)</script>',original,re.S) if m.group(1).strip())
# SVG light is the official 5.12.2 build: this animation uses only 12 image layers + 1 null parent.
ld_match=re.search(r'const sapphireLottieData = (\{.*\});',scripts)
ld=json.loads(ld_match.group(1))
assert all(layer['ty'] in (2,3) and not layer.get('ddd') for layer in ld['layers'])
for layer in ld['layers']:
 assert not any(k in layer for k in ('ef','masksProperties','shapes','t'))
for asset in ld['assets']:
 raw=base64.b64decode(asset['p'].split(',')[1]);image=Image.open(io.BytesIO(raw)).convert('RGBA')
 # Render scale 190/1216=.15625; .3125 source size retains 2x display sampling.
 image=image.resize((max(1,round(image.width*.3125)),max(1,round(image.height*.3125))),Image.Resampling.LANCZOS)
 output=io.BytesIO();image.save(output,format='WEBP',quality=95,method=6,exact=True)
 asset['p']='data:image/webp;base64,'+base64.b64encode(output.getvalue()).decode()
ld_text=json.dumps(ld,separators=(',',':'),ensure_ascii=False)
scripts=scripts[:ld_match.start(1)]+ld_text+scripts[ld_match.end(1):]
scripts=scripts.replace('100 蓝宝石','200 蓝宝石')
scripts=scripts.replace('function handleInputChange() {','function handleInputChange(e) {\n      if(!e||!e.isComposing)normalizeInviteInput();')
scripts=scripts.replace('function handleRedeem() {','function handleRedeem() {\n      if(inviteComposing)return;\n      normalizeInviteInput();')
scripts=scripts.replace("      if (inviteInput && !inviteInput.value) inviteInput.value = 'ERKC6B8A';", "      // Keep the current user value, including an intentional empty input.")
scripts=scripts.replace("function switchToNormalState() {", "function switchToNormalState(settle = true) {")
scripts=scripts.replace("      applyScrubTime(2.0);\n      timeline.value = '2.00';\n      timeLabel.textContent = '2.00s';", "      if(settle){applyScrubTime(2.0);timeline.value='2.00';timeLabel.textContent='2.00s';}")
scripts=scripts.replace("function startAnimation() {", "async function startAnimation() {\n      await prepareOpeningAssets();")
scripts=scripts.replace("      switchToNormalState();\n      applyScrubTime(0);", "      switchToNormalState(false);\n      applyScrubTime(0);")
scripts=scripts.replace("} else if (state === 'closed') {\n        applyScrubTime(0);", "} else if (state === 'closed') {\n        switchToClosedState();")

# Bug fix present in original: error after success must restore display, success direct link must settle the card.
scripts=scripts.replace("formView.classList.remove('is-hidden', 'fading-out');","formView.classList.remove('is-hidden', 'fading-out','hide');")
scripts=scripts.replace("function switchToErrorState() {", "function switchToErrorState() {\n      document.getElementById('card-form-view').style.display='flex';\n      document.getElementById('card-success-view').style.display='none';")
scripts=scripts.replace("function switchToSuccessState() {", "function switchToSuccessState() {\n      applyScrubTime(2); timeline.value='2.00';timeLabel.textContent='2.00s';")
# Avoid a DOMLoaded race on early success/replay; original clips and keyframes are unmodified.
scripts=scripts.replace('if (cupAnimInstance) {\n        cupAnimInstance.goToAndPlay(0, true);','if (cupAnimInstance) {\n        if (!cupLottieReady) { window.__pendingPlay=true; return; }\n        cupAnimInstance.goToAndPlay(0, true);')
scripts=scripts.replace("function scrubTimeline(val) {","function scrubTimeline(val) {\n      if(document.getElementById('card-success-view').classList.contains('is-visible'))switchToNormalState();")
# Add empty/closed source states while keeping all legacy normal/error/success/replay controls.
extra='''
let openingAssetsPromise=null;
function prepareOpeningAssets(){
 if(!openingAssetsPromise){
  const image=document.getElementById('envelope-front-art');
  openingAssetsPromise=typeof image.decode==='function'?image.decode():Promise.resolve();
 }
 return openingAssetsPromise;
}
window.addEventListener('DOMContentLoaded',()=>{prepareOpeningAssets().catch(()=>{});});
function switchToEmptyState(){switchToNormalState();inviteInput.value='';handleInputChange();syncSourceState();}
function switchToClosedState(){switchToNormalState(false);inviteInput.value='';applyScrubTime(0);timeline.value=0;timeLabel.textContent='0.00s';syncSourceState();}
function syncSourceState(timeOverride){
 const success=document.getElementById('card-success-view').classList.contains('is-visible');
 const time=typeof timeOverride==='number'?timeOverride:parseFloat(timeline.value);
 const view=success?'success':time<0.85?'closed':inviteInput.value?'filled':'empty';
 if(stage.dataset.view!==view)stage.dataset.view=view;
 inviteInput.setAttribute('aria-invalid',String(inputWrapper.classList.contains('is-error')));
 document.getElementById('wax-seal').tabIndex=time<0.6?0:-1;
 document.getElementById('wax-seal').style.pointerEvents=time<0.6?'auto':'none';
}
// Style/state observation does not replace the existing animation engine.
new MutationObserver(syncSourceState).observe(document.getElementById('card-success-view'),{attributes:true,attributeFilter:['class']});
new MutationObserver(()=>inviteInput.setAttribute('aria-invalid',String(inputWrapper.classList.contains('is-error')))).observe(inputWrapper,{attributes:true,attributeFilter:['class']});
inviteInput.addEventListener('input',syncSourceState);
inviteInput.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.isComposing&&e.keyCode!==229&&!inviteComposing)handleRedeem()});
document.getElementById('cup-lottie-container').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();replayCupAnimation()}});
function animateGiftLeaves(t){
 // Two source decorations only. Animate parent groups; native shape opacity (.3 vein) is untouched.
 for(const [id,start,end,angle,dx,dy] of [
  ['gift-leaf-right',1.42,1.86,14,6,8],
  ['gift-leaf-left',1.55,1.99,-12,-5,7]
 ]){
  const leaf=document.getElementById(id);if(!leaf)continue;
  const p=Math.max(0,Math.min(1,(t-start)/(end-start)));
  const e=1-Math.pow(1-p,3);
  leaf.style.opacity=String(e);
  leaf.style.transform='translate('+dx*(1-e)+'px,'+dy*(1-e)+'px) rotate('+angle*(1-e)+'deg)';
 }
}
const legacyApplyScrubTime=applyScrubTime;applyScrubTime=function(t){legacyApplyScrubTime(t);animateGiftLeaves(t);syncSourceState(t)};
window.addEventListener('DOMContentLoaded',()=>{
 const p=new URLSearchParams(location.search);if(p.get('state')==='empty')switchToEmptyState();
 if(p.get('still')==='1'){window.__pendingPlay=false;
  if(cupLottieReady)cupAnimInstance.goToAndStop(101,true);else window.__pendingFrame=101;
 }
 syncSourceState();
});
'''
# Pinned font fallback is embedded, keeping headings and controls live text on all systems.
font_obj=instantiateVariableFont(TTFont(P/'invite-latin.woff'),{'wght':(400,700)},inplace=False,optimize=True);font_obj.flavor='woff2';font_obj.recalcTimestamp=False;font_obj['head'].modified=TTFont(P/'invite-latin.woff')['head'].modified;font_io=io.BytesIO();font_obj.save(font_io);font=font_io.getvalue();font64=base64.b64encode(font).decode()
css='/* '+(P/'Inter-OFL.txt').read_text().replace('*/','* /')+' */\n'+f'''@font-face{{font-family:InviteInter;src:url(data:font/woff2;base64,{font64}) format('woff2');font-weight:400 700;font-style:normal;font-display:block;}}\n'''+(P/'restyle.css').read_text()
controls=controls.replace('<!-- Row 1: State switches -->','''<!-- Source design four states + retained legacy error state -->
<div class="controls-row"><button class="btn" onclick="switchToClosedState()">未开启</button><button class="btn" onclick="switchToEmptyState()">空白输入</button></div>
<!-- Row 1: State switches -->''')
# Preserve hidden controls by default; a production embed can hide them entirely via ?embed=1.
extra+="\nif(new URLSearchParams(location.search).get('embed')==='1')document.body.classList.add('embed');\n"
extra+=(P/'input-constraints.js').read_text()
leaf_js=(P/'autumn-leaves.js').read_text()
if 'AUTUMN_LEAF_ASSETS_JSON' not in leaf_js:
 raise SystemExit('autumn-leaves.js is missing the assets placeholder')
extra+=leaf_js.replace('AUTUMN_LEAF_ASSETS_JSON',(P/'autumn-leaf-assets.json').read_text())
# Minify application JS only (not embedded data, not external loading); retain readable motion.js for auditing.
(P/'motion.js').write_text(scripts+extra)
minifier=P/'node_modules/.bin/terser'
if not minifier.exists():raise SystemExit('Install pinned build dependency first: npm ci')
subprocess.run([str(P/'node_modules/.bin/esbuild'),str(P/'pack-decoder-entry.js'),'--bundle','--minify','--format=iife','--global-name=InvitePack','--outfile='+str(P/'pack-decoder.min.js')],check=True)
packed_ld=base64.b64encode(zlib.compress(ld_text.encode(),9)).decode()
runtime_source=(scripts+extra).replace('const sapphireLottieData = '+ld_text+';',"const sapphireLottieData = InvitePack.decode('"+packed_ld+"');")
assert runtime_source!=scripts+extra
(P/'motion-runtime-source.js').write_text(runtime_source)
minjs=subprocess.run([str(minifier),str(P/'motion-runtime-source.js'),'--compress','--mangle'],capture_output=True,text=True,check=True).stdout
(P/'motion.min.js').write_text(minjs)
(P/'final-style.css').write_text(style+'\n'+css)
light_source=(P/'lottie-light-5.12.2.min.js').read_bytes()
packed_player=base64.b64encode(zlib.compress(light_source,9)).decode()
player_loader="{const s=document.createElement('script');s.textContent=InvitePack.text('"+packed_player+"');document.head.appendChild(s);s.remove();}"
(P/'player-loader.js').write_text(player_loader)

html='''<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>邀请码 · 秋日邀请函</title>'''+f'<style>{style}\n{css}</style></head><body><div class="page-layout"><svg xmlns="{S}" xmlns:xlink="{X}" width="0" height="0" style="position:absolute;overflow:hidden" aria-hidden="true">{defstr}</svg>'+stage+controls+'<script>'+(P/'pack-decoder.min.js').read_text()+'</script><script>'+player_loader+'</script><script>'+minjs+'</script></body></html>'
html=html.replace('</head>','<!-- Runtime licenses\n'+(P/'Lottie-LICENSE.md').read_text()+'\n'+(P/'Fflate-LICENSE.txt').read_text()+'\n--></head>')
(P/'invite-four-state.html').write_text(html)
(P/'motion.js').write_text(scripts+extra)
(P/'stage-layers.html').write_text(stage)
(P/'shared-defs.svg').write_text(f'<svg xmlns="{S}" xmlns:xlink="{X}">{defstr}</svg>')
print('Built',len(html.encode()),'bytes; source definitions',len(all_defs),'used',len(defs),'unique embedded images',len(images))
