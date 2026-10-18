// Original practice items for demonstration and learning. Not a validated IQ instrument.
const CATEGORIES = [
  { id: 'logical', name: 'Logical reasoning', short: 'Logic', icon: '◈', colour: 'violet', description: 'Find rules, test assumptions, and follow valid conclusions.' },
  { id: 'numerical', name: 'Numerical reasoning', short: 'Numbers', icon: '∑', colour: 'blue', description: 'Work with quantities, sequences, ratios, and patterns.' },
  { id: 'verbal', name: 'Verbal reasoning', short: 'Verbal', icon: 'Aa', colour: 'pink', description: 'Interpret language, relationships, and meaning precisely.' },
  { id: 'abstract', name: 'Abstract reasoning', short: 'Abstract', icon: '✧', colour: 'orange', description: 'Detect patterns and transformations in symbols.' },
  { id: 'spatial', name: 'Spatial reasoning', short: 'Spatial', icon: '⬡', colour: 'green', description: 'Think about orientation, shape, and position.' },
  { id: 'analytical', name: 'Analytical reasoning', short: 'Analysis', icon: '⌘', colour: 'cyan', description: 'Compare evidence, constraints, and structured information.' }
];

const raw = [
 ['logical','easy','If all norks are blue and all blue things are quiet, which must be true?',['All norks are quiet','All quiet things are norks','All blue things are norks','No norks are quiet'],0,'The relationship passes through the shared group: norks → blue → quiet.'],
 ['logical','easy','Mira is older than Jo. Jo is older than Lee. Who is youngest?',['Mira','Jo','Lee','Cannot tell'],2,'The order is Mira, then Jo, then Lee.'],
 ['logical','medium','Every pilot is trained. Some trained people are musicians. What follows?',['Every pilot is a musician','Some pilots are musicians','No pilots are musicians','No definite link between pilots and musicians'],3,'The overlap between trained people and musicians does not tell us whether pilots are in that overlap.'],
 ['logical','medium','A rule says: if the alarm is set, the light is red. The light is not red. What follows?',['The alarm is set','The alarm is not set','The light is broken','Nothing can be concluded'],1,'This is the contrapositive: if alarm set → red; not red → alarm not set, assuming the rule holds.'],
 ['logical','hard','Exactly one of A, B, and C is telling the truth. A says “B is lying.” B says “C is lying.” C says “A and B are both lying.” Who tells the truth?',['A','B','C','Impossible to determine'],1,'If B is truthful, C is lying; A’s claim that B is lying is false; C’s claim is false because B is truthful.'],
 ['logical','easy','Which is the odd one out?',['Triangle','Square','Circle','Cube'],3,'Cube is three-dimensional; the others are flat shapes.'],
 ['logical','medium','A meeting is before lunch. Lunch is before 2 pm. Which must be true?',['The meeting is after 2 pm','The meeting is before 2 pm','Lunch is before the meeting','The meeting starts at noon'],1,'If the meeting is before lunch and lunch is before 2 pm, the meeting must be before 2 pm.'],
 ['logical','hard','If the code is valid, the door opens. The door did not open. Which conclusion follows?',['The code was valid','The code was not valid','The door is locked forever','The code was entered twice'],1,'By the contrapositive, if valid code guarantees opening, failure to open means the code was not valid (given the rule).'],
 ['numerical','easy','What number comes next: 3, 6, 9, 12, …?',['13','14','15','18'],2,'The sequence increases by 3 each time.'],
 ['numerical','easy','A notebook costs ₦800. What do 3 notebooks cost?',['₦1,600','₦2,000','₦2,400','₦3,200'],2,'800 × 3 = 2,400.'],
 ['numerical','medium','What number comes next: 2, 6, 18, 54, …?',['108','126','162','216'],2,'Each term is multiplied by 3.'],
 ['numerical','medium','A team completes 24 tasks in 6 hours at a steady rate. How many in 9 hours?',['30','32','36','42'],2,'The rate is 24 ÷ 6 = 4 tasks per hour; 4 × 9 = 36.'],
 ['numerical','hard','A value rises by 20% and then falls by 20%. Compared with the start, the final value is…',['The same','4% lower','4% higher','8% lower'],1,'Starting at 100: 120 then 96. The final value is 4% below the starting value.'],
 ['numerical','easy','What is half of 3/4?',['3/8','1/2','2/3','3/2'],0,'Half of 3/4 is 3/4 × 1/2 = 3/8.'],
 ['numerical','medium','Find the missing number: 5, 8, 13, 20, 29, …',['36','38','40','42'],2,'The differences are 3, 5, 7, 9, so the next difference is 11 and 29 + 11 = 40.'],
 ['numerical','hard','A ratio is 3:5 and the total is 64. What is the smaller share?',['18','24','32','40'],1,'There are 8 ratio parts; each is 64 ÷ 8 = 8. The smaller share is 3 × 8 = 24.'],
 ['verbal','easy','Choose the closest meaning of “concise”.',['Brief and clear','Loud and forceful','Uncertain','Highly detailed'],0,'Concise means expressing something in few words while retaining clarity.'],
 ['verbal','easy','Bird is to nest as bee is to…',['Web','Hive','Burrow','Stable'],1,'A nest is a bird’s home; a hive is a bee colony’s home.'],
 ['verbal','medium','Which statement is an opinion rather than a verifiable fact?',['Water freezes at 0°C at standard pressure','Lagos is in Nigeria','This is the most beautiful city','A week has seven days'],2,'“Most beautiful” is a subjective judgement, not a directly verifiable fact.'],
 ['verbal','medium','Choose the word most opposite in meaning to “scarce”.',['Rare','Limited','Abundant','Meagre'],2,'Abundant means plentiful, the opposite of scarce.'],
 ['verbal','hard','“The proposal was plausible, though not conclusive.” What does this imply?',['The proposal was impossible','The proposal seemed reasonable but was not proven','The proposal was proven correct','The proposal was rejected without review'],1,'Plausible means seemingly reasonable; not conclusive means it does not settle the question.'],
 ['verbal','medium','Complete the analogy: Thermometer is to temperature as barometer is to…',['Speed','Pressure','Distance','Humidity'],1,'A thermometer measures temperature; a barometer measures atmospheric pressure.'],
 ['abstract','easy','What comes next: ▲ ■ ▲ ■ ▲ …?',['▲','■','●','◆'],1,'The symbols alternate triangle, square.'],
 ['abstract','medium','A symbol rotates 90° clockwise each step. After three steps, how far has it rotated from its start?',['90° clockwise','180°','270° clockwise','360°'],2,'Three turns of 90° total 270° clockwise.'],
 ['abstract','medium','Which item breaks the pattern: AB, CD, EF, GI, JK?',['AB','CD','GI','JK'],2,'The pairs should be consecutive letters; G should pair with H, not I.'],
 ['abstract','hard','Pattern: ○, ○○, ○○○, then △, △△, … What is next?',['○○○○','△△△','□□','△'],1,'The shape changes from circles to triangles and the count increases by one: three triangles.'],
 ['abstract','easy','Which symbol completes the alternating sequence: ★ ○ ★ ○ ★ …?',['★','○','□','◇'],1,'Star and circle alternate; the next symbol is a circle.'],
 ['abstract','hard','A shape gains one side each step: triangle, square, pentagon, … Which comes next?',['Hexagon','Heptagon','Octagon','Circle'],0,'The number of sides rises 3, 4, 5, so the next shape has 6 sides.'],
 ['spatial','easy','You face north and turn right. Which direction are you facing?',['West','South','East','North'],2,'A right turn from north points east.'],
 ['spatial','medium','A cube has 6 faces. If you paint every outer face, how many faces are painted?',['4','5','6','8'],2,'A cube has six outer faces, all of which are painted.'],
 ['spatial','medium','You walk 4 metres east, then 4 metres west. Where are you relative to the start?',['4 m east','4 m west','At the starting point','8 m east'],2,'The two equal movements cancel each other.'],
 ['spatial','hard','A paper square is folded in half once, then in half again. One hole is punched through all layers. How many holes appear when fully unfolded, away from folds?',['1','2','3','4'],3,'Two folds create four layers, so one punch passes through four layers.'],
 ['spatial','easy','Which object is most likely to roll smoothly?',['A cube','A sphere','A pyramid','A rectangular block'],1,'A sphere has a continuous curved surface and rolls in any direction.'],
 ['spatial','hard','On a standard die, opposite faces sum to 7. Which face is opposite 2?',['3','4','5','6'],2,'On a standard die, 2 is opposite 5.'],
 ['analytical','easy','A report lists 12 completed tasks and 3 pending tasks. How many tasks are listed in total?',['9','12','15','36'],2,'12 + 3 = 15 tasks.'],
 ['analytical','medium','Four people sit in a row. Ana is left of Ben; Cara is right of Ben. Which must be true?',['Ana is right of Cara','Ben is left of Cara','Cara is left of Ben','Ana is immediately next to Cara'],1,'If Ana is left of Ben and Cara is right of Ben, Ben must be left of Cara.'],
 ['analytical','medium','A shop sells tea for ₦1,200 and coffee for ₦1,500. What is the cost of two teas and one coffee?',['₦2,700','₦3,600','₦3,900','₦4,200'],2,'Two teas cost ₦2,400; adding ₦1,500 gives ₦3,900.'],
 ['analytical','hard','Three tasks take 2, 5, and 7 minutes. If done one after another, what is the minimum total time?',['7 minutes','10 minutes','12 minutes','14 minutes'],3,'Sequential tasks take 2 + 5 + 7 = 14 minutes.'],
 ['analytical','easy','A class has 18 learners; 10 study French, 8 study Spanish, and nobody studies both. How many learners are in the class?',['8','10','18','36'],2,'The groups do not overlap, so 10 + 8 = 18 learners.'],
 ['analytical','hard','A delivery route must visit A before B, and B before C. Which order is valid?',['C, B, A','B, A, C','A, B, C','A, C, B'],2,'Both constraints are satisfied by A, then B, then C.']
];

