# DESIGN-QUALITY-REPORT — ورد الشوق (Flowers Longing)

موقع فلوريست رومانسي راقٍ، Arabic RTL، Vanilla static. يوثّق هذا التقرير المهارات المُستدعاة وكيف طُبّقت، وقرارات التصميم، والموشن، والوصول.

---

## 1) المهارات المُستدعاة وكيف طُبّقت

### ui-ux-pro-max (+ design-system search)
- شُغّل: `search.py "florist flower shop romantic luxury" --design-system`.
- المُخرج اقترح نمط **Hero-Centric + Conversion** و**Organic Biophilic** بخط Cormorant/Great Vibes ولوحة خضراء + وردي.
- **القرار الواعي:** أبقينا على بنية Hero-Centric Conversion والـ effects (زوايا 16–24px، ظلال طبيعية، منحنيات ناعمة) من التوصية، لكن **رفضنا اللوحة الخضراء والخطوط اللاتينية** لأن البريف يفرض هوية رومانسية متمايزة عن الشقيق "النباتي/السيج". استبدلناها بـ: وردي مغبّر + برقوقي + كريمي + ذهبي، وخط عربي مزدوج **El Messiri + Tajawal** (مطلوب صراحةً ومناسب للنشاط أكثر من خط لاتيني).
- التزمنا بـ Pre-Delivery Checklist للمهارة: لا إيموجي كأيقونات، حالات hover ناعمة 150–300ms، تباين ≥4.5:1، focus ظاهر، احترام reduced-motion، وresponsive على 375/768/1024/1440.

### design-taste-frontend (anti-slop)
- **Design Read:** "صفحة هبوط تسويقية لفلوريست راقٍ لمشتري الهدايا بالرياض، بلغة رومانسية-تحريرية عربية RTL، تميل إلى vanilla + لوحة وردي/برقوقي/كريمي/ذهبي + El Messiri/Tajawal."
- **Dials:** VARIANCE 7 / MOTION 6 / DENSITY 3 (مطابق لـ Premium consumer preset).
- **Anti-default discipline:** تجنّبنا AI-purple، الهيرو المتمركز (استخدمنا هيرو غير متمركز يميل لليمين في RTL مع نص محاذى)، الكروت الثلاثة المتطابقة المملة (خدمات في 4 كروت بأيقونات متمايزة)، أسماء Jane Doe / Acme.
- **Color Consistency Lock:** أكسنت واحد (الوردي) عبر كل الصفحة، والذهبي كلمسة ثانوية محدودة.
- **Shape Lock:** الأزرار pill، الكروت 24px، الحقول 10px — نظام ثابت موثّق.
- **Hero discipline:** عنوان سطرين، subhead < 20 كلمة، CTA ظاهر بلا تمرير، صورة حقيقية (لا gradient blob).
- **Em-dash ban:** صفر em-dash في كل النصوص الظاهرة.
- **Theme Lock:** ثيم فاتح واحد للصفحة كلها.
- **صور حقيقية فقط:** 3 صور منقّاة من ملف قوقل، لا fake screenshots ولا SVG illustrations مرسومة يدويًا (الأيقونات من نمط Lucide stroke موحّد).

### emil-design-eng (taste/motion)
- **Custom easing** بدل المنحنيات الضعيفة: `--ease-out: cubic-bezier(0.23,1,0.32,1)` و`--ease-soft` للدراور.
- **Buttons feel responsive:** `transform: scale(0.97)` على `:active` لكل الأزرار وعناصر الضغط.
- **لا scale(0):** كروت تتفتّح من `scale(.92)` + opacity لا من الصفر.
- **مدد قصيرة:** ميكرو 150–250ms، انتقالات ≤420ms.
- **Stagger 40ms** لظهور عناصر المجموعة (ضمن نطاق Emil 30–80ms).
- **transitions لا keyframes** للـ reveal/toast (قابلة للمقاطعة).
- **reduced-motion** يُسقط الحركة بالكامل (بتلات، ken-burns، sheen، reveal).

---

