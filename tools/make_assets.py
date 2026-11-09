# Regenerates the dummy SVG images and src/data/products.js. Run from the project root: python3 tools/make_assets.py
import math,json,re,os,sys
D='public/images'; os.makedirs(D,exist_ok=True)
KNIT='<pattern id="k" width="22" height="22" patternUnits="userSpaceOnUse"><path d="M0 7L11 18L22 7" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="3"/></pattern>'
def shade(h,f):
    r,g,b=[int(h[i:i+2],16) for i in (1,3,5)]
    return '#%02x%02x%02x'%tuple(max(0,min(255,int(v*f))) for v in (r,g,b))
BOK=''.join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff" opacity=".5"/>' for x,y,r in((120,100,90),(700,160,120),(560,560,100),(60,520,70)))
def wrap(w,h,c1,c2,inner,bok=True):
    b='<g filter="url(#bl)">'+BOK+'</g>' if bok else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{c1}"/><stop offset="1" stop-color="{c2}"/></linearGradient><filter id="bl"><feGaussianBlur stdDeviation="35"/></filter>{KNIT}</defs><rect width="{w}" height="{h}" fill="url(#bg)"/>{b}{inner}</svg>'
def kp(d,c): return f'<path d="{d}" fill="{c}"/><path d="{d}" fill="url(#k)"/>'
def kr(x,y,w,h,rx,c,e=''): return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{c}" {e}/><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="url(#k)" {e}/>'
def kc(x,y,r,c): return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{c}"/><circle cx="{x}" cy="{y}" r="{r}" fill="url(#k)"/>'
def petals(cx,cy,r,c,n=6):
    s=''.join(kc(round(cx+r*.68*math.cos(2*math.pi*i/n),1),round(cy+r*.68*math.sin(2*math.pi*i/n),1),round(r*.52,1),c) for i in range(n))
    return s+kc(cx,cy,round(r*.36,1),shade(c,.78))
def tulip(x,y,c,stem=460):
    return (f'<path d="M{x} {y+10}Q{x+6} {(y+stem)//2} {x+8} {stem}" stroke="#7d9a55" stroke-width="7" fill="none" stroke-linecap="round"/>'
        +kp(f"M{x-34} {y}Q{x-40} {y-70} {x} {y-92}Q{x+40} {y-70} {x+34} {y}Q{x} {y+18} {x-34} {y}Z",c)
        +f'<path d="M{x} {y-92}Q{x-14} {y-40} {x} {y+10}" stroke="{shade(c,.82)}" stroke-width="4" fill="none"/>')
SH='<ellipse cx="400" cy="645" rx="230" ry="22" fill="#8a6a40" opacity=".13"/>'
POT='<path d="M290 480H510L485 640H315Z" fill="#d79a76"/><rect x="280" y="455" width="240" height="36" rx="8" fill="#c78763"/>'
def shape(kind,c):
    d=shade(c,.86); L=shade(c,1.1)
    if kind in('sweater','cardigan'):
        s=SH+kp("M300 130Q400 190 500 130L650 200L735 440L650 475L575 340L575 570L225 570L225 340L150 475L65 440L150 200Z",c)+f'<rect x="225" y="535" width="350" height="35" fill="{d}"/><path d="M300 130Q400 215 500 130Q400 105 300 130Z" fill="{d}"/>'
        if kind=='cardigan': return s+f'<path d="M400 175V535" stroke="{d}" stroke-width="6"/>'+''.join(f'<circle cx="420" cy="{y}" r="9" fill="#c8a06a"/>' for y in (250,330,410,490))
        return s+''.join(f'<path d="M{x} 230V520" stroke="{d}" stroke-width="5" opacity=".6"/>' for x in (330,370,430,470))
    if kind=='scarf': return SH+kp("M190 150Q400 60 610 150L630 260Q400 190 170 260Z",c)+kp("M230 240L340 255L360 610L240 610Z",c)+kp("M400 235L510 245L520 560L410 570Z",c)+''.join(f'<rect x="{x}" y="610" width="6" height="40" fill="{d}"/>' for x in range(244,358,18))+''.join(f'<rect x="{x}" y="565" width="6" height="40" fill="{d}"/>' for x in range(414,516,18))
    if kind=='shawl': return SH+kp("M110 190L690 190L400 580Z",c)+f'<path d="M150 215L650 215L400 540Z" fill="none" stroke="{L}" stroke-width="6" stroke-dasharray="4 14" stroke-linecap="round"/>'+''.join(f'<path d="M{110+i*18} 190L{110+i*18} 160" stroke="{d}" stroke-width="5"/>' for i in range(33))
    if kind in('hat','earflap'):
        s=SH+kp("M185 450Q185 170 400 170Q615 170 615 450Z",c)+kr(160,420,480,110,22,d)+kc(400,150,62,L)
        return s+(kr(190,500,90,170,40,c)+kr(520,500,90,170,40,c) if kind=='earflap' else '')
    if kind=='gloves':
        s=SH+kr(270,330,260,240,40,c)+kr(250,520,300,60,12,d)
        for i,h in enumerate((200,250,240,190)): s+=kr(270+i*68,370-h,56,h,28,c)
        return s+kr(190,350,60,170,28,c,'transform="rotate(-25 220 430)"')
    if kind=='socks': return SH+kp("M300 120H480V400L640 470Q690 500 650 560L600 600Q540 620 500 580L330 500Q300 480 300 440Z",c)+kr(290,110,200,70,10,d)
    if kind=='cushion': return SH+kr(170,130,460,460,50,c)+''.join(f'<path d="M{x} 170q28 38 0 76t0 76t0 76t0 76t0 76" fill="none" stroke="{d}" stroke-width="10" stroke-linecap="round"/>' for x in (260,350,450,540))
    if kind=='coasters': return SH+''.join(kc(x,y,95,col)+''.join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="none" stroke="{shade(col,.8)}" stroke-width="5"/>' for r in (68,42,16)) for x,y,col in((300,430,c),(500,430,L),(400,260,d)))
    if kind=='bouquet':
        s=SH+tulip(310,330,c,430)+tulip(400,270,"#f2c6c2",430)+tulip(490,330,"#e6b650",430)
        s+='<ellipse cx="330" cy="400" rx="60" ry="18" fill="#9db37a" transform="rotate(-30 330 400)"/><ellipse cx="470" cy="400" rx="60" ry="18" fill="#9db37a" transform="rotate(30 470 400)"/>'
        return s+'<path d="M255 410L545 410L430 650H370Z" fill="#f6ecd6"/><path d="M255 410L400 470L545 410" fill="none" stroke="#e3d3b0" stroke-width="5"/><path d="M370 650L400 470L430 650" fill="#ecdcb8"/>'
    if kind=='roses': return SH+'<path d="M400 420V640" stroke="#7d9a55" stroke-width="8"/>'+petals(290,300,88,c)+petals(510,300,88,"#f2c6c2")+petals(400,210,92,"#e6b650")+petals(400,370,84,L)+'<path d="M255 450L545 450L430 650H370Z" fill="#f6ecd6"/>'
    if kind=='stem': return SH+'<path d="M400 330Q392 480 400 650" stroke="#7d9a55" stroke-width="9" fill="none"/><ellipse cx="350" cy="520" rx="52" ry="18" fill="#9db37a" transform="rotate(-35 350 520)"/><ellipse cx="452" cy="470" rx="52" ry="18" fill="#9db37a" transform="rotate(35 452 470)"/>'+petals(400,260,100,c,7)
    if kind=='sunflower':
        pts=[(400+110*math.cos(math.radians(a)),250+110*math.sin(math.radians(a)),a) for a in range(0,360,30)]
        return SH+'<path d="M400 330Q392 480 400 650" stroke="#7d9a55" stroke-width="9" fill="none"/><ellipse cx="340" cy="520" rx="60" ry="20" fill="#9db37a" transform="rotate(-35 340 520)"/>'+''.join(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="50" ry="22" fill="{c}" transform="rotate({a} {x:.0f} {y:.0f})"/>' for x,y,a in pts)+kc(400,250,72,"#9a6a45")
    if kind=='pot': return SH+tulip(340,360,c,470)+tulip(400,320,"#f2c6c2",470)+tulip(460,360,"#e6b650",470)+POT
    if kind=='cactus': return SH+kr(370,230,64,250,32,c)+kr(310,320,64,40,20,c)+kr(310,320,38,110,19,c)+kr(430,290,64,40,20,c)+kr(456,290,38,100,19,c)+POT
    if kind=='keychain': return SH+'<circle cx="400" cy="150" r="62" fill="none" stroke="#b9a37a" stroke-width="10"/>'+''.join(f'<circle cx="400" cy="{y}" r="14" fill="none" stroke="#b9a37a" stroke-width="6"/>' for y in (240,275,310))+petals(400,450,110,c,6)
    if kind=='heart': return SH+'<circle cx="400" cy="150" r="55" fill="none" stroke="#b9a37a" stroke-width="10"/>'+kp("M400 590C220 470 230 290 330 285C375 283 400 320 400 340C400 320 425 283 470 285C570 290 580 470 400 590Z",c)
    if kind=='clip': return SH+kr(190,370,420,80,40,"#d9bd8d")+petals(400,410,76,c)
    if kind=='scrunchie':
        rays=''.join(f'<path d="M{400+210*math.cos(math.radians(a)):.0f} {380+135*math.sin(math.radians(a)):.0f}L{400+110*math.cos(math.radians(a)):.0f} {390+66*math.sin(math.radians(a)):.0f}" stroke="{d}" stroke-width="5" opacity=".6"/>' for a in range(0,360,24))
        return SH+f'<ellipse cx="400" cy="380" rx="230" ry="150" fill="{c}"/><ellipse cx="400" cy="380" rx="230" ry="150" fill="url(#k)"/><ellipse cx="400" cy="390" rx="100" ry="58" fill="#f1e6cf"/>'+rays
    if kind=='tote': return SH+f'<path d="M300 320C300 140 500 140 500 320" stroke="{d}" stroke-width="24" fill="none" stroke-linecap="round"/>'+kp("M220 300H580L610 630H190Z",c)+f'<path d="M230 400H570" stroke="{d}" stroke-width="5" opacity=".6"/>'
    if kind=='pouch': return SH+f'<path d="M230 330C230 150 570 150 570 330" stroke="{d}" stroke-width="16" fill="none"/>'+kr(190,330,420,280,50,c)+f'<path d="M210 400H590" stroke="{d}" stroke-width="6"/>'+petals(400,520,56,"#f2c6c2")
def label(t): return f'<text x="400" y="684" text-anchor="middle" font-family="Georgia,serif" font-size="27" fill="#8a7658">{t}</text>'
def save(n,s): open(f'{D}/{n}.svg','w').write(s)

C=dict(rose="#e7a0a4",blush="#f2c6c2",mustard="#e6b650",sage="#9db37a",cream="#efe3c8",sky="#a9c3d6",lavender="#c7b6dc",terracotta="#d79a76",oat="#d9bd8d",wine="#b24a56",moss="#7f9255",grey="#b9b2a4")
cats=[("bouquets","Flower Bouquets","Bouquets"),("flowers","Single Flowers","Flowers"),("potted","Potted Plants","Potted"),("keychains","Keychains & Charms","Keychains"),("accessories","Hair Accessories","Hair"),("bags","Bags & Pouches","Bags"),("sweaters","Sweaters & Cardigans","Sweaters"),("scarves","Scarves & Shawls","Scarves"),("caps","Caps & Beanies","Caps"),("gloves","Gloves & Socks","Gloves"),("decor","Home Décor","Décor")]
SZ='["S","M","L","XL"]'; ONE='["Free size"]'
P=[ # name, category, shape, main colour, available colours, sizes, description, featured
("Tulip Crochet Bouquet","bouquets","bouquet","rose",["rose","blush","mustard","lavender"],ONE,"A hand-crocheted tulip bouquet that never wilts. A lovely gift for birthdays, anniversaries and just because.",1),
("Mixed Rose Bouquet","bouquets","roses","wine",["wine","rose","blush","cream"],ONE,"Crochet roses in a soft wrapped bunch. Colours can be customised to match your occasion.",1),
("Crochet Rose Stem","flowers","stem","rose",["rose","wine","blush","mustard","lavender"],ONE,"A single long-stem rose, hand-crocheted. Mix and match a few to make your own bunch.",0),
("Crochet Sunflower Stem","flowers","sunflower","mustard",["mustard","cream"],ONE,"A cheerful crochet sunflower on a long stem, made to brighten any shelf or vase.",0),
("Potted Crochet Tulips","potted","pot","rose",["rose","blush","mustard","sky"],ONE,"Crochet tulips in a little pot. A gift that stays fresh forever.",1),
("Mini Cactus Pot","potted","cactus","sage",["sage","moss"],ONE,"A tiny crochet cactus in a terracotta pot. Zero watering, all the charm.",0),
("Flower Keychain","keychains","keychain","blush",["blush","rose","mustard","lavender"],ONE,"A pretty crochet flower on a keyring. Great for bags, keys and return gifts.",0),
("Heart Charm Keyring","keychains","heart","wine",["wine","rose","blush"],ONE,"A small hand-crocheted heart charm. Made in the colours you love.",0),
("Flower Hair Clip","accessories","clip","blush",["blush","rose","mustard","sky"],ONE,"A handmade crochet flower on a sturdy clip. Light and easy to wear.",0),
("Crochet Scrunchie","accessories","scrunchie","lavender",["lavender","blush","sage","oat"],ONE,"A soft crochet scrunchie that holds hair gently. Made to order in your colours.",0),
("Crochet Tote Bag","bags","tote","oat",["oat","cream","sage","terracotta"],ONE,"A sturdy hand-crocheted tote for everyday errands. Custom colours on request.",1),
("Mini Sling Pouch","bags","pouch","terracotta",["terracotta","oat","sage","lavender"],ONE,"A compact crochet pouch with a flower detail. Perfect for phone, keys and essentials.",0),
("Hand-Knit Cable Sweater","sweaters","sweater","cream",["cream","moss","wine","grey"],SZ,"A cosy cable-knit sweater, hand-knitted for winter. Sizes and colours made to order.",1),
("Button Front Cardigan","sweaters","cardigan","moss",["moss","oat","wine","cream"],SZ,"A warm button-front cardigan in soft wool. Easy to layer, easy to love.",0),
("Chunky Wool Scarf","scarves","scarf","wine",["wine","moss","oat","grey"],ONE,"A long, chunky wool scarf with fringe. Warm enough for the coldest mornings.",1),
("Soft Wool Shawl","scarves","shawl","terracotta",["terracotta","oat","sage","lavender"],ONE,"A soft, drapey shawl to wrap up in. Made to order in your choice of colour.",0),
("Pom-Pom Beanie","caps","hat","oat",["oat","blush","moss","grey"],ONE,"A ribbed woolen beanie with a handmade pom-pom. Warm, snug and playful.",1),
("Ear-Flap Crochet Cap","caps","earflap","sage",["sage","terracotta","oat","sky"],ONE,"A cosy crochet cap with ear flaps for chilly days. Kids and adult sizes on request.",0),
("Fingerless Gloves","gloves","gloves","grey",["grey","oat","wine","moss"],ONE,"Warm hands, free fingers. Hand-knitted in soft wool.",0),
("Woolen Socks","gloves","socks","cream",["cream","moss","wine","sky"],'["M","L"]',"Thick, cushioned woolen socks for cold floors and cosy nights.",0),
("Cable Knit Cushion Cover","decor","cushion","cream",["cream","terracotta","sage"],ONE,"A textured cushion cover to make any sofa look and feel cosier.",1),
("Crochet Coaster Set","decor","coasters","blush",["blush","sage","mustard","oat"],ONE,"A set of hand-crocheted coasters. Pretty on the table, kind to your furniture.",0),
]
slug=lambda n: re.sub(r'(^-|-$)','',re.sub(r'[^a-z0-9]+','-',n.lower()))
for n,cat,kind,ck,_,_,_,_ in P: save(slug(n),wrap(800,700,"#faf3e4","#efe3c8",shape(kind,C[ck])+label(n)))
tr=lambda t:f'<g transform="translate(0 -40)">{t}</g>'
save("col-bouquets",wrap(800,560,"#f6dfd8","#e9c4bf",tr(shape("bouquet",C["rose"]))))
save("col-winter",wrap(800,560,"#f3e7cf","#e2cfa8",tr(shape("sweater",C["cream"]))))
save("col-bags",wrap(800,560,"#ecdccb","#d9c1a6",tr(shape("tote",C["oat"]))))
save("col-decor",wrap(800,560,"#e9c9a8","#d3a67b",tr(shape("cushion","#f2e7cf"))))
yarn=''.join(f'<path d="M{520+i*20} {330+i*5}Q400 {230+i*40} {680-i*20} {550-i*5}" fill="none" stroke="#d3bf92" stroke-width="5"/>' for i in range(8))
save("story",wrap(800,800,"#f3e8d0","#e1cda3",kr(120,90,560,230,40,C["rose"])+kr(200,330,400,300,22,"#f1e5c9")+'<path d="M230 700L580 280M580 700L230 300" stroke="#c8964a" stroke-width="14" stroke-linecap="round"/><circle cx="600" cy="640" r="95" fill="#efe3c8"/>'+yarn))
chat=('<path d="M130 150H470Q500 150 500 180V330Q500 360 470 360H300L220 430V360H130Q100 360 100 330V180Q100 150 130 150Z" fill="#fff"/>'
 '<path d="M270 280H470Q500 280 500 310V460Q500 490 470 490H430V560L350 490H270Q240 490 240 460V310Q240 280 270 280Z" fill="#1fa855" opacity=".92"/>'
 +''.join(f'<circle cx="{x}" cy="255" r="12" fill="#c8a06a"/>' for x in (180,230,280))+''.join(f'<circle cx="{x}" cy="385" r="11" fill="#fff"/>' for x in (310,360,410)))
save("process-1",wrap(600,600,"#f3e5d8","#e6cdb8",chat))
save("process-2",wrap(600,600,"#f6ead3","#e6d3ac",''.join(kc(x,y,70,col) for x,y,col in((200,230,C["rose"]),(380,230,C["mustard"]),(290,370,C["sage"]),(470,370,C["lavender"]),(120,380,C["sky"])))))
save("process-3",wrap(600,600,"#f1e1c0","#dcc596",kr(120,260,360,260,14,"#f1e5c9")+'<path d="M140 120L420 420M460 120L180 420" stroke="#c8964a" stroke-width="14" stroke-linecap="round"/><circle cx="140" cy="120" r="14" fill="#c8964a"/><circle cx="460" cy="120" r="14" fill="#c8964a"/>'))
save("process-4",wrap(600,600,"#f6ead3","#e6d3ac",'<path d="M130 240L300 170L470 240V440L300 520L130 440Z" fill="#d9b98a"/><path d="M130 240L300 310L470 240" fill="none" stroke="#b9996a" stroke-width="6"/><path d="M300 310V520" stroke="#b9996a" stroke-width="6"/><rect x="266" y="200" width="68" height="110" fill="#f2c6c2" transform="rotate(-18 300 250)" opacity=".9"/>'))
save("hero",wrap(900,1000,"#fbeee0","#f1d9cf",'<ellipse cx="450" cy="900" rx="420" ry="60" fill="#8a6a40" opacity=".12"/><g transform="translate(-130 -30) scale(1.32)">'+shape("bouquet",C["rose"]).replace(SH,'')+'</g>'+kc(190,880,70,C["mustard"])+kc(300,910,56,C["sage"])+kc(740,890,66,C["lavender"])+kc(650,925,50,C["blush"]),False))

if "--data" in sys.argv:  # writes src/data/products.js (do NOT run after you have edited it by hand)
    js = """// ============================================================
//  PRODUCT DATA: edit this file to manage your catalog.
//
//  ADD A PRODUCT: copy any product block below, give it a new unique `id`,
//  change the fields, and put its photo in /public/images/.
//  REMOVE A PRODUCT: delete its block.
//
//  Fields
//    name         product name (also used for the page URL)
//    category     must match a `slug` in `categories` below
//    price        number (e.g. 1499) to show a price, or null for "Price on enquiry"
//    colors       list of colour names (see `colorHex` for the swatch colours)
//    sizes        e.g. ["S","M","L","XL"] or ["Free size"]
//    featured     true = shown in "Favourites" (/shop?tag=best)
//    image        main photo, e.g. "/images/my-product.jpg"
//    images       (optional) extra photos for a gallery: ["/images/a.jpg", "/images/b.jpg"]
//    description  short text shown on the product page
// ============================================================

export const categories = [
""" + ''.join(f'  {{ slug: "{s}", name: "{n}", short: "{sh}" }},\n' for s,n,sh in cats) + """];

// Swatch colours. Add your own names here, then use them in a product's `colors`.
export const colorHex = {
""" + ''.join(f'  {k.capitalize()}: "{v}",\n' for k,v in C.items()) + """};

const rawProducts = [
"""
    for i,(n,cat,kind,ck,oth,sizes,desc,feat) in enumerate(P,1):
        js+='  {\n'+f'    id: {i},\n    name: {json.dumps(n)},\n    category: "{cat}",\n    price: null,\n    colors: [{", ".join(json.dumps(k.capitalize()) for k in oth)}],\n    sizes: {sizes},\n    featured: {"true" if feat else "false"},\n    image: "/images/{slug(n)}.svg",\n    description: {json.dumps(desc)},\n'+'  },\n'
    js+=''']\n
// ---- you normally don't need to touch anything below this line ----
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const products = rawProducts.map((p) => ({
  price: null,
  sizes: ["Free size"],
  featured: false,
  ...p,
  slug: p.slug || slugify(p.name),
  colors: (p.colors || []).map((c) => (typeof c === "string" ? { name: c, hex: colorHex[c] || "#d9c9a8" } : c)),
  images: p.images && p.images.length ? p.images : [p.image],
}));
'''
    open('src/data/products.js','w').write(js)
print(len(P),"products")