// Expand the hand-written starter set into a full 1,000-item practice bank.
// Generated items use deterministic, checkable rules and include an explanation.
function makeGeneratedQuestion(i) {
  const categoryIndex = i % CATEGORIES.length;
  const catId = CATEGORIES[categoryIndex].id;
  const k = Math.floor(i / CATEGORIES.length); // 0..159 within each category
  const level = ['easy', 'medium', 'hard'][k % 3];
  const j = Math.floor(k / 3); // unique item slot within each category/difficulty
  let prompt, correct, wrong, explanation;
  const unique = (items) => [...new Set(items.map(String).filter(x => x !== String(correct)))];

  if (catId === 'numerical') {
    if (level === 'easy') {
      const type = j % 4;
      if (type === 0) {
        const start = 4 + (j % 29), step = 2 + ((j * 3) % 9);
        const seq = [start, start + step, start + 2 * step, start + 3 * step];
        correct = start + 4 * step; prompt = `What number comes next in this increasing sequence: ${seq.join(', ')}, …?`;
        wrong = [correct + step, correct - step, correct + 2];
        explanation = `The sequence increases by ${step} each time; ${seq[3]} + ${step} = ${correct}.`;
      } else if (type === 1) {
        const base = 2 + (j % 18), mult = 2 + Math.floor(j / 18);
        const seq = [base, base * mult, base * mult * mult]; correct = seq[2] * mult;
        prompt = `Each term is multiplied by the same whole number. Find the next term: ${seq.join(', ')}, …`;
        wrong = [correct + mult, correct / mult, correct - base];
        explanation = `The multiplier is ${mult}; ${seq[2]} × ${mult} = ${correct}.`;
      } else if (type === 2) {
        const price = 120 + 10 * (j % 37), qty = 2 + (Math.floor(j / 4) % 5); correct = price * qty;
        prompt = `A shop sells a notebook for ₦${price}. What is the total price of ${qty} notebooks?`;
        wrong = [price * (qty - 1), correct + price, price + qty];
        explanation = `Multiply price by quantity: ₦${price} × ${qty} = ₦${correct}.`;
      } else {
        const total = 100 + 10 * (j % 31), pct = 10 + 10 * (Math.floor(j / 4) % 4); correct = total * pct / 100;
        prompt = `A class has ${total} practice cards. What is ${pct}% of the cards?`;
        wrong = [correct + 10, correct * 2, total - correct];
        explanation = `${pct}/100 × ${total} = ${correct}.`;
      }
    } else if (level === 'medium') {
      const type = j % 4;
      if (type === 0) {
        const start = 7 + (j % 23), step = 3 + (j % 11); const seq = [start, start+step, start+2*step, start+3*step]; correct = seq[3] + step;
        prompt = `A sequence adds the same amount each time: ${seq.join(', ')}, … What is the next number?`;
        wrong = [correct + step, correct - 2, correct + 3]; explanation = `The common difference is ${step}; ${seq[3]} + ${step} = ${correct}.`;
      } else if (type === 1) {
        const rate = 3 + (j % 13), hours = 3 + (Math.floor(j / 4) % 7); correct = rate * hours;
        prompt = `A printer produces ${rate} labels per minute. How many labels does it print in ${hours} minutes at the same rate?`;
        wrong = [rate * (hours - 1), rate + hours, correct + rate]; explanation = `${rate} × ${hours} = ${correct} labels.`;
      } else if (type === 2) {
        const groups = 3 + (j % 9), each = 4 + (Math.floor(j / 9) % 12), total = groups * each; correct = each;
        prompt = `${total} markers are shared equally among ${groups} teams. How many markers does each team receive?`;
        wrong = [each + groups, each - 1, groups]; explanation = `${total} ÷ ${groups} = ${correct} markers per team.`;
      } else {
        const total = 240 + 20 * (j % 23), pct = 5 * (2 + (Math.floor(j / 4) % 9)); correct = total * pct / 100;
        prompt = `A store has ${total} items in stock. How many items represent ${pct}% of the stock?`;
        wrong = [correct + 5, total - correct, correct * 2]; explanation = `${pct}/100 × ${total} = ${correct} items.`;
      }
    } else {
      const type = j % 4;
      if (type === 0) {
        const base = 80 + 5 * (j % 29), pct = 10 + 5 * (Math.floor(j / 4) % 9); correct = base * (100 + pct) / 100;
        prompt = `An equipment budget of ₦${base} increases by ${pct}%. What is the new budget?`;
        wrong = [base + pct, base * (100 - pct) / 100, correct + pct]; explanation = `${pct}% of ${base} is ${base*pct/100}; add it to ${base} to get ${correct}.`;
      } else if (type === 1) {
        const a = 2 + (j % 7), b = 3 + (Math.floor(j / 7) % 8), total = (a+b) * (4 + (j % 5)); correct = a * total / (a+b);
        prompt = `A fund of ${total} units is divided in the ratio ${a}:${b}. How many units go to the share represented by the first ratio number?`;
        wrong = [b * total / (a+b), total / (a+b), correct + a]; explanation = `There are ${a+b} total parts; each is ${total/(a+b)}. The first share is ${a} × ${total/(a+b)} = ${correct}.`;
      } else if (type === 2) {
        const start = 2 + (j % 17), numerator = 1 + (Math.floor(j / 17) % 3), denominator = 2 + (Math.floor(j / 5) % 5);
        const exactFraction = (num, den) => {
          const gcd = (a, b) => b ? gcd(b, a % b) : Math.abs(a);
          if (den < 0) { num = -num; den = -den; }
          const divisor = gcd(num, den) || 1;
          const n = num / divisor, d = den / divisor;
          return d === 1 ? String(n) : `${n}/${d}`;
        };
        const product = start * numerator;
        correct = exactFraction(product, denominator);
        prompt = `What is ${numerator}/${denominator} of ${start}? Give the exact value.`;
        // Fractions remain exact; do not expose floating-point approximations such as 2.6666666666666665.
        wrong = [
          exactFraction(start * denominator, numerator),
          exactFraction(product + denominator, denominator),
          exactFraction(product - denominator, denominator),
          exactFraction(product + 2 * denominator, denominator),
          exactFraction(product + 3 * denominator, denominator),
          String(start)
        ];
        explanation = `${numerator}/${denominator} × ${start} = ${correct}.`;
      } else {
        const start = 100 + (j % 19) * 10, pct = 10 + 5 * (Math.floor(j / 4) % 7); const afterRise = start * (100+pct)/100; correct = afterRise * (100-pct)/100;
        prompt = `A value of ${start} rises by ${pct}% and then falls by ${pct}%. What is the final value?`;
        wrong = [start, start * (100-pct)/100, afterRise]; explanation = `After the rise: ${start} × ${(100+pct)/100} = ${afterRise}; then ${afterRise} × ${(100-pct)/100} = ${correct}.`;
      }
    }
  } else if (catId === 'logical') {
    const nouns = ['artists','bakers','cyclists','doctors','engineers','farmers','gardeners','historians','inspectors','journalists','keepers','librarians','musicians','navigators','organisers','painters','researchers','scientists','teachers','umpires','veterinarians','writers','designers','pilots','medics','analysts','builders','curators','dancers','editors','forecasters','geologists','hosts','inventors','judges','kineticists','lecturers','mechanics','negotiators','operators','planners','quality-checkers','reporters','surgeons','translators','ushers','volunteers','watchmakers','youth-workers','zoologists','archivists','brokers','coaches','diplomats'];
    if (level === 'easy') {
      const x = nouns[j % nouns.length], y = nouns[(j + 11) % nouns.length], z = nouns[(j + 23) % nouns.length];
      prompt = `All members of group ${x} belong to group ${y}, and all members of group ${y} belong to group ${z}. Which conclusion must be true?`;
      correct = `All members of group ${x} belong to group ${z}`;
      wrong = [`All members of group ${z} belong to group ${x}`, `No members of group ${x} belong to group ${z}`, `Some members of group ${z} do not belong to group ${y}`];
      explanation = `Membership is transitive: group ${x} is contained in group ${y}, which is contained in group ${z}. Therefore every member of group ${x} belongs to group ${z}.`;
    } else if (level === 'medium') {
      const x = nouns[j % nouns.length], y = nouns[(j + 7) % nouns.length], z = nouns[(j + 19) % nouns.length];
      prompt = `Every member of group ${x} is also a member of group ${y}. Some members of group ${y} are also members of group ${z}. What must be true about groups ${x} and ${z}?`;
      correct = `No definite overlap can be concluded`; wrong = [`Every member of group ${x} is also a member of group ${z}`, `Some members of group ${x} must be members of group ${z}`, `No member of group ${x} can be a member of group ${z}`];
      explanation = `The members of group ${y} who also belong to group ${z} may or may not include anyone from group ${x}; the premises do not establish an overlap.`;
    } else {
      const pairs = [['server is running','dashboard is available'],['badge is authentic','entry is permitted'],['sensor detects motion','warning sounds'],['payment is approved','order is released'],['key is correct','lock opens'],['backup is complete','restore can begin'],['valve is open','fluid can pass'],['account is verified','transfer is enabled'],['temperature is below limit','cooling alarm is off'],['network is connected','message can be delivered'],['permit is valid','work may proceed'],['device is charged','indicator is on'],['file is encrypted','plain text is hidden'],['route is clear','vehicle can pass'],['test is passed','certificate is issued'],['door is unlocked','handle can turn'],['engine is started','oil pressure is present'],['signal is received','receiver responds']];
      const pair = pairs[j % pairs.length]; const variants = ['Assume the rule is always reliable','Treat the stated rule as a guarantee','Assume there are no exceptions'];
      prompt = `${variants[Math.floor(j / pairs.length) % variants.length]}: if ${pair[0]}, then ${pair[1]}. But ${pair[1]} is false. What follows?`;
      correct = `The condition “${pair[0]}” is false`; wrong = [`The condition “${pair[0]}” is true`, `The result “${pair[1]}” is true`, `Nothing follows from the rule`];
      explanation = `This is the contrapositive: if ${pair[0]} guarantees ${pair[1]}, then a false result means ${pair[0]} did not occur.`;
    }
  } else if (catId === 'verbal') {
    const vocab = [
      ['brief','concise','lengthy'],['scarce','limited','abundant'],['cautious','careful','reckless'],['ancient','old','modern'],['transparent','clear','opaque'],['expand','enlarge','shrink'],['accurate','precise','mistaken'],['reluctant','unwilling','eager'],['rapid','swift','sluggish'],['fragile','delicate','sturdy'],['hostile','unfriendly','cordial'],['generous','giving','stingy'],['diligent','hardworking','lazy'],['vivid','bright','dull'],['complex','complicated','simple'],['silent','quiet','noisy'],['optimistic','hopeful','pessimistic'],['rigid','stiff','flexible'],['humble','modest','arrogant'],['vacant','empty','occupied'],['genuine','authentic','counterfeit'],['permanent','lasting','temporary'],['obscure','unclear','obvious'],['abundant','plentiful','scarce'],['mitigate','reduce','intensify'],['conceal','hide','reveal'],['commence','begin','conclude'],['deteriorate','worsen','improve'],['inevitable','unavoidable','avoidable'],['meticulous','thorough','careless'],['resilient','tough','fragile'],['ambiguous','unclear','definite'],['obsolete','outdated','current'],['prudent','wise','reckless'],['endorse','support','oppose'],['prohibit','forbid','permit'],['benevolent','kind','cruel'],['transient','temporary','permanent'],['alleviate','ease','aggravate'],['eloquent','articulate','inarticulate'],['impartial','fair','biased'],['scarcity','shortage','surplus'],['vigilant','watchful','careless'],['innovative','inventive','conventional'],['plausible','believable','implausible'],['dormant','inactive','active'],['subtle','delicate','obvious'],['concur','agree','disagree'],['fortify','strengthen','weaken'],['abstain','refrain','participate'],['coherent','logical','incoherent'],['exemplary','outstanding','poor'],['tedious','boring','engaging'],['altruistic','selfless','selfish']
    ];
    const [word, synonym, antonym] = vocab[j % vocab.length];
    if (level === 'easy') {
      prompt = `Which word is closest in meaning to “${word}”?`; correct = synonym; wrong = [antonym, vocab[(j+5)%vocab.length][1], vocab[(j+9)%vocab.length][2]];
      explanation = `“${synonym}” is a synonym of “${word}”; it expresses a similar meaning.`;
    } else if (level === 'medium') {
      prompt = `Which word is most nearly opposite in meaning to “${word}”?`; correct = antonym; wrong = [synonym, vocab[(j+4)%vocab.length][1], vocab[(j+8)%vocab.length][2]];
      explanation = `“${antonym}” is the intended antonym of “${word}”.`;
    } else {
      prompt = `In a vocabulary test, which option is closest in meaning to the word “${word}”?`;
      correct = synonym; wrong = [antonym, vocab[(j+7)%vocab.length][1], vocab[(j+12)%vocab.length][2]];
      explanation = `“${synonym}” is the closest synonym for “${word}” in this vocabulary question.`;
    }
  } else if (catId === 'abstract') {
    const symbols = ['▲','■','●','◆','★','○'];
    if (level === 'easy') {
      const x = symbols[j % symbols.length], y = symbols[(j+1+(Math.floor(j/6)%4)) % symbols.length], repeats = 3 + Math.floor(j / 24);
      const seq = Array.from({length:repeats*2-1},(_,n)=>n%2===0?x:y); correct = y;
      prompt = `Complete this alternating symbol pattern: ${seq.join(' ')} …`;
      wrong = [x, symbols[(symbols.indexOf(y)+1)%symbols.length], symbols[(symbols.indexOf(y)+2)%symbols.length]];
      explanation = `The symbols alternate ${x}, ${y}; after ${x}, the next symbol is ${y}.`;
    } else if (level === 'medium') {
      const angle = 45 * (1 + (j % 7)), steps = 2 + Math.floor(j / 7); correct = `${angle * steps}°`;
      prompt = `A shape rotates ${angle}° clockwise per turn. What is the total clockwise rotation after ${steps} turns, before simplifying full turns?`;
      wrong = [`${angle*(steps-1)}°`, `${angle+steps}°`, `${angle*steps+angle}°`];
      explanation = `${angle}° × ${steps} = ${correct}.`;
    } else {
      const start = 2 + (j % 13), step = 2 + Math.floor(j / 13); correct = start + 3 * step;
      prompt = `A dot pattern grows by ${step} dots at every stage. The first three counts are ${start}, ${start+step}, ${start+2*step}. What is the fourth count?`;
      wrong = [correct + step, correct - step, start + 4 * step];
      explanation = `Add ${step} to the third count: ${start+2*step} + ${step} = ${correct}.`;
    }
  } else if (catId === 'spatial') {
    const dirs = ['north','east','south','west'];
    if (level === 'easy') {
      const start = dirs[Math.floor(j / 14) % 4], turns = 1 + (j % 14), sign = 1;
      const dest = dirs[(dirs.indexOf(start) + sign * turns + 40) % 4];
      prompt = `You face ${start} and make ${turns} quarter-turn${turns===1?'':'s'} ${sign===1?'to the right':'to the left'}. Which direction do you face now?`;
      correct = dest; wrong = dirs.filter(d=>d!==dest).slice(0,3);
      explanation = `Each quarter-turn changes direction by one compass point. After ${turns} ${sign===1?'right':'left'} turn${turns===1?'':'s'}, you face ${dest}.`;
    } else if (level === 'medium') {
      const east = 2 + (j % 9), north = 1 + Math.floor(j / 9); correct = `${east} units east and ${north} units north`;
      prompt = `A robot moves ${east} units east and then ${north} units north. Where is it relative to its starting point?`;
      wrong = [`${north} units east and ${east} units north`, `${east+north} units east`, `At the starting point`];
      explanation = `The movements are on perpendicular axes, so the final position is ${east} east and ${north} north of the start.`;
    } else {
      const east = 3 + (j % 12), north = 4 + Math.floor(j / 12); const distance = Math.sqrt(east*east+north*north);
      correct = Number.isInteger(distance) ? `${distance} metres` : `√${east*east+north*north} metres`;
      prompt = `A surveyor walks ${east} metres east and ${north} metres north. What is the straight-line distance from the starting point?`;
      wrong = [`${east+north} metres`, `${Math.abs(east-north)} metres`, `${east*north} metres`];
      explanation = `Use the Pythagorean theorem: distance = √(${east}² + ${north}²) = √${east*east+north*north}${Number.isInteger(distance)?` = ${distance}`:''} metres.`;
    }
  } else { // analytical
    if (level === 'easy') {
      const completed = 12 + (j % 41), pending = 2 + ((j*5) % 17); correct = completed + pending;
      prompt = `A project tracker lists ${completed} completed tasks and ${pending} tasks still pending. How many tasks are listed altogether?`;
      wrong = [completed-pending, completed*pending, correct+5]; explanation = `${completed} + ${pending} = ${correct} tasks altogether.`;
    } else if (level === 'medium') {
      const rate = 3 + (j % 13), hours = 2 + Math.floor(j / 7); correct = rate * hours;
      prompt = `A team processes ${rate} files per hour. At a constant rate, how many files will it process in ${hours} hours?`;
      wrong = [rate*(hours-1), rate+hours, correct+rate]; explanation = `${rate} files/hour × ${hours} hours = ${correct} files.`;
    } else {
      const tasks = [
        ['A','B','C','D'],['R','S','T','U'],['J','K','L','M'],['P','Q','R','S'],['W','X','Y','Z'],['E','F','G','H'],['L','M','N','O'],['C','D','E','F'],['V','W','X','Y']
      ][j % 9];
      const shift = Math.floor(j / 9) % 4; const suffix = `-${j+1}`; const t = tasks.map((_,n)=>tasks[(n+shift)%4] + suffix);
      const order = `${t[0]} → ${t[1]} → ${t[2]} → ${t[3]}`; correct = order;
      prompt = `Four stages must be completed in order. ${t[0]} must come before ${t[1]}, ${t[1]} before ${t[2]}, and ${t[2]} before ${t[3]}. Which sequence satisfies every rule?`;
      wrong = [`${t[3]} → ${t[2]} → ${t[1]} → ${t[0]}`, `${t[1]} → ${t[0]} → ${t[2]} → ${t[3]}`, `${t[0]} → ${t[2]} → ${t[1]} → ${t[3]}`];
      explanation = `The constraints form a chain: ${t[0]} → ${t[1]} → ${t[2]} → ${t[3]}. The listed order respects all three precedence rules.`;
    }
  }

  let candidates = unique(wrong);
  // Fill any distractor gaps with plausible, category-specific alternatives.
  // Never publish generic placeholder choices such as “Alternative answer 1”.
  const numericFallbacks = () => {
    const n = Number(correct);
    if (!Number.isFinite(n)) return [];
    return [n + 1, n - 1, n * 2, n + 5, n / 2, n + 10].map(String);
  };
  let fallbacks = [];
  if (catId === 'numerical' || catId === 'analytical') {
    fallbacks = numericFallbacks();
  } else if (catId === 'abstract') {
    const symbolOptions = ['▲','■','●','◆','★','○'];
    if (symbolOptions.includes(String(correct))) {
      fallbacks = symbolOptions.filter(s => s !== String(correct));
    } else if (/°$/.test(String(correct))) {
      const degrees = Number(String(correct).replace('°',''));
      fallbacks = [degrees + 45, degrees - 45, degrees + 90, degrees - 90].map(n => `${n}°`);
    } else {
      fallbacks = numericFallbacks();
    }
  } else if (catId === 'spatial') {
    const directionOptions = ['north','east','south','west'];
    if (directionOptions.includes(String(correct))) {
      fallbacks = directionOptions.filter(d => d !== String(correct));
    } else {
      const pos = String(correct).match(/^(\d+) units east and (\d+) units north$/);
      const dist = String(correct).match(/^(\d+(?:\.\d+)?|√\d+) metres$/);
      if (pos) {
        const east = Number(pos[1]), north = Number(pos[2]);
        fallbacks = [`${east} units west and ${north} units north`, `${east} units east and ${north} units south`, `${east + north} units north`];
      } else if (dist) {
        fallbacks = ['1 metre', '2 metres', '3 metres', '5 metres', '10 metres'];
      }
    }
  }
  for (const f of fallbacks) {
    if (candidates.length >= 3) break;
    if (String(f) !== String(correct) && !candidates.includes(String(f))) candidates.push(String(f));
  }
  const options = [String(correct), ...candidates.slice(0,3)];
  const shift = (i * 7 + Math.floor(i / 6)) % 4;
  const rotated = options.slice(shift).concat(options.slice(0, shift));
  return [catId, level, prompt, rotated, rotated.indexOf(String(correct)), explanation];
}
const generatedRaw = Array.from({length:960},(_,i)=>makeGeneratedQuestion(i));
const allRaw = [...raw, ...generatedRaw];
const QUESTIONS = allRaw.map((q, i) => ({
  id: `BM-${String(i + 1).padStart(4, '0')}`,
  category: q[0], difficulty: q[1],
  prompt: q[2], options: q[3], answer: q[4], explanation: q[5],
  published: true, tags: [q[0], q[1]],
}));