## 2) مخرجات نظام التصميم (Palette / Type)
| Token | القيمة | الاستخدام |
|---|---|---|
| `--rose` | `#b76e79` | الأكسنت/البراند |
| `--rose-deep` | `#a04f5c` | نص وردي على كريمي (AA) + hover |
| `--plum` | `#4a2331` | الحبر الأساسي/خلفيات داكنة |
| `--cream` | `#fdf6f1` | الخلفية الدافئة |
| `--gold` | `#b08828` | لمسة ذهبية (AA على كريمي) |
| `--leaf` | `#5e6b4f` | سيقان/تفاصيل |
- **خط العرض:** El Messiri (600/700)، **النص:** Tajawal (400/500/700).
- **سلّم المسافات:** 4/8 ثابت. **الظلال:** 3 مستويات مائلة للبرقوقي (لا أسود نقي).

## 3) قرارات UI/UX الأساسية
- بنية تحويلية: Hero → Trust (تقييم قوقل) → Services → Why-us → Gallery → Order → Location → Final CTA → Footer + FABs.
- تنويع الـ layout families (4 كروت / صورة+قائمة / شبكة معرض / نموذج عمودين / بطاقتا موقع) — لا تكرار لعائلة layout.
- CTA رئيسي واحد بنيّة واحدة ("اطلب باقتك")، الثانوي مختلف النيّة (مشاهدة الأعمال / واتساب مباشر).

## 4) سبب الألوان والخطوط
- الوردي/البرقوقي/الكريمي/الذهبي = حقل عاطفي "رومانسي" يناسب هدايا الورد ويتمايز بصريًا عن أي لوحة سيج خضراء.
- El Messiri يمنح إحساسًا احتفاليًا عربيًا أنيقًا للعناوين؛ Tajawal يضمن قراءة مريحة للنص (≥16px جوال).

## 5) Hooked / UX التحويل
- Trigger ظاهر (زر الطلب في كل مكان + FABs)، Action سهل (نموذج دقيقة)، Reward فوري (Toast + واتساب جاهز)، Investment (حفظ localStorage). الاحتكاك أدنى ما يمكن.

## 6) iOS HIG / لمس
- أهداف لمس ≥48px، تباعد ≥8px، ردّ ضغط <150ms عبر scale، `min-h-dvh`، احترام safe interactions، FABs بعيدة عن الحواف.

## 7) Accessibility
- `lang=ar dir=rtl`، تدرّج عناوين h1→h3 بلا قفز، alt عربي وصفي لكل صورة + width/height + lazy لغير الهيرو.
- `aria-label` لكل زر أيقونة، `role=dialog/aria-modal` للقائمة واللايتبوكس، skip-link، `aria-live=polite` للـ Toast، أخطاء النموذج تحت الحقل + focus لأول حقل خاطئ.
- `:focus-visible` بحدّ 3px واضح، تباين مُتحقَّق منه ≥4.5:1، لا اعتماد على اللون وحده.

## 8) Impeccable / Taste (اختبار القبول)
هل يبدو فاخرًا؟ نعم — لوحة متناسقة، صور حقيقية، مساحات مدروسة. سعوديًا مناسبًا؟ نعم — لهجة محايدة طبيعية. يقنع خلال 3 ثوانٍ؟ نعم — عنوان واضح + تقييم قوقل + CTA. لا يشبه قالبًا مجانيًا؟ نعم — هوية وموشن خاصّان بالنشاط.

---

## موشن الموقع (موثّق)
| العنصر | الحركة | المدة/المنحنى | reduced-motion |
|---|---|---|---|
| بتلات الهيرو | انسياب CSS (transform/opacity) | 9–18s linear، عناصر متعددة | تُخفى بالكامل |
| صورة الهيرو | Ken-Burns 1.0→1.06 | ~14s ease-out | تتوقّف |
| كروت/معرض | bloom-in (scale .92→1 + fade) | .55s ease-out + stagger 40ms عبر IntersectionObserver + fallback 1.6s | تظهر فورًا |
| صور | hover zoom 1.03–1.05 + رفع ظل | .6s ease-out | ثابتة (لا hover motion على اللمس) |
| CTA | sheen خفيف عند hover | 1s | معطّل |
| الأزرار | scale(.97) عند الضغط | .16s | يبقى (تغذية لمس) |
| قائمة الجوال | انزلاق ملء الشاشة | .42s ease-soft | فوري عمليًا |

كل الحركات على `transform/opacity` فقط، وبحد أقصى عنصر/عنصرين متحركين لكل مشهد.