const KNOWLEDGE_QUESTIONS = [{"id":"BMK-001","topic":"general","category":"verbal","difficulty":"easy","prompt":"Who wrote the novel “Things Fall Apart”?","options":["Chinua Achebe","Wole Soyinka","Ben Okri","Chimamanda Ngozi Adichie"],"answer":0,"explanation":"Chinua Achebe published Things Fall Apart in 1958.","published":true,"tags":["general","verbal","easy"]},{"id":"BMK-002","topic":"general","category":"analytical","difficulty":"easy","prompt":"Which is the largest ocean on Earth?","options":["Atlantic Ocean","Indian Ocean","Pacific Ocean","Arctic Ocean"],"answer":2,"explanation":"The Pacific Ocean is the largest ocean by area.","published":true,"tags":["general","analytical","easy"]},{"id":"BMK-003","topic":"general","category":"analytical","difficulty":"easy","prompt":"What is the currency of Japan?","options":["Won","Yen","Yuan","Ringgit"],"answer":1,"explanation":"Japan’s currency is the yen.","published":true,"tags":["general","analytical","easy"]},{"id":"BMK-004","topic":"general","category":"analytical","difficulty":"medium","prompt":"What does CPU stand for in computing?","options":["Central Processing Unit","Computer Power Utility","Core Program Upload","Central Program User"],"answer":0,"explanation":"CPU stands for Central Processing Unit.","published":true,"tags":["general","analytical","medium"]},{"id":"BMK-005","topic":"general","category":"numerical","difficulty":"easy","prompt":"How many sides does an octagon have?","options":["Six","Seven","Eight","Ten"],"answer":2,"explanation":"An octagon has eight sides.","published":true,"tags":["general","numerical","easy"]},{"id":"BMK-006","topic":"general","category":"analytical","difficulty":"easy","prompt":"Which gas do plants absorb from the air during photosynthesis?","options":["Oxygen","Carbon dioxide","Nitrogen","Hydrogen"],"answer":1,"explanation":"Plants use carbon dioxide, water and light to make sugars during photosynthesis.","published":true,"tags":["general","analytical","easy"]},{"id":"BMK-007","topic":"general","category":"analytical","difficulty":"medium","prompt":"Which instrument is used to measure atmospheric pressure?","options":["Thermometer","Barometer","Hygrometer","Anemometer"],"answer":1,"explanation":"A barometer measures atmospheric pressure.","published":true,"tags":["general","analytical","medium"]},{"id":"BMK-008","topic":"general","category":"verbal","difficulty":"easy","prompt":"Which word is closest in meaning to “concise”?","options":["Brief","Uncertain","Decorative","Delayed"],"answer":0,"explanation":"Concise means expressing something clearly in few words.","published":true,"tags":["general","verbal","easy"]},{"id":"BMK-009","topic":"nigeria","category":"verbal","difficulty":"easy","prompt":"On what date did Nigeria gain independence from Britain?","options":["1 October 1960","1 January 1960","1 October 1963","29 May 1999"],"answer":0,"explanation":"Nigeria became independent on 1 October 1960.","published":true,"tags":["nigeria","verbal","easy"]},{"id":"BMK-010","topic":"nigeria","category":"analytical","difficulty":"easy","prompt":"What is the capital of Nigeria?","options":["Lagos","Kano","Abuja","Ibadan"],"answer":2,"explanation":"Abuja is Nigeria’s federal capital.","published":true,"tags":["nigeria","analytical","easy"]},{"id":"BMK-011","topic":"nigeria","category":"analytical","difficulty":"easy","prompt":"What is the currency of Nigeria?","options":["Cedi","Naira","Dalasi","Shilling"],"answer":1,"explanation":"The naira is Nigeria’s official currency.","published":true,"tags":["nigeria","analytical","easy"]},{"id":"BMK-012","topic":"nigeria","category":"abstract","difficulty":"easy","prompt":"Which sequence matches the colours of Nigeria’s national flag from left to right?","options":["Green, white, green","White, green, white","Green, yellow, green","Red, white, green"],"answer":0,"explanation":"Nigeria’s flag has three vertical bands: green, white, green.","published":true,"tags":["nigeria","abstract","easy"]},{"id":"BMK-013","topic":"nigeria","category":"verbal","difficulty":"medium","prompt":"Which Nigerian writer won the Nobel Prize in Literature in 1986?","options":["Chinua Achebe","Wole Soyinka","Buchi Emecheta","J. P. Clark"],"answer":1,"explanation":"Wole Soyinka received the Nobel Prize in Literature in 1986.","published":true,"tags":["nigeria","verbal","medium"]},{"id":"BMK-014","topic":"nigeria","category":"spatial","difficulty":"easy","prompt":"Which two major rivers meet at Lokoja?","options":["Niger and Benue","Osun and Ogun","Cross and Imo","Kaduna and Hadejia"],"answer":0,"explanation":"The Niger and Benue rivers meet near Lokoja in Kogi State.","published":true,"tags":["nigeria","spatial","easy"]},{"id":"BMK-015","topic":"nigeria","category":"analytical","difficulty":"medium","prompt":"Where is the headquarters of ECOWAS located?","options":["Accra, Ghana","Dakar, Senegal","Abuja, Nigeria","Lomé, Togo"],"answer":2,"explanation":"The ECOWAS Commission is headquartered in Abuja, Nigeria.","published":true,"tags":["nigeria","analytical","medium"]},{"id":"BMK-016","topic":"nigeria","category":"spatial","difficulty":"easy","prompt":"Which Nigerian city is the country’s largest by population?","options":["Enugu","Lagos","Jos","Abeokuta"],"answer":1,"explanation":"Lagos is Nigeria’s largest city by population, though estimates vary by boundary and method.","published":true,"tags":["nigeria","spatial","easy"]},{"id":"BMK-017","topic":"science","category":"analytical","difficulty":"easy","prompt":"Which planet is commonly called the Red Planet?","options":["Venus","Mars","Jupiter","Mercury"],"answer":1,"explanation":"Iron-rich dust gives Mars its familiar reddish appearance.","published":true,"tags":["science","analytical","easy"]},{"id":"BMK-018","topic":"science","category":"analytical","difficulty":"easy","prompt":"What is the chemical formula for water?","options":["CO₂","O₂","H₂O","NaCl"],"answer":2,"explanation":"A water molecule contains two hydrogen atoms and one oxygen atom.","published":true,"tags":["science","analytical","easy"]},{"id":"BMK-019","topic":"science","category":"analytical","difficulty":"medium","prompt":"What is the SI unit of force?","options":["Joule","Watt","Pascal","Newton"],"answer":3,"explanation":"The newton is the SI unit of force.","published":true,"tags":["science","analytical","medium"]},{"id":"BMK-020","topic":"science","category":"analytical","difficulty":"easy","prompt":"What is the process called when a liquid changes into a gas at its surface?","options":["Condensation","Evaporation","Freezing","Deposition"],"answer":1,"explanation":"Evaporation is the change from liquid to gas at a surface.","published":true,"tags":["science","analytical","easy"]},{"id":"BMK-021","topic":"science","category":"analytical","difficulty":"medium","prompt":"At standard atmospheric pressure, pure water boils at approximately what temperature?","options":["50°C","90°C","100°C","120°C"],"answer":2,"explanation":"At one atmosphere of pressure, pure water boils at about 100°C.","published":true,"tags":["science","analytical","medium"]},{"id":"BMK-022","topic":"science","category":"analytical","difficulty":"easy","prompt":"Which structure carries most hereditary information in human cells?","options":["DNA","Starch","Hemoglobin","Cellulose"],"answer":0,"explanation":"DNA stores genetic information in human cells.","published":true,"tags":["science","analytical","easy"]},{"id":"BMK-023","topic":"science","category":"analytical","difficulty":"easy","prompt":"Which natural object orbits Earth?","options":["Mars","The Moon","The Sun","Venus"],"answer":1,"explanation":"The Moon is Earth’s natural satellite.","published":true,"tags":["science","analytical","easy"]},{"id":"BMK-024","topic":"science","category":"analytical","difficulty":"medium","prompt":"Which organ is primarily responsible for pumping blood around the human body?","options":["Liver","Lung","Heart","Kidney"],"answer":2,"explanation":"The heart pumps blood through the circulatory system.","published":true,"tags":["science","analytical","medium"]},{"id":"BMK-025","topic":"history","category":"verbal","difficulty":"easy","prompt":"In which year did the Berlin Wall begin to fall?","options":["1979","1989","1999","2001"],"answer":1,"explanation":"The Berlin Wall opened in November 1989 and was subsequently dismantled.","published":true,"tags":["history","verbal","easy"]},{"id":"BMK-026","topic":"history","category":"analytical","difficulty":"easy","prompt":"In which year did Apollo 11 land humans on the Moon?","options":["1959","1965","1969","1975"],"answer":2,"explanation":"Apollo 11 landed on the Moon in July 1969.","published":true,"tags":["history","analytical","easy"]},{"id":"BMK-027","topic":"history","category":"analytical","difficulty":"easy","prompt":"In which year did the Second World War end?","options":["1939","1942","1945","1950"],"answer":2,"explanation":"The war ended in 1945; Germany surrendered in May and Japan in September.","published":true,"tags":["history","analytical","easy"]},{"id":"BMK-028","topic":"history","category":"verbal","difficulty":"medium","prompt":"The Magna Carta was agreed in England in which year?","options":["1066","1215","1492","1666"],"answer":1,"explanation":"King John agreed to the Magna Carta in 1215.","published":true,"tags":["history","verbal","medium"]},{"id":"BMK-029","topic":"history","category":"verbal","difficulty":"easy","prompt":"Which ancient civilisation built the pyramids at Giza?","options":["Ancient Egyptians","Romans","Vikings","Aztecs"],"answer":0,"explanation":"The Giza pyramids were built in ancient Egypt during the Old Kingdom.","published":true,"tags":["history","verbal","easy"]},{"id":"BMK-030","topic":"history","category":"verbal","difficulty":"medium","prompt":"The French Revolution began in which year?","options":["1688","1776","1789","1815"],"answer":2,"explanation":"The French Revolution is conventionally dated from 1789.","published":true,"tags":["history","verbal","medium"]},{"id":"BMK-031","topic":"history","category":"verbal","difficulty":"medium","prompt":"Which West African empire was famously ruled by Mansa Musa in the 14th century?","options":["Mali Empire","Songhai Empire","Benin Empire","Oyo Empire"],"answer":0,"explanation":"Mansa Musa ruled the Mali Empire during the 14th century.","published":true,"tags":["history","verbal","medium"]},{"id":"BMK-032","topic":"history","category":"analytical","difficulty":"medium","prompt":"Johannes Gutenberg is associated with the development of which technology in Europe?","options":["Steam engine","Movable-type printing press","Telephone","Radio broadcasting"],"answer":1,"explanation":"Gutenberg’s movable-type printing press helped transform book production in Europe.","published":true,"tags":["history","analytical","medium"]},{"id":"BMK-033","topic":"geography","category":"spatial","difficulty":"easy","prompt":"Which continent has the greatest land area?","options":["Africa","Asia","Europe","South America"],"answer":1,"explanation":"Asia is the world’s largest continent by land area.","published":true,"tags":["geography","spatial","easy"]},{"id":"BMK-034","topic":"geography","category":"spatial","difficulty":"easy","prompt":"Which imaginary line divides Earth into the Northern and Southern Hemispheres?","options":["Prime Meridian","Tropic of Cancer","Equator","International Date Line"],"answer":2,"explanation":"The Equator divides Earth into the Northern and Southern Hemispheres.","published":true,"tags":["geography","spatial","easy"]},{"id":"BMK-035","topic":"geography","category":"spatial","difficulty":"easy","prompt":"Mount Everest is part of which mountain range?","options":["Andes","Alps","Himalayas","Atlas Mountains"],"answer":2,"explanation":"Mount Everest lies in the Himalayas, on the Nepal–China border region.","published":true,"tags":["geography","spatial","easy"]},{"id":"BMK-036","topic":"geography","category":"spatial","difficulty":"easy","prompt":"The Sahara Desert is mainly located on which continent?","options":["Asia","Africa","Australia","South America"],"answer":1,"explanation":"The Sahara stretches across much of North Africa.","published":true,"tags":["geography","spatial","easy"]},{"id":"BMK-037","topic":"geography","category":"spatial","difficulty":"medium","prompt":"What is the capital of Kenya?","options":["Nairobi","Kampala","Kigali","Addis Ababa"],"answer":0,"explanation":"Nairobi is the capital of Kenya.","published":true,"tags":["geography","spatial","medium"]},{"id":"BMK-038","topic":"geography","category":"spatial","difficulty":"easy","prompt":"Which sea lies between southern Europe and northern Africa?","options":["Caribbean Sea","Mediterranean Sea","Baltic Sea","Arabian Sea"],"answer":1,"explanation":"The Mediterranean Sea separates much of southern Europe from northern Africa.","published":true,"tags":["geography","spatial","easy"]},{"id":"BMK-039","topic":"geography","category":"spatial","difficulty":"easy","prompt":"The Andes mountain range runs mainly along which continent?","options":["Africa","Europe","South America","North America"],"answer":2,"explanation":"The Andes run along the western side of South America.","published":true,"tags":["geography","spatial","easy"]},{"id":"BMK-040","topic":"geography","category":"spatial","difficulty":"easy","prompt":"Which country is often called the “Land of the Rising Sun”?","options":["Thailand","Japan","China","Nepal"],"answer":1,"explanation":"“Land of the Rising Sun” is a common name associated with Japan.","published":true,"tags":["geography","spatial","easy"]},{"id":"BMK-041","topic":"technology","category":"analytical","difficulty":"easy","prompt":"Which language is primarily used to define the structure of a web page?","options":["HTML","SQL","Python","Bash"],"answer":0,"explanation":"HTML marks up the structure and content of web pages.","published":true,"tags":["technology","analytical","easy"]},{"id":"BMK-042","topic":"technology","category":"analytical","difficulty":"easy","prompt":"Which technology is commonly used to style the appearance of web pages?","options":["CSS","DNS","JSON","FTP"],"answer":0,"explanation":"CSS controls layout, colours, typography and other presentation details.","published":true,"tags":["technology","analytical","easy"]},{"id":"BMK-043","topic":"technology","category":"analytical","difficulty":"easy","prompt":"In a binary number system, which two digits are used?","options":["0 and 1","1 and 2","0 and 9","2 and 3"],"answer":0,"explanation":"Binary uses only the digits 0 and 1.","published":true,"tags":["technology","analytical","easy"]},{"id":"BMK-044","topic":"technology","category":"analytical","difficulty":"medium","prompt":"What is phishing?","options":["A method for cooling a computer","A deceptive attempt to steal information by impersonation","A type of spreadsheet formula","A secure backup protocol"],"answer":1,"explanation":"Phishing uses deceptive messages or sites to trick people into disclosing information or taking unsafe actions.","published":true,"tags":["technology","analytical","medium"]},{"id":"BMK-045","topic":"technology","category":"analytical","difficulty":"medium","prompt":"What does two-factor authentication add to a login?","options":["A second verification factor","A second username","An automatic public profile","A longer web address"],"answer":0,"explanation":"Two-factor authentication requires a second type of proof beyond the first factor.","published":true,"tags":["technology","analytical","medium"]},{"id":"BMK-046","topic":"technology","category":"analytical","difficulty":"easy","prompt":"What does URL stand for?","options":["Uniform Resource Locator","Universal Reference Language","User Routing Link","Unified Reading List"],"answer":0,"explanation":"URL stands for Uniform Resource Locator, the address used to identify a resource.","published":true,"tags":["technology","analytical","easy"]},{"id":"BMK-047","topic":"technology","category":"analytical","difficulty":"medium","prompt":"Which statement best describes open-source software?","options":["It can never be sold","Its source code is made available under a licence that permits specified use and modification","It only works without internet","It is always free of bugs"],"answer":1,"explanation":"Open-source licences make source code available and grant rights to use, inspect or modify it under licence terms.","published":true,"tags":["technology","analytical","medium"]},{"id":"BMK-048","topic":"technology","category":"analytical","difficulty":"medium","prompt":"Which practice is generally safest for important online accounts?","options":["Reuse one memorable password everywhere","Share passwords with trusted friends","Use unique passwords and a password manager","Turn off software updates indefinitely"],"answer":2,"explanation":"Unique passwords reduce the damage if one service is compromised; a password manager helps manage them.","published":true,"tags":["technology","analytical","medium"]},{"id":"BMK-049","topic":"sports","category":"analytical","difficulty":"easy","prompt":"How many players from one team are on the field at the start of a standard association football match?","options":["9","10","11","12"],"answer":2,"explanation":"A standard association football team fields 11 players, including the goalkeeper.","published":true,"tags":["sports","analytical","easy"]},{"id":"BMK-050","topic":"sports","category":"analytical","difficulty":"easy","prompt":"How many rings appear in the Olympic symbol?","options":["Four","Five","Six","Seven"],"answer":1,"explanation":"The Olympic symbol consists of five interlaced rings.","published":true,"tags":["sports","analytical","easy"]},{"id":"BMK-051","topic":"sports","category":"analytical","difficulty":"easy","prompt":"Wimbledon is best known as a tournament in which sport?","options":["Cricket","Tennis","Golf","Rugby"],"answer":1,"explanation":"Wimbledon is one of tennis’s four Grand Slam tournaments.","published":true,"tags":["sports","analytical","easy"]},{"id":"BMK-052","topic":"sports","category":"analytical","difficulty":"easy","prompt":"How high is a regulation basketball hoop above the playing floor?","options":["8 feet","9 feet","10 feet","12 feet"],"answer":2,"explanation":"A regulation basketball rim is 10 feet (3.05 metres) above the floor.","published":true,"tags":["sports","analytical","easy"]},{"id":"BMK-053","topic":"sports","category":"analytical","difficulty":"medium","prompt":"In chess, what does “checkmate” mean?","options":["The king has been captured","The king is threatened and no legal move can remove the threat","A player has lost a queen","The game is automatically a draw"],"answer":1,"explanation":"Checkmate means the king is in check and the player has no legal way to escape.","published":true,"tags":["sports","analytical","medium"]},{"id":"BMK-054","topic":"sports","category":"verbal","difficulty":"easy","prompt":"Which fictional wizard attends Hogwarts in the Harry Potter series?","options":["Frodo Baggins","Harry Potter","Percy Jackson","Bilbo Baggins"],"answer":1,"explanation":"Harry Potter is the central character in J. K. Rowling’s series.","published":true,"tags":["sports","verbal","easy"]},{"id":"BMK-055","topic":"sports","category":"verbal","difficulty":"easy","prompt":"Which animated film features the song “Hakuna Matata”?","options":["The Lion King","Toy Story","Frozen","Finding Nemo"],"answer":0,"explanation":"“Hakuna Matata” is a song from Disney’s The Lion King.","published":true,"tags":["sports","verbal","easy"]},{"id":"BMK-056","topic":"sports","category":"analytical","difficulty":"medium","prompt":"In Formula One, what is a pit stop most commonly used for during a race?","options":["Changing tyres or making repairs","Changing the race circuit","Adding extra laps","Reversing the starting grid"],"answer":0,"explanation":"Pit stops commonly allow tyre changes, repairs and other permitted service.","published":true,"tags":["sports","analytical","medium"]},{"id":"BMK-057","topic":"exam","category":"numerical","difficulty":"easy","prompt":"What is 15% of 200?","options":["15","20","30","35"],"answer":2,"explanation":"10% of 200 is 20 and 5% is 10, so 15% is 30.","published":true,"tags":["exam","numerical","easy"]},{"id":"BMK-058","topic":"exam","category":"numerical","difficulty":"easy","prompt":"Solve for x: x + 7 = 12.","options":["3","4","5","19"],"answer":2,"explanation":"Subtract 7 from both sides: x = 12 − 7 = 5.","published":true,"tags":["exam","numerical","easy"]},{"id":"BMK-059","topic":"exam","category":"numerical","difficulty":"easy","prompt":"A square has sides of 4 cm each. What is its perimeter?","options":["8 cm","12 cm","16 cm","20 cm"],"answer":2,"explanation":"Perimeter is four times the side length: 4 × 4 = 16 cm.","published":true,"tags":["exam","numerical","easy"]},{"id":"BMK-060","topic":"exam","category":"numerical","difficulty":"medium","prompt":"What is three-quarters of 20?","options":["5","10","15","18"],"answer":2,"explanation":"One quarter of 20 is 5; three quarters is 3 × 5 = 15.","published":true,"tags":["exam","numerical","medium"]},{"id":"BMK-061","topic":"exam","category":"verbal","difficulty":"easy","prompt":"Which part of speech names a person, place, thing or idea?","options":["Verb","Noun","Adverb","Conjunction"],"answer":1,"explanation":"A noun names a person, place, thing, or idea.","published":true,"tags":["exam","verbal","easy"]},{"id":"BMK-062","topic":"exam","category":"verbal","difficulty":"easy","prompt":"Which word is the past tense of “go”?","options":["Goed","Gone","Went","Going"],"answer":2,"explanation":"The simple past tense of “go” is “went”. “Gone” is its past participle.","published":true,"tags":["exam","verbal","easy"]},{"id":"BMK-064","topic":"exam","category":"verbal","difficulty":"medium","prompt":"Choose the correctly spelled word.","options":["Accomodation","Acommodation","Accommodation","Acomodation"],"answer":2,"explanation":"Accommodation is spelled with double c and double m.","published":true,"tags":["exam","verbal","medium"]}];

KNOWLEDGE_QUESTIONS.push(...(window.BM_EXTRA_QUESTIONS || []));

const QUIZ_COLLECTIONS = [
 {id:'ultimate',title:'Ultimate Knowledge Test',icon:'🏆',tag:'FEATURED',count:20,desc:'A mixed 20-question challenge across science, history, geography, technology, culture and reasoning.',topics:['general','nigeria','science','history','geography','technology','sports','exam']},
 {id:'daily-five',title:'Daily Knowledge Sprint',icon:'⏱️',tag:'DAILY',count:5,desc:'Five questions selected for today. Share the same daily set with friends and see how you compare.',topics:['general']},
 {id:'general',title:'General Knowledge',icon:'🌍',tag:'POPULAR',count:8,desc:'A little of everything: language, everyday science, culture and useful facts.',topics:['general']},
 {id:'nigeria',title:'Nigeria & Africa',icon:'🇳🇬',tag:'REGIONAL',count:8,desc:'Test what you know about Nigerian history, landmarks, culture and African geography.',topics:['nigeria']},
 {id:'science',title:'Science & Nature',icon:'🔬',tag:'DISCOVER',count:8,desc:'Explore space, biology, chemistry and the natural world.',topics:['science']},
 {id:'history',title:'World History',icon:'🏛️',tag:'HISTORY',count:8,desc:'Key moments, civilisations, inventions and turning points from the past.',topics:['history']},
 {id:'geography',title:'World Geography',icon:'🗺️',tag:'MAP SMART',count:8,desc:'Continents, mountains, oceans, capitals and the physical world.',topics:['geography']},
 {id:'technology',title:'Technology & Digital Life',icon:'💻',tag:'DIGITAL',count:8,desc:'Web technology, cybersecurity, computing fundamentals and safer online habits.',topics:['technology']},
 {id:'sports',title:'Sports & Entertainment',icon:'⚽',tag:'FUN',count:8,desc:'Sports rules, famous competitions, films and stories people love.',topics:['sports']},
 {id:'exam',title:'Exam Preparation Centre',icon:'📚',tag:'STUDY',count:10,desc:'Original practice questions for foundational exam skills—not official past papers.',topics:['exam','mathematics','language']},
 {id:'mathematics',title:'Mathematics & Numeracy',icon:'➗',tag:'CALCULATE',count:10,desc:'Arithmetic, percentages, algebra, fractions, geometry, probability, statistics and unit conversions.',topics:['mathematics']},
 {id:'chemistry',title:'Chemistry & Elements',icon:'⚗️',tag:'SCIENCE',count:10,desc:'Explore the periodic table, symbols, atomic numbers, atomic weights and common compounds.',topics:['chemistry']},
 {id:'language',title:'English & Vocabulary',icon:'📖',tag:'LANGUAGE',count:10,desc:'Vocabulary, antonyms, spelling and practical English grammar.',topics:['language']},
 {id:'culture',title:'Culture, Literature & Arts',icon:'🎭',tag:'CULTURE',count:10,desc:'Understand culture, heritage, literary forms, storytelling and artistic traditions.',topics:['culture']},
 {id:'brain-teaser',title:'Brain Teaser Challenge',icon:'🧩',tag:'PUZZLE',count:8,desc:'A shareable set of logic and visual-pattern puzzles selected from the reasoning bank.',topics:['abstract','logical','spatial']},
 {id:'weekly',title:'Weekly Knowledge Cup',icon:'🥇',tag:'WEEKLY',count:15,desc:'A fixed 15-question set for this week. Track your own best and challenge friends; public rankings are not included.',topics:['weekly']}
];
const TOPIC_NAMES = {general:'General Knowledge',nigeria:'Nigeria & Africa',science:'Science & Nature',history:'World History',geography:'World Geography',technology:'Technology & Digital Life',sports:'Sports & Entertainment',exam:'Exam Preparation',chemistry:'Chemistry & Elements',mathematics:'Mathematics & Numeracy',language:'English & Vocabulary',culture:'Culture, Literature & Arts',nature:'Nature & Environment',abstract:'Abstract Reasoning',logical:'Logical Reasoning',spatial:'Spatial Reasoning'};
function findQuestionById(id){ return QUESTIONS.find(q=>q.id===id) || KNOWLEDGE_QUESTIONS.find(q=>q.id===id) || null; }
function currentWeekKey(date=new Date()) { const d=new Date(Date.UTC(date.getFullYear(),date.getMonth(),date.getDate())); const day=d.getUTCDay()||7; d.setUTCDate(d.getUTCDate()+4-day); const yearStart=new Date(Date.UTC(d.getUTCFullYear(),0,1)); const week=Math.ceil((((d-yearStart)/86400000)+1)/7); return `${d.getUTCFullYear()}-W${String(week).padStart(2,'0')}`; }
function seededRandom(seed) { let h=2166136261; for(const ch of String(seed)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619);} return ()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;}; }
function stableShuffle(items,seed) { const out=[...items],rnd=seededRandom(seed); for(let i=out.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[out[i],out[j]]=[out[j],out[i]];} return out; }
function selectBalancedQuiz(pool,count,seed){
 const rng=seededRandom(seed);const topics=[...new Set(pool.map(q=>q.topic||q.category))];const grouped=topics.map(topic=>({topic,items:stableShuffle(pool.filter(q=>(q.topic||q.category)===topic),seed+'-'+topic)})).filter(g=>g.items.length);const selected=[];let round=0;while(selected.length<count&&grouped.some(g=>g.items.length)){for(const group of grouped){if(group.items.length&&selected.length<count){selected.push(group.items.shift());}}round++;if(round>count+grouped.length)break;}return stableShuffle(selected,seed+'-final');
}
function getQuizQuestions(id, weekOverride=null) { const meta=QUIZ_COLLECTIONS.find(q=>q.id===id); if(!meta) throw new Error('That quiz could not be found.'); let pool,count=meta.count,seed=`brainmetric-${id}-shared-v2`; if(id==='weekly'){const week=weekOverride||currentWeekKey();pool=KNOWLEDGE_QUESTIONS;seed=`brainmetric-weekly-${week}-v2`;return selectBalancedQuiz(pool,count,seed);} else if(id==='ultimate'){pool=KNOWLEDGE_QUESTIONS;seed='brainmetric-ultimate-v2';return selectBalancedQuiz(pool,count,seed);} else if(id==='daily-five'){const day=weekOverride||sharedChallengeDay()||localDateKey();pool=KNOWLEDGE_QUESTIONS;seed=`brainmetric-daily-five-${day}-v2`;return selectBalancedQuiz(pool,count,seed);} else if(id==='brain-teaser'){pool=QUESTIONS.filter(q=>['abstract','logical','spatial'].includes(q.category));seed='brainmetric-brainteaser-v2';} else {pool=KNOWLEDGE_QUESTIONS.filter(q=>meta.topics.includes(q.topic));seed=`brainmetric-topic-${id}-v2`;} if(pool.length<count)count=pool.length;return stableShuffle(pool,seed).slice(0,count); }
function sharedChallengeId(){const id=new URLSearchParams(location.search).get('challenge');return QUIZ_COLLECTIONS.some(q=>q.id===id)?id:null;}
function sharedChallengeWeek(){const w=new URLSearchParams(location.search).get('week');return w&&/^\d{4}-W\d{2}$/.test(w)?w:null;}
function sharedChallengeDay(){const d=new URLSearchParams(location.search).get('day');return d&&/^\d{4}-\d{2}-\d{2}$/.test(d)?d:null;}
function challengeURL(id,period=null){const u=new URL(location.href);u.hash='';u.search='';u.searchParams.set('challenge',id);if(id==='weekly')u.searchParams.set('week',period||currentWeekKey());if(id==='daily-five')u.searchParams.set('day',period||localDateKey());return u.toString();}
function startCuratedQuiz(id,period=null){const meta=QUIZ_COLLECTIONS.find(q=>q.id===id);if(!meta){toast('Quiz not found.');return;}try{const actualPeriod=id==='weekly'?(period||sharedChallengeWeek()||currentWeekKey()):id==='daily-five'?(period||sharedChallengeDay()||localDateKey()):null;startAssessment({questions:getQuizQuestions(id,actualPeriod),category:'all',difficulty:'all',count:meta.count,title:meta.title,shareId:id,challengeWeek:actualPeriod});}catch(err){toast(err.message||'Could not start quiz.');}}
function startWeeklyCup(){const week=currentWeekKey();startCuratedQuiz('weekly',week);}


;
function eligibleQuestions(questions, { category = 'all', difficulty = 'all' } = {}) {
  return questions.filter(q => q.published === true &&
    (category === 'all' || q.category === category) &&
    (difficulty === 'all' || q.difficulty === difficulty));
}

function validateQuestion(q) {
  const errors = [];
  if (!q || typeof q !== 'object') return ['Question must be an object'];
  if (!q.id || typeof q.id !== 'string') errors.push('Missing question id');
  if (!q.prompt || typeof q.prompt !== 'string' || !q.prompt.trim()) errors.push('Missing prompt');
  if (!Array.isArray(q.options) || q.options.length < 2 || q.options.some(x => typeof x !== 'string' || !x.trim())) errors.push('Options must be at least two non-empty strings');
  if (!Number.isInteger(q.answer) || !Array.isArray(q.options) || q.answer < 0 || q.answer >= q.options.length) errors.push('Answer index is invalid');
  if (!['logical','numerical','verbal','abstract','spatial','analytical'].includes(q.category)) errors.push('Unknown category');
  if (!['easy','medium','hard'].includes(q.difficulty)) errors.push('Unknown difficulty');
  if (!q.explanation || typeof q.explanation !== 'string') errors.push('Missing explanation');
  return errors;
}

function buildAssessment(questions, filters = {}, count = 10, random = Math.random) {
  if (!Number.isInteger(count) || count < 1) throw new Error('Choose a valid question count.');
  const eligible = eligibleQuestions(questions, filters);
  if (eligible.length < count) throw new Error(`Only ${eligible.length} questions match these filters. Choose fewer questions or broaden your filters.`);
  const pool = [...eligible];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function scoreAssessment(questions, answers) {
  const total = questions.length;
  let correct = 0, incorrect = 0, unanswered = 0;
  for (const q of questions) {
    const answer = answers[q.id];
    if (answer === undefined || answer === null || answer === '') unanswered++;
    else if (Number(answer) === q.answer) correct++;
    else incorrect++;
  }
  return { total, correct, incorrect, unanswered, percentage: total ? Math.round(correct / total * 100) : 0 };
}

function formatDuration(seconds) {
  const s = Math.max(0, Math.floor(Number(seconds) || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

;
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
// Release storage namespace: the v2 public release intentionally starts with fresh scores.
// Each browser profile has its own localStorage; no visitor shares scores with other visitors.
const STORAGE_KEY = 'brainmetric.public.v2';
try {
  // Discard legacy score stores from previous releases so the published build opens at zero.
  localStorage.removeItem('brainmetric.fresh.v1');
  localStorage.removeItem('brainmetric.public.v1');
} catch { /* Storage can be unavailable in private/restricted browsing. */ }
function localDateKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
const pageNames = { home:'Overview', discover:'Explore quizzes', bank:'Question bank', tests:'Test centre', daily:'Daily challenge', academy:'Academy', puzzles:'Puzzle lab', arcade:'Brain Arcade', missions:'Daily missions', journey:'Brain Journey', review:'Mistake review', coach:'Coach', analytics:'Analytics', achievements:'Achievements', settings:'Settings & data', assessment:'Assessment', results:'Assessment results', lesson:'Lesson' };
const lessons = [
  {id:'logic-basics',title:'Think in rules',category:'logical',time:'6 min',level:'Foundation',summary:'Separate what is stated from what merely seems likely.',body:['A valid conclusion must follow from the information given, not from assumptions about the real world.','Translate statements into simple relationships. If A belongs to B and B belongs to C, A belongs to C. But overlap alone does not prove membership.','Try asking: “Could the premises be true while this conclusion is false?” If yes, the conclusion is not guaranteed.'],example:'All tulips are flowers. Some flowers are yellow. It does not follow that some tulips are yellow.'},
  {id:'number-patterns',title:'Decode number patterns',category:'numerical',time:'7 min',level:'Foundation',summary:'Look at differences, ratios, and alternating rules.',body:['Start by checking the difference between neighbouring terms. Constant differences suggest addition or subtraction.','If differences change, check whether they themselves form a pattern. If terms scale, check multiplication or division.','Do not force a complicated rule when a simpler consistent rule explains every term.'],example:'4, 7, 12, 19, 28 has differences 3, 5, 7, 9. The next difference is 11, so the next term is 39.'},
  {id:'verbal-precision',title:'Read with precision',category:'verbal',time:'5 min',level:'Foundation',summary:'Notice qualifiers, implications, and evidence.',body:['Words such as all, some, none, must, and might change the strength of a claim.','An example does not automatically establish a universal rule. A correlation does not by itself establish a cause.','For verbal analogies, name the relationship between the first pair before applying it to the second pair.'],example:'“Some members are volunteers” does not mean “all members are volunteers.”'},
  {id:'abstract-rules',title:'Spot abstract rules',category:'abstract',time:'6 min',level:'Practice',summary:'Track one visual feature at a time.',body:['Compare symbols by shape, count, rotation, fill, size, and position.','When several features change, make a small table and track each feature independently.','Check your proposed rule against every item, not only the last two.'],example:'If a symbol rotates 90° clockwise each step, the fourth position returns to its starting orientation.'},
  {id:'spatial-mapping',title:'Build a mental map',category:'spatial',time:'7 min',level:'Practice',summary:'Track orientation and movement step by step.',body:['Fix a starting direction and update it after every turn. Right and left depend on the direction you currently face.','For routes, use a simple coordinate sketch or cancel opposite movements.','For folds and layers, count how many layers are stacked at the point where a cut or hole passes through.'],example:'Walk 3 units north and 3 south: the net displacement is zero.'},
  {id:'evidence-check',title:'Evaluate the evidence',category:'analytical',time:'8 min',level:'Practice',summary:'Separate constraints, facts, and conclusions.',body:['List each condition explicitly before arranging people, events, or tasks.','Use only conclusions that satisfy every constraint; one violated condition invalidates the arrangement.','Check totals, units, and whether groups overlap before adding counts.'],example:'If A must precede B and B must precede C, A → B → C satisfies both conditions.'}
];

const defaultState = () => ({
  version:2, theme:'dark', reduceMotion:false, attempts:[], lessonDone:[], lessonLog:[], dailyDone:[], saved:[], mistakes:[], reviewedMistakes:[], arcadeHistory:[], missionClaims:[], xp:0, profile:{name:'Curious mind',goal:'Build a daily habit'},
  settings:{sound:false,reminders:false}, lastVisit: localDateKey()
});
function cleanStoredText(value, fallback, maxLength=120){
  if(typeof value!=='string') return fallback;
  const cleaned=value.replace(/[\u0000-\u001f\u007f]/g,' ').trim().slice(0,maxLength);
  return cleaned||fallback;
}
function cleanStoredDate(value, fallback){
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value)) return fallback;
  const parsed=new Date(`${value}T12:00:00`);
  return Number.isNaN(parsed.getTime())||localDateKey(parsed)!==value?fallback:value;
}
function cleanStoredNumber(value, min, max, fallback=0){
  const number=Number(value);
  return Number.isFinite(number)?Math.max(min,Math.min(max,Math.floor(number))):fallback;
}
function cleanStoredStringList(value, maxItems=1000, maxLength=180){
  if(!Array.isArray(value)) return [];
  return [...new Set(value.filter(item=>typeof item==='string'&&item.length<=maxLength).slice(-maxItems))];
}
function cleanStoredObjectList(value, maxItems=500){
  if(!Array.isArray(value)) return [];
  return value.filter(item=>item&&typeof item==='object'&&!Array.isArray(item)).slice(-maxItems);
}
function loadState(){
  const base=defaultState();
  try {
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw||raw.length>2000000) return base;
    const parsed=JSON.parse(raw);
    if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)) return base;
    const profile=parsed.profile&&typeof parsed.profile==='object'&&!Array.isArray(parsed.profile)?parsed.profile:{};
    const settings=parsed.settings&&typeof parsed.settings==='object'&&!Array.isArray(parsed.settings)?parsed.settings:{};
    const allowedCategories=new Set([...CATEGORIES.map(item=>item.id),'all']);
    const allowedDifficulties=new Set(['all','easy','medium','hard']);
    const attempts=cleanStoredObjectList(parsed.attempts,500).map((item,index)=>({
      id:cleanStoredText(item.id,`saved-run-${index}`,80),
      title:cleanStoredText(item.title,'Reasoning practice',120),
      quizId:typeof item.quizId==='string'?item.quizId.slice(0,80):null,
      challengeWeek:typeof item.challengeWeek==='string'&&/^\d{4}-W\d{2}$/.test(item.challengeWeek)?item.challengeWeek:null,
      category:allowedCategories.has(item.category)?item.category:'all',
      difficulty:allowedDifficulties.has(item.difficulty)?item.difficulty:'all',
      correct:cleanStoredNumber(item.correct,0,10000,0),
      total:cleanStoredNumber(item.total,0,10000,0),
      percentage:Math.max(0,Math.min(100,Number.isFinite(Number(item.percentage))?Number(item.percentage):0)),
      date:cleanStoredDate(item.date,base.lastVisit),
      completedAt:(typeof item.completedAt==='string'&&!Number.isNaN(Date.parse(item.completedAt)))?new Date(item.completedAt).toISOString():new Date().toISOString()
    }));
    const arcadeHistory=cleanStoredObjectList(parsed.arcadeHistory,500).map((item,index)=>({
      id:cleanStoredText(item.id,`saved-arcade-${index}`,80),
      type:['memory','focus','numbers','pattern'].includes(item.type)?item.type:'memory',
      score:cleanStoredNumber(item.score,0,100,0),
      max:cleanStoredNumber(item.max,0,100,1),
      xp:cleanStoredNumber(item.xp,0,10000,0),
      date:cleanStoredDate(item.date,base.lastVisit),
      completedAt:(typeof item.completedAt==='string'&&!Number.isNaN(Date.parse(item.completedAt)))?new Date(item.completedAt).toISOString():new Date().toISOString()
    }));
    const lessonLog=cleanStoredObjectList(parsed.lessonLog,500).map(item=>({
      id:cleanStoredText(item.id,'',100),date:cleanStoredDate(item.date,base.lastVisit)
    })).filter(item=>item.id);
    return {
      ...base,
      version:2,
      theme:parsed.theme==='light'?'light':'dark',
      reduceMotion:parsed.reduceMotion===true,
      attempts,
      lessonDone:cleanStoredStringList(parsed.lessonDone,500,100),
      lessonLog,
      dailyDone:cleanStoredStringList(parsed.dailyDone,500,10).filter(day=>/^\d{4}-\d{2}-\d{2}$/.test(day)),
      saved:cleanStoredStringList(parsed.saved,2000,120),
      mistakes:cleanStoredStringList(parsed.mistakes,2000,120),
      reviewedMistakes:cleanStoredStringList(parsed.reviewedMistakes,2000,120),
      arcadeHistory,
      missionClaims:cleanStoredStringList(parsed.missionClaims,1000,150),
      xp:cleanStoredNumber(parsed.xp,0,10000000,0),
      profile:{name:cleanStoredText(profile.name,'Curious mind',40),goal:cleanStoredText(profile.goal,'Build a daily habit',100)},
      settings:{sound:settings.sound===true,reminders:settings.reminders===true},
      lastVisit:cleanStoredDate(parsed.lastVisit,base.lastVisit)
    };
  } catch {
    return base;
  }
}
let state = loadState();
let currentPage = 'home';
let session = null;
let bankPage = 0;
let lastBankResults = [];
let activeLesson = null;
let arcadeSession = null;
let coachHistory = [{role:'coach',text:'Hi! I’m your local practice coach. I can explain reasoning strategies, help you review mistakes, and suggest what to practise next. I use your saved results on this device; I am not connected to a cloud AI service.'}];
let toastTimer;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); const el=$('#sync-status'); if(el) el.lastChild.textContent=' Saved on device'; } catch { toast('Could not save: device storage may be full or disabled.'); } updateStreak(); updateLocalProfile(); };
function toast(message){ const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),2800); }
function updateStreak(){ const n=calculateStreak(); const label=$('#streak-label'); if(label) label.textContent=`${n} day streak`; }
function calculateStreak(){ const days=[...new Set(state.attempts.map(a=>a.date))].sort().reverse(); if(!days.length) return 0; let count=0; let cursor=new Date(`${days[0]}T12:00:00`); const today=new Date(`${localDateKey()}T12:00:00`); if(days[0]!==localDateKey(today)){const y=new Date(today);y.setDate(y.getDate()-1);if(days[0]!==localDateKey(y))return 0;cursor=y;} for(const d of days){if(d===localDateKey(cursor)){count++;cursor.setDate(cursor.getDate()-1);}else if(d<localDateKey(cursor))break;}return count; }
function go(page){ currentPage=page; $$('.nav-link[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===page)); $('#page-name').textContent=pageNames[page]||page; $('#sidebar').classList.remove('open'); render(); $('#content').focus({preventScroll:true}); window.scrollTo({top:0,behavior:state.reduceMotion?'auto':'smooth'}); }
function cat(id){return CATEGORIES.find(c=>c.id===id)||CATEGORIES[0];}
function statCard(label,value,note,icon,tint='rgba(140,123,255,.09)'){return `<article class="stat-card" style="--tint:${tint}"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon}</span></div><div class="stat-value">${value}</div><div class="stat-note">${note}</div></article>`;}
function empty(title,desc,icon='✧',button=''){return `<div class="empty"><div class="empty-icon">${icon}</div><b>${title}</b><div>${desc}</div>${button?`<div style="margin-top:14px">${button}</div>`:''}</div>`;}
function pageHead(eyebrow,title,desc,action=''){return `<div class="page-head"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${desc}</p></div>${action}</div>`;}
function renderHome(){
 const attempts=state.attempts; const average=attempts.length?Math.round(attempts.reduce((s,a)=>s+a.percentage,0)/attempts.length):0; const answered=attempts.reduce((s,a)=>s+a.total,0); const daily=dayQuestion(); const rank=playerRank(); const missionCount=getMissions().filter(m=>m.done).length;
 const catCards=CATEGORIES.map(c=>`<button class="category-card" data-category-start="${c.id}"><div class="category-head"><span class="category-icon ${c.colour}">${c.icon}</span><span class="muted small">${eligibleQuestions(QUESTIONS,{category:c.id}).length} questions</span></div><h3>${c.name}</h3><p>${c.description}</p><div class="category-foot"><span>Start a quick set</span><b>→</b></div></button>`).join('');
 const recent=attempts.slice(0,4).map(a=>`<div class="activity-row"><div class="activity-mark">${cat(a.category==='all'?'logical':a.category).icon}</div><div class="activity-main"><b>${escapeHTML(a.title||'Reasoning practice')}</b><small>${new Date(a.completedAt).toLocaleDateString(undefined,{month:'short',day:'numeric'})} · ${a.correct}/${a.total} correct</small></div><div class="activity-score">${a.percentage}%</div></div>`).join('');
 return `${pageHead('YOUR MIND, IN MOTION','Think sharper. <span style="color:var(--accent)">Every day.</span>','Build your reasoning skills with focused practice, short lessons, and feedback that helps you learn.','<button class="btn" data-go="tests">＋ Start an assessment</button>')}
 <div class="home-hero"><section class="hero-card"><div class="eyebrow">YOUR NEXT BREAKTHROUGH</div><h1>A little practice.<br>More clarity.</h1><p>Challenge your assumptions, discover patterns, and turn every answer into an opportunity to learn.</p><div class="hero-cta"><button class="btn" data-go="tests">Start practising <span>→</span></button><button class="btn secondary" data-go="discover">Explore knowledge quizzes</button><button class="btn ghost" data-go="bank">Browse 5K+ questions</button><button class="btn ghost" data-go="academy">Explore Academy</button></div><div class="hero-orbit"><div class="orbit-core">✧</div></div></section>
 <section class="hero-side"><div class="daily-top"><span class="pill orange">✦ DAILY CHALLENGE</span><span class="daily-symbol">◈</span></div><div><div class="daily-question">${escapeHTML(daily.prompt)}</div><div class="muted small">A fresh question to keep your mind active.</div></div><div class="daily-bottom"><span class="muted small">2–3 minutes · ${daily.topic?(TOPIC_NAMES[daily.topic]||daily.topic):cat(daily.category).short}</span><button class="btn secondary" data-go="daily">Take challenge →</button></div></section></div>
 <div class="challenge-banner"><div><div class="eyebrow">KNOWLEDGE IS AN ADVENTURE</div><b>Ready to test more than reasoning?</b><div class="muted small">Explore general knowledge, Nigeria & Africa, science, history, technology, sports and exam practice.</div></div><button class="btn" data-go="discover">Explore quiz library →</button></div>
 <div class="grid stats">${statCard('Assessments completed',attempts.length,'Every session counts','◎')}${statCard('Average accuracy',`${average}%`,attempts.length?'Across saved assessments':'Your first score starts here','◉','rgba(79,209,197,.09)')}${statCard('Questions answered',answered,'Practice builds fluency','⌁','rgba(103,168,255,.09)')}${statCard('Experience points',state.xp,'Earned by learning and practice','✦','rgba(255,189,121,.09)')}</div>
 <section class="rank-panel"><div class="rank-emblem">✦</div><div><div class="eyebrow">YOUR PLAYER RANK</div><div class="rank-title">Level ${rank.level} · ${rank.title}</div><div class="rank-progress"><span style="width:${rank.progress}%"></span></div><div class="rank-meta">${rank.into} / 100 XP to Level ${rank.level+1} · ${state.xp.toLocaleString()} total XP</div></div><button class="btn secondary" data-go="missions">Daily missions ${missionCount}/4 →</button></section>
 <div class="section-row"><h2>Explore reasoning</h2><button class="text-link" data-go="tests">Open test centre →</button></div><div class="grid category-grid">${catCards}</div>
 <div class="two-col" style="margin-top:22px"><section class="panel"><div class="panel-head"><h2>Recent activity</h2><div class="panel-head-actions"><button class="text-link" data-reset-scores>Reset scores</button><button class="text-link" data-go="analytics">View analytics →</button></div></div>${recent?`<div class="activity-list">${recent}</div>`:empty('Your journey starts here','Complete your first assessment to see your progress.','◎','<button class="btn secondary" data-go="tests">Choose a test</button>')}</section><section class="panel"><div class="panel-head"><h2>Learning path</h2><span class="pill">${state.lessonDone.length}/${lessons.length} DONE</span></div><p class="muted small">Short, focused lessons help you understand the strategies behind the answers.</p><div class="progress" style="margin:15px 0 18px"><span style="width:${state.lessonDone.length/lessons.length*100}%"></span></div><div class="activity-list">${lessons.slice(0,3).map(l=>`<div class="activity-row"><div class="activity-mark">${cat(l.category).icon}</div><div class="activity-main"><b>${l.title}</b><small>${l.time} · ${l.level}</small></div><button class="icon-btn" data-lesson="${l.id}" aria-label="Open ${l.title}">→</button></div>`).join('')}</div><button class="btn secondary" style="width:100%;margin-top:14px" data-go="academy">Continue learning</button></section></div>`;
}
function renderTests(){return `${pageHead('TEST CENTRE','Choose your challenge','Create a focused reasoning assessment, or explore topic quizzes, exam practice, and shareable challenges in the quiz library. Results are saved on this device.')}
 <div class="two-col"><section class="panel"><div class="panel-head"><h2>Assessment setup</h2><span class="pill green">READY TO PRACTISE</span></div><form id="test-form"><div class="form-grid"><div class="field"><label for="category-select">Reasoning category</label><select id="category-select" name="category"><option value="all">All categories · mixed practice</option>${CATEGORIES.map(c=>`<option value="${c.id}">${c.name}</option>`).join('')}</select></div><div class="field"><label for="difficulty-select">Difficulty</label><select id="difficulty-select" name="difficulty"><option value="all">All difficulties</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></div><div class="field"><label for="count-select">Number of questions</label><select id="count-select" name="count"><option>5</option><option selected>10</option><option>20</option><option>30</option><option>40</option><option>50</option><option>100</option><option>250</option><option>500</option><option>1000</option></select><span class="field-help" id="available-count">${QUESTIONS.length} questions available.</span></div><div class="field"><label for="timer-select">Time limit</label><select id="timer-select" name="timer"><option value="0">Untimed · learn at your pace</option><option value="300">5 minutes</option><option value="600">10 minutes</option><option value="1200">20 minutes</option></select></div></div><div class="notice" style="margin:18px 0"><b>About your score:</b> results describe your performance on this practice set. They are not an IQ score or a clinical assessment.</div><button class="btn" type="submit">Start assessment <span>→</span></button></form></section>
 <section class="panel"><div class="panel-head"><h2>Six skill areas</h2></div><div class="activity-list">${CATEGORIES.map(c=>`<div class="activity-row"><div class="category-icon ${c.colour}" style="width:35px;height:35px">${c.icon}</div><div class="activity-main"><b>${c.name}</b><small>${eligibleQuestions(QUESTIONS,{category:c.id}).length} sample questions</small></div><button class="text-link" data-category-start="${c.id}">Practise →</button></div>`).join('')}</div></section></div>`;}
function renderDiscover(){
 const incoming=sharedChallengeId();
 const incomingMeta=QUIZ_COLLECTIONS.find(q=>q.id===incoming);
 const weeklyAttempts=state.attempts.filter(a=>a.quizId==='weekly'&&a.challengeWeek===currentWeekKey());
 const weeklyBest=weeklyAttempts.length?Math.max(...weeklyAttempts.map(a=>a.percentage)):null;
 const challenge=incomingMeta?`<div class="challenge-banner"><div><div class="eyebrow">FRIEND CHALLENGE</div><b>${escapeHTML(incomingMeta.title)}</b><div class="muted small">A shared challenge link was opened. Everyone with this link gets the same question set.</div></div><button class="btn" data-start-quiz="${incomingMeta.id}" data-period="${incoming==='weekly'?(sharedChallengeWeek()||currentWeekKey()):incoming==='daily-five'?(sharedChallengeDay()||localDateKey()):''}">Accept challenge →</button></div>`:'';
 const cards=QUIZ_COLLECTIONS.map(q=>{const available=q.id==='brain-teaser'?QUESTIONS.filter(x=>['abstract','logical','spatial'].includes(x.category)).length:KNOWLEDGE_QUESTIONS.filter(x=>q.topics.includes(x.topic)).length; const label=q.id==='weekly'?(weeklyBest===null?'This week’s personal cup':`This week’s best: ${weeklyBest}%`):`${available.toLocaleString()} in bank · ${q.count} per run`;
 return `<article class="quiz-card" data-quiz-card data-search="${escapeHTML((q.title+' '+q.desc+' '+q.tag+' '+q.topics.join(' ')).toLowerCase())}"><div class="quiz-card-top"><div class="quiz-card-icon">${q.icon}</div><span class="pill ${q.id==='ultimate'?'green':q.id==='weekly'?'orange':''}">${q.tag}</span></div><h3>${escapeHTML(q.title)}</h3><p>${escapeHTML(q.desc)}</p><div class="muted small" style="margin-bottom:13px">${escapeHTML(label)} ${q.id==='weekly'?'· resets weekly':''}</div><div class="quiz-card-actions"><button class="btn" data-start-quiz="${q.id}">${q.id==='weekly'?'Enter cup':'Start quiz'} →</button><button class="btn secondary" data-share-quiz="${q.id}" title="Share this quiz">Share ↗</button></div></article>`;}).join('');
 return `${pageHead('BRAINMETRIC QUIZ LIBRARY','Find out what you know',`${KNOWLEDGE_QUESTIONS.length.toLocaleString()} knowledge questions plus ${QUESTIONS.length.toLocaleString()} reasoning exercises. Search the question bank, practise by topic, or challenge a friend. No account required.`)} ${challenge}<section class="quiz-spotlight"><div><div class="eyebrow">START HERE · 20 QUESTIONS</div><h2>The Ultimate Knowledge Test</h2><p>Take on a balanced mixed challenge, then review your score, read explanations, and share a result card. Your performance is saved privately on this device.</p><div class="share-actions"><button class="btn" data-start-quiz="ultimate">Start the ultimate test →</button><button class="btn secondary" data-share-quiz="ultimate">Challenge a friend</button></div></div><div class="quiz-spotlight-art" aria-hidden="true">🧠</div></section><div class="quiz-tools"><div><h2 style="margin-bottom:4px">Explore by topic</h2><div class="muted small">Original practice questions · instant explanations · personal progress</div></div><input class="quiz-search" id="quiz-search" type="search" placeholder="Search topics, exams, science, sports…" aria-label="Search quiz topics"></div><div class="quiz-card-grid" id="quiz-card-grid">${cards}</div><div class="quiz-filter-empty" id="quiz-filter-empty">No matching quizzes. Try a different search term.</div><section class="panel" style="margin-top:22px"><div class="panel-head"><div><h2>Invite someone to play</h2><p class="muted small" style="margin:4px 0 0">Share any quiz link through WhatsApp, text or social media. Friends get the same selected questions.</p></div><span class="pill green">NO SIGN-IN</span></div><p class="muted small">Browse the full bank with topic and difficulty filters in <button class="text-link" data-go="bank">Question bank</button>. Scores and rankings are currently stored on each device, so BrainMetric does not claim to show a global leaderboard. The Weekly Knowledge Cup tracks your personal best for the current week.</p></section>`;
}

function renderBank(){
 const topics=[...new Set(KNOWLEDGE_QUESTIONS.map(q=>q.topic))].sort((a,b)=>(TOPIC_NAMES[a]||a).localeCompare(TOPIC_NAMES[b]||b));
 return `${pageHead('THE OPEN PRACTICE LIBRARY','Search the question bank',`Browse ${KNOWLEDGE_QUESTIONS.length.toLocaleString()} knowledge questions and ${QUESTIONS.length.toLocaleString()} reasoning exercises. Each published item has multiple-choice options, an answer and an explanation.`)}
 <section class="panel" style="margin-bottom:18px"><div class="bank-filters">
 <label class="field" style="flex:2;min-width:220px"><span>Search questions</span><input class="quiz-search" id="bank-search" type="search" placeholder="Try culture, photosynthesis, capital, percentage…" aria-label="Search question bank"></label>
 <label class="field" style="flex:1;min-width:165px"><span>Topic</span><select id="bank-topic"><option value="all">All topics</option>${topics.map(t=>`<option value="${escapeHTML(t)}">${escapeHTML(TOPIC_NAMES[t]||t)}</option>`).join('')}<option value="reasoning">Reasoning exercises</option></select></label>
 <label class="field" style="flex:1;min-width:140px"><span>Difficulty</span><select id="bank-difficulty"><option value="all">All levels</option><option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option></select></label>
 <label class="field" style="flex:0;min-width:130px"><span>Results per page</span><select id="bank-page-size"><option value="10">10</option><option value="25" selected>25</option><option value="50">50</option></select></label>
 </div><div class="bank-tools"><div class="muted small" id="bank-count">Loading question bank…</div><button class="btn" data-bank-practice>Practise filtered questions →</button></div></section>
 <section id="bank-results" class="bank-results"></section><div class="bank-pagination"><button class="btn secondary" data-bank-prev>← Previous</button><span class="muted small" id="bank-page-label">Page 1</span><button class="btn secondary" data-bank-next>Next →</button></div>
 <p class="muted small" style="margin-top:14px">Question text is shown without artificial question numbers. Answers stay hidden until you open a question’s explanation. Progress remains on this device.</p>`;
}
function filteredBankResults(){
 const query=($('#bank-search')?.value||'').trim().toLowerCase();const topic=$('#bank-topic')?.value||'all';const difficulty=$('#bank-difficulty')?.value||'all';
 const all=topic==='reasoning'?QUESTIONS:topic==='all'?[...KNOWLEDGE_QUESTIONS,...QUESTIONS]:KNOWLEDGE_QUESTIONS.filter(q=>q.topic===topic);
 return all.filter(q=>(difficulty==='all'||q.difficulty===difficulty)&&(!query||[q.prompt,q.explanation,...(q.options||[]),q.topic,q.category].join(' ').toLowerCase().includes(query)));
}
function renderBankResults(){
 if(currentPage!=='bank')return;lastBankResults=filteredBankResults();const size=Number($('#bank-page-size')?.value||25);const totalPages=Math.max(1,Math.ceil(lastBankResults.length/size));bankPage=Math.min(bankPage,totalPages-1);const items=lastBankResults.slice(bankPage*size,(bankPage+1)*size);
 const count=$('#bank-count');if(count)count.textContent=`${lastBankResults.length.toLocaleString()} matching question${lastBankResults.length===1?'':'s'} · ${KNOWLEDGE_QUESTIONS.length.toLocaleString()} knowledge / ${QUESTIONS.length.toLocaleString()} reasoning`;
 const label=$('#bank-page-label');if(label)label.textContent=`Page ${bankPage+1} of ${totalPages}`;
 const prev=$('[data-bank-prev]'),next=$('[data-bank-next]');if(prev)prev.disabled=bankPage===0;if(next)next.disabled=bankPage>=totalPages-1;
 const root=$('#bank-results');if(!root)return;
 root.innerHTML=items.length?items.map(q=>`<article class="bank-question panel"><div class="question-meta"><span class="pill">${escapeHTML(TOPIC_NAMES[q.topic]||cat(q.category).name)}</span><span class="pill">${escapeHTML(q.difficulty)}</span><span class="muted small">${escapeHTML(q.id)}</span></div><h3>${escapeHTML(q.prompt)}</h3><div class="bank-choice-preview">${q.options.map((o,i)=>`<div><b>${String.fromCharCode(65+i)}.</b> ${escapeHTML(o)}</div>`).join('')}</div><details class="bank-answer"><summary>Reveal answer and explanation</summary><div class="review-answer correct-text" style="margin-top:10px"><b>Answer:</b> ${escapeHTML(q.options[q.answer])}</div><p class="muted small" style="margin:8px 0 0">${escapeHTML(q.explanation)}</p></details><div class="review-actions"><button class="btn secondary" data-bank-try="${escapeHTML(q.id)}">Try this question</button><button class="btn ghost" data-save-question="${escapeHTML(q.id)}">${state.saved.includes(q.id)?'★ Saved':'☆ Save'}</button></div></article>`).join(''):empty('No questions matched','Try another word or broaden the topic and difficulty filters.','⌕');
}

function dayQuestion(){const today=localDateKey();const pool=KNOWLEDGE_QUESTIONS;const index=[...today].reduce((n,ch)=>n+ch.charCodeAt(0),0)%pool.length;return pool[index];}
function renderDaily(){const q=dayQuestion();const today=localDateKey();const completed=state.dailyDone.includes(today);return `${pageHead('A MOMENT FOR YOUR MIND','Daily challenge','One interesting knowledge question each day, with a short explanation to learn something new.')}
 <div class="assessment-shell"><section class="question-card"><div class="question-meta"><span class="pill orange">✦ TODAY’S CHALLENGE</span><span class="pill">${q.topic?(TOPIC_NAMES[q.topic]||q.topic):cat(q.category).name}</span><span class="pill">${q.difficulty}</span></div><div class="question-text">${escapeHTML(q.prompt)}</div><div class="option-list">${q.options.map((o,i)=>`<button class="option ${completed&&i===q.answer?'selected':''}" data-daily-answer="${i}" ${completed?'disabled':''}><span class="option-key">${String.fromCharCode(65+i)}</span><span>${escapeHTML(o)}</span></button>`).join('')}</div><div id="daily-feedback" style="margin-top:15px">${completed?`<div class="notice"><b>Today’s challenge is complete.</b><p style="margin:6px 0 0">Correct answer: ${escapeHTML(q.options[q.answer])}</p><p style="margin:6px 0 0">${escapeHTML(q.explanation)}</p><p class="muted small" style="margin:6px 0 0">Come back tomorrow for a new daily question.</p></div>`:'<span class="muted small">Choose the best answer. You’ll see an explanation right away.</span>'}</div></section><div class="panel" style="margin-top:15px"><b>Why daily practice?</b><p class="muted small" style="margin:7px 0 0">Short, regular sessions help you learn and spot patterns over time. Missing a day is okay — just begin again.</p></div><div class="challenge-banner" style="margin-top:15px"><div><div class="eyebrow">WANT A LITTLE MORE?</div><b>Daily Knowledge Sprint · 5 questions</b><div class="muted small">A short scored quiz using today’s fixed question set.</div></div><button class="btn" data-start-quiz="daily-five" data-period="${today}">Start 5-question sprint →</button></div></div>`;}
function renderAcademy(){return `${pageHead('BRAINMETRIC ACADEMY','Learn the thinking behind the answer','Practical micro-lessons for stronger reasoning habits. Complete a lesson to earn experience points.')}
 <div class="grid lesson-grid">${lessons.map((l,i)=>`<article class="lesson-card"><div class="category-head"><span class="category-icon ${cat(l.category).colour}">${cat(l.category).icon}</span><span class="pill ${state.lessonDone.includes(l.id)?'green':''}">${state.lessonDone.includes(l.id)?'✓ COMPLETED':l.time.toUpperCase()}</span></div><div class="lesson-number">0${i+1}</div><h3>${l.title}</h3><p>${l.summary}</p><div class="muted small">${cat(l.category).name} · ${l.level}</div><button class="btn ${state.lessonDone.includes(l.id)?'secondary':''}" data-lesson="${l.id}" style="width:100%">${state.lessonDone.includes(l.id)?'Review lesson':'Start lesson'} →</button></article>`).join('')}</div>`;}
function renderLesson(){const l=lessons.find(x=>x.id===activeLesson)||lessons[0];return `${pageHead('ACADEMY / LESSON',l.title,l.summary,'<button class="btn secondary" data-go="academy">← Back to Academy</button>')}<div class="assessment-shell"><article class="panel"><div class="question-meta"><span class="pill">${cat(l.category).name}</span><span class="pill">${l.time}</span></div><h2>Key ideas</h2><div class="activity-list">${l.body.map((p,i)=>`<div class="activity-row" style="align-items:flex-start"><div class="activity-mark">${i+1}</div><div class="activity-main"><div>${p}</div></div></div>`).join('')}</div><div class="notice" style="margin-top:18px"><b>Worked example</b><p style="margin:6px 0 0;color:var(--text)">${l.example}</p></div><div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px"><button class="btn" data-complete-lesson="${l.id}">${state.lessonDone.includes(l.id)?'Completed ✓':'Mark lesson complete'}</button><button class="btn secondary" data-go="tests">Practise this skill</button></div></article></div>`;}
function renderPuzzles(){const puzzleQs=QUESTIONS.filter(q=>['abstract','spatial','logical'].includes(q.category)).slice(0,9);return `${pageHead('PUZZLE LAB','Curiosity, meet challenge','Explore quick puzzles across patterns, logic, and spatial thinking. Each puzzle gives instant feedback.')}
 <div class="grid puzzle-grid">${puzzleQs.map((q,i)=>`<article class="puzzle-card"><div class="category-head"><span class="category-icon ${cat(q.category).colour}">${cat(q.category).icon}</span><span class="pill">PUZZLE ${String(i+1).padStart(2,'0')}</span></div><h3>${cat(q.category).short} challenge</h3><p>${q.difficulty[0].toUpperCase()+q.difficulty.slice(1)} · 1 question</p><div class="puzzle-question">${escapeHTML(q.prompt)}</div><button class="btn secondary" data-puzzle="${q.id}" style="width:100%">Try puzzle →</button></article>`).join('')}</div>`;}
function playerRank(){const level=Math.floor(state.xp/100)+1;const ranks=[{min:25,title:'Grandmaster'},{min:15,title:'Master Mind'},{min:10,title:'Expert Thinker'},{min:6,title:'Strategist'},{min:3,title:'Explorer'},{min:1,title:'Curious Mind'}];return {level,title:ranks.find(r=>level>=r.min).title,into:state.xp%100,progress:state.xp%100};}
function getMissions(){const today=localDateKey();const defs=[
 {id:'practice',icon:'◎',title:'Warm up your mind',desc:'Complete an assessment with at least 5 questions.',reward:15,done:state.attempts.some(a=>a.date===today&&a.total>=5)},
 {id:'daily',icon:'☀',title:'Daily discovery',desc:'Answer today’s Daily Challenge.',reward:10,done:state.dailyDone.includes(today)},
 {id:'arcade',icon:'🎮',title:'Take a play break',desc:'Finish one Brain Arcade game.',reward:10,done:(state.arcadeHistory||[]).some(a=>a.date===today)},
 {id:'learn',icon:'📚',title:'Learn one thing',desc:'Complete or revisit an Academy lesson today.',reward:15,done:(state.lessonLog||[]).some(a=>a.date===today)}
 ];return defs.map(m=>({...m,claimed:(state.missionClaims||[]).includes(`${today}:${m.id}`)}));}
function renderMissions(){const missions=getMissions();const complete=missions.filter(m=>m.done).length;const claimed=missions.filter(m=>m.claimed).length;return `${pageHead('SMALL WINS ADD UP','Daily missions','Four simple goals give today’s practice a purpose. Finish a mission, claim its XP, and come back tomorrow for a fresh set.')}<div class="mission-banner"><div><div class="eyebrow">TODAY’S PROGRESS</div><b>${complete} of 4 missions complete · ${claimed} rewards claimed</b><div class="rank-meta">Up to 50 bonus XP available each day.</div></div><span class="pill ${complete===4?'green':'orange'}">${complete===4?'ALL OBJECTIVES COMPLETE':'DAILY QUEST'}</span></div><div class="mission-grid">${missions.map(m=>`<article class="mission-card ${m.done?'done':''}"><div class="category-head"><span class="mission-icon">${m.icon}</span><span class="pill ${m.claimed?'green':m.done?'green':'orange'}">${m.claimed?'CLAIMED':m.done?'COMPLETE':'IN PROGRESS'}</span></div><h3>${m.title}</h3><p>${m.desc}</p><div class="mission-footer"><b>⚡ ${m.reward} XP</b>${m.claimed?'<button class="btn secondary" disabled>Claimed ✓</button>':m.done?`<button class="btn" data-claim-mission="${m.id}">Claim reward</button>`:`<button class="btn secondary" data-go="${m.id==='practice'?'tests':m.id==='daily'?'daily':m.id==='arcade'?'arcade':'academy'}">Start →</button>`}</div></article>`).join('')}</div><p class="muted small" style="margin-top:18px">Missions reset by your device’s local calendar date. XP rewards are saved on this device.</p>`;}
function journeyStages(){const practiced=new Set((state.attempts||[]).map(a=>a.category).filter(id=>id&&id!=='all'));return [
 {title:'First Spark',icon:'✦',desc:'Complete your first reasoning assessment.',done:state.attempts.length>=1,progress:Math.min(state.attempts.length,1),target:1,go:'tests',cta:'Start an assessment'},
 {title:'Learn the Rule',icon:'📚',desc:'Complete your first Academy lesson.',done:state.lessonDone.length>=1,progress:Math.min(state.lessonDone.length,1),target:1,go:'academy',cta:'Visit the Academy'},
 {title:'Play the Field',icon:'🎮',desc:'Finish a mini-game in Brain Arcade.',done:(state.arcadeHistory||[]).length>=1,progress:Math.min((state.arcadeHistory||[]).length,1),target:1,go:'arcade',cta:'Play a mini-game'},
 {title:'Six Ways to Think',icon:'🧭',desc:'Complete a focused assessment in each reasoning area.',done:CATEGORIES.every(c=>practiced.has(c.id)),progress:CATEGORIES.filter(c=>practiced.has(c.id)).length,target:6,go:'tests',cta:'Explore a skill'},
 {title:'Learn from a Miss',icon:'↻',desc:'Mark at least one missed question as reviewed.',done:(state.reviewedMistakes||[]).length>=1,progress:Math.min((state.reviewedMistakes||[]).length,1),target:1,go:'review',cta:'Review a mistake'}
];}
function renderJourney(){const stages=journeyStages();const done=stages.filter(s=>s.done).length;return `${pageHead('YOUR PERSONAL CAMPAIGN','BrainMetric Journey','A guided path through practice, learning, mini-games, and reflection. Complete a stage to celebrate progress and reveal your next milestone.')}<div class="mission-banner"><div><div class="eyebrow">JOURNEY STATUS</div><b>${done} of ${stages.length} milestones completed</b><div class="rank-progress" style="width:min(380px,78vw)"><span style="width:${done/stages.length*100}%"></span></div></div><span class="pill">${Math.round(done/stages.length*100)}% COMPLETE</span></div><div class="journey-grid">${stages.map((st,i)=>{const unlocked=i===0||stages[i-1].done;return `<article class="journey-card ${st.done?'complete':''} ${unlocked?'':'locked'}"><div class="journey-number">${st.done?'✓':unlocked?String(i+1).padStart(2,'0'):'🔒'}</div><div class="category-head"><span class="mission-icon">${st.icon}</span><span class="pill ${st.done?'green':''}">${st.done?'COMPLETED':unlocked?'MILESTONE':'LOCKED'}</span></div><h3>${st.title}</h3><p>${st.desc}</p><div class="progress" style="margin:15px 0 8px"><span style="width:${st.progress/st.target*100}%"></span></div><div class="rank-meta">${st.progress}/${st.target} objective complete</div><button class="btn ${st.done?'secondary':''}" style="width:100%;margin-top:14px" data-go="${st.go}" ${unlocked?'':'disabled'}>${st.done?'Review milestone':st.cta+' →'}</button></article>`;}).join('')}</div>`;}
function renderMistakeReview(){const list=(state.mistakes||[]).map(id=>findQuestionById(id)).filter(Boolean);const reviewed=state.reviewedMistakes||[];const pending=list.filter(q=>!reviewed.includes(q.id));return `${pageHead('TURN ERRORS INTO INSIGHT','Mistake review','Revisit missed questions, read the explanation, and mark each one reviewed. Your mistake list stays on this device.')}<div class="grid stats">${statCard('Questions to review',pending.length,'Still waiting for your attention','↻')}${statCard('Reviewed',reviewed.filter(id=>state.mistakes.includes(id)).length,'Marked as revisited','✓')}${statCard('Saved for later',state.saved.length,'Bookmarked question bank','🔖')}${statCard('Review XP',Math.min(reviewed.length,20)*2,'Reflection bonus is tracked in your journey','✦')}</div><section class="panel" style="margin-top:18px">${!list.length?empty('No mistakes recorded yet','Complete an assessment and any missed or unanswered items will appear here.','↻','<button class="btn" data-go="tests">Start an assessment</button>'):list.map((q,i)=>{const done=reviewed.includes(q.id);return `<article class="review-card"><div class="question-meta"><span class="pill">${q.topic?(TOPIC_NAMES[q.topic]||q.topic):cat(q.category).short}</span><span class="pill">${q.difficulty}</span><span class="pill ${done?'green':'orange'}">${done?'REVIEWED':'NEEDS REVIEW'}</span></div><h3>${escapeHTML(q.prompt)}</h3><div class="review-answer correct-text"><b>Correct answer:</b> ${escapeHTML(q.options[q.answer])}</div><p class="muted small" style="margin:8px 0 0">${escapeHTML(q.explanation)}</p><div class="review-actions"><button class="btn ${done?'secondary':''}" data-review-question="${q.id}">${done?'Reviewed ✓':'Mark as reviewed'}</button><button class="btn secondary" data-practise-question="${q.id}">Try question again →</button><button class="btn ghost" data-save-question="${q.id}">${state.saved.includes(q.id)?'★ Saved':'☆ Save'}</button></div></article>`;}).join('')}</section>`;}
function pickRandom(list){return list[Math.floor(Math.random()*list.length)];}
function makeMathRounds(){return Array.from({length:5},()=>{const op=pickRandom(['+','−','×']);let a,b,answer;if(op==='+'){a=pickInt(8,89);b=pickInt(4,49);answer=a+b;}else if(op==='−'){a=pickInt(25,99);b=pickInt(4,Math.min(45,a-1));answer=a-b;}else{a=pickInt(3,12);b=pickInt(2,9);answer=a*b;}const opts=new Set([answer]);while(opts.size<4){opts.add(answer+pickRandom([-1,1,-2,2,-3,3,5,-5,10,-10]));}return {prompt:`${a} ${op} ${b} = ?`,answer,options:[...opts].sort(()=>Math.random()-.5)};});}
function pickInt(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
function startArcadeGame(type){if(type==='memory'){const seq=[];while(seq.length<4){const n=pickInt(0,8);if(!seq.includes(n))seq.push(n);}arcadeSession={type,sequence:seq,step:0,phase:'show',startedAt:Date.now(),finished:false,score:0};render();setTimeout(()=>{if(arcadeSession&&arcadeSession.type==='memory'&&!arcadeSession.finished&&arcadeSession.phase==='show'){arcadeSession.phase='recall';render();}},1900);return;}if(type==='focus'){let targetIndex=pickInt(0,24);arcadeSession={type,targetIndex,startedAt:Date.now(),finished:false,score:0};render();return;}if(type==='numbers'){arcadeSession={type,rounds:makeMathRounds(),index:0,locked:false,startedAt:Date.now(),finished:false,score:0};render();return;}if(type==='pattern'){const list=QUESTIONS.filter(q=>q.category==='abstract'||q.category==='logical');arcadeSession={type,question:pickRandom(list),startedAt:Date.now(),finished:false,score:0};render();return;}}
function finishArcade(score,message){if(!arcadeSession||arcadeSession.finished)return;arcadeSession.finished=true;arcadeSession.score=score;arcadeSession.resultText=message;const max=arcadeSession.type==='numbers'?5:1;const xp=score>0?5+score*3:2;arcadeSession.xpEarned=xp;state.xp+=xp;state.arcadeHistory=state.arcadeHistory||[];state.arcadeHistory.unshift({id:`arcade-${Date.now()}`,type:arcadeSession.type,score,max,xp,date:localDateKey(),completedAt:new Date().toISOString()});save();toast(`Arcade game complete · +${xp} XP`);render();}
function renderArcade(){const games=[{id:'memory',icon:'🧠',title:'Memory Flash',desc:'Memorise a glowing sequence of tiles, then repeat it in order.',tag:'MEMORY'},{id:'focus',icon:'👁️',title:'Focus Finder',desc:'Find the one symbol that differs from the rest. One sharp glance can do it.',tag:'FOCUS'},{id:'numbers',icon:'⚡',title:'Number Sprint',desc:'Solve five quick calculations. Every correct answer adds to your score.',tag:'SPEED'},{id:'pattern',icon:'◇',title:'Pattern Rush',desc:'Solve a surprise logic or abstract reasoning question.',tag:'REASONING'}];const history=state.arcadeHistory||[];if(!arcadeSession||arcadeSession.finished){if(arcadeSession?.finished){const a=arcadeSession;return `${pageHead('BRAIN ARCADE','Nice run!','Every round is practice. Play again to build a personal high score.')}<section class="panel arcade-play arcade-result"><div class="mission-icon" style="margin:0 auto">${a.score>0?'🏆':'🧩'}</div><div class="arcade-result-score">${a.score}${a.type==='numbers'?'/5':'/1'}</div><h2>${escapeHTML(a.resultText||'Game complete')}</h2><p class="muted">You earned <b style="color:var(--accent2)">${a.xpEarned} XP</b>. Your personal best is saved on this device.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:20px"><button class="btn" data-arcade-again="${a.type}">Play again ↻</button><button class="btn secondary" data-arcade-reset>All games</button><button class="btn ghost" data-go="missions">Daily missions →</button></div></section>`;}return `${pageHead('PLAY TO SHARPEN YOUR MIND','Brain Arcade','Quick mini-games for memory, focus, speed, and reasoning. No account, no pressure—just play.')}<div class="grid stats">${statCard('Games played',history.length,'All mini-game sessions','🎮')}${statCard('Arcade XP',history.reduce((n,x)=>n+x.xp,0),'Earned in the arcade','⚡')}${statCard('Number Sprint best',Math.max(0,...history.filter(x=>x.type==='numbers').map(x=>x.score)), 'Correct out of five','⌁')}${statCard('Current rank',playerRank().title,`Level ${playerRank().level}`,'✦')}</div><div class="arcade-card-grid">${games.map(g=>`<article class="arcade-card"><div class="arcade-art">${g.icon}</div><div class="category-head"><span class="pill">${g.tag}</span><span class="muted small">${history.filter(x=>x.type===g.id).length} played</span></div><h3>${g.title}</h3><p>${g.desc}</p><button class="btn" data-arcade-start="${g.id}">Play now →</button></article>`).join('')}</div><p class="muted small" style="margin-top:18px">Arcade scores are for fun and personal progress. They are not clinical or standardised cognitive measurements.</p>`;}
 const a=arcadeSession;if(a.type==='memory'){return `${pageHead('BRAIN ARCADE / MEMORY FLASH','Remember the sequence','Watch the glowing tiles, then tap them in the same order.')}<section class="panel arcade-play"><div class="question-meta"><span class="pill">ROUND 1</span><span class="pill ${a.phase==='show'?'orange':'green'}">${a.phase==='show'?'MEMORISE':'YOUR TURN'}</span></div><h2 style="text-align:center">${a.phase==='show'?'Remember these tiles':'Repeat the sequence'}</h2><p class="muted small" style="text-align:center">${a.phase==='show'?'The sequence will hide in a moment.':'Step '+(a.step+1)+' of '+a.sequence.length}</p><div class="arcade-board memory-board">${Array.from({length:9},(_,i)=>{const seqPos=a.sequence.indexOf(i);const lit=a.phase==='show'&&seqPos>=0;return `<button class="arcade-tile ${lit?'lit':''}" data-memory-tile="${i}" ${a.phase==='show'?'disabled':''} aria-label="Tile ${i+1}">${lit?seqPos+1:'·'}</button>`;}).join('')}</div><p class="muted small" style="text-align:center">${a.phase==='show'?'Get ready…':'Tap each tile in the order you saw it.'}</p><div style="text-align:center"><button class="btn ghost" data-arcade-reset>Exit game</button></div></section>`;}
 if(a.type==='focus'){return `${pageHead('BRAIN ARCADE / FOCUS FINDER','Spot the odd one out','One symbol is different. Find it without overthinking.')}<section class="panel arcade-play"><div class="question-meta"><span class="pill">VISUAL FOCUS</span><span class="pill orange">ONE TRY</span></div><h2 style="text-align:center">Find the diamond ◇</h2><p class="muted small" style="text-align:center">Tap the only different symbol in the grid.</p><div class="arcade-board">${Array.from({length:25},(_,i)=>`<button class="arcade-tile" data-focus-tile="${i}" aria-label="Symbol ${i+1}">${i===a.targetIndex?'◇':'○'}</button>`).join('')}</div><div style="text-align:center"><button class="btn ghost" data-arcade-reset>Exit game</button></div></section>`;}
 if(a.type==='numbers'){const q=a.rounds[a.index];return `${pageHead('BRAIN ARCADE / NUMBER SPRINT','Quick calculations','Five rounds. Keep your focus and see how many you can solve.')}<section class="question-card arcade-play"><div class="question-meta"><span class="pill">ROUND ${a.index+1} / 5</span><span class="pill green">SCORE ${a.score}</span></div><div class="question-text" style="text-align:center;margin:25px auto">${q.prompt}</div><div class="option-list">${q.options.map((o,i)=>`<button class="option" data-number-choice="${o}" ${a.locked?'disabled':''}><span class="option-key">${String.fromCharCode(65+i)}</span><span>${o}</span></button>`).join('')}</div>${a.locked?`<div class="notice" style="margin-top:15px"><b>${a.answerCorrect?'Correct!':'Not quite.'}</b> The answer is ${q.answer}.</div><div style="text-align:right;margin-top:15px"><button class="btn" data-arcade-next>${a.index===4?'See result':'Next round →'}</button></div>`:''}<div style="margin-top:18px"><button class="btn ghost" data-arcade-reset>Exit game</button></div></section>`;}
 const q=a.question;return `${pageHead('BRAIN ARCADE / PATTERN RUSH','Solve the challenge','Choose the best answer and read the explanation.')}<section class="question-card arcade-play"><div class="question-meta"><span class="pill">SURPRISE QUESTION</span><span class="pill">${cat(q.category).name}</span><span class="pill">${q.difficulty}</span></div><div class="question-text">${escapeHTML(q.prompt)}</div><div class="option-list">${q.options.map((o,i)=>`<button class="option" data-pattern-choice="${i}"><span class="option-key">${String.fromCharCode(65+i)}</span><span>${escapeHTML(o)}</span></button>`).join('')}</div><div style="margin-top:18px"><button class="btn ghost" data-arcade-reset>Exit game</button></div></section>`;}
function renderCoach(){const attempts=state.attempts;const weakest=CATEGORIES.map(c=>({c,score:attempts.filter(a=>a.category===c.id).reduce((s,a)=>s+a.percentage,0)/(attempts.filter(a=>a.category===c.id).length||1),n:attempts.filter(a=>a.category===c.id).length})).filter(x=>x.n).sort((a,b)=>a.score-b.score)[0];return `${pageHead('YOUR PRACTICE COMPANION','Coach','Ask for a strategy, review a concept, or get a next-step suggestion based on your saved practice data.')}<div class="coach-layout"><section class="panel chat-panel"><div class="panel-head"><div><h2>Practice coach</h2><span class="muted small">Local guidance · no cloud AI connected</span></div><span class="pill green">AVAILABLE</span></div><div class="chat-messages" id="chat-messages">${coachHistory.map(m=>`<div class="chat-bubble ${m.role==='user'?'user':''}">${escapeHTML(m.text)}</div>`).join('')}</div><form id="coach-form" class="chat-input-row"><input id="coach-input" autocomplete="off" placeholder="Ask about a reasoning strategy…" aria-label="Message your practice coach"><button class="btn" type="submit">Send ↗</button></form></section><aside class="panel"><h2>Your next best step</h2>${weakest?`<div class="activity-row"><div class="category-icon ${weakest.c.colour}">${weakest.c.icon}</div><div class="activity-main"><b>${weakest.c.name}</b><small>Lowest average among practised categories</small></div></div><p class="muted small" style="margin-top:14px">Your average in this area is ${Math.round(weakest.score)}%. Review a lesson, then try a short set.</p><button class="btn secondary" data-category-start="${weakest.c.id}" style="width:100%">Practise this area</button>`:`${empty('Build your baseline','Complete a few assessments and I can use those results to help you plan.','✧','<button class="btn secondary" data-go="tests">Start a practice set</button>')}`}<div class="notice" style="margin-top:17px"><b>Helpful prompts</b><p style="margin:7px 0 0">“How do I spot a number pattern?”<br>“Explain logical assumptions.”<br>“What should I practise next?”</p></div></aside></div>`;}
function renderAnalytics(){const attempts=state.attempts;const average=attempts.length?Math.round(attempts.reduce((s,a)=>s+a.percentage,0)/attempts.length):0;const catData=CATEGORIES.map(c=>{const list=attempts.filter(a=>a.category===c.id);return {...c,n:list.length,avg:list.length?Math.round(list.reduce((s,a)=>s+a.percentage,0)/list.length):0};});const recent=attempts.slice(0,7).reverse();return `${pageHead('MEASURE WHAT MATTERS','Your progress, at a glance','Analytics reflect only the practice records saved in this browser. No external or population benchmark is used.')}
 <div class="grid stats">${statCard('Practice sessions',attempts.length,'Completed assessments','◎')}${statCard('Overall average',`${average}%`,'Mean assessment accuracy','◉')}${statCard('Correct answers',attempts.reduce((s,a)=>s+a.correct,0),'Across all completed sessions','✓')}${statCard('Lessons completed',state.lessonDone.length,`of ${lessons.length} available lessons`,'▤')}</div><div class="two-col"><section class="panel"><div class="panel-head"><h2>Recent accuracy</h2><span class="pill">LAST ${recent.length} SESSIONS</span></div>${recent.length?`<div class="analytics-chart">${recent.map((a,i)=>`<div class="chart-col"><b>${a.percentage}%</b><div class="chart-bar" style="height:${Math.max(5,a.percentage)}%" title="${a.percentage}%"></div><small>${i+1}</small></div>`).join('')}</div><p class="muted small" style="margin:12px 0 0">Session order: oldest on the left, newest on the right.</p>`:empty('No trend to show yet','Complete two or more assessments to start seeing your accuracy trend.','▥')}</section><section class="panel"><div class="panel-head"><h2>By reasoning area</h2></div><div class="activity-list">${catData.map(c=>`<div class="activity-row"><div class="activity-main"><b>${c.name}</b><small>${c.n?`${c.n} session${c.n===1?'':'s'}`:'Not practised yet'}</small><div class="progress" style="margin-top:8px"><span style="width:${c.n?c.avg:0}%;background:${c.n?'linear-gradient(90deg,var(--accent),var(--accent2))':'var(--surface3)'}"></span></div></div><div class="activity-score">${c.n?`${c.avg}%`:'—'}</div></div>`).join('')}</div></section></div><div class="notice" style="margin-top:18px"><b>Interpretation:</b> these are descriptive practice statistics, not a validated IQ score, diagnosis, or comparison with a representative population.</div>`;}
function getAchievements(){
 const attempts=state.attempts, total=attempts.reduce((s,x)=>s+x.total,0), correct=attempts.reduce((s,x)=>s+x.correct,0), avg=total?Math.round(correct/total*100):0;
 const perfect=attempts.filter(x=>x.percentage===100).length, best=attempts.reduce((m,x)=>Math.max(m,x.percentage),0);
 const categories=CATEGORIES.filter(c=>attempts.some(x=>x.category===c.id)).length;
 const hardRuns=attempts.filter(x=>x.difficulty==='hard').length;
 const saved=state.saved.length, mistakes=state.mistakes.length, streak=calculateStreak();
 const daily=state.dailyDone.length, lessonsDone=state.lessonDone.length, xp=state.xp;
 const defs=[];
 const add=(id,icon,title,desc,progress,target)=>defs.push({id,icon,title,desc,progress:Math.min(progress,target),target,done:progress>=target});
 [[1,'First Spark','Complete your first assessment.'],[5,'Curious Five','Complete five assessments.'],[10,'Double Digits','Complete ten assessments.'],[25,'Practice Regular','Complete 25 assessments.'],[50,'Half-Century Hero','Complete 50 assessments.'],[100,'Century Club','Complete 100 assessments.']].forEach(([n,t,d])=>add('runs-'+n,'✦',t,d,attempts.length,n));
 [[10,'Warm-Up Wonder'],[25,'Question Collector'],[50,'Half-Century Mind'],[100,'Century Thinker'],[250,'Quarter-Thousand'],[500,'Five Hundred Club'],[750,'Brain Marathon'],[1000,'Thousand-Question Legend'],[2000,'Two-Thousand Titan'],[5000,'Reasoning Machine']].forEach(([n,t])=>add('answered-'+n,'⌁',t,`Answer ${n.toLocaleString()} questions across your assessments.`,total,n));
 [[50,'XP Starter'],[100,'XP Builder'],[250,'XP Explorer'],[500,'XP Champion'],[1000,'XP Legend'],[2500,'XP Mythic'],[5000,'XP Grandmaster']].forEach(([n,t])=>add('xp-'+n,'⚡',t,`Earn ${n.toLocaleString()} experience points.`,xp,n));
 [[60,'Steady Progress'],[70,'Accuracy Climber'],[80,'Sharp Focus'],[90,'Precision Pro'],[100,'Perfect Mindset']].forEach(([n,t])=>add('accuracy-'+n,'🎯',t,`Reach ${n}% overall accuracy across completed questions.`,avg,n));
 [[1,'Perfect Start'],[3,'Flawless Trio'],[5,'Perfectionist'],[10,'Unblemished Ten']].forEach(([n,t])=>add('perfect-'+n,'💎',t,`Finish ${n} assessment${n===1?'':'s'} with 100% accuracy.`,perfect,n));
 [[1,'Skill Tourist'],[3,'Three-Lane Thinker'],[6,'Master of Six']].forEach(([n,t])=>add('categories-'+n,'🧭',t,`Practise in ${n} different reasoning categor${n===1?'y':'ies'}.`,categories,n));
 [[1,'Hard Mode Hello'],[5,'Hard Knocks'],[10,'Challenge Chaser'],[25,'Boss-Level Brain']].forEach(([n,t])=>add('hard-'+n,'🔥',t,`Complete ${n} assessments focused on hard questions.`,hardRuns,n));
 [[1,'Daily Discovery'],[3,'Three-Day Rhythm'],[7,'Weekly Warrior'],[14,'Fortnight Force'],[30,'Daily Dynamo']].forEach(([n,t])=>add('daily-'+n,'☀',t,`Complete ${n} daily challenges.`,daily,n));
 [[1,'First Lesson'],[3,'Lesson Learner'],[6,'Academy Graduate']].forEach(([n,t])=>add('lesson-'+n,'📚',t,`Complete ${n} Academy lesson${n===1?'':'s'}.`,lessonsDone,n));
 [[1,'Bookmark Beginner'],[5,'Curator'],[10,'Question Librarian'],[25,'Personal Question Vault']].forEach(([n,t])=>add('saved-'+n,'🔖',t,`Save ${n} questions for later review.`,saved,n));
 [[1,'Keep Trying'],[5,'Mistake Detective'],[10,'Learning From Errors']].forEach(([n,t])=>add('mistakes-'+n,'🕵️',t,`Record ${n} questions for mistake review and learning.`,mistakes,n));
 [[2,'Back for More'],[3,'Streak Starter'],[7,'Week of Wonder'],[14,'Two-Week Torch'],[30,'Unstoppable Habit']].forEach(([n,t])=>add('streak-'+n,'🔥',t,`Maintain a ${n}-day practice streak.`,streak,n));
 [[1,'Progress Scout'],[5,'Insight Seeker'],[15,'Analytics Adventurer']].forEach(([n,t])=>add('sessions-'+n,'📈',t,`Complete ${n} sessions and build your progress history.`,attempts.length,n));
 add('best-80','🏅','Personal Best','Reach at least 80% in one assessment.',best>=80?1:0,1);
 add('best-100','👑','Perfect Run','Reach 100% in one assessment.',best===100?1:0,1);
 return defs.map(x=>({...x,progress:Number(x.progress)||0}));
}
function renderAchievements(){const list=getAchievements();const earned=list.filter(x=>x.done).length;return `${pageHead('CELEBRATE YOUR PROGRESS','Achievements','Recognise consistency, curiosity, and learning milestones — not just high scores.')}<div class="grid stats">${statCard('Unlocked',earned,`of ${list.length} achievements`,'♜')}${statCard('Experience points',state.xp,'Earned from completed activities','✦')}${statCard('Lessons finished',state.lessonDone.length,`of ${lessons.length} lessons`,'▤')}${statCard('Daily challenges',state.dailyDone.length,'Challenges completed','☀')}</div><div class="grid achievement-grid">${list.map(a=>`<article class="achievement-card" style="opacity:${a.done?1:.76}"><div class="category-head"><span class="category-icon ${a.done?'green':''}">${a.icon}</span><span class="pill ${a.done?'green':''}">${a.done?'UNLOCKED':'IN PROGRESS'}</span></div><h3>${a.title}</h3><p>${a.desc}</p><div class="progress" style="margin:17px 0 8px"><span style="width:${a.progress/a.target*100}%"></span></div><div class="muted small">${a.progress} / ${a.target}</div></article>`).join('')}</div>`;}
function renderSettings(){return `${pageHead('MAKE IT YOURS','Settings & data','Personalise your experience and manage progress on this device.')}<div class="two-col"><section class="panel"><h2>Appearance & accessibility</h2><div class="setting-row"><div><b>Light theme</b><small>Switch between light and dark appearance.</small></div><button class="switch" role="switch" aria-checked="${state.theme==='light'}" data-setting="theme" aria-label="Light theme"><span></span></button></div><div class="setting-row"><div><b>Reduce motion</b><small>Reduce animated transitions and movement.</small></div><button class="switch" role="switch" aria-checked="${state.reduceMotion}" data-setting="motion" aria-label="Reduce motion"><span></span></button></div><div class="setting-row"><div><b>Sound effects</b><small>Reserved setting for future game sound effects.</small></div><button class="switch" role="switch" aria-checked="${state.settings.sound}" data-setting="sound" aria-label="Sound preference"><span></span></button></div><div class="setting-row"><div><b>Practice reminders</b><small>Saves your preference; this build does not schedule notifications.</small></div><button class="switch" role="switch" aria-checked="${state.settings.reminders}" data-setting="reminders" aria-label="Practice reminders"><span></span></button></div></section><section class="panel"><h2>Data & privacy</h2><p class="muted small">Your progress is saved locally in this browser on this device. It does not automatically sync to other devices. Export a backup if you want to move your progress.</p><div class="setting-row"><div><b>Export my data</b><small>Download a JSON backup of your saved progress.</small></div><button class="btn secondary" data-export>Export JSON ↓</button></div><div class="setting-row"><div><b>Saved questions</b><small>${state.saved.length} questions saved for review.</small></div><button class="btn secondary" data-go="tests">Find questions</button></div><div class="setting-row"><div><b>Reset my scores & statistics</b><small>Clear quiz scores, assessment history, arcade records, XP, streaks, and mistake history. Keep your theme, completed lessons, and saved questions.</small></div><button class="btn danger" data-reset-scores>Reset scores</button></div><div class="setting-row"><div><b>Erase all progress</b><small>Reset all progress, saved questions, completed lessons, XP, and preferences on this device.</small></div><button class="btn danger" data-reset>Erase everything</button></div></section></div><div class="notice" style="margin-top:18px"><b>Privacy note:</b> do not store sensitive information here. Clearing browser site data can also erase progress. Export a backup first if you want to keep it.</div><section class="panel" style="margin-top:18px"><h2>About this build</h2><div class="setting-row"><div><b>BrainMetric PWA edition</b><small>Reasoning practice, mini-games, daily missions, and learning · six categories</small></div><span class="pill green">PWA EDITION</span></div><div class="setting-row"><div><b>Question bank quality</b><small>Sample items have structural checks but have not undergone independent psychometric validation.</small></div><span class="pill orange">NOT AN IQ TEST</span></div></section>`;}
function renderAssessment(){if(!session)return renderTests();const q=session.questions[session.index];const chosen=session.answers[q.id];const elapsed=Math.floor((Date.now()-session.startedAt)/1000);return `<div class="assessment-shell"><div class="assessment-top"><button class="btn ghost" data-abort>← Exit</button><div class="assessment-progress"><span class="muted small">Question ${session.index+1} of ${session.questions.length}</span><div class="progress"><span style="width:${(session.index+1)/session.questions.length*100}%"></span></div></div><span class="pill">${session.limit?formatDuration(Math.max(0,session.limit-elapsed)):'UNTIMED'}</span></div><article class="question-card"><div class="question-meta"><span class="pill">${q.topic?(TOPIC_NAMES[q.topic]||q.topic):cat(q.category).name}</span><span class="pill">${q.difficulty}</span><span class="pill">${session.answers[q.id]!==undefined?'ANSWERED':'NOT ANSWERED'}</span></div><div class="question-text">${escapeHTML(q.prompt)}</div><div class="option-list">${q.options.map((o,i)=>`<button class="option ${chosen===i?'selected':''}" data-answer="${i}"><span class="option-key">${String.fromCharCode(65+i)}</span><span>${escapeHTML(o)}</span></button>`).join('')}</div><div class="question-actions"><button class="btn secondary" data-prev ${session.index===0?'disabled':''}>← Previous</button><div class="question-actions-right"><button class="btn secondary" data-next>${session.index===session.questions.length-1?'Review answers':'Next question →'}</button>${session.index===session.questions.length-1?'<button class="btn" data-submit>Submit test ✓</button>':''}</div></div></article><div class="question-nav">${session.questions.map((x,i)=>`<button class="q-dot ${i===session.index?'current':''} ${session.answers[x.id]!==undefined?'answered':''}" data-jump="${i}" aria-label="Go to question ${i+1}">${i+1}</button>`).join('')}</div><p class="muted small" style="margin-top:12px">Your answers are held for this session until you submit. Use the numbered buttons to review a question.</p></div>`;}
function shareQuiz(id){
 if(location.protocol==='file:'){toast('Publish BrainMetric to an HTTPS website before sharing working challenge links.');return;}
 const meta=QUIZ_COLLECTIONS.find(q=>q.id===id);if(!meta)return;
 const url=challengeURL(id,id==='weekly'?currentWeekKey():id==='daily-five'?localDateKey():null);const text=`Try the BrainMetric ${meta.title}: ${url}`;
 if(navigator.share){navigator.share({title:`BrainMetric · ${meta.title}`,text:`Can you beat this challenge?`,url}).catch(()=>{});return;}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(()=>toast('Challenge link copied. Share it with a friend!')).catch(()=>window.prompt('Copy this challenge link:',url));return;}
 window.prompt('Copy this challenge link:',url);
}
function shareResult(){
 if(!session?.result){toast('Complete a quiz before sharing a result.');return;}
 if(location.protocol==='file:'){toast('Publish BrainMetric to HTTPS to share a working challenge link.');return;}
 const r=session.result,id=session.shareId,url=challengeURL(id||'ultimate',session.challengeWeek||null);const text=id?`I scored ${r.percentage}% (${r.correct}/${r.total}) on BrainMetric: ${session.title}. Try the same challenge: ${url}`:`I scored ${r.percentage}% (${r.correct}/${r.total}) on BrainMetric: ${session.title}. Try the Ultimate Knowledge Test: ${url}`;
 if(navigator.share){navigator.share({title:'My BrainMetric result',text,url}).catch(()=>{});return;}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(()=>toast('Result and challenge link copied.')).catch(()=>window.prompt('Copy your result:',text));return;}
 window.prompt('Copy your result:',text);
}
function downloadResultCard(){
 if(!session?.result){toast('Complete a quiz before downloading a result card.');return;}
 const r=session.result,canvas=document.createElement('canvas');canvas.width=1200;canvas.height=630;const c=canvas.getContext('2d');if(!c){toast('Your browser could not create the result card.');return;}
 const grad=c.createLinearGradient(0,0,1200,630);grad.addColorStop(0,'#10152a');grad.addColorStop(.6,'#20284b');grad.addColorStop(1,'#342b70');c.fillStyle=grad;c.fillRect(0,0,1200,630);
 c.strokeStyle='rgba(170,160,255,.18)';c.lineWidth=2;for(let i=0;i<9;i++){c.beginPath();c.arc(1000,110,50+i*28,0,Math.PI*2);c.stroke();}
 c.fillStyle='#61dfcf';c.font='700 25px system-ui';c.fillText('BRAINMETRIC · KNOWLEDGE CHALLENGE',72,78);
 c.fillStyle='#ffffff';c.font='800 48px system-ui';let title=String(session.title||'Quiz result');if(title.length>33)title=title.slice(0,30)+'…';c.fillText(title,72,155);
 c.fillStyle='#9ea9d2';c.font='500 23px system-ui';c.fillText('YOUR PRACTICE RESULT',72,210);
 c.fillStyle='#ffffff';c.font='800 118px system-ui';c.fillText(`${r.percentage}%`,72,355);
 c.fillStyle='#cdd4f5';c.font='600 28px system-ui';c.fillText(`${r.correct} correct out of ${r.total} questions`,76,413);
 c.fillStyle='#61dfcf';c.font='700 24px system-ui';c.fillText('Challenge yourself. Learn something new.',72,515);
 c.fillStyle='#b8c0e3';c.font='500 19px system-ui';c.fillText('Results show this practice set only — not an IQ measurement.',72,560);
 c.fillStyle='#ffffff';c.font='800 30px system-ui';c.fillText('Bm',1050,550);
 canvas.toBlob(blob=>{if(!blob){toast('Could not export the result card.');return;}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`brainmetric-result-${localDateKey()}.png`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Result card downloaded.');},'image/png');
}

function renderResults(){if(!session?.result)return renderHome();const r=session.result;return `${pageHead('SESSION COMPLETE','You showed up. That counts.','Review your answers, understand the reasoning, and choose what to practise next.')}<div class="assessment-shell"><section class="result-hero"><div class="score-ring" style="--score:${r.percentage}%"><div class="score-ring-inner"><strong>${r.percentage}%</strong><small>accuracy</small></div></div><div><span class="pill green">ASSESSMENT SAVED</span><h2 style="margin-top:10px">${r.percentage>=80?'Excellent focus':r.percentage>=60?'Good progress':'A useful learning session'}</h2><p class="muted">You answered ${r.correct} of ${r.total} questions correctly. Review each explanation to reinforce the concept.</p><div class="result-metrics"><div class="result-metric"><b>${r.correct}</b><small>Correct</small></div><div class="result-metric"><b>${r.incorrect}</b><small>Incorrect</small></div><div class="result-metric"><b>${r.unanswered}</b><small>Unanswered</small></div></div></div></section><section class="panel"><div class="panel-head"><h2>Answer review</h2><span class="pill">${r.total} QUESTIONS</span></div>${session.questions.map((q,i)=>{const a=session.answers[q.id];const correct=a!==undefined&&Number(a)===q.answer;return `<div class="review-item"><div class="question-meta"><span class="pill">Question ${i+1}</span><span class="pill ${correct?'green':a===undefined?'':'orange'}">${correct?'CORRECT':a===undefined?'UNANSWERED':'REVIEW'}</span><button class="text-link" data-save-question="${q.id}">${state.saved.includes(q.id)?'★ Saved':'☆ Save question'}</button></div><h3>${escapeHTML(q.prompt)}</h3><div class="review-answer ${correct?'correct-text':'wrong-text'}">Your answer: ${a===undefined?'Not answered':escapeHTML(q.options[Number(a)])}</div><div class="review-answer correct-text">Correct answer: ${escapeHTML(q.options[q.answer])}</div><p class="muted small" style="margin:8px 0 0">${escapeHTML(q.explanation)}</p></div>`;}).join('')}<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:20px"><button class="btn" data-go="discover">Explore more quizzes</button><button class="btn secondary" data-share-result>Share result ↗</button><button class="btn secondary" data-download-result>Download result card ↓</button><button class="btn secondary" data-share-quiz="${session.shareId||'ultimate'}">Invite a friend to play ↗</button><button class="btn ghost" data-go="analytics">View analytics</button><button class="btn ghost" data-go="coach">Ask the coach</button></div></section></div>`;}
function render(){ const content=$('#content'); content.classList.remove('fade-in'); void content.offsetWidth; content.classList.add('fade-in'); const views={home:renderHome,discover:renderDiscover,bank:renderBank,tests:renderTests,daily:renderDaily,academy:renderAcademy,puzzles:renderPuzzles,arcade:renderArcade,missions:renderMissions,journey:renderJourney,review:renderMistakeReview,coach:renderCoach,analytics:renderAnalytics,achievements:renderAchievements,settings:renderSettings,assessment:renderAssessment,results:renderResults,lesson:renderLesson}; content.innerHTML=(views[currentPage]||renderHome)(); if(currentPage==='bank')renderBankResults(); const themeButton=$('#theme-toggle'); if(themeButton){themeButton.textContent=state.theme==='light'?'☾':'☼';themeButton.setAttribute('aria-label',state.theme==='light'?'Switch to dark mode':'Switch to light mode');themeButton.title=state.theme==='light'?'Switch to dark mode':'Switch to light mode';} const themeMeta=$('meta[name="theme-color"]'); if(themeMeta)themeMeta.content=state.theme==='light'?'#F4F6FB':'#070B14'; updateStreak(); }

function startAssessment({category='all',difficulty='all',count=10,limit=0,questions=null,title='Reasoning assessment',shareId=null,challengeWeek=null}={}){
 try{
  const selected=questions||buildAssessment(QUESTIONS,{category,difficulty},Number(count));
  session={questions:selected,answers:{},index:0,startedAt:Date.now(),limit:Number(limit)||0,title,category,difficulty,shareId,challengeWeek,result:null};
  go('assessment');
 }catch(err){toast(err.message);}
}
function finishAssessment(){
 if(!session||session.result)return;
 const result=scoreAssessment(session.questions,session.answers);
 result.duration=Math.floor((Date.now()-session.startedAt)/1000);
 session.result=result;
 const categories=[...new Set(session.questions.map(q=>q.category))];
 const record={id:`run-${Date.now()}`,title:session.title,quizId:session.shareId||null,challengeWeek:session.challengeWeek||null,category:categories.length===1?categories[0]:'all',difficulty:session.difficulty||'all',...result,date:localDateKey(),completedAt:new Date().toISOString()};
 state.attempts.unshift(record); state.xp+=10+result.correct*2; state.mistakes=[...new Set([...state.mistakes,...session.questions.filter(q=>session.answers[q.id]===undefined||Number(session.answers[q.id])!==q.answer).map(q=>q.id)])]; save(); go('results');
}
function updateCountHint(){const category=$('#category-select')?.value||'all';const difficulty=$('#difficulty-select')?.value||'all';const count=eligibleQuestions(QUESTIONS,{category,difficulty}).length;const hint=$('#available-count');if(hint)hint.textContent=`${count} matching sample question${count===1?'':'s'} available.`;const select=$('#count-select');if(select){[...select.options].forEach(o=>o.disabled=Number(o.value)>count);if(Number(select.value)>count){const eligible=[...select.options].filter(o=>!o.disabled);if(eligible.length)select.value=eligible[eligible.length-1].value;}}}
function coachReply(text){const t=text.toLowerCase();const attempts=state.attempts;const wrong=state.mistakes.map(id=>findQuestionById(id)).filter(Boolean);const weak=CATEGORIES.map(c=>({c,items:attempts.filter(a=>a.category===c.id)})).filter(x=>x.items.length).map(x=>({...x,avg:x.items.reduce((s,a)=>s+a.percentage,0)/x.items.length})).sort((a,b)=>a.avg-b.avg)[0];
 if(/number|sequence|pattern/.test(t))return 'For number patterns, start with the differences between neighbouring terms. If those differences change, look for a pattern in the differences themselves. Also test multiplication, alternating rules, and simple combinations. Always verify your rule against every term.';
 if(/logic|assumption|conclusion|syllog/.test(t))return 'For logical reasoning, separate the premises from your assumptions. Ask: “Could the statements be true while this conclusion is false?” Words like all, some, none, must, and might matter. An overlap between two groups does not prove one group belongs to the other.';
 if(/verbal|analogy|word|meaning/.test(t))return 'For verbal reasoning, state the relationship in your own words before choosing. Distinguish a fact from an opinion, and notice qualifiers such as some, always, likely, and only. Avoid adding information that the prompt never gave you.';
 if(/spatial|rotate|fold|direction|cube/.test(t))return 'For spatial questions, track one change at a time: direction, rotation, number of sides, position, or layers. For movement, keep a simple direction map. For folds, count the layers at the exact point where a hole or cut passes through.';
 if(/abstract|symbol|shape/.test(t))return 'For abstract patterns, compare shape, count, orientation, shading, and position independently. Write down what changes each step, then check the rule against all the symbols. Prefer the simplest rule that consistently fits.';
 if(/next|practice|improve|recommend|weak/.test(t)){if(weak)return `Based on your saved sessions, ${weak.c.name.toLowerCase()} is currently your lowest practised average (${Math.round(weak.avg)}%). Try a short set in that area, then review each explanation. This is only a guide from your local sample data, not a fixed measure of ability.`;return 'Start with a mixed 5-question assessment to build a baseline. After you have a few sessions, look at the category averages and choose one area to practise next. Review explanations, not just the score.';}
 if(/mistake|wrong|incorrect|review/.test(t))return wrong.length?`You have ${wrong.length} question${wrong.length===1?'':'s'} saved in your mistake review list. Revisit the explanation, describe the rule in your own words, then try a similar question. You can review missed items after an assessment in the results screen.`:'I don’t see any missed questions recorded yet. Complete an assessment and the app will keep a local review list of missed or unanswered items.';
 if(/iq|intelligence|score/.test(t))return 'BrainMetric reports your performance on these practice questions. It does not produce a scientifically validated IQ score or measure your whole intelligence. Treat scores as a snapshot of this practice set and use explanations to guide learning.';
 return `A useful way to approach a difficult reasoning question is to (1) identify exactly what is given, (2) write down the rule or constraint, (3) test each option against it, and (4) explain why the best option fits. ${attempts.length?'You have '+attempts.length+' saved assessment session(s) to reflect on.':'Start with a short assessment to build a personal baseline.'} Try asking me about logic, number patterns, verbal reasoning, abstract patterns, spatial thinking, or what to practise next.`;
}
function sendCoach(text){const value=text.trim();if(!value)return;coachHistory.push({role:'user',text:value});coachHistory.push({role:'coach',text:coachReply(value)});if(coachHistory.length>24)coachHistory=coachHistory.slice(-24);render();const box=$('#chat-messages');if(box)box.scrollTop=box.scrollHeight;}
function exportData(){const payload={product:'BrainMetric',exportedAt:new Date().toISOString(),notice:'Local practice data export. Results are not a validated IQ score.',state,questionBank:QUESTIONS.length+KNOWLEDGE_QUESTIONS.length};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`brainmetric-backup-${localDateKey()}.json`;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);toast('Your data export has been prepared.');}
function toggleSetting(name){if(name==='theme'){state.theme=state.theme==='dark'?'light':'dark';document.body.classList.toggle('light',state.theme==='light');}else if(name==='motion'){state.reduceMotion=!state.reduceMotion;document.body.classList.toggle('reduce-motion',state.reduceMotion);}else if(name==='sound'){state.settings.sound=!state.settings.sound;}else if(name==='reminders'){state.settings.reminders=!state.settings.reminders;}save();render();}

$('#sidebar').addEventListener('click',e=>{const brand=e.target.closest('.brand');if(brand){e.preventDefault();go('home');return;}const btn=e.target.closest('[data-page]');if(btn)go(btn.dataset.page);});
$('#content').addEventListener('click',e=>{
 const el=e.target.closest('button');if(!el)return;
 if(el.dataset.go){go(el.dataset.go);return;}
 if(el.hasAttribute('data-bank-practice')){const matches=filteredBankResults();if(!matches.length){toast('No questions match these filters.');return;}const chosen=stableShuffle(matches,`bank-practice-${localDateKey()}-${bankPage}-${matches.length}`).slice(0,Math.min(20,matches.length));startAssessment({questions:chosen,category:'all',difficulty:$('#bank-difficulty')?.value||'all',count:chosen.length,title:'Question Bank Practice'});return;}
 if(el.hasAttribute('data-bank-prev')){bankPage=Math.max(0,bankPage-1);renderBankResults();return;}
 if(el.hasAttribute('data-bank-next')){bankPage++;renderBankResults();return;}
 if(el.hasAttribute('data-bank-try')){const id=el.dataset.bankTry;const q=findQuestionById(id);if(q)startAssessment({questions:[q],category:q.category,difficulty:q.difficulty,count:1,title:'Question Bank Review'});else toast('Could not find that question.');return;}
 if(el.dataset.startQuiz){startCuratedQuiz(el.dataset.startQuiz,el.dataset.period||el.dataset.week||null);return;}
 if(el.dataset.shareQuiz){shareQuiz(el.dataset.shareQuiz);return;}
 if(el.hasAttribute('data-share-result')){shareResult();return;}
 if(el.hasAttribute('data-download-result')){downloadResultCard();return;}
 if(el.dataset.claimMission){const m=getMissions().find(x=>x.id===el.dataset.claimMission);if(!m||!m.done||m.claimed){toast('Finish the mission before claiming its reward.');return;}state.missionClaims=state.missionClaims||[];state.missionClaims.push(`${localDateKey()}:${m.id}`);state.xp+=m.reward;save();render();toast(`Mission reward claimed · +${m.reward} XP`);return;}
 if(el.dataset.arcadeStart){startArcadeGame(el.dataset.arcadeStart);return;}
 if(el.dataset.arcadeAgain){startArcadeGame(el.dataset.arcadeAgain);return;}
 if(el.hasAttribute('data-arcade-reset')){arcadeSession=null;render();return;}
 if(el.hasAttribute('data-memory-tile')){if(!arcadeSession||arcadeSession.type!=='memory'||arcadeSession.phase!=='recall'||arcadeSession.finished)return;const chosen=Number(el.dataset.memoryTile);if(chosen!==arcadeSession.sequence[arcadeSession.step]){finishArcade(0,'Not quite—the sequence was broken. Try again and watch the order.');return;}arcadeSession.step++;if(arcadeSession.step>=arcadeSession.sequence.length){finishArcade(1,'Perfect recall! You repeated the full sequence.');return;}render();return;}
 if(el.hasAttribute('data-focus-tile')){if(!arcadeSession||arcadeSession.type!=='focus'||arcadeSession.finished)return;const good=Number(el.dataset.focusTile)===arcadeSession.targetIndex;finishArcade(good?1:0,good?'Sharp eyes—you found the odd symbol!':'Good try. Look for the diamond among the circles next time.');return;}
 if(el.hasAttribute('data-number-choice')){if(!arcadeSession||arcadeSession.type!=='numbers'||arcadeSession.locked)return;const q=arcadeSession.rounds[arcadeSession.index];arcadeSession.answerCorrect=Number(el.dataset.numberChoice)===q.answer;arcadeSession.locked=true;if(arcadeSession.answerCorrect)arcadeSession.score++;render();return;}
 if(el.hasAttribute('data-arcade-next')){if(!arcadeSession||arcadeSession.type!=='numbers'||!arcadeSession.locked)return;if(arcadeSession.index>=arcadeSession.rounds.length-1){finishArcade(arcadeSession.score,`Number Sprint complete: ${arcadeSession.score} of 5 correct.`);return;}arcadeSession.index++;arcadeSession.locked=false;delete arcadeSession.answerCorrect;render();return;}
 if(el.hasAttribute('data-pattern-choice')){if(!arcadeSession||arcadeSession.type!=='pattern'||arcadeSession.finished)return;const q=arcadeSession.question;const good=Number(el.dataset.patternChoice)===q.answer;finishArcade(good?1:0,`${good?'Correct!':'Not quite.'} ${q.explanation}`);return;}
 if(el.hasAttribute('data-review-question')){const id=el.dataset.reviewQuestion;state.reviewedMistakes=state.reviewedMistakes||[];if(!state.reviewedMistakes.includes(id)){state.reviewedMistakes.push(id);save();toast('Question marked as reviewed.');}else toast('Already marked as reviewed.');render();return;}
 if(el.hasAttribute('data-practise-question')){const q=findQuestionById(el.dataset.practiseQuestion);if(q)startAssessment({questions:[q],category:q.category,difficulty:q.difficulty,count:1,title:'Mistake Review'});return;}
 if(el.dataset.categoryStart){go('tests');const select=$('#category-select');if(select){select.value=el.dataset.categoryStart;updateCountHint();}return;}
 if(el.dataset.lesson){activeLesson=el.dataset.lesson;go('lesson');return;}
 if(el.dataset.completeLesson){const id=el.dataset.completeLesson;if(!state.lessonDone.includes(id)){state.lessonDone.push(id);state.xp+=10;toast('Lesson completed · +10 XP');}else toast('Lesson revisited. Daily learning mission noted.');state.lessonLog=state.lessonLog||[];if(!state.lessonLog.some(x=>x.date===localDateKey()&&x.id===id))state.lessonLog.push({id,date:localDateKey()});save();render();return;}
 if(el.hasAttribute('data-setting')){toggleSetting(el.dataset.setting);return;}
 if(el.hasAttribute('data-export')){exportData();return;}
 if(el.hasAttribute('data-reset-scores')){
  if(confirm('Reset your scores and statistics on this browser? This clears assessments, score history, XP, arcade results, daily completion, mission rewards, streaks, and mistake-review history. Your theme, settings, completed lessons, profile, and saved questions will remain. This cannot be undone.')){
   state.attempts=[];
   state.dailyDone=[];
   state.mistakes=[];
   state.reviewedMistakes=[];
   state.arcadeHistory=[];
   state.missionClaims=[];
   state.xp=0;
   session=null;
   arcadeSession=null;
   save();
   go('home');
   toast('Scores and statistics reset. Your question bank is unchanged.');
  }
  return;
 }
 if(el.hasAttribute('data-reset')){if(confirm('Erase all BrainMetric progress stored in this browser, including completed lessons, saved questions, settings, XP and results? This cannot be undone. Export your data first if you want a backup.')){state=defaultState();session=null;arcadeSession=null;save();go('home');toast('All local progress erased.');}return;}
 if(el.hasAttribute('data-answer')){if(session&&!session.result){const q=session.questions[session.index];session.answers[q.id]=Number(el.dataset.answer);render();}return;}
 if(el.hasAttribute('data-prev')){if(session&&session.index>0){session.index--;render();}return;}
 if(el.hasAttribute('data-next')){if(session&&session.index<session.questions.length-1){session.index++;render();}else toast('Review your answers, then submit when ready.');return;}
 if(el.hasAttribute('data-submit')){finishAssessment();return;}
 if(el.hasAttribute('data-abort')){if(confirm('Exit this assessment? Your answers for this unfinished session will be discarded.')){session=null;go('tests');}return;}
 if(el.hasAttribute('data-jump')){if(session){session.index=Number(el.dataset.jump);render();}return;}
 if(el.hasAttribute('data-save-question')){const id=el.dataset.saveQuestion;if(state.saved.includes(id))state.saved=state.saved.filter(x=>x!==id);else state.saved.push(id);save();render();toast(state.saved.includes(id)?'Question saved for later.':'Question removed from saved items.');return;}
 if(el.hasAttribute('data-puzzle')){const q=QUESTIONS.find(x=>x.id===el.dataset.puzzle);if(q)startAssessment({questions:[q],category:q.category,difficulty:q.difficulty,count:1,title:'Puzzle Lab'});return;}
 if(el.hasAttribute('data-daily-answer')){const today=localDateKey();if(state.dailyDone.includes(today)){toast('Today’s Daily Challenge is already complete. Come back tomorrow.');go('daily');return;}const q=dayQuestion();const chosen=Number(el.dataset.dailyAnswer);if(!Number.isInteger(chosen)||chosen<0||chosen>=q.options.length)return;$$('[data-daily-answer]').forEach(b=>{b.disabled=true;const idx=Number(b.dataset.dailyAnswer);if(idx===q.answer)b.classList.add('selected');});const feedback=$('#daily-feedback');if(chosen===q.answer){feedback.innerHTML=`<div class="notice"><b style="color:var(--green)">Correct!</b><p style="margin:6px 0 0;color:var(--text)">${escapeHTML(q.explanation)}</p></div>`;state.xp+=5;toast('+5 XP · Daily challenge complete');}else{feedback.innerHTML=`<div class="notice"><b>Good attempt.</b><p style="margin:6px 0 0;color:var(--text)">Correct answer: ${escapeHTML(q.options[q.answer])}. ${escapeHTML(q.explanation)}</p></div>`;state.mistakes=[...new Set([...state.mistakes,q.id])];}state.dailyDone.push(today);save();return;}
});
$('#content').addEventListener('change',e=>{if(['category-select','difficulty-select'].includes(e.target.id))updateCountHint();if(['bank-topic','bank-difficulty','bank-page-size'].includes(e.target.id)){bankPage=0;renderBankResults();}});
$('#content').addEventListener('input',e=>{
 if(e.target.id==='bank-search'){bankPage=0;renderBankResults();return;}
 if(e.target.id==='quiz-search'){
  const query=e.target.value.trim().toLowerCase();let visible=0;
  $$('[data-quiz-card]').forEach(card=>{const show=card.dataset.search.includes(query);card.style.display=show?'':'none';if(show)visible++;});
  const empty=$('#quiz-filter-empty');if(empty)empty.style.display=visible?'none':'block';
 }
});
$('#content').addEventListener('submit',e=>{
 if(e.target.id==='test-form'){e.preventDefault();const fd=new FormData(e.target);startAssessment({category:fd.get('category'),difficulty:fd.get('difficulty'),count:Number(fd.get('count')),limit:Number(fd.get('timer')),title:'Reasoning assessment'});}
 if(e.target.id==='coach-form'){e.preventDefault();const input=$('#coach-input');const text=input?.value||'';sendCoach(text);}
});
$('#theme-toggle').addEventListener('click',()=>toggleSetting('theme'));
$('#menu-toggle').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
window.addEventListener('keydown',e=>{if(currentPage==='assessment'&&session&&!session.result){if(['1','2','3','4'].includes(e.key)){const q=session.questions[session.index];const idx=Number(e.key)-1;if(idx<q.options.length){session.answers[q.id]=idx;render();}}if(e.key==='ArrowRight'&&session.index<session.questions.length-1){session.index++;render();}if(e.key==='ArrowLeft'&&session.index>0){session.index--;render();}}});

// The countdown updates only the timer text; it does not rebuild the question UI each second.
setInterval(()=>{if(currentPage!=='assessment'||!session||session.result||!session.limit)return;const left=Math.max(0,session.limit-Math.floor((Date.now()-session.startedAt)/1000));const pill=$('.assessment-top .pill');if(pill)pill.textContent=formatDuration(left);if(left<=0)finishAssessment();},1000);

document.body.classList.toggle('light',state.theme==='light');document.body.classList.toggle('reduce-motion',state.reduceMotion);if(sharedChallengeId()){currentPage='discover';$$('.nav-link[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page==='discover'));$('#page-name').textContent=pageNames.discover;}
const bankErrors=[...QUESTIONS,...KNOWLEDGE_QUESTIONS].flatMap(q=>validateQuestion(q).map(error=>`${q.id}: ${error}`));
if(bankErrors.length)console.error('Question bank validation failed:',bankErrors);
if('serviceWorker' in navigator && location.protocol!=='file:') window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('Offline support unavailable',err)));
updateLocalProfile();
render();


function updateLocalProfile(){const name=String(state.profile?.name||'Curious mind').trim()||'Curious mind';const shown=name==='Curious mind'?'Curious mind':name;const a=$('#account-display-name');const av=$('#account-avatar');const top=$('#top-avatar');if(a)a.textContent=shown;if(av)av.textContent=(shown[0]||'B').toUpperCase();if(top)top.textContent=(shown[0]||'B').toUpperCase();}
