// 風格庫：20 個類別，每類 50 組，共 1000 組快速風格。
// 「經典常用」的前 10 組會直接顯示成按鈕，其餘在「風格庫」面板裡。
//
// 每一行是一組風格，用「|」分成五段：
//   名稱 | 曲風 | 情感 | 樂器 | 代碼
// 曲風、情感、樂器用逗號分隔，必須是頁面上有的選項（英文值）。
// 代碼固定 6 個字元，依序是：
//   1 人聲     M 男聲  F 女聲  D 男女對唱  C 合唱團  K 童聲
//   2 歌詞寫法 0 自動  1 直白敘事  2 意象詩意  3 故事性  4 口語化  5 對話式  6 抽象概念
//   3 整體氛圍 0 自動  R 主流商業  I 獨立藝術  E 真摯動人  P 派對嗨歌  C 放鬆療癒  G 史詩磅礴
//   4 節奏     0 自動  1 慢板60-80  2 中慢80-100  3 中板100-120  4 快板120-140  5 極快140-170
//   5 年代     0 自動  a 80年代  b 90年代  c 2000年代  d 現代  e 未來感
//   6 製作質感 0 自動  P 精緻商業  R 原始現場  L 低保真復古  A 不插電原聲  C 乾淨錄音室
const STYLE_DB = (() => {
    const VOICE = { M: 'Male vocal', F: 'Female vocal', D: 'Duet, male and female', C: 'Choir', K: 'Child vocal' };
    const LYRIC = { 0: '', 1: '直白敘事', 2: '意象詩意', 3: '故事性', 4: '口語化', 5: '對話式', 6: '抽象概念' };
    const VIBE = { 0: '', R: 'radio-ready, catchy, mainstream', I: 'indie, artistic, unique', E: 'emotional, heartfelt, sincere', P: 'party, fun, groovy', C: 'chill, relaxed, laid-back', G: 'epic, grand, powerful' };
    const BPM = { 0: '', 1: 'Slow tempo, 60-80 BPM', 2: 'Medium tempo, 80-100 BPM', 3: 'Medium tempo, 100-120 BPM', 4: 'Fast tempo, 120-140 BPM', 5: 'Very fast, 140-170 BPM' };
    const ERA = { 0: '', a: '80s style', b: '90s style', c: '2000s style', d: 'Modern, 2020s', e: 'Futuristic' };
    const PRODUCTION = { 0: '', P: 'Polished, radio-ready', R: 'Raw, live recording', L: 'Lo-fi, vintage', A: 'Acoustic, unplugged', C: 'Clean, studio quality' };

    const RAW = {
        '經典常用': `
抒情情歌|Ballad,Pop|Romantic,Bittersweet,Tender|Piano,String Orchestra,Acoustic Guitar|F2E10P
電子舞曲|EDM,Dance Pop,House|Energetic,Euphoric,Fun|Synthesizer,Drum Machine,808 Bass,Lead Synth|F4P40P
搖滾樂團|Rock,Alternative Rock|Passionate,Powerful,Rousing|Electric Guitar,Bass Guitar,Drums|M1E40R
嘻哈 R&B|Hip Hop,R&B,Trap|Confident,Sultry,Dark|808 Bass,Drum Machine,Synth Pads|M4I20P
民謠原聲|Folk,Indie Rock|Warm,Nostalgic,Rustic|Acoustic Guitar,Harmonica,Violin|M3I20A
中國風|Chinese Traditional,C-Pop|Elegant,Wistful,Ethereal|Guzheng,Erhu,Pipa,Flute|F2E20C
日韓流行|K-Pop,J-Pop,Dance Pop|Energetic,Cheerful,Playful|Synthesizer,Electric Guitar,Drums,Synth Bass|D4R40P
Lo-Fi Chill|Lo-Fi,Jazz,Ambient|Chill,Mellow,Nostalgic|Rhodes,Drums,Bass Guitar,Synth Pads|F2C10L
史詩電影|Orchestral,Cinematic,Classical|Epic,Heroic,Dramatic|String Orchestra,Timpani,Trumpet,Choir|C2G30C
爵士靈魂|Jazz,Soul,R&B|Sultry,Romantic,Groovy|Piano,Saxophone,Upright Bass,Drums|F1I20R
鋼琴慢歌|Ballad,Piano Solo|Sad,Tearful,Intimate|Grand Piano,Cello|F2E10C
木吉他彈唱|Acoustic,Singer-Songwriter|Warm,Intimate,Hopeful|Acoustic Guitar,Harmonica|M1E20A
流行搖滾|Pop Rock|Uplifting,Energetic,Confident|Electric Guitar,Bass Guitar,Drums,Piano|M1R40P
重金屬|Heavy Metal,Metal|Aggressive,Fierce,Dark|Distorted Guitar,Bass Guitar,Drums|M1G50R
龐克快歌|Pop Punk,Punk|Rebellious,Energetic,Fun|Distorted Guitar,Bass Guitar,Drums|M4P50R
老派嘻哈|Boom Bap,Hip Hop|Gritty,Retro,Confident|Sampler,Turntable Scratches,Drums|M4I2bL
陷阱饒舌|Trap,Hip Hop|Dark,Menacing,Bold|808 Bass,Drum Machine,Ad-libs|M4R4dP
絲滑 R&B|R&B,Neo Soul|Sultry,Romantic,Mellow|Rhodes,Bass Guitar,Snaps,Backing Vocals|F4R2dP
放克律動|Funk,Disco|Groovy,Fun,Energetic|Slap Bass,Clavinet,Horn Section,Drums|M4P3aR
迪斯可復古|Disco,Nu Disco|Retro,Groovy,Joyful|String Orchestra,Bass Guitar,Drums,Cowbell|F1P3aP
合成器浪潮|Synthwave,Synth Pop|Retro,Dreamy,Nostalgic|Analog Synth,Drum Machine,Synth Bass,Arpeggio|M2I3aP
浩室夜店|House,Deep House|Hypnotic,Energetic,Urban|Synth Bass,Drum Machine,Synth Pads,Vocal Chops|F6P4dP
夏日熱帶浩室|Tropical House|Carefree,Happy,Airy|Steel Drums,Marimba,Pluck Synth,Synth Bass|F4C3dP
出神電音|Trance,Progressive House|Euphoric,Uplifting,Ethereal|Supersaw,Arpeggio,Synth Pads,Risers|F6P4cP
鼓打貝斯|Drum and Bass|Intense,Energetic,Tense|Reese Bass,Electronic Drums,Synth Pads|F6P5dP
鄉村公路|Country,Americana|Rustic,Carefree,Nostalgic|Acoustic Guitar,Steel Guitar,Fiddle,Banjo|M3E30A
藍調酒吧|Blues,Chicago Blues|Gritty,Melancholic,Passionate|Electric Guitar,Harmonica,Hammond Organ,Drums|M1I20R
巴薩諾瓦午後|Bossa Nova,Lounge|Relaxed,Elegant,Romantic|Nylon Guitar,Shaker,Upright Bass,Flute|F2C20A
搖擺大樂團|Swing,Big Band|Joyful,Retro,Energetic|Brass Section,Upright Bass,Drums,Piano|M1P40R
雷鬼海灘|Reggae|Chill,Carefree,Peaceful|Clean Guitar,Bass Guitar,Organ,Percussion|M4C20R
拉丁熱舞|Latin,Reggaeton|Passionate,Sultry,Energetic|Congas,Trumpet,Nylon Guitar,Synth Bass|D4P3dP
福音合唱|Gospel,Soul|Sacred,Uplifting,Joyful|Gospel Choir,Hammond Organ,Piano,Claps|C1E30R
古典鋼琴詩|Classical,Piano Solo|Elegant,Reflective,Melancholic|Grand Piano,Violin|F2I10C
氛圍冥想|Ambient,Meditation|Meditative,Serene,Floating|Synth Pads,Hang Drum,Chimes,Field Recordings|F6C10C
新世紀療癒|New Age|Soothing,Peaceful,Spiritual|Harp,Flute,Synth Pads,Ocean Waves|F2C10C
獨立流行|Indie Pop,Bedroom Pop|Dreamy,Bittersweet,Quirky|Clean Guitar,Synthesizer,Drum Machine|F4I2dL
夢幻流行|Dream Pop,Shoegaze|Dreamy,Ethereal,Floating|Electric Guitar,Synth Pads,Bass Guitar,Drums|F2I20C
後搖滾長篇|Post-Rock|Epic,Reflective,Hopeful|Electric Guitar,Bass Guitar,Drums,Glockenspiel|M6G20R
油漬搖滾|Grunge,Alternative Rock|Gritty,Angry,Gloomy|Distorted Guitar,Bass Guitar,Drums|M1I3bR
八零流行金曲|Synth Pop,Pop|Retro,Cheerful,Nostalgic|Synthesizer,Electronic Drums,Synth Bass,Saxophone|F1R3aP
勵志加油歌|Pop Rock,Power Pop|Inspiring,Determined,Uplifting|Electric Guitar,Piano,Drums,Crowd Chants|M1E40P
畢業季合唱|Pop,Choral|Sentimental,Hopeful,Bittersweet|Piano,Acoustic Guitar,Children's Choir|C1E20C
婚禮祝福|Pop,Ballad|Romantic,Heartwarming,Joyful|Piano,String Quartet,Acoustic Guitar|D1E20P
兒童歡樂歌|Pop,Teen Pop|Childlike,Cheerful,Playful|Ukulele,Xylophone,Claps,Glockenspiel|K4P30C
搖籃曲|Lullaby|Sleepy,Gentle,Soothing|Music Box,Celesta,Harp|F1C10C
音樂劇獨白|Musical Theatre|Dramatic,Passionate,Hopeful|Piano,String Orchestra,Woodwinds,French Horn|F3G20C
遊戲 8-bit|Chiptune,Video Game Music|Playful,Retro,Energetic|8-bit Synth,Arpeggio,Drum Machine|F4P4aL
預告片配樂|Trailer Music,Cinematic|Epic,Ominous,Intense|Brass Section,Taiko,Choir,Risers|C6G3dP
靈魂老歌|Motown,Soul|Groovy,Sweet,Retro|Tambourine,Horn Section,Bass Guitar,Backing Vocals|F1R30R
凱爾特民謠|Celtic,Folk|Rustic,Wistful,Exotic|Tin Whistle,Fiddle,Harp,Bagpipes|F3I20A`,

        '華語流行': `
芭樂情歌|C-Pop,Ballad|Heartbroken,Sentimental,Romantic|Piano,String Orchestra,Drums|M1E1cP
KTV 必點金曲|C-Pop,Ballad,Pop Rock|Passionate,Heartbroken,Dramatic|Piano,Electric Guitar,String Orchestra,Drums|M1E2cP
九零年代金曲|C-Pop,Ballad|Nostalgic,Romantic,Sentimental|Piano,Saxophone,String Orchestra|F1E2bP
八零民歌餘韻|C-Pop,Folk|Nostalgic,Wistful,Gentle|Acoustic Guitar,Flute,Piano|F2E2aA
校園民歌|Folk,Singer-Songwriter|Innocent,Hopeful,Nostalgic|Acoustic Guitar,Harmonica,Harmonies|D2E2aA
千禧偶像舞曲|C-Pop,Dance Pop|Fun,Energetic,Retro|Synthesizer,Drum Machine,Synth Bass|F4P4cP
華語男團舞曲|C-Pop,Dance Pop,Electropop|Confident,Energetic,Bold|Synth Bass,Electronic Drums,Lead Synth,Ad-libs|M4P4dP
都會 R&B|C-Pop,R&B|Urban,Romantic,Mellow|Rhodes,Synth Bass,Drum Machine,Snaps|M4R2cP
華語慢嘻哈|C-Pop,Hip Hop,Lo-Fi Hip Hop|Chill,Reflective,Nostalgic|Sampler,Rhodes,Vinyl Crackle,Drums|M4I2dL
華語饒舌|Hip Hop,Trap,C-Pop|Aggressive,Defiant,Bold|808 Bass,Drum Machine,Ad-libs|M4R4dP
偶像劇主題曲|C-Pop,Pop|Sweet,Romantic,Hopeful|Acoustic Guitar,Piano,String Orchestra|F1E2cP
古裝劇片尾曲|Guofeng,Ballad|Longing,Melancholic,Elegant|Guzheng,Xiao,String Orchestra,Piano|F2E1dP
武俠劇主題曲|Chinese Traditional,Cinematic|Heroic,Rousing,Epic|Dizi,Chinese Drums,Pipa,String Orchestra|M2G3bP
古風戲腔|Guofeng,Chinese Opera|Ethereal,Elegant,Wistful|Pipa,Dizi,Guzheng,Erhu|F2I2dP
國風電子|Guofeng,EDM|Energetic,Ethereal,Bold|Guzheng,Supersaw,Drum Machine,Dizi|F2P4dP
中國風嘻哈|Chinese Traditional,Hip Hop|Defiant,Dark,Confident|Erhu,Pipa,808 Bass,Drum Machine|M3R3cP
新年賀歲歌|C-Pop,Chinese Traditional|Festive,Joyful,Cheerful|Suona,Chinese Drums,Gong,Yangqin|C1P40P
中秋月圓|C-Pop,Ballad|Homesick,Longing,Peaceful|Guzheng,Piano,Xiao|F2E10C
聖誕華語情歌|C-Pop,Pop|Festive,Romantic,Cozy|Bells,Piano,String Orchestra,Glockenspiel|D1R30P
華語童謠|C-Pop,Lullaby|Childlike,Innocent,Cheerful|Toy Piano,Xylophone,Recorder,Claps|K1P30C
畢業驪歌|C-Pop,Ballad|Sentimental,Bittersweet,Grateful|Piano,Acoustic Guitar,String Quartet|C1E20C
男女對唱情歌|C-Pop,Ballad|Romantic,Bittersweet,Tender|Piano,String Orchestra,Acoustic Guitar|D5E2cP
療傷失戀歌|C-Pop,Ballad|Heartbroken,Vulnerable,Letting Go|Piano,Cello,String Orchestra|F1E10P
苦情搖滾情歌|C-Pop,Pop Rock,Soft Rock|Heartbroken,Passionate,Regretful|Electric Guitar,Piano,Drums,Bass Guitar|M1E2bP
華語樂團搖滾|C-Pop,Rock|Rousing,Passionate,Uplifting|Electric Guitar,Bass Guitar,Drums,Crowd Chants|M1E40R
熱血青春搖滾|Pop Rock,Pop Punk|Energetic,Determined,Optimistic|Distorted Guitar,Bass Guitar,Drums|M4P5cR
小清新民謠|Indie Folk,C-Pop|Airy,Carefree,Sweet|Acoustic Guitar,Ukulele,Glockenspiel,Whistling|F4C20A
獨立女聲|Indie Pop,Singer-Songwriter|Dreamy,Reflective,Vulnerable|Clean Guitar,Synth Pads,Bass Guitar,Brushes|F2I2dC
臥室流行日常|Bedroom Pop,C-Pop|Chill,Cozy,Quirky|Clean Guitar,Drum Machine,Synthesizer,Tape Hiss|F4I2dL
華語 City Pop|City Pop,C-Pop|Retro,Urban,Romantic|Rhodes,Slap Bass,Clean Guitar,Saxophone|F2R3aP
華語合成器流行|Synth Pop,C-Pop|Retro,Dreamy,Wistful|Analog Synth,Drum Machine,Synth Bass|F2R3dP
電音抒情|C-Pop,Future Bass|Bittersweet,Euphoric,Longing|Supersaw,Vocal Chops,Piano,808 Bass|F1R3dP
華語 EDM 派對|EDM,C-Pop,Big Room|Euphoric,Energetic,Wild|Supersaw,Risers,Drum Machine,Sub Bass|M4P4dP
爵士華語小品|C-Pop,Jazz|Elegant,Playful,Flirty|Piano,Upright Bass,Brushes,Muted Trumpet|F4C20C
老上海歌廳|C-Pop,Swing,Jazz|Retro,Sultry,Elegant|Clarinet,Upright Piano,Upright Bass,Muted Trumpet|F2I20L
華語靈魂唱將|C-Pop,Soul,R&B|Passionate,Powerful,Intense|Piano,Hammond Organ,Gospel Choir,Drums|F1E20P
勵志大合唱|C-Pop,Pop|Inspiring,Uplifting,Powerful|Piano,String Orchestra,Choir,Drums|C1E30P
公益主題曲|C-Pop,Ballad,Choral|Heartwarming,Hopeful,Grateful|Piano,Children's Choir,String Orchestra|C1E20P
婚禮進場歌|C-Pop,Pop|Romantic,Joyful,Tender|Piano,String Quartet,Acoustic Guitar,Bells|D1E20P
夏日海邊|C-Pop,Tropical House|Carefree,Happy,Fun|Ukulele,Steel Drums,Pluck Synth,Claps|F4P3dP
深夜電台情歌|C-Pop,Soft Rock|Lonely,Mellow,Intimate|Rhodes,Saxophone,Fretless Bass,Brushes|M1C1bC
鋼琴自彈自唱|C-Pop,Singer-Songwriter|Intimate,Melancholic,Reflective|Upright Piano,Cello|M1E10A
吉他暖男情歌|C-Pop,Acoustic|Warm,Romantic,Gentle|Acoustic Guitar,Cajon,Shaker|M4E20A
選秀飆高音|C-Pop,Ballad,Orchestral|Dramatic,Powerful,Passionate|Grand Piano,String Orchestra,Timpani,Choir|F1G20P
華語另類搖滾|Alternative Rock,C-Pop|Gloomy,Anxious,Dark|Electric Guitar,Bass Guitar,Drums,Synth Pads|M6I30R
華語瞪鞋夢境|Shoegaze,Dream Pop|Dreamy,Floating,Bittersweet|Distorted Guitar,Bass Guitar,Drums,Synth Pads|F6I20L
電影主題曲|C-Pop,Cinematic|Sentimental,Dramatic,Bittersweet|Piano,String Orchestra,French Horn,Cello|F2G20P
宮廷劇插曲|Guofeng,C-Pop|Sorrowful,Elegant,Lonely|Guqin,Xiao,Pipa,String Orchestra|F2E10C
仙俠劇主題曲|Guofeng,Orchestral|Ethereal,Majestic,Romantic|Dizi,Guzheng,String Orchestra,Choir|D2G2dP
懷舊迪斯可舞廳|C-Pop,Disco|Retro,Groovy,Happy|Synthesizer,Bass Guitar,Drums,Brass Section|F1P4aP`,

        '台語・粵語・在地': `
台語苦情歌|Taiwanese Pop,Ballad|Sorrowful,Heartbroken,Tearful|Piano,Saxophone,String Orchestra|F1E1bP
台語男聲浪子歌|Taiwanese Pop,Enka|Regretful,Passionate,Lonely|Saxophone,Electric Guitar,Accordion,Drums|M1E2bP
那卡西走唱|Taiwanese Folk,Enka|Nostalgic,Bittersweet,Retro|Accordion,Nylon Guitar,Drum Machine|M3I2aL
台語老歌謠|Taiwanese Folk|Nostalgic,Wistful,Rustic|Yueqin,Erhu,Accordion|F2E10L
月琴唸歌|Taiwanese Folk,Folk|Rustic,Reflective,Nostalgic|Yueqin,Spoken Word|M3I20A
台語搖滾|Taiwanese Pop,Rock|Passionate,Gritty,Rousing|Electric Guitar,Bass Guitar,Drums|M4E40R
台語龐克|Taiwanese Pop,Punk|Rebellious,Energetic,Wild|Distorted Guitar,Bass Guitar,Drums,Crowd Chants|M4P50R
台語金屬|Metal,Taiwanese Folk|Fierce,Dark,Epic|Distorted Guitar,Erhu,Drums,Bass Guitar|M2G40R
台語獨立民謠|Indie Folk,Taiwanese Pop|Rustic,Warm,Reflective|Acoustic Guitar,Harmonica,Cajon|M3I20A
台語 City Pop|City Pop,Taiwanese Pop|Retro,Urban,Dreamy|Rhodes,Slap Bass,Clean Guitar,Synthesizer|F2R3aP
台語嘻哈|Hip Hop,Taiwanese Pop|Confident,Humorous,Bold|808 Bass,Drum Machine,Sampler,Ad-libs|M4R3dP
台語電音舞曲|Taiwanese Pop,Eurodance|Energetic,Fun,Retro|Synthesizer,Drum Machine,Synth Bass,Lead Synth|F4P4cP
廟會電音|Techno,Taiwanese Folk|Festive,Wild,Hypnotic|Suona,Gong,Drum Machine,Supersaw|M4P5dP
廟會陣頭鑼鼓|Taiwanese Folk,Chinese Traditional|Festive,Rousing,Majestic|Suona,Chinese Drums,Gong,Cymbals|C1G40R
夜市叫賣歌|Taiwanese Pop,Pop|Humorous,Cheerful,Fun|Accordion,Synthesizer,Drum Machine,Claps|M4P30L
台語勵志歌|Taiwanese Pop,Pop Rock|Inspiring,Determined,Hopeful|Electric Guitar,Piano,Drums,Brass Section|M1E3bP
台語男女對唱|Taiwanese Pop,Ballad|Longing,Romantic,Bittersweet|Saxophone,Piano,String Orchestra,Nylon Guitar|D5E2bP
台語爵士小酒館|Taiwanese Pop,Jazz|Mellow,Intimate,Romantic|Piano,Upright Bass,Brushes,Saxophone|F2C20C
台語放克|Funk,Taiwanese Pop|Groovy,Playful,Humorous|Slap Bass,Clavinet,Horn Section,Drums|M4P3dR
台語 R&B|R&B,Taiwanese Pop|Sultry,Tender,Dreamy|Rhodes,Synth Bass,Drum Machine,Backing Vocals|F4R2dP
台語童謠|Taiwanese Folk,Lullaby|Childlike,Innocent,Playful|Recorder,Xylophone,Ukulele|K1C20A
歌仔戲流行|Chinese Opera,Taiwanese Pop|Dramatic,Sorrowful,Passionate|Erhu,Yueqin,Gong,Dizi|F3I20C
布袋戲主題曲|Taiwanese Pop,Cinematic|Heroic,Dramatic,Epic|Suona,Electric Guitar,Chinese Drums,String Orchestra|M3G4bP
台語海港情歌|Taiwanese Pop,Enka|Longing,Lonely,Wistful|Harmonica,Accordion,Nylon Guitar,Ocean Waves|M3E2aL
台語思鄉曲|Taiwanese Pop,Folk|Homesick,Longing,Sad|Acoustic Guitar,Erhu,Piano|M1E10C
台式恰恰舞曲|Taiwanese Pop,Latin|Cheerful,Flirty,Retro|Trumpet,Congas,Accordion,Bass Guitar|D1P3aL
台語後搖滾|Post-Rock,Taiwanese Pop|Reflective,Melancholic,Hopeful|Electric Guitar,Bass Guitar,Drums,Violin|M2I20R
在地獨立樂團|Indie Rock,Taiwanese Pop|Bittersweet,Energetic,Optimistic|Clean Guitar,Bass Guitar,Drums,Trumpet|M4I3dR
八零粵語金曲|Cantopop,Synth Pop|Retro,Romantic,Nostalgic|Synthesizer,Electronic Drums,Saxophone,Synth Bass|M1R3aP
九零粵語情歌|Cantopop,Ballad|Romantic,Longing,Sentimental|Piano,String Orchestra,Nylon Guitar|M1E2bP
千禧粵語 K 歌|Cantopop,Ballad|Heartbroken,Regretful,Bittersweet|Piano,String Orchestra,Drums,Electric Guitar|F1E2cP
粵語勁歌熱舞|Cantopop,Dance Pop|Energetic,Confident,Sexy|Synthesizer,Drum Machine,Brass Section,Synth Bass|M1P4bP
港式武俠主題曲|Cantopop,Chinese Traditional|Heroic,Majestic,Passionate|Dizi,Guzheng,Chinese Drums,String Orchestra|M2G3aP
粵語樂隊搖滾|Cantopop,Rock|Inspiring,Defiant,Passionate|Electric Guitar,Bass Guitar,Drums,Synthesizer|M1E3bR
粵語都會 R&B|Cantopop,R&B|Urban,Chill,Romantic|Rhodes,Synth Bass,Drum Machine,Snaps|F4R2cP
粵語獨立流行|Cantopop,Indie Pop|Wistful,Dreamy,Urban|Clean Guitar,Synth Pads,Drum Machine,Bass Guitar|F2I2dC
粵語 City Pop|Cantopop,City Pop|Retro,Urban,Nostalgic|Rhodes,Slap Bass,Saxophone,Electronic Drums|F2R3aP
粵語嘻哈|Cantopop,Hip Hop|Sarcastic,Playful,Gritty|808 Bass,Drum Machine,Turntable Scratches|M4I3dP
粵劇新唱|Chinese Opera,Cantopop|Elegant,Melancholic,Dramatic|Erhu,Yangqin,Pipa,Gong|F2I20C
粵語賀年歌|Cantopop,Chinese Traditional|Festive,Happy,Humorous|Suona,Gong,Chinese Drums,Yangqin|C1P40P
港式茶餐廳小調|Cantopop,Lounge|Cozy,Quirky,Relaxed|Accordion,Upright Bass,Brushes,Whistling|M4C20L
客家山歌新唱|Taiwanese Folk,Folk|Rustic,Peaceful,Hopeful|Acoustic Guitar,Dizi,Percussion|F2I20A
客家流行抒情|Folk,Ballad|Homesick,Tender,Nostalgic|Acoustic Guitar,Piano,Erhu|F1E20C
客家搖滾|Folk Rock,Taiwanese Folk|Energetic,Rustic,Determined|Electric Guitar,Suona,Drums,Bass Guitar|M4E30R
原住民古調吟唱|Taiwanese Folk,Choral|Sacred,Spiritual,Majestic|Chant,Harmonies,Percussion|C2I10A
原住民流行|Pop,Taiwanese Folk|Joyful,Uplifting,Warm|Acoustic Guitar,Djembe,Harmonies,Chant|F1E30A
原民電子融合|Electropop,Taiwanese Folk|Ethereal,Spiritual,Hypnotic|Chant,Synth Pads,Electronic Drums,Vocal Chops|F2I3dP
部落營火歌|Folk,Acoustic|Warm,Joyful,Carefree|Acoustic Guitar,Harmonies,Claps,Shaker|C4C20A
山海雷鬼|Reggae,Taiwanese Folk|Chill,Carefree,Optimistic|Clean Guitar,Bass Guitar,Congas,Harmonies|M4C20R
台語世界音樂|Taiwanese Folk,Jazz Fusion|Exotic,Dreamy,Passionate|Yueqin,Fretless Bass,Percussion,Saxophone|F2I20C`,

        '日系流行': `
九零 J-Pop 金曲|J-Pop,Pop Rock|Uplifting,Nostalgic,Optimistic|Synthesizer,Electric Guitar,Drums,Bass Guitar|F1R4bP
千禧 J-Pop 歌姬|J-Pop,R&B|Longing,Bittersweet,Elegant|Synthesizer,Drum Machine,Piano,String Orchestra|F1R3cP
令和 J-Pop|J-Pop,Electropop|Energetic,Bittersweet,Urban|Piano,Synth Bass,Electronic Drums,Clean Guitar|F2R4dP
夜系敘事流行|J-Pop,Indie Pop|Dark,Anxious,Dramatic|Piano,Slap Bass,Drum Machine,Lead Synth|F3R5dP
City Pop 夜景|City Pop,Funk|Retro,Urban,Groovy|Rhodes,Slap Bass,Clean Guitar,Horn Section|F2R3aP
City Pop 海岸兜風|City Pop,Soft Rock|Carefree,Retro,Airy|Clean Guitar,Synthesizer,Saxophone,Bass Guitar|M2C3aP
Future Funk 復刻|Future Funk,City Pop|Groovy,Retro,Euphoric|Sampler,Slap Bass,Vocal Chops,Drum Machine|F6P4eL
熱血動漫主題曲|Anime,J-Pop,Pop Rock|Heroic,Rousing,Determined|Electric Guitar,Bass Guitar,Drums,String Orchestra|M1G5dP
少女動漫片頭|Anime,J-Pop|Sweet,Cheerful,Playful|Synthesizer,Glockenspiel,Electric Guitar,Drums|F4P5cP
動漫片尾抒情|Anime,Ballad|Bittersweet,Reflective,Hopeful|Piano,Acoustic Guitar,String Quartet|F2E20P
機甲動漫戰歌|Anime,Symphonic Metal|Epic,Fierce,Sci-Fi|Distorted Guitar,String Orchestra,Choir,Drums|M2G50P
日常系療癒曲|Anime,Acoustic|Cozy,Soothing,Carefree|Ukulele,Recorder,Glockenspiel,Whistling|F4C20A
日系女子偶像|J-Pop,Teen Pop|Cheerful,Energetic,Sweet|Synthesizer,Electric Guitar,Drums,Claps|C4P5dP
日系男子偶像|J-Pop,Dance Pop|Confident,Energetic,Flirty|Synthesizer,Brass Section,Drum Machine,Synth Bass|M1P4cP
地下偶像現場|J-Pop,Pop Punk|Wild,Energetic,Passionate|Distorted Guitar,Drums,Crowd Chants,Synthesizer|C4P50R
電波系洗腦歌|J-Pop,Hyperpop|Quirky,Chaotic,Fun|8-bit Synth,Supersaw,Drum Machine,Sound Effects|F4P5cP
虛擬歌姬電子|J-Pop,Electropop|Sci-Fi,Energetic,Dreamy|Lead Synth,Arpeggio,Drum Machine,Synth Bass|F6I5eP
日系搖滾樂團|J-Pop,Alternative Rock|Passionate,Bittersweet,Determined|Electric Guitar,Bass Guitar,Drums|M2E4cR
青春吉他搖滾|J-Pop,Power Pop|Optimistic,Energetic,Hopeful|Clean Guitar,Distorted Guitar,Bass Guitar,Drums|M1E5dR
日系數字搖滾|Math Rock,J-Pop|Quirky,Intense,Playful|Clean Guitar,Bass Guitar,Drums|F6I4dC
視覺系搖滾|Glam Rock,Hard Rock|Dramatic,Dark,Bold|Distorted Guitar,Bass Guitar,Drums,String Orchestra|M2G4bP
日系瞪鞋|Shoegaze,J-Pop|Dreamy,Wistful,Floating|Distorted Guitar,Bass Guitar,Drums,Synth Pads|F2I30L
日系龐克青春|Pop Punk,J-Pop|Energetic,Carefree,Rebellious|Distorted Guitar,Bass Guitar,Drums,Backing Vocals|M4P5cR
日系女子樂團|J-Pop,Indie Rock|Playful,Cheerful,Hopeful|Clean Guitar,Bass Guitar,Drums,Synthesizer|F4I4dR
演歌男聲|Enka|Sorrowful,Passionate,Dramatic|Shamisen,Shakuhachi,String Orchestra,Nylon Guitar|M3E10P
演歌女聲港町|Enka,Ballad|Longing,Lonely,Sorrowful|Accordion,Saxophone,String Orchestra,Nylon Guitar|F3E1aP
昭和歌謠|Enka,Pop|Retro,Nostalgic,Sentimental|Saxophone,Electric Guitar,String Orchestra,Organ|F1R2aL
昭和偶像歌|J-Pop,Synth Pop|Retro,Sweet,Innocent|Synthesizer,Electronic Drums,Brass Section,Bass Guitar|F1R4aP
昭和迪斯可|Disco,J-Pop|Retro,Groovy,Fun|String Orchestra,Bass Guitar,Drums,Brass Section|F1P4aP
和風流行|Japanese Traditional,J-Pop|Elegant,Ethereal,Wistful|Koto,Shakuhachi,Piano,String Orchestra|F2E20P
和風搖滾|Japanese Traditional,Rock|Fierce,Energetic,Bold|Shamisen,Taiko,Distorted Guitar,Shakuhachi|M2G4dP
祭典夏夜|Japanese Traditional,Pop|Festive,Joyful,Nostalgic|Taiko,Shamisen,Chant,Flute|C4P30R
和風電子|Japanese Traditional,EDM|Energetic,Ethereal,Hypnotic|Koto,Supersaw,Taiko,Drum Machine|F2P4eP
純和樂三重奏|Japanese Traditional|Serene,Meditative,Elegant|Koto,Shakuhachi,Shamisen|F2I10A
日系抒情鋼琴|J-Pop,Ballad|Tearful,Tender,Hopeful|Grand Piano,String Orchestra,Acoustic Guitar|M1E2cP
日劇主題曲|J-Pop,Soft Rock|Romantic,Bittersweet,Heartwarming|Piano,Acoustic Guitar,String Orchestra,Drums|M1E2bP
畢業櫻花歌|J-Pop,Choral|Sentimental,Grateful,Hopeful|Piano,Choir,String Quartet|C1E20C
夏日花火情歌|J-Pop,Acoustic|Bittersweet,Wistful,Longing|Acoustic Guitar,Piano,Chimes,Cajon|M3E20A
冬季雪景情歌|J-Pop,Ballad|Romantic,Wistful,Serene|Piano,Bells,String Orchestra,Celesta|F2E20P
日系創作歌手|J-Pop,Singer-Songwriter|Warm,Reflective,Hopeful|Acoustic Guitar,Harmonica,Piano|M4E20A
日系 R&B|J-Pop,Neo Soul|Mellow,Romantic,Urban|Rhodes,Bass Guitar,Drums,Backing Vocals|F4R2cP
日系嘻哈|Hip Hop,J-Pop|Chill,Playful,Groovy|Sampler,Drum Machine,Rhodes,Turntable Scratches|M4I30L
澀谷系|Indie Pop,Bossa Nova,Lounge|Whimsical,Elegant,Airy|Nylon Guitar,Vibraphone,Flute,Brushes|F2I3bC
日系爵士流行|J-Pop,Jazz|Playful,Elegant,Passionate|Piano,Upright Bass,Drums,Horn Section|F4I4dC
童話動畫風配樂|Orchestral,Waltz|Whimsical,Innocent,Heartwarming|Piano,Accordion,Woodwinds,String Orchestra|F2C20C
日系遊戲配樂|Video Game Music,J-Pop|Triumphant,Hopeful,Energetic|8-bit Synth,String Orchestra,Electric Guitar,Drums|F2G4bP
日系 Lo-Fi|Lo-Fi,City Pop|Chill,Cozy,Nostalgic|Rhodes,Vinyl Crackle,Drum Machine,Clean Guitar|F2C20L
原宿卡哇伊電子|Electropop,J-Pop|Quirky,Sweet,Playful|Toy Piano,Pluck Synth,Drum Machine,Sound Effects|F4P4dP
日系合成器流行|Synth Pop,J-Pop|Retro,Dreamy,Sci-Fi|Analog Synth,Vocoder,Drum Machine,Synth Bass|M6I3aP
日系金屬偶像|Metal,J-Pop|Fierce,Playful,Bold|Distorted Guitar,Drums,Bass Guitar,Crowd Chants|F4P5dP`,

        '韓系流行': `
K-Pop 女團清新|K-Pop,Teen Pop|Cheerful,Sweet,Innocent|Synthesizer,Clean Guitar,Claps,Drum Machine|F4R4dP
K-Pop 女團帥氣|K-Pop,Trap|Confident,Fierce,Bold|808 Bass,Drum Machine,Lead Synth,Ad-libs|F4R3dP
K-Pop 女團復古|K-Pop,Disco|Retro,Groovy,Flirty|Synth Bass,Electronic Drums,Analog Synth,Brass Section|F1R4aP
K-Pop 女團夢幻|K-Pop,Dream Pop|Dreamy,Ethereal,Airy|Synth Pads,Harp,Pluck Synth,Drum Machine|F2R3dP
K-Pop 女團夏日|K-Pop,Tropical House|Carefree,Happy,Energetic|Steel Drums,Pluck Synth,Synth Bass,Claps|F4P4dP
K-Pop 千禧辣妹|K-Pop,UK Garage|Flirty,Retro,Playful|Synth Bass,Drum Machine,Rhodes,Vocal Chops|F4R4cP
K-Pop 男團猛獸|K-Pop,Hip Hop,EDM|Fierce,Aggressive,Powerful|808 Bass,Brass Section,Drum Machine,Crowd Chants|M4P4dP
K-Pop 男團清爽|K-Pop,Pop Rock|Cheerful,Optimistic,Carefree|Clean Guitar,Synthesizer,Drums,Bass Guitar|M1R4dP
K-Pop 男團暗黑|K-Pop,Electro|Dark,Sinister,Dramatic|Reese Bass,Electronic Drums,String Orchestra,Synth Pads|M2G3dP
K-Pop 男團抒情|K-Pop,R&B,Ballad|Tender,Longing,Romantic|Piano,Synth Pads,Drum Machine,Harmonies|M1E2dP
K-Pop 實驗噪音|K-Pop,Hyperpop|Chaotic,Bold,Aggressive|Lead Synth,Glitch,808 Bass,Drum Machine|M4P4eP
K-Pop 混聲團|K-Pop,Dancehall|Fun,Groovy,Energetic|Synth Bass,Percussion,Lead Synth,Ad-libs|D4P3dP
K-Pop 拉丁風|K-Pop,Latin|Sultry,Passionate,Exotic|Nylon Guitar,Congas,Trumpet,Synth Bass|M4P3dP
K-Pop 國樂融合|K-Pop,Korean Traditional|Majestic,Intense,Bold|Percussion,Gong,808 Bass,Flute|M2G4dP
K-Pop 浩室舞曲|K-Pop,House|Euphoric,Urban,Dreamy|Synth Bass,Drum Machine,Piano,Vocal Chops|F6P4dP
K-Pop 合成器復古|K-Pop,Synthwave|Retro,Energetic,Nostalgic|Analog Synth,Arpeggio,Electronic Drums,Synth Bass|M2R4aP
K-Pop Solo 女王|K-Pop,Dance Pop|Confident,Sexy,Powerful|Synth Bass,Drum Machine,Brass Section,Vocal Chops|F1R4dP
K-Pop 搖滾偶像|K-Pop,Pop Punk|Energetic,Bittersweet,Rebellious|Distorted Guitar,Bass Guitar,Drums,Synthesizer|M4P5dP
K-Pop 冬季特輯|K-Pop,Ballad|Cozy,Romantic,Festive|Bells,Piano,String Orchestra,Harmonies|C1E20P
K-Pop 粉絲應援曲|K-Pop,Pop|Grateful,Heartwarming,Uplifting|Acoustic Guitar,Piano,Claps,Harmonies|C4E30P
一代男團懷舊|K-Pop,Dance Pop|Nostalgic,Rebellious,Energetic|Synthesizer,Drum Machine,Turntable Scratches,Synth Bass|M4R4bP
二代洗腦神曲|K-Pop,Electropop|Hypnotic,Fun,Playful|Lead Synth,Vocoder,Drum Machine,Synth Bass|F4P4cP
韓劇 OST 抒情|Ballad,K-Pop|Tearful,Longing,Romantic|Piano,String Orchestra,Acoustic Guitar|F1E1dP
韓劇浪漫喜劇|K-Pop,Indie Pop|Sweet,Flirty,Whimsical|Ukulele,Whistling,Glockenspiel,Acoustic Guitar|F4C3dC
韓劇古裝 OST|Korean Traditional,Ballad|Sorrowful,Ethereal,Longing|Flute,String Orchestra,Piano,Percussion|F2E10P
韓劇懸疑配樂歌|Cinematic,K-Pop|Suspenseful,Mysterious,Tense|Cello,Synth Pads,Piano,Timpani|M6G2dP
韓劇男聲告白|Ballad,Soft Rock|Romantic,Passionate,Vulnerable|Piano,Electric Guitar,String Orchestra,Drums|M1E2dP
韓系 R&B|R&B,K-Pop|Sultry,Chill,Urban|Rhodes,Synth Bass,Snaps,Drum Machine|M4R2dP
韓系 Neo Soul|Neo Soul,K-Pop|Mellow,Dreamy,Intimate|Rhodes,Bass Guitar,Brushes,Backing Vocals|F4I2dC
韓系另類 R&B|R&B,Cloud Rap|Empty,Dark,Floating|Synth Pads,808 Bass,Drum Machine,Vocal Chops|M6I2dP
韓系抒情男聲|Ballad,K-Pop|Heartbroken,Passionate,Tearful|Grand Piano,String Orchestra,Drums|M1E1cP
韓系抒情女聲|Ballad,K-Pop|Melancholic,Vulnerable,Letting Go|Piano,Cello,String Quartet|F2E1dP
韓系吉他小情歌|K-Pop,Acoustic|Sweet,Intimate,Gentle|Acoustic Guitar,Cajon,Shaker,Humming|D4C20A
韓系咖啡廳音樂|Indie Pop,Bossa Nova|Relaxed,Cozy,Mellow|Nylon Guitar,Rhodes,Shaker,Upright Bass|F4C2dC
Trot 歡樂版|K-Pop,Enka|Cheerful,Humorous,Festive|Accordion,Synthesizer,Drum Machine,Brass Section|F1P40P
Trot 苦情版|K-Pop,Enka|Sorrowful,Regretful,Nostalgic|Saxophone,Accordion,Nylon Guitar,String Orchestra|M3E2aL
Trot 電音|K-Pop,Eurodance|Energetic,Fun,Quirky|Synthesizer,Drum Machine,Accordion,Synth Bass|F1P4cP
韓系嘻哈|Hip Hop,K-Pop|Confident,Aggressive,Defiant|808 Bass,Drum Machine,Sampler,Ad-libs|M4R3dP
韓系老派嘻哈|Boom Bap,K-Pop|Retro,Chill,Reflective|Sampler,Turntable Scratches,Rhodes,Drums|M4I2bL
韓系 Drill|Drill,K-Pop|Menacing,Dark,Tense|808 Bass,Drum Machine,Piano|M4I5dP
韓系旋律饒舌|Pop Rap,K-Pop|Bittersweet,Lonely,Dreamy|Clean Guitar,808 Bass,Drum Machine,Synth Pads|M4R3dP
韓國獨立樂團|Indie Rock,K-Pop|Bittersweet,Hopeful,Wistful|Clean Guitar,Bass Guitar,Drums,Synthesizer|M2I3dR
韓系樂團搖滾|K-Pop,Alternative Rock|Passionate,Uplifting,Determined|Electric Guitar,Bass Guitar,Drums,Piano|M1E4dP
韓系夢幻獨立|Dream Pop,Bedroom Pop|Dreamy,Melancholic,Tired|Clean Guitar,Synth Pads,Drum Machine,Tape Hiss|F2I2dL
韓系 City Pop|City Pop,K-Pop|Urban,Nostalgic,Chill|Rhodes,Slap Bass,Clean Guitar,Electronic Drums|F2R3aP
韓系民謠|Folk,K-Pop|Peaceful,Wistful,Warm|Acoustic Guitar,Harmonica,Cello|M3E2bA
韓國國樂新唱|Korean Traditional,Folk|Spiritual,Haunting,Passionate|Percussion,Flute,Chant,Gong|F2I20A
韓系 EDM 音樂祭|EDM,K-Pop,Future Bass|Euphoric,Energetic,Triumphant|Supersaw,Risers,Vocal Chops,Sub Bass|F6P4dP
選秀主題曲|K-Pop,Dance Pop,EDM|Determined,Energetic,Inspiring|Supersaw,Drum Machine,Synth Bass,Crowd Chants|C1P4dP
韓系兒歌|K-Pop,Teen Pop|Childlike,Playful,Cheerful|Xylophone,Toy Piano,Claps,Synth Bass|K4P4dC`,

        '歐美流行': `
80 合成器流行|Synth Pop,Pop|Retro,Energetic,Nostalgic|Synthesizer,Drum Machine,Synth Bass,Analog Synth|M1R4aP
80 新浪潮舞曲|Synth Pop,Dance Pop|Quirky,Fun,Energetic|Analog Synth,Electronic Drums,Bass Guitar,Clean Guitar|F4P4aP
80 強力抒情|Ballad,Pop Rock|Passionate,Dramatic,Longing|Grand Piano,Electric Guitar,Drums,Synth Pads|M1G1aP
80 薩克斯情歌|Pop,Soft Rock|Sultry,Romantic,Retro|Saxophone,Rhodes,Bass Guitar,Drum Machine|M1R2aP
90 青春男孩團體|Teen Pop,Pop|Sweet,Romantic,Innocent|Synthesizer,Drum Machine,Harmonies,Acoustic Guitar|C1R3bP
90 女子團體舞曲|Teen Pop,Dance Pop|Confident,Playful,Fun|Synth Bass,Drum Machine,Backing Vocals,Claps|C4P4bP
90 歐陸舞曲流行|Eurodance,Dance Pop|Euphoric,Energetic|Synthesizer,Drum Machine,Synth Bass,Piano|F1P4bP
90 流行抒情天后|Ballad,Pop|Powerful,Heartbroken,Dramatic|Grand Piano,String Orchestra,Drums,Backing Vocals|F1G1bP
90 木吉他流行|Pop,Acoustic|Bittersweet,Hopeful,Warm|Acoustic Guitar,Bass Guitar,Drums,Tambourine|F1E3bC
千禧泡泡糖流行|Teen Pop,Electropop|Playful,Cheerful,Flirty|Synthesizer,Drum Machine,Claps,Synth Bass|F4R4cP
千禧 R&B 流行|Pop,R&B|Flirty,Groovy,Sexy|Rhodes,Drum Machine,Synth Bass,Ad-libs|F4R3cP
千禧舞池電子流行|Electropop,Dance Pop|Energetic,Bold,Sexy|Lead Synth,Electronic Drums,Synth Bass,Vocoder|F1P4cP
千禧流行搖滾女聲|Pop Rock,Pop|Defiant,Energetic,Confident|Electric Guitar,Bass Guitar,Drums,Backing Vocals|F4R4cP
千禧鋼琴流行|Pop,Singer-Songwriter|Reflective,Hopeful,Bittersweet|Piano,Drums,Bass Guitar,String Quartet|M1E3cC
現代電子流行|Electropop,Pop|Uplifting,Energetic|Synthesizer,Electronic Drums,Sub Bass,Vocal Chops|F1R4dP
現代極簡低音流行|Pop,Electropop|Minimal,Dark,Sarcastic|Sub Bass,Snaps,Drum Machine,Pluck Synth|F4I3dP
現代復古合成流行|Synth Pop,Synthwave|Retro,Nostalgic,Longing|Analog Synth,Drum Machine,Synth Bass,Arpeggio|M1R4dP
Disco 流行復興|Disco,Pop|Groovy,Joyful,Retro|Slap Bass,Clean Guitar,String Orchestra,Drums|F1P4dP
Nu Disco 舞池流行|Nu Disco,Dance Pop|Groovy,Flirty,Urban|Bass Guitar,Clean Guitar,Synthesizer,Cowbell|F4P4dP
70 迪斯可金曲|Disco,Funk|Festive,Groovy,Passionate|Horn Section,Bass Guitar,Drums,String Orchestra|C1P40P
鋼琴流行抒情|Ballad,Pop|Sorrowful,Melancholic,Intimate|Piano,Cello,String Quartet|F2E1dC
分手療傷抒情|Ballad,Singer-Songwriter|Heartbroken,Letting Go,Tearful|Piano,Acoustic Guitar,Violin|F1E1dC
婚禮情歌|Pop,Ballad|Romantic,Tender,Heartwarming|Acoustic Guitar,Piano,String Quartet,Harmonies|M1E2dC
夏日熱帶單曲|Tropical House,Pop|Carefree,Happy,Exotic|Steel Drums,Pluck Synth,Marimba,Electronic Drums|F4P3dP
夏日公路單曲|Pop,Pop Rock|Carefree,Optimistic,Energetic|Electric Guitar,Drums,Bass Guitar,Claps|M4P4dP
海灘派對流行|Dance Pop,Latin|Festive,Passionate,Fun|Nylon Guitar,Percussion,Synth Bass,Trumpet|D4P3dP
臥室流行|Bedroom Pop,Indie Pop|Dreamy,Intimate,Wistful|Clean Guitar,Drum Machine,Synthesizer,Tape Hiss|F4I2dL
臥室流行烏克麗麗|Bedroom Pop,Acoustic|Sweet,Playful,Cozy|Ukulele,Snaps,Whistling,Shaker|F4C2dL
藝術流行|Art Pop,Pop|Ethereal,Bold,Dramatic|Synthesizer,String Quartet,Electronic Drums,Harp|F6I3dP
巴洛克藝術流行|Art Pop,Baroque|Elegant,Whimsical,Melancholic|Harpsichord,String Quartet,Flute,Drums|F2I20C
Hyperpop 超流行|Hyperpop,Electropop|Chaotic,Euphoric,Quirky|Supersaw,Glitch,808 Bass,Vocal Chops|F4P5eP
流行饒舌熱單|Pop Rap,Pop|Confident,Playful,Urban|808 Bass,Drum Machine,Pluck Synth,Ad-libs|M4R3dP
放克流行|Pop,Funk|Groovy,Fun,Happy|Slap Bass,Clean Guitar,Horn Section,Drums|M4P3dP
靈魂流行|Pop,Soul|Passionate,Warm,Uplifting|Hammond Organ,Horn Section,Bass Guitar,Drums|F1E3dC
福音合唱流行|Pop,Gospel|Joyful,Spiritual,Uplifting|Piano,Gospel Choir,Claps,Drums|C1G3dP
拍手跺腳勵志流行|Pop,Indie Pop|Inspiring,Rousing,Optimistic|Claps,Piano,Drums,Crowd Chants|M1R3dP
體育場大合唱流行|Pop,Pop Rock|Triumphant,Rousing,Uplifting|Piano,Electric Guitar,Drums,Choir|M1G3dP
EDM 流行合作曲|EDM,Pop|Euphoric,Energetic,Uplifting|Supersaw,Risers,Electronic Drums,Vocal Chops|F1P4dP
Future Bass 流行|Future Bass,Pop|Dreamy,Euphoric,Airy|Supersaw,Vocal Chops,Sub Bass,Electronic Drums|F2R4dP
Deep House 流行|Deep House,Pop|Chill,Sultry,Groovy|Synth Bass,Electronic Drums,Rhodes,Vocal Chops|M1C4dP
女力宣言流行|Pop,Dance Pop|Confident,Powerful,Bold|Brass Section,Drums,Synth Bass,Claps|F1R4dP
深夜失眠流行|Pop,Downtempo|Lonely,Tired,Dreamy|Synth Pads,Rhodes,Drum Machine,Sub Bass|F2C2dP
暗黑電子流行|Electropop,Synth Pop|Dark,Sinister,Hypnotic|Analog Synth,Synth Bass,Electronic Drums,Vocoder|F6I3dP
鄉村跨界流行|Country Pop,Pop|Cheerful,Romantic,Rustic|Acoustic Guitar,Banjo,Drums,Bass Guitar|F3R3dP
拉丁流行熱舞|Latin,Pop|Passionate,Sexy,Energetic|Nylon Guitar,Congas,Trumpet,Bass Guitar|D1P3cP
Motown 復古流行|Motown,Pop|Joyful,Retro,Groovy|Tambourine,Bass Guitar,Horn Section,Piano|F1R40L
Doo-Wop 復古情歌|Doo-Wop,Pop|Romantic,Retro,Innocent|Harmonies,Upright Bass,Piano,Snaps|C1E20L
聖誕流行歌|Pop,Swing|Festive,Cozy,Joyful|Bells,Piano,Brass Section,Upright Bass|F1R30P
電影主題曲流行|Pop,Cinematic|Epic,Inspiring,Dramatic|Grand Piano,String Orchestra,Timpani,Choir|F2G2dP
畢業青春流行|Pop,Indie Pop|Nostalgic,Sentimental,Hopeful|Acoustic Guitar,Piano,Drums,Harmonies|D1E3dC`,

        '搖滾': `
經典搖滾|Classic Rock,Rock|Energetic,Confident,Retro|Electric Guitar,Bass Guitar,Drums,Hammond Organ|M1R30R
70 公路搖滾|Classic Rock,Blues|Carefree,Gritty,Energetic|Electric Guitar,Slide Guitar,Bass Guitar,Drums|M3R40R
硬式搖滾|Hard Rock,Rock|Aggressive,Powerful,Gritty|Distorted Guitar,Bass Guitar,Drums|M1R4aR
80 長髮硬搖滾|Hard Rock,Glam Rock|Wild,Bold,Fun|Distorted Guitar,Bass Guitar,Drums,Backing Vocals|M4P4aP
硬搖滾強力抒情|Hard Rock,Ballad|Passionate,Longing,Dramatic|Acoustic Guitar,Distorted Guitar,Drums,Piano|M1G1aP
軟式搖滾|Soft Rock,Pop|Mellow,Romantic,Relaxed|Rhodes,Clean Guitar,Bass Guitar,Drums|M1C20C
遊艇搖滾|Soft Rock,Funk|Chill,Groovy,Carefree|Rhodes,Clean Guitar,Saxophone,Fretless Bass|M1C3aP
現代流行搖滾|Pop Rock,Rock|Energetic,Optimistic|Electric Guitar,Bass Guitar,Drums,Synthesizer|M1R4dP
千禧流行搖滾|Pop Rock,Alternative Rock|Bittersweet,Energetic,Wistful|Electric Guitar,Acoustic Guitar,Bass Guitar,Drums|M1R4cP
前衛搖滾史詩|Progressive Rock,Rock|Epic,Mysterious,Dramatic|Mellotron,Electric Guitar,Bass Guitar,Drums|M6G30C
交響前衛搖滾|Progressive Rock,Orchestral|Majestic,Epic,Heroic|Analog Synth,String Orchestra,Electric Guitar,Drums|M3G30P
太空搖滾|Progressive Rock,Psychedelic Rock|Floating,Sci-Fi,Dreamy|Synth Pads,Slide Guitar,Bass Guitar,Drums|M6I20C
60 迷幻搖滾|Psychedelic Rock,Rock|Psychedelic,Exotic,Whimsical|Sitar,Electric Guitar,Organ,Drums|M2I30L
重型迷幻搖滾|Psychedelic Rock,Hard Rock|Psychedelic,Dark,Hypnotic|Distorted Guitar,Hammond Organ,Bass Guitar,Drums|M2I30R
新迷幻搖滾|Psychedelic Rock,Indie Rock|Psychedelic,Dreamy,Groovy|Analog Synth,Clean Guitar,Bass Guitar,Drums|M2I3dL
衝浪搖滾|Surf Rock,Rock|Carefree,Happy,Retro|Clean Guitar,Bass Guitar,Drums,Organ|M4P40L
衝浪吉他狂飆|Surf Rock|Wild,Energetic,Fun|Clean Guitar,Bass Guitar,Drums,Saxophone|M0P50L
海灘和聲搖滾|Surf Rock,Pop|Cheerful,Sweet,Innocent|Harmonies,Clean Guitar,Organ,Tambourine|C1P30L
Rockabilly 搖擺|Rockabilly,Rock|Playful,Retro,Wild|Upright Bass,Clean Guitar,Snare Drum,Piano|M4P50L
50 搖滾舞會|Rockabilly,Blues|Festive,Fun,Retro|Upright Piano,Saxophone,Upright Bass,Drums|M4P40L
華麗搖滾|Glam Rock,Rock|Bold,Sexy,Playful|Electric Guitar,Piano,Drums,Claps|M2R30P
華麗搖滾歌劇|Glam Rock,Progressive Rock|Dramatic,Majestic,Bold|Grand Piano,Electric Guitar,Choir,Drums|M3G30P
體育場搖滾|Rock,Classic Rock|Triumphant,Rousing,Powerful|Electric Guitar,Drums,Bass Guitar,Crowd Chants|M1G3aP
體育場聖歌搖滾|Rock,Pop Rock|Uplifting,Inspiring,Euphoric|Clean Guitar,Synth Pads,Drums,Choir|M2G4cP
藍調搖滾|Rock,Blues|Gritty,Passionate,Sultry|Electric Guitar,Hammond Organ,Bass Guitar,Drums|M1E30R
德州藍調搖滾|Blues,Hard Rock|Gritty,Wild,Confident|Electric Guitar,Slide Guitar,Harmonica,Drums|M4R40R
南方搖滾|Rock,Country|Rustic,Defiant,Nostalgic|Slide Guitar,Electric Guitar,Piano,Drums|M3R30R
民謠搖滾|Folk Rock,Rock|Hopeful,Reflective,Nostalgic|12-String Guitar,Bass Guitar,Drums,Harmonica|M3E30C
60 民謠搖滾和聲|Folk Rock,Pop|Airy,Bittersweet,Peaceful|12-String Guitar,Harmonies,Tambourine,Bass Guitar|C2E30L
抒情搖滾|Rock,Ballad|Heartbroken,Passionate,Tearful|Piano,Electric Guitar,Drums,String Orchestra|M1E2bP
木吉他抒情搖滾|Soft Rock,Acoustic|Tender,Intimate,Bittersweet|Acoustic Guitar,Cello,Bass Guitar,Brushes|M1E2bA
心臟地帶搖滾|Rock,Americana|Determined,Nostalgic,Hopeful|Electric Guitar,Piano,Saxophone,Drums|M3E3aP
Britpop 英倫搖滾|Britpop,Rock|Confident,Nostalgic,Rousing|Electric Guitar,Acoustic Guitar,Drums,Tambourine|M4R3bP
英倫入侵節拍樂團|Rock,Pop|Cheerful,Fun,Retro|Clean Guitar,Bass Guitar,Drums,Harmonies|C1R40L
另類搖滾|Alternative Rock,Rock|Anxious,Intense,Melancholic|Distorted Guitar,Bass Guitar,Drums,Clean Guitar|M2I3bC
後油漬搖滾|Alternative Rock,Hard Rock|Gloomy,Powerful,Regretful|Distorted Guitar,Acoustic Guitar,Bass Guitar,Drums|M1R3cP
車庫搖滾復興|Garage Rock,Rock|Gritty,Rebellious,Energetic|Distorted Guitar,Bass Guitar,Drums,Tambourine|M4I4cR
放克搖滾|Rock,Funk|Groovy,Wild,Playful|Slap Bass,Clean Guitar,Drums,Clavinet|M4P3bC
鋼琴搖滾|Rock,Pop Rock|Joyful,Passionate,Fun|Grand Piano,Bass Guitar,Drums,Horn Section|M3R40P
管樂搖滾|Rock,Soul|Rousing,Groovy,Uplifting|Horn Section,Electric Guitar,Hammond Organ,Drums|M1P40C
根源搖滾|Rock,Americana|Rustic,Warm,Nostalgic|Acoustic Guitar,Mandolin,Hammond Organ,Drums|M3E30C
拉丁搖滾|Rock,Latin|Passionate,Exotic,Sultry|Electric Guitar,Congas,Timbales,Hammond Organ|M2P30R
凱爾特搖滾|Rock,Celtic|Festive,Rousing,Energetic|Electric Guitar,Fiddle,Tin Whistle,Drums|M3P4bR
強力流行搖滾|Power Pop,Rock|Bittersweet,Cheerful,Energetic|Electric Guitar,Bass Guitar,Drums,Harmonies|M1R40P
80 新浪潮搖滾|Rock,Synth Pop|Retro,Quirky,Energetic|Clean Guitar,Synthesizer,Bass Guitar,Drum Machine|M2R4aP
沙漠搖滾|Hard Rock,Psychedelic Rock|Hypnotic,Gritty,Menacing|Distorted Guitar,Bass Guitar,Drums,Shaker|M2I3bR
合成器電氣搖滾|Rock,Electro|Intense,Sci-Fi,Bold|Distorted Guitar,Lead Synth,Electronic Drums,Synth Bass|M6R4dP
女聲搖滾|Rock,Pop Rock|Fierce,Defiant,Passionate|Electric Guitar,Bass Guitar,Drums|F1R4bC
男女對唱搖滾|Rock,Soft Rock|Romantic,Bittersweet,Longing|Electric Guitar,Piano,Bass Guitar,Drums|D5E3aP
不插電搖滾現場|Rock,Acoustic|Intimate,Reflective,Mellow|Acoustic Guitar,Cajon,Upright Bass,Cello|M1E2bA`,

        '金屬・龐克': `
經典重金屬|Heavy Metal,Metal|Powerful,Fierce,Rebellious|Distorted Guitar,Bass Guitar,Drums|M3G4aR
英式新浪潮重金屬|Heavy Metal,Hard Rock|Heroic,Energetic,Fierce|Distorted Guitar,Electric Guitar,Bass Guitar,Drums|M3G5aR
鞭擊金屬|Metal,Punk|Aggressive,Angry,Chaotic|Distorted Guitar,Bass Guitar,Drums,Cymbals|M105aR
力量金屬|Heavy Metal,Symphonic Metal|Heroic,Triumphant,Epic|Distorted Guitar,Synthesizer,Drums,Choir|M3G5bP
交響金屬|Symphonic Metal,Orchestral|Epic,Majestic,Dramatic|Distorted Guitar,String Orchestra,Choir,Drums|F2G4cP
歌劇女聲金屬|Symphonic Metal,Opera|Dramatic,Haunting,Majestic|Opera Vocals,Distorted Guitar,String Orchestra,Timpani|F3G3cP
歌德金屬|Metal,Symphonic Metal|Gloomy,Haunting,Sorrowful|Distorted Guitar,Piano,Synth Pads,Drums|D2I2bP
毀滅金屬|Metal,Heavy Metal|Ominous,Hopeless,Dark|Distorted Guitar,Bass Guitar,Drums,Tubular Bells|M2I10R
民謠金屬|Metal,Celtic|Festive,Wild,Energetic|Distorted Guitar,Fiddle,Tin Whistle,Drums|M3P4cP
維京戰歌金屬|Heavy Metal,Folk|Heroic,Epic,Rousing|Distorted Guitar,Chant,Drums,French Horn|M3G3cP
海盜金屬|Heavy Metal,Sea Shanty|Humorous,Rousing,Wild|Distorted Guitar,Accordion,Drums,Crowd Chants|M3P4cP
前衛金屬|Metal,Progressive Rock|Intense,Mysterious,Epic|Distorted Guitar,Synthesizer,Fretless Bass,Drums|M6G3bP
新金屬|Nu Metal,Metal|Angry,Aggressive,Anxious|Distorted Guitar,Turntable Scratches,Bass Guitar,Drums|M4R3cP
饒舌金屬|Nu Metal,Hip Hop|Defiant,Aggressive,Urban|Distorted Guitar,Sampler,Bass Guitar,Drums|M4R3cP
電子新金屬|Nu Metal,Electro|Dark,Tense,Sci-Fi|Distorted Guitar,Synthesizer,Electronic Drums,Glitch|M6R3cP
工業金屬|Metal,Techno|Menacing,Aggressive,Sinister|Distorted Guitar,Drum Machine,Synth Bass,Sound Effects|M6I4bP
金屬核|Metalcore,Metal|Fierce,Angry,Intense|Distorted Guitar,Bass Guitar,Drums|M1R5cP
旋律金屬核|Metalcore,Emo|Passionate,Fierce,Vulnerable|Distorted Guitar,Clean Guitar,Bass Guitar,Drums|M2R4cP
電子金屬核|Metalcore,Dubstep|Chaotic,Aggressive,Energetic|Distorted Guitar,Lead Synth,Sub Bass,Electronic Drums|M1P5dP
後硬核|Metalcore,Alternative Rock|Intense,Anxious,Passionate|Distorted Guitar,Clean Guitar,Drums,Backing Vocals|M2I4cP
另類金屬|Metal,Alternative Rock|Dark,Tense,Powerful|Distorted Guitar,Bass Guitar,Drums,Synth Pads|M2R3cP
女聲另類金屬|Nu Metal,Alternative Rock|Haunting,Vulnerable,Dark|Distorted Guitar,Piano,Drums,String Orchestra|F2R3cP
金屬抒情曲|Heavy Metal,Ballad|Sorrowful,Passionate,Longing|Acoustic Guitar,Distorted Guitar,String Orchestra,Drums|M1G1bP
華麗金屬|Heavy Metal,Glam Rock|Wild,Sexy,Fun|Distorted Guitar,Bass Guitar,Drums,Backing Vocals|M4P4aP
新古典速彈金屬|Heavy Metal,Neoclassical|Dramatic,Intense,Elegant|Electric Guitar,Harpsichord,Bass Guitar,Drums|M0G5aP
動漫熱血金屬|Metal,Anime|Heroic,Determined,Rousing|Distorted Guitar,Synthesizer,Drums,String Orchestra|F1G5dP
經典龐克|Punk,Rock|Rebellious,Angry,Energetic|Distorted Guitar,Bass Guitar,Drums|M4I50R
硬核龐克|Punk|Angry,Aggressive,Defiant|Distorted Guitar,Bass Guitar,Drums,Crowd Chants|M4I5aR
流行龐克|Pop Punk,Punk|Energetic,Fun,Carefree|Distorted Guitar,Bass Guitar,Drums,Backing Vocals|M4R5cP
青春失戀流行龐克|Pop Punk,Emo|Heartbroken,Energetic,Bittersweet|Distorted Guitar,Bass Guitar,Drums|M4R5cP
女聲流行龐克|Pop Punk,Pop Rock|Defiant,Sarcastic,Playful|Electric Guitar,Bass Guitar,Drums,Claps|F4R5cP
現代流行龐克復興|Pop Punk,Pop|Anxious,Energetic,Heartbroken|Distorted Guitar,808 Bass,Drums,Synthesizer|M4R5dP
滑板龐克|Punk,Pop Punk|Carefree,Rebellious,Energetic|Distorted Guitar,Bass Guitar,Drums,Snare Drum|M4P5bR
Ska 龐克|Ska,Punk|Fun,Energetic,Humorous|Trumpet,Trombone,Clean Guitar,Drums|M4P5bR
銅管 Ska 派對|Ska,Pop Punk|Festive,Playful,Cheerful|Horn Section,Clean Guitar,Bass Guitar,Organ|M4P4bC
凱爾特龐克|Punk,Celtic|Rousing,Wild,Festive|Bagpipes,Accordion,Distorted Guitar,Drums|M3P5cR
民謠龐克|Punk,Folk|Defiant,Passionate,Rustic|Acoustic Guitar,Banjo,Upright Bass,Harmonica|M3I4cA
牛仔龐克|Punk,Country|Wild,Rustic,Playful|Electric Guitar,Upright Bass,Drums,Fiddle|M3P5aR
驚悚龐克|Punk,Rockabilly|Spooky,Playful,Sinister|Upright Bass,Electric Guitar,Drums,Theremin|M3I5aL
後龐克|Punk,Alternative Rock|Gloomy,Tense,Empty|Bass Guitar,Clean Guitar,Drum Machine,Synthesizer|M6I4aL
舞曲龐克|Punk,Disco|Groovy,Energetic,Bold|Bass Guitar,Cowbell,Clean Guitar,Drums|M4P4cC
車庫龐克|Garage Rock,Punk|Gritty,Wild,Rebellious|Distorted Guitar,Organ,Bass Guitar,Drums|M4I50L
暴女龐克|Punk,Garage Rock|Fierce,Rebellious,Bold|Distorted Guitar,Bass Guitar,Drums|F4I4bR
頹廢油漬搖滾|Grunge,Alternative Rock|Gloomy,Tired,Gritty|Distorted Guitar,Bass Guitar,Drums|M2I3bR
不插電油漬|Grunge,Acoustic|Melancholic,Vulnerable,Intimate|Acoustic Guitar,Cello,Bass Guitar,Brushes|M2E2bA
泥漿重型油漬|Grunge,Metal|Ominous,Gritty,Dark|Distorted Guitar,Bass Guitar,Drums,Cymbals|M2I2bR
女聲油漬搖滾|Grunge,Punk|Angry,Gritty,Defiant|Distorted Guitar,Bass Guitar,Drums|F4I3bR
情緒搖滾|Emo,Alternative Rock|Heartbroken,Vulnerable,Passionate|Electric Guitar,Bass Guitar,Drums|M2E4cP
中西部情緒搖滾|Emo,Math Rock|Wistful,Nostalgic,Bittersweet|Clean Guitar,Bass Guitar,Drums,Trumpet|M4I3bR
劇場式情緒搖滾|Emo,Pop Punk|Dramatic,Dark,Passionate|Distorted Guitar,Piano,Drums,String Orchestra|M3G4cP`,

        '獨立・另類': `
獨立搖滾|Indie Rock,Alternative Rock|Energetic,Bittersweet|Electric Guitar,Bass Guitar,Drums|M2I4cC
千禧獨立搖滾舞曲|Indie Rock,Garage Rock|Groovy,Urban,Energetic|Clean Guitar,Bass Guitar,Drums,Cowbell|M4I4cR
90 大學搖滾|Indie Rock,Alternative Rock|Nostalgic,Wistful,Melancholic|Clean Guitar,Distorted Guitar,Bass Guitar,Drums|M2I3bL
Lo-Fi 獨立搖滾|Indie Rock,Lo-Fi|Mellow,Melancholic,Intimate|Clean Guitar,Tape Hiss,Bass Guitar,Drums|M4I2bL
懶散搖滾|Indie Rock,Garage Rock|Chill,Carefree,Sarcastic|Clean Guitar,Bass Guitar,Drums,Shaker|M4I3dL
清新獨立流行|Indie Pop,Pop|Cheerful,Airy,Dreamy|Clean Guitar,Synthesizer,Bass Guitar,Drums|F2I3dC
清新吉他獨立流行|Indie Pop,Britpop|Sweet,Innocent,Playful|Clean Guitar,Tambourine,Glockenspiel,Bass Guitar|F4I40L
合成器獨立流行|Indie Pop,Synth Pop|Dreamy,Retro,Nostalgic|Analog Synth,Drum Machine,Synth Bass,Clean Guitar|F2I3dP
室內流行|Indie Pop,Chamber Music|Elegant,Bittersweet,Gentle|String Quartet,Piano,French Horn,Brushes|M2I2cC
九零夢幻流行|Dream Pop,Indie Pop|Dreamy,Ethereal,Floating|Clean Guitar,Synth Pads,Drum Machine,Bass Guitar|F2I2bP
午夜夢幻流行|Dream Pop,Synth Pop|Sultry,Longing,Dreamy|Synth Pads,Analog Synth,Drum Machine,Saxophone|F2I2dP
Shoegaze 音牆|Shoegaze,Alternative Rock|Floating,Hypnotic,Intense|Distorted Guitar,Bass Guitar,Drums,Synth Pads|D6I3bL
夢幻瞪鞋|Shoegaze,Dream Pop|Ethereal,Floating,Wistful|Distorted Guitar,Clean Guitar,Bass Guitar,Drums|F6I2bL
新瞪鞋電子|Shoegaze,Electropop|Hypnotic,Dreamy,Euphoric|Distorted Guitar,Synthesizer,Electronic Drums,Vocal Chops|F6I3dP
重型瞪鞋|Shoegaze,Metal|Dark,Haunting,Floating|Distorted Guitar,Bass Guitar,Drums,Cymbals|M6I2dR
後搖滾|Post-Rock,Ambient|Epic,Hopeful,Reflective|Clean Guitar,Distorted Guitar,Drums,String Quartet|M6G2cC
弦樂後搖滾史詩|Post-Rock,Cinematic|Majestic,Epic,Ethereal|String Orchestra,Clean Guitar,Timpani,Glockenspiel|C6G1cP
鋼琴後搖滾|Post-Rock,Neoclassical|Reflective,Melancholic,Serene|Piano,Clean Guitar,Cello,Brushes|M6C1dC
唸白後搖滾|Post-Rock,Indie Rock|Haunting,Lonely,Tense|Spoken Word,Clean Guitar,Bass Guitar,Drums|M3I2cR
數字搖滾|Math Rock,Indie Rock|Quirky,Energetic,Playful|Clean Guitar,Bass Guitar,Drums|M6I4cC
鋼琴數字搖滾|Math Rock,J-Pop|Joyful,Energetic,Whimsical|Clean Guitar,Piano,Bass Guitar,Drums|F2I5dC
數字流行|Math Rock,Indie Pop|Playful,Optimistic,Quirky|Clean Guitar,Synthesizer,Drums,Claps|M4I4dP
車庫搖滾|Garage Rock,Rock|Gritty,Wild,Retro|Distorted Guitar,Organ,Drums,Tambourine|M4I40R
吉他鼓二重奏藍調|Garage Rock,Blues|Gritty,Fierce,Passionate|Distorted Guitar,Drums,Slide Guitar|M1I3cR
車庫迷幻|Garage Rock,Psychedelic Rock|Psychedelic,Wild,Hypnotic|Distorted Guitar,Organ,Bass Guitar,Drums|M2I4dL
Lo-Fi 臥室獨立|Bedroom Pop,Lo-Fi|Chill,Cozy,Nostalgic|Clean Guitar,Drum Machine,Tape Hiss,Rhodes|M4C2dL
卡帶四軌獨立|Lo-Fi,Indie Folk|Intimate,Vulnerable,Wistful|Acoustic Guitar,Tape Hiss,Toy Piano,Humming|M2I2bL
Trip Hop 神遊|Trip Hop,Downtempo|Hypnotic,Mysterious,Dark|Sampler,Vinyl Crackle,Sub Bass,Rhodes|F2I2bP
弦樂 Trip Hop|Trip Hop,Cinematic|Suspenseful,Dramatic,Melancholic|String Orchestra,Drum Machine,Upright Bass,Turntable Scratches|F2I2bP
爵士 Trip Hop|Trip Hop,Jazz|Sultry,Urban,Mellow|Muted Trumpet,Upright Bass,Brushes,Vinyl Crackle|F2C2bL
Chillwave 夏日|Chillwave,Indie Pop|Chill,Nostalgic,Floating|Synth Pads,Drum Machine,Clean Guitar,Tape Hiss|M2C3dL
獨立電子|Indie Pop,Electro|Energetic,Dreamy,Urban|Synthesizer,Electronic Drums,Bass Guitar,Vocal Chops|M2I4cP
獨立舞曲搖滾|Indie Rock,Disco|Groovy,Fun,Energetic|Bass Guitar,Clean Guitar,Synthesizer,Drums|M4P4cP
民謠電子|Indie Folk,Downtempo|Serene,Dreamy,Airy|Acoustic Guitar,Glitch,Synth Pads,Field Recordings|M2C2cC
另類搖滾聖歌|Alternative Rock,Indie Rock|Rousing,Triumphant,Passionate|Electric Guitar,Piano,Drums,String Orchestra|M2G3cP
鋼琴另類搖滾|Alternative Rock,Art Pop|Melancholic,Haunting,Ethereal|Piano,Synth Pads,Bass Guitar,Drums|M6I2cP
實驗藝術搖滾|Alternative Rock,IDM|Anxious,Sci-Fi,Mysterious|Glitch,Analog Synth,Electronic Drums,Clean Guitar|M6I3cP
噪音搖滾|Alternative Rock,Garage Rock|Chaotic,Aggressive,Menacing|Distorted Guitar,Bass Guitar,Drums,Sound Effects|M6I4aR
極簡後龐克復興|Indie Rock,Punk|Minimal,Tense,Energetic|Bass Guitar,Clean Guitar,Drums|M4I4cR
悲傷核慢歌|Indie Rock,Singer-Songwriter|Sad,Empty,Tired|Clean Guitar,Bass Guitar,Brushes,Slide Guitar|M2E1bL
獨立創作女聲|Indie Rock,Singer-Songwriter|Vulnerable,Defiant,Bittersweet|Electric Guitar,Bass Guitar,Drums,Harmonies|F2E3dC
怪奇民謠|Indie Folk,Psychedelic Rock|Whimsical,Psychedelic,Quirky|Acoustic Guitar,Harp,Recorder,Shaker|F2I2cA
巴洛克獨立流行|Indie Pop,Baroque|Elegant,Whimsical,Bittersweet|Harpsichord,Trumpet,String Quartet,Drums|M3I3cC
大編制獨立樂團|Indie Rock,Art Pop|Rousing,Euphoric,Dramatic|Violin,Accordion,Glockenspiel,Drums|C3G4cC
另類鄉村|Alternative Rock,Americana|Rustic,Bittersweet,Regretful|Steel Guitar,Electric Guitar,Bass Guitar,Drums|M3E3bC
玩具樂器獨立流行|Indie Pop,Bedroom Pop|Childlike,Whimsical,Playful|Toy Piano,Ukulele,Glockenspiel,Claps|F4I3dL
蒸氣波獨立|Vaporwave,Indie Pop|Retro,Dreamy,Hypnotic|Sampler,Synth Pads,Drum Machine,Saxophone|M6I2eL
獨立衝浪搖滾|Indie Rock,Surf Rock|Carefree,Nostalgic,Happy|Clean Guitar,Bass Guitar,Drums,Tambourine|M4I4dL
冷浪潮|Synth Pop,Alternative Rock|Gloomy,Minimal,Anxious|Analog Synth,Drum Machine,Bass Guitar,Clean Guitar|M6I4aL
氛圍獨立|Indie Rock,Ambient|Ethereal,Meditative,Calm|Clean Guitar,Synth Pads,Field Recordings,Brushes|F6C1dC`,

        '民謠・鄉村': `
民謠吉他彈唱|Acoustic,Folk|Gentle,Hopeful,Reflective|Acoustic Guitar,Harmonica|M1E20A
指彈木吉他情歌|Acoustic,Singer-Songwriter|Tender,Romantic,Intimate|Acoustic Guitar,Humming|M2C2dA
咖啡廳原聲|Acoustic,Pop|Cozy,Relaxed,Cheerful|Acoustic Guitar,Cajon,Shaker,Upright Bass|F4C3dA
獨立民謠|Indie Folk,Folk|Wistful,Melancholic,Rustic|Acoustic Guitar,Banjo,Harmonies,Upright Bass|M2I2dA
森林系獨立民謠|Indie Folk,Dream Pop|Ethereal,Serene,Dreamy|Acoustic Guitar,Harmonies,Synth Pads,Field Recordings|M2I1dC
跺腳拍手民謠|Indie Folk,Folk Rock|Rousing,Joyful,Rustic|Banjo,Acoustic Guitar,Claps,Drums|C1P4dC
室內民謠|Indie Folk,Chamber Music|Elegant,Bittersweet,Intimate|Acoustic Guitar,Cello,Violin,Piano|F2I2dC
創作歌手|Singer-Songwriter,Folk|Reflective,Bittersweet,Hopeful|Acoustic Guitar,Piano,Harmonica|M3E20C
鋼琴創作歌手|Singer-Songwriter,Ballad|Vulnerable,Sad,Hopeful|Upright Piano,Cello,Brushes|F3E20C
70 峽谷創作民謠|Singer-Songwriter,Soft Rock|Mellow,Nostalgic,Warm|Acoustic Guitar,Piano,Bass Guitar,Harmonies|F3E20L
60 抗議民謠|Folk,Singer-Songwriter|Defiant,Determined,Hopeful|Acoustic Guitar,Harmonica,Tambourine|M3I30A
英倫傳統民謠|Folk,Celtic|Haunting,Melancholic,Rustic|Acoustic Guitar,Fiddle,Recorder,Double Bass|F3I20A
美式鄉村|Country,Folk|Rustic,Nostalgic,Cheerful|Acoustic Guitar,Steel Guitar,Fiddle,Drums|M3R30C
納許維爾經典鄉村|Country,Ballad|Heartbroken,Sentimental,Regretful|Steel Guitar,Piano,Acoustic Guitar,String Orchestra|M3E20P
酒吧鄉村|Country,Rockabilly|Playful,Bittersweet,Rustic|Steel Guitar,Fiddle,Upright Piano,Upright Bass|M3P40L
叛道鄉村|Country,Rock|Rebellious,Gritty,Defiant|Electric Guitar,Steel Guitar,Bass Guitar,Drums|M3I30R
西部牛仔民謠|Country,Americana|Lonely,Rustic,Peaceful|Nylon Guitar,Whistling,Harmonica,Upright Bass|M3E20L
90 排舞鄉村|Country,Country Pop|Fun,Festive,Energetic|Fiddle,Electric Guitar,Steel Guitar,Drums|M4P4bP
鄉村流行|Country Pop,Pop|Sweet,Optimistic,Romantic|Acoustic Guitar,Banjo,Electric Guitar,Drums|F3R3cP
鄉村流行情歌|Country Pop,Ballad|Romantic,Longing,Tender|Acoustic Guitar,Piano,Steel Guitar,String Quartet|F3E2dP
鄉村搖滾|Country,Hard Rock|Wild,Confident,Energetic|Electric Guitar,Slide Guitar,Drums,Bass Guitar|M3P4dP
卡車派對鄉村|Country Pop,Pop Rap|Fun,Carefree,Bold|Banjo,Electric Guitar,Drum Machine,Claps|M4P3dP
鄉村男女對唱|Country,Country Pop|Romantic,Bittersweet,Sentimental|Acoustic Guitar,Steel Guitar,Piano,Drums|D5E2dP
鄉村福音|Country,Gospel|Sacred,Grateful,Uplifting|Acoustic Guitar,Piano,Gospel Choir,Hammond Organ|C1E20C
藍草|Bluegrass,Country|Energetic,Joyful,Rustic|Banjo,Mandolin,Fiddle,Upright Bass|M3P50A
藍草和聲慢歌|Bluegrass,Folk|Sorrowful,Homesick,Gentle|Mandolin,Acoustic Guitar,Harmonies,Double Bass|C3E20A
新派藍草|Bluegrass,Indie Folk|Playful,Optimistic,Airy|Mandolin,Banjo,Violin,Acoustic Guitar|M2I4dA
阿帕拉契山歌|Folk,Bluegrass|Haunting,Lonely,Rustic|Banjo,Fiddle,Humming|F3I20R
Americana 根源|Americana,Folk|Nostalgic,Bittersweet,Mellow|Acoustic Guitar,Slide Guitar,Hammond Organ,Brushes|M3E20C
公路 Americana|Americana,Folk Rock|Carefree,Hopeful,Determined|Electric Guitar,Mandolin,Harmonica,Drums|M3E3dC
暗黑南方民謠|Americana,Blues|Ominous,Dark,Haunting|Banjo,Slide Guitar,Tambourine,Upright Bass|M3I2dR
三角洲藍調民謠|Delta Blues,Folk|Sorrowful,Gritty,Tired|Slide Guitar,Harmonica,Acoustic Guitar|M3E20R
凱爾特豎琴民謠|Celtic,Folk|Serene,Elegant,Peaceful|Harp,Tin Whistle,Fiddle,Acoustic Guitar|F2C20A
愛爾蘭酒館舞曲|Celtic,Folk|Festive,Joyful,Energetic|Fiddle,Accordion,Tin Whistle,Mandolin|C4P50R
蘇格蘭高地風笛|Celtic,March|Majestic,Heroic,Rousing|Bagpipes,Snare Drum,Fiddle,Acoustic Guitar|C3G30R
凱爾特空靈女聲|Celtic,New Age|Ethereal,Spiritual,Soothing|Harp,Synth Pads,Tin Whistle,Choir|F2C1bP
水手歌|Sea Shanty,Folk|Rousing,Energetic,Determined|Accordion,Crowd Chants,Fiddle,Percussion|C3P30R
水手思鄉慢歌|Sea Shanty,Celtic|Homesick,Longing,Melancholic|Accordion,Acoustic Guitar,Ocean Waves,Harmonies|M3E20A
營火合唱|Folk,Acoustic|Warm,Cozy,Joyful|Acoustic Guitar,Harmonica,Claps,Harmonies|C4C30A
兒童營隊歌謠|Folk,Acoustic|Childlike,Playful,Innocent|Ukulele,Claps,Children's Choir,Tambourine|K4C30A
民謠搖滾樂團|Folk Rock,Folk|Uplifting,Warm,Nostalgic|Acoustic Guitar,Electric Guitar,Hammond Organ,Drums|M3E30C
電氣民謠搖滾|Folk Rock,Americana|Passionate,Defiant,Bittersweet|12-String Guitar,Harmonica,Organ,Drums|M2I30R
夏威夷島嶼民謠|Hawaiian,Acoustic|Relaxed,Exotic,Peaceful|Ukulele,Steel Guitar,Ocean Waves,Shaker|M1C20A
吉普賽流浪民謠|Folk,Gypsy Jazz|Passionate,Exotic,Playful|Nylon Guitar,Violin,Accordion,Double Bass|M3P40A
冬日爐邊民謠|Indie Folk,Acoustic|Cozy,Calm,Nostalgic|Acoustic Guitar,Piano,Cello,Humming|F2C1dA
鄉間晨光民謠|Folk,Indie Folk|Peaceful,Hopeful,Airy|Acoustic Guitar,Mandolin,Flute,Field Recordings|F2C2dA
旅行公路民謠|Folk,Pop|Carefree,Optimistic,Happy|Acoustic Guitar,Ukulele,Whistling,Cajon|M4C3dA
西部荒野敘事曲|Country,Cinematic|Suspenseful,Lonely,Dramatic|Nylon Guitar,Whistling,Trumpet,Tubular Bells|M3G20P
民謠搖籃曲|Folk,Lullaby|Sleepy,Soothing,Gentle|Acoustic Guitar,Music Box,Humming|F2C10A
多部和聲民謠|Folk,Indie Folk|Ethereal,Bittersweet,Warm|Harmonies,Acoustic Guitar,Banjo,Double Bass|C2I2dA`,

        'House・Techno': `
Deep House 深夜|Deep House|Hypnotic,Sultry,Urban|Rhodes,Synth Bass,Drum Machine,Vocal Chops|F2C4dP
Deep House 泳池|Deep House,House|Carefree,Relaxed,Groovy|Rhodes,Synth Bass,Shaker,Claps|F4C4dP
靈魂 Deep House|Deep House,Soul|Warm,Groovy,Passionate|Rhodes,Bass Guitar,Drum Machine,Backing Vocals|F1E4dC
漸進浩室・日出|Progressive House|Uplifting,Hopeful,Euphoric|Supersaw,Piano,Synth Pads,Risers|F2G4dP
漸進浩室・長篇鋪陳|Progressive House,Trance|Hypnotic,Dreamy,Floating|Arpeggio,Synth Pads,Sub Bass,Drum Machine|F6I4dP
熱帶浩室・海島假期|Tropical House|Carefree,Cheerful,Exotic|Steel Drums,Marimba,Pluck Synth,Synth Bass|M4C3dP
熱帶浩室・夕陽情歌|Tropical House,Pop|Romantic,Bittersweet,Wistful|Pluck Synth,Acoustic Guitar,Pan Flute,Vocal Chops|D1R3dP
Tech House 地下|Tech House|Groovy,Hypnotic,Gritty|Drum Machine,Synth Bass,Percussion,Vocal Chops|M4P4dP
Tech House 洗腦|Tech House,House|Quirky,Fun,Groovy|Drum Machine,Sub Bass,Cowbell,Spoken Word|M4P4dC
拉丁 Tech House|Tech House,Latin|Exotic,Passionate,Groovy|Congas,Timbales,Synth Bass,Drum Machine|M4P4dP
UK Garage 兩步舞曲|UK Garage|Energetic,Playful,Urban|Vocal Chops,Sub Bass,Drum Machine,Organ|F4P4cP
UK Garage 深夜街頭|UK Garage,R&B|Urban,Longing,Melancholic|Vocal Chops,Sub Bass,Rhodes,Electronic Drums|F2I4cC
極速 Garage 低音|UK Garage,House|Energetic,Gritty,Bold|Reese Bass,Drum Machine,Vocal Chops,Organ|M4P4bP
Disco House 派對|House,Disco|Festive,Joyful,Groovy|String Orchestra,Bass Guitar,Drum Machine,Claps|F1P4dP
法式濾波浩室|House,Funk|Groovy,Retro,Euphoric|Sampler,Slap Bass,Drum Machine,Vocoder|M4P4cP
Piano House 狂歡|House|Euphoric,Joyful,Uplifting|Piano,Organ,Drum Machine,Gospel Choir|F1P4bP
Vocal House 天后|House,Soul|Confident,Powerful,Uplifting|Piano,Synth Bass,Drum Machine,Backing Vocals|F1P4bP
芝加哥老派浩室|House|Retro,Groovy,Energetic|Drum Machine,Synth Bass,Piano,Claps|M4P4aL
Acid House 酸浩室|House,Techno|Psychedelic,Hypnotic,Wild|Analog Synth,Drum Machine,Claps,Sound Effects|M6P4aR
Afro House 部落|House,Afrobeat|Spiritual,Hypnotic,Exotic|Djembe,Percussion,Synth Pads,Chant|C2I4dP
爵士浩室・午後|House,Jazz|Mellow,Elegant,Relaxed|Rhodes,Saxophone,Upright Bass,Drum Machine|F2C4dC
Lo-Fi House 朦朧|House,Lo-Fi|Nostalgic,Dreamy,Wistful|Tape Hiss,Synth Pads,Drum Machine,Vocal Chops|F2I4dL
未來浩室・彈跳貝斯|House,EDM|Energetic,Fun,Playful|Synth Bass,Pluck Synth,Electronic Drums,Vocal Chops|M4P4dP
Bass House 重低音|House,Dubstep|Aggressive,Bold,Gritty|Reese Bass,Electronic Drums,Risers,Vocal Chops|M4P4dP
電氣浩室・鋸齒音牆|House,Electro|Intense,Wild,Energetic|Lead Synth,Synth Bass,Electronic Drums,Risers|M4P4cP
旋律浩室・沉思|Progressive House,Deep House|Reflective,Melancholic,Hypnotic|Arpeggio,Analog Synth,Sub Bass,Drum Machine|M2I4dP
有機浩室・自然系|Deep House,Downtempo|Serene,Meditative,Airy|Hang Drum,Percussion,Synth Pads,Field Recordings|F2C3dC
Slap House 兜風|Deep House,Dance Pop|Sultry,Dark,Urban|Synth Bass,Pluck Synth,Drum Machine,Vocal Chops|F1R4dP
福音浩室・讚美|House,Gospel|Sacred,Uplifting,Joyful|Gospel Choir,Hammond Organ,Piano,Drum Machine|C1E4bP
極簡 Techno|Techno,Minimalism|Minimal,Hypnotic|Drum Machine,Sub Bass,Glitch,Percussion|M6I4dC
底特律 Techno|Techno|Sci-Fi,Optimistic,Hypnotic|Analog Synth,Drum Machine,Synth Pads,String Orchestra|M6I4aL
柏林倉庫 Techno|Techno|Dark,Hypnotic,Intense|Drum Machine,Sub Bass,Sound Effects,Synth Pads|M6I4dR
酸性 Techno|Techno|Psychedelic,Aggressive,Chaotic|Analog Synth,Drum Machine,Risers,Sound Effects|M6P5bR
工業 Techno|Techno|Menacing,Gritty,Aggressive|Drum Machine,Distorted Guitar,Sound Effects,Sub Bass|M6I5dR
旋律 Techno 史詩|Techno,Progressive House|Epic,Haunting,Ethereal|Arpeggio,Analog Synth,Sub Bass,Drum Machine|F2G4dP
Hard Techno 狂奔|Techno,Hardstyle|Fierce,Aggressive,Rousing|Drum Machine,Reese Bass,Risers,Crowd Chants|M4P5dP
Dub Techno 回聲|Techno,Dub|Hypnotic,Floating,Minimal|Synth Pads,Sub Bass,Drum Machine,Vinyl Crackle|M6C3bL
高峰時段 Techno|Techno|Powerful,Energetic,Tense|Drum Machine,Lead Synth,Risers,Sub Bass|M6P4dP
振奮 Trance 飛升|Trance|Euphoric,Uplifting,Triumphant|Supersaw,Arpeggio,Synth Pads,Risers|F2G4cP
女聲 Trance 空靈|Trance|Ethereal,Floating,Longing|Supersaw,Synth Pads,Piano,Arpeggio|F2E4cP
漸進 Trance 旅程|Trance,Progressive House|Floating,Hypnotic,Hopeful|Arpeggio,Pluck Synth,Synth Pads,Sub Bass|F2I4cP
Tech Trance 硬派|Trance,Techno|Intense,Determined,Energetic|Lead Synth,Drum Machine,Risers,Synth Bass|M6P4cP
Goa Trance 果亞|Trance,Psytrance|Psychedelic,Exotic,Spiritual|Arpeggio,Analog Synth,Sitar,Drum Machine|M6I5bR
Psytrance 迷幻狂奔|Psytrance|Psychedelic,Wild,Intense|Synth Bass,Arpeggio,Sound Effects,Drum Machine|M6P5dP
森林系暗黑 Psy|Psytrance|Sinister,Psychedelic,Ominous|Synth Bass,Glitch,Sound Effects,Drum Machine|M6I5dR
Psychill 迷幻放鬆|Psytrance,Downtempo|Meditative,Psychedelic,Soothing|Synth Pads,Sitar,Tabla,Field Recordings|F6C2dC
Eurodance 九零舞廳|Eurodance|Retro,Happy,Energetic|Lead Synth,Synth Bass,Drum Machine,Piano|D1P4bP
Eurodance 熱血勵志|Eurodance,Dance Pop|Inspiring,Rousing,Energetic|Supersaw,Synth Bass,Drum Machine,Backing Vocals|F1P4bP
義式 Italo Disco|Disco,Eurodance|Retro,Romantic,Sci-Fi|Analog Synth,Arpeggio,Drum Machine,Synth Bass|M1R3aL
Hands Up 高速電音|Eurodance,Trance|Euphoric,Cheerful,Energetic|Supersaw,Lead Synth,Electronic Drums,Risers|F1P5cP`,

        'EDM・Bass': `
Future Bass 甜蜜|Future Bass|Sweet,Dreamy,Euphoric|Supersaw,Vocal Chops,808 Bass,Electronic Drums|F2R5dP
Future Bass 心碎|Future Bass,Pop|Heartbroken,Bittersweet,Vulnerable|Supersaw,Piano,Vocal Chops,Sub Bass|F1E5dP
Kawaii Bass 可愛|Future Bass,J-Pop|Childlike,Playful,Sweet|Pluck Synth,Chimes,Vocal Chops,8-bit Synth|F4P5dP
Chill Trap 慵懶|Future Bass,Trap|Chill,Dreamy,Mellow|Synth Pads,808 Bass,Vocal Chops,Bells|F2C2dP
旋律 Bass 史詩|Future Bass,Dubstep|Epic,Uplifting,Passionate|Supersaw,Sub Bass,Piano,Risers|F2G5dP
Big Room 主舞台|Big Room|Powerful,Rousing,Intense|Supersaw,Electronic Drums,Risers,Crowd Chants|M4P4dP
Big Room 萬人跳躍|Big Room,EDM|Energetic,Euphoric,Wild|Lead Synth,Electronic Drums,Risers,Sub Bass|M4P4dP
音樂祭大合唱|EDM,Progressive House|Uplifting,Triumphant,Hopeful|Supersaw,Piano,Crowd Chants,Electronic Drums|M1G4dP
音樂祭日落時段|EDM,Tropical House|Carefree,Nostalgic,Warm|Pluck Synth,Acoustic Guitar,Vocal Chops,Electronic Drums|F1R3dP
EDM 流行情歌|EDM,Pop|Romantic,Uplifting,Sweet|Supersaw,Piano,Vocal Chops,Synth Bass|F1R4dP
EDM 男女對唱|EDM,Dance Pop|Bittersweet,Longing,Energetic|Pluck Synth,Synth Bass,Electronic Drums,Vocal Chops|D5R3dP
Dubstep 重擊|Dubstep|Aggressive,Powerful,Fierce|Reese Bass,Electronic Drums,Risers,Sound Effects|M4P5dP
Brostep 咆哮低音|Dubstep,EDM|Aggressive,Wild,Chaotic|Synth Bass,Electronic Drums,Glitch,Risers|M4P5dP
Riddim 重複轟炸|Dubstep|Menacing,Hypnotic,Dark|Sub Bass,Electronic Drums,Sound Effects,Glitch|M6P5dP
旋律 Dubstep 感傷|Dubstep|Sentimental,Bittersweet,Ethereal|Supersaw,Piano,Sub Bass,Vocal Chops|F2E5dP
深沉 Dubstep 暗巷|Dubstep,Dub|Ominous,Minimal,Dark|Sub Bass,Drum Machine,Synth Pads,Vinyl Crackle|M6I4cR
UK Dubstep 元祖|Dubstep,UK Garage|Gloomy,Urban,Lonely|Sub Bass,Drum Machine,Vocal Chops,Field Recordings|M2I4cL
金屬 Dubstep|Dubstep,Metal|Angry,Fierce,Intense|Distorted Guitar,Reese Bass,Electronic Drums,Risers|M1P5dP
交響 Dubstep|Dubstep,Orchestral|Epic,Dramatic,Dark|String Orchestra,Choir,Sub Bass,Electronic Drums|F2G5dP
Liquid DnB 流動|Drum and Bass|Floating,Mellow,Dreamy|Rhodes,Sub Bass,Synth Pads,Drums|F2C5dP
Liquid DnB 女聲|Drum and Bass,Soul|Warm,Uplifting,Romantic|Piano,Sub Bass,Drums,Backing Vocals|F1E5cP
Neurofunk 機械低音|Drum and Bass|Sci-Fi,Menacing,Aggressive|Reese Bass,Electronic Drums,Glitch,Sound Effects|M6I5dP
Jump Up 彈跳 DnB|Drum and Bass|Fun,Energetic,Bold|Synth Bass,Electronic Drums,Risers,Ad-libs|M4P5dP
Jungle 叢林碎拍|Drum and Bass,Breakbeat|Wild,Retro,Energetic|Sampler,Sub Bass,Drums,Vocal Chops|M4P5bL
雷鬼 Jungle 叢林|Drum and Bass,Dancehall|Rebellious,Gritty,Energetic|Sampler,Sub Bass,Drums,Ad-libs|M4P5bR
DnB 流行舞曲|Drum and Bass,Pop|Inspiring,Energetic,Optimistic|Supersaw,Piano,Sub Bass,Electronic Drums|F1R5dP
氛圍系 DnB|Drum and Bass,Ambient|Ethereal,Airy,Reflective|Synth Pads,Sub Bass,Drums,Field Recordings|F6I5bC
黑暗系 DnB|Drum and Bass|Sinister,Tense,Dark|Reese Bass,Drums,Sound Effects,Synth Pads|M6I5cR
Halftime 半速低音|Drum and Bass,Trap|Ominous,Hypnotic,Gritty|Reese Bass,808 Bass,Electronic Drums,Glitch|M6I2dP
Hardstyle 硬派|Hardstyle|Defiant,Powerful,Aggressive|Lead Synth,Electronic Drums,Risers,Crowd Chants|M4P5dP
Hardstyle 熱淚旋律|Hardstyle|Euphoric,Tearful,Triumphant|Supersaw,Electronic Drums,Piano,Risers|F2G5dP
Rawstyle 兇猛重踢|Hardstyle|Fierce,Menacing,Dark|Lead Synth,Electronic Drums,Sound Effects,Sub Bass|M4P5dR
歡樂硬蕊 Hardcore|Hardstyle,Eurodance|Joyful,Euphoric,Energetic|Supersaw,Piano,Electronic Drums,Vocal Chops|F1P5bP
Frenchcore 極速|Hardstyle,Techno|Chaotic,Aggressive,Intense|Electronic Drums,Lead Synth,Risers,Sub Bass|M4P5dR
Trap EDM 音樂祭|Trap,EDM|Bold,Rousing,Aggressive|808 Bass,Brass Section,Electronic Drums,Risers|M4P5dP
Hybrid Trap 混種|Trap,Dubstep|Menacing,Intense,Powerful|808 Bass,Reese Bass,Electronic Drums,Risers|M4P5dP
東方風 Trap EDM|Trap,Chinese Traditional|Exotic,Majestic,Intense|Guzheng,808 Bass,Electronic Drums,Chinese Drums|M2G5dP
Jersey Club 彈跳|EDM,Hip Hop|Playful,Fun,Urban|Drum Machine,Vocal Chops,Sub Bass,Sampler|F4P4dP
Moombahton 熱帶|EDM,Reggaeton|Exotic,Sultry,Energetic|Lead Synth,Percussion,Synth Bass,Electronic Drums|M4P3dP
Big Beat 大節拍|Breakbeat,Rock|Rebellious,Gritty,Energetic|Sampler,Distorted Guitar,Drums,Synth Bass|M4P4bR
Breakbeat 碎拍狂歡|Breakbeat|Groovy,Fun,Energetic|Sampler,Drums,Synth Bass,Turntable Scratches|M4P4bP
Breaks 迷幻碎拍|Breakbeat,Psytrance|Psychedelic,Hypnotic,Mysterious|Arpeggio,Drums,Synth Bass,Sound Effects|M6I4cP
Rave 銳舞復古|Breakbeat,Techno|Euphoric,Retro,Wild|Piano,Lead Synth,Drums,Vocal Chops|F4P5bL
Hyperpop 失控甜心|Hyperpop|Chaotic,Quirky,Playful|Supersaw,Glitch,808 Bass,Vocal Chops|F4P5eP
Hyperpop 心碎故障|Hyperpop,Emo|Heartbroken,Anxious,Chaotic|Glitch,Distorted Guitar,808 Bass,Supersaw|M4I5eP
Glitch Hop 故障|EDM,Hip Hop|Quirky,Groovy,Sci-Fi|Glitch,Synth Bass,Electronic Drums,Sampler|M6I3dP
Complextro 切片|Electro,EDM|Intense,Sci-Fi,Energetic|Lead Synth,Glitch,Synth Bass,Electronic Drums|M4P4cP
Midtempo 暗黑低音|Electro,Dubstep|Sinister,Sci-Fi,Powerful|Reese Bass,Analog Synth,Electronic Drums,Sound Effects|M6G3dP
Color Bass 彩色|Dubstep,Future Bass|Whimsical,Dreamy,Euphoric|Supersaw,Sub Bass,Glitch,Vocal Chops|F2I5eP
Drumstep 混速衝擊|Drum and Bass,Dubstep|Intense,Fierce,Energetic|Reese Bass,Electronic Drums,Supersaw,Risers|M4P5dP`,

        '合成器・復古電子': `
Synthwave 夜間公路|Synthwave|Retro,Urban,Dreamy|Analog Synth,Arpeggio,Drum Machine,Synth Bass|M2I3aP
Outrun 極速追逐|Synthwave|Retro,Energetic,Heroic|Lead Synth,Arpeggio,Electronic Drums,Synth Bass|M2I4aP
Synthwave 霓虹情歌|Synthwave,Synth Pop|Romantic,Retro,Sultry|Analog Synth,Synth Pads,Drum Machine,Saxophone|F1E3aP
Dreamwave 夢境|Synthwave,Dream Pop|Dreamy,Floating,Nostalgic|Synth Pads,Arpeggio,Clean Guitar,Drum Machine|F2C2aP
Darksynth 暗黑合成|Synthwave,Electro|Menacing,Dark,Aggressive|Analog Synth,Distorted Guitar,Electronic Drums,Synth Bass|M6I4aP
恐怖片合成器配樂|Synthwave,Dark Ambient|Spooky,Suspenseful,Ominous|Analog Synth,Synth Pads,Pipe Organ,Sound Effects|M6I3aL
Cyberpunk 賽博龐克|Synthwave,Techno|Sci-Fi,Urban,Tense|Reese Bass,Lead Synth,Electronic Drums,Glitch|M6G4eP
Synthwave 電影配樂|Synthwave,Cinematic|Epic,Retro,Hopeful|Analog Synth,Synth Pads,Arpeggio,Timpani|M2G3aP
Vaporwave 商場幻境|Vaporwave|Retro,Hypnotic,Dreamy|Sampler,Synth Pads,Tape Hiss,Saxophone|M6I1aL
Vaporwave 深夜電視|Vaporwave,Lounge|Sleepy,Lonely,Retro|Rhodes,Sampler,Vinyl Crackle,Drum Machine|F6I2bL
Mallsoft 空蕩賣場|Vaporwave,Ambient|Empty,Nostalgic,Floating|Synth Pads,Field Recordings,Tape Hiss,Sampler|F6C1aL
Chillwave 夏日回憶|Chillwave|Nostalgic,Wistful,Dreamy|Synth Pads,Tape Hiss,Drum Machine,Clean Guitar|M2C2dL
Chillwave 海邊兜風|Chillwave,Indie Pop|Carefree,Chill,Airy|Analog Synth,Synth Bass,Drum Machine,Ocean Waves|M2C3dL
Future Funk 舞動|Future Funk|Groovy,Joyful,Energetic|Sampler,Slap Bass,Drum Machine,Vocal Chops|F4P4dP
Future Funk 動漫|Future Funk,City Pop|Retro,Playful,Cheerful|Sampler,Bass Guitar,Horn Section,Drum Machine|F1P4aL
Nu Disco 時髦舞池|Nu Disco|Groovy,Flirty,Elegant|Bass Guitar,Clean Guitar,Analog Synth,Drum Machine|F1R3dP
Nu Disco 慵懶週末|Nu Disco,Deep House|Relaxed,Groovy,Mellow|Rhodes,Bass Guitar,Shaker,Synth Pads|M4C3dC
Disco 七零舞廳|Disco|Festive,Groovy,Joyful|String Orchestra,Bass Guitar,Drums,Horn Section|F1P30C
Disco 華麗弦樂|Disco,Soul|Elegant,Passionate,Festive|String Orchestra,Clavinet,Bass Guitar,Backing Vocals|F1P30P
Space Disco 太空|Disco,Electro|Sci-Fi,Groovy,Whimsical|Analog Synth,Vocoder,Arpeggio,Bass Guitar|M6I3aL
Electro 霹靂舞|Electro,Hip Hop|Retro,Urban,Fun|Drum Machine,Vocoder,Analog Synth,Turntable Scratches|M4P3aL
電氣放克機器人|Electro,Funk|Quirky,Groovy,Sci-Fi|Talkbox,Synth Bass,Drum Machine,Claps|M4P3aP
電氣衝擊・冷酷時尚|Electro,Punk|Sarcastic,Bold,Sexy|Analog Synth,Drum Machine,Synth Bass,Spoken Word|F4I4cR
Chiptune 冒險|Chiptune|Childlike,Heroic,Cheerful|8-bit Synth,Arpeggio,Drum Machine,Sound Effects|K4P4aL
Chiptune 魔王關卡|Chiptune,Video Game Music|Tense,Menacing,Epic|8-bit Synth,Arpeggio,Electronic Drums,Lead Synth|M6G5aL
Chiptune 溫柔結局|Chiptune,Ballad|Bittersweet,Tender,Nostalgic|8-bit Synth,Music Box,Piano,Synth Pads|F2E2aL
Bitpop 像素流行|Chiptune,Synth Pop|Playful,Fun,Sweet|8-bit Synth,Synth Bass,Electronic Drums,Vocal Chops|F4R4dP
電子搖擺・復古舞會|Electro Swing|Retro,Playful,Festive|Clarinet,Muted Trumpet,Sampler,Drum Machine|F4P4dP
電子搖擺・地下酒館|Electro Swing,Swing|Groovy,Wild,Retro|Brass Section,Upright Bass,Piano,Electronic Drums|M3P4dP
電子搖擺・吉普賽|Electro Swing,Gypsy Jazz|Exotic,Passionate,Whimsical|Violin,Accordion,Acoustic Guitar,Drum Machine|D4P4dP
Downtempo 夜晚沙發|Downtempo|Cozy,Relaxed,Mellow|Rhodes,Synth Pads,Drum Machine,Upright Bass|F2C2dC
Downtempo 世界風情|Downtempo,Middle Eastern|Exotic,Mysterious,Meditative|Oud,Tabla,Synth Pads,Sub Bass|F2C2dP
Chillout 海島日落|Downtempo,Lounge|Serene,Romantic,Soothing|Nylon Guitar,Synth Pads,Bongos,Ocean Waves|F2C2cC
Trip Hop 暗夜|Trip Hop|Haunting,Gloomy,Urban|Sampler,Drums,Sub Bass,Vinyl Crackle|F2I2bL
Trip Hop 電影感弦樂|Trip Hop,Cinematic|Dramatic,Melancholic,Suspenseful|String Orchestra,Drums,Upright Bass,Turntable Scratches|F2G2bC
Trip Hop 爵士煙霧|Trip Hop,Jazz|Sultry,Mysterious,Mellow|Rhodes,Muted Trumpet,Drums,Vinyl Crackle|F2I2bL
IDM 聰明舞曲|IDM|Reflective,Ethereal,Sci-Fi|Glitch,Synth Pads,Electronic Drums,Analog Synth|M6I3bC
IDM 故障碎拍|IDM,Breakbeat|Chaotic,Quirky,Intense|Glitch,Sampler,Electronic Drums,Sub Bass|M6I5bC
IDM 溫暖氛圍|IDM,Ambient|Warm,Nostalgic,Innocent|Analog Synth,Tape Hiss,Mellotron,Drum Machine|M6C2bL
Synth Pop 八零金曲|Synth Pop|Retro,Cheerful,Optimistic|Analog Synth,Drum Machine,Synth Bass,Backing Vocals|M1R3aP
Synth Pop 冷調憂鬱|Synth Pop|Melancholic,Lonely,Gloomy|Analog Synth,Drum Machine,Synth Bass,Synth Pads|M2I3aC
Synth Pop 現代復古|Synth Pop,Dance Pop|Confident,Flirty,Energetic|Lead Synth,Synth Bass,Electronic Drums,Arpeggio|F1R4dP
New Wave 新浪潮|Synth Pop,Rock|Quirky,Rebellious,Energetic|Analog Synth,Clean Guitar,Bass Guitar,Drums|M1R4aC
Hi-NRG 高能舞曲|Disco,Synth Pop|Energetic,Euphoric,Bold|Synth Bass,Lead Synth,Drum Machine,Cowbell|F1P4aP
Electropop 閃亮|Electropop|Fun,Cheerful,Flirty|Pluck Synth,Synth Bass,Electronic Drums,Claps|F4R3dP
極簡合成器冷波|Synth Pop,Electro|Minimal,Empty,Dark|Analog Synth,Drum Machine,Arpeggio,Spoken Word|M6I3aL
柏林學派宇宙電子|Electro,Ambient|Sci-Fi,Hypnotic,Floating|Analog Synth,Arpeggio,Mellotron,Synth Pads|M6I30L
Vocoder 機器人情歌|Electro,Synth Pop|Longing,Sci-Fi,Bittersweet|Vocoder,Analog Synth,Drum Machine,Synth Pads|M1E3eP
Lo-Fi 合成器午夜|Lo-Fi,Synthwave|Sleepy,Nostalgic,Reflective|Analog Synth,Tape Hiss,Drum Machine,Rhodes|M2C2aL
Theremin 科幻老片|Electro,Lounge|Spooky,Whimsical,Retro|Theremin,Vibraphone,Organ,Bongos|F6I30L`,

        '嘻哈・饒舌': `
Boom Bap 老派|Boom Bap|Gritty,Retro,Confident|Sampler,Drums,Upright Bass,Turntable Scratches|M3I2bL
Boom Bap 街頭故事|Boom Bap,Hip Hop|Gritty,Reflective,Urban|Sampler,Drums,Piano,Vinyl Crackle|M3I2bR
Boom Bap 靈魂取樣|Boom Bap,Soul|Warm,Nostalgic,Hopeful|Sampler,Drums,Bass Guitar,Backing Vocals|M1E2cL
黃金年代嘻哈|Hip Hop,Boom Bap|Confident,Groovy,Fun|Sampler,Drum Machine,Turntable Scratches,Horn Section|M4P2bL
Old School 派對|Hip Hop,Funk|Festive,Fun,Groovy|Drum Machine,Slap Bass,Turntable Scratches,Claps|M4P3aL
Beatbox 街頭口技|Hip Hop|Playful,Bold,Humorous|Beatbox,Claps,Turntable Scratches,Ad-libs|M4P2aR
Trap 重低音|Trap|Menacing,Dark,Bold|808 Bass,Drum Machine,Synth Pads,Ad-libs|M4P4dP
Trap 炫富派對|Trap,Hip Hop|Confident,Bold,Wild|808 Bass,Drum Machine,Bells,Ad-libs|M4P4dP
旋律 Trap 情緒|Trap,R&B|Melancholic,Vulnerable,Dreamy|808 Bass,Piano,Synth Pads,Drum Machine|M4R4dP
Emo Rap 深夜心碎|Trap,Emo|Heartbroken,Lonely,Empty|Clean Guitar,808 Bass,Drum Machine,Ad-libs|M4E4dP
拉丁 Trap 熱夜|Trap,Reggaeton|Sultry,Passionate,Exotic|808 Bass,Nylon Guitar,Drum Machine,Ad-libs|M4R2dP
Trap 交響史詩|Trap,Orchestral|Epic,Dramatic,Powerful|String Orchestra,808 Bass,Choir,Drum Machine|M3G4dP
Rage 暴衝合成器|Trap,Hyperpop|Wild,Chaotic,Aggressive|Lead Synth,808 Bass,Drum Machine,Ad-libs|M4P5eP
Plugg 輕飄飄|Trap,Cloud Rap|Airy,Dreamy,Carefree|Pluck Synth,808 Bass,Bells,Drum Machine|M4I4dP
UK Drill 陰冷滑音|Drill|Menacing,Gritty,Dark|808 Bass,Piano,Drum Machine,Ad-libs|M4I5dP
NY Drill 取樣派對|Drill,Hip Hop|Bold,Energetic,Urban|Sampler,808 Bass,Drum Machine,Vocal Chops|M4P5dP
Drill 弦樂悲歌|Drill|Sorrowful,Dark,Haunting|Violin,808 Bass,Drum Machine,Piano|M3E5dP
芝加哥 Drill 冷血|Drill,Trap|Menacing,Sinister,Fierce|808 Bass,Bells,Drum Machine,Synth Pads|M4I4dR
Phonk 漂移|Phonk|Menacing,Gritty,Aggressive|Cowbell,808 Bass,Drum Machine,Vocal Chops|M4P4dL
Phonk 孟菲斯老帶|Phonk,Hip Hop|Spooky,Retro,Gritty|Sampler,Tape Hiss,808 Bass,Cowbell|M4I2bL
Phonk 健身爆發|Phonk,Trap|Powerful,Determined,Aggressive|Cowbell,808 Bass,Electronic Drums,Risers|M4P5dP
巴西 Phonk 狂熱|Phonk,Latin|Wild,Exotic,Intense|Cowbell,Sub Bass,Percussion,Vocal Chops|M4P4dP
Cloud Rap 雲端漂浮|Cloud Rap|Floating,Ethereal,Dreamy|Synth Pads,808 Bass,Drum Machine,Vocal Chops|M6I2dL
Cloud Rap 迷幻深夜|Cloud Rap,Trap|Psychedelic,Lonely,Hypnotic|Synth Pads,Sub Bass,Drum Machine,Chimes|M2I2dL
Grime 倫敦快嘴|Grime|Fierce,Urban,Confident|Synth Bass,Electronic Drums,Lead Synth,Ad-libs|M4P4cR
Grime 冰冷合成器|Grime,UK Garage|Tense,Dark,Sci-Fi|Sub Bass,Drum Machine,Pluck Synth,Sound Effects|M4I4cR
G-Funk 西岸陽光|G-Funk|Chill,Groovy,Carefree|Talkbox,Lead Synth,Synth Bass,Drum Machine|M4R2bP
G-Funk 低底盤巡航|G-Funk,Funk|Groovy,Relaxed,Confident|Lead Synth,Slap Bass,Drum Machine,Backing Vocals|M4P2bP
西岸現代彈跳|G-Funk,Hip Hop|Bold,Groovy,Energetic|Synth Bass,Claps,Drum Machine,Piano|M4P2dP
Jazz Rap 爵士饒舌|Jazz Rap|Mellow,Reflective,Elegant|Upright Bass,Rhodes,Drums,Muted Trumpet|M3I2bC
Jazz Rap 薩克斯夜|Jazz Rap,Boom Bap|Wistful,Urban,Mellow|Saxophone,Piano,Drums,Vinyl Crackle|M2I2bL
Jazz Rap 現場樂隊|Jazz Rap,Neo Soul|Warm,Groovy,Passionate|Rhodes,Bass Guitar,Drums,Horn Section|M3E2dR
Pop Rap 排行榜|Pop Rap|Confident,Cheerful,Energetic|Synthesizer,808 Bass,Drum Machine,Claps|M4R3dP
Pop Rap 夏日派對|Pop Rap,Dance Pop|Carefree,Fun,Happy|Pluck Synth,Synth Bass,Electronic Drums,Whistling|M4P3dP
Pop Rap 男女合作|Pop Rap,R&B|Romantic,Bittersweet,Flirty|Piano,808 Bass,Drum Machine,Backing Vocals|D5R2dP
饒舌抒情・家人|Hip Hop,Ballad|Grateful,Tearful,Heartwarming|Piano,String Orchestra,Drums,Backing Vocals|M3E2dC
饒舌抒情・逆境翻身|Hip Hop|Inspiring,Triumphant,Determined|Piano,Gospel Choir,Drums,808 Bass|M3E2dP
Lo-Fi 嘻哈・讀書|Lo-Fi Hip Hop|Cozy,Calm,Soothing|Rhodes,Vinyl Crackle,Drum Machine,Upright Bass|M2C2dL
Lo-Fi 嘻哈・雨夜|Lo-Fi Hip Hop,Lo-Fi|Lonely,Melancholic,Sleepy|Piano,Rain Sounds,Vinyl Crackle,Drum Machine|F2C1dL
Lo-Fi 嘻哈・吉他|Lo-Fi Hip Hop,Jazz|Gentle,Nostalgic,Relaxed|Nylon Guitar,Tape Hiss,Drum Machine,Sub Bass|M2C2dL
意識饒舌・社會觀察|Hip Hop,Jazz Rap|Reflective,Defiant,Hopeful|Sampler,Drums,Bass Guitar,Spoken Word|M3I2dC
硬蕊饒舌・怒火|Hip Hop,Boom Bap|Angry,Fierce,Gritty|Sampler,Drums,Brass Section,Turntable Scratches|M1I2bR
Rap Rock 饒舌搖滾|Hip Hop,Nu Metal|Rebellious,Aggressive,Powerful|Distorted Guitar,Drums,Bass Guitar,Turntable Scratches|M4P3cP
Crunk 南方嘶吼|Hip Hop,Trap|Wild,Rousing,Aggressive|Lead Synth,808 Bass,Drum Machine,Crowd Chants|M4P2cP
南方嘻哈彈跳|Hip Hop|Bold,Playful,Groovy|808 Bass,Brass Section,Drum Machine,Claps|M4P2cP
Chopped 慢速迷醉|Hip Hop,Cloud Rap|Hypnotic,Psychedelic,Tired|Sampler,Sub Bass,Drum Machine,Tape Hiss|M4I1cL
華語饒舌・街頭態度|Hip Hop,C-Pop|Defiant,Confident,Urban|808 Bass,Drum Machine,Erhu,Ad-libs|M4R2dP
台味饒舌・夜市|Hip Hop,Taiwanese Pop|Humorous,Festive,Nostalgic|Sampler,Drum Machine,Suona,Bass Guitar|M4P2dR
Cypher 接力麥克風|Boom Bap|Confident,Fierce,Energetic|Sampler,Drums,Sub Bass,Turntable Scratches|M4I2dR
Afro Trap 非洲節奏|Trap,Afrobeats|Exotic,Joyful,Groovy|Percussion,808 Bass,Marimba,Ad-libs|M4P3dP`,

        'R&B・靈魂・放克': `
當代 R&B 都會|R&B|Urban,Sultry,Romantic|Rhodes,808 Bass,Drum Machine,Backing Vocals|F1R2dP
當代 R&B 分手後|R&B,Pop|Heartbroken,Regretful,Bittersweet|Piano,Sub Bass,Drum Machine,Harmonies|F1E2dP
Trap Soul 深夜訊息|R&B,Trap|Longing,Lonely,Sultry|808 Bass,Synth Pads,Drum Machine,Ad-libs|M4I2dP
另類 R&B 迷霧|R&B,Art Pop|Haunting,Ethereal,Mysterious|Synth Pads,Sub Bass,Electronic Drums,Vocal Chops|F2I1dP
另類 R&B 極簡|R&B,Indie Pop|Minimal,Vulnerable,Intimate|Clean Guitar,Sub Bass,Drum Machine,Harmonies|F2I2dC
臥室 R&B 自白|R&B,Bedroom Pop|Intimate,Tender,Dreamy|Clean Guitar,Rhodes,Drum Machine,Tape Hiss|F4I2dL
90 年代 R&B 情歌|R&B|Romantic,Sentimental,Retro|Rhodes,Bass Guitar,Drum Machine,Harmonies|D1R2bP
New Jack Swing|R&B,Hip Hop|Groovy,Confident,Retro|Drum Machine,Synth Bass,Synthesizer,Backing Vocals|M1P3bP
2000 年代 R&B 夜店|R&B,Dance Pop|Sexy,Flirty,Energetic|Synthesizer,Synth Bass,Drum Machine,Claps|F1P3cP
2000 年代 R&B 抒情|R&B,Ballad|Regretful,Tearful,Longing|Piano,Acoustic Guitar,Drum Machine,Harmonies|M1E1cP
80 年代 R&B 靜夜|R&B,Soul|Sultry,Elegant,Mellow|Rhodes,Saxophone,Fretless Bass,Drum Machine|F1C1aP
Boogie 八零放克舞曲|Funk,Disco|Groovy,Retro,Fun|Synth Bass,Analog Synth,Drum Machine,Claps|F1P3aP
女子團體 R&B|R&B,Pop|Confident,Flirty,Playful|Synth Bass,Drum Machine,Harmonies,Pizzicato Strings|C4R3cP
男子團體和聲 R&B|R&B|Romantic,Tender,Longing|Piano,Bass Guitar,Harmonies,Snaps|C1E1bP
Slow Jam 慢火情歌|R&B,Soul|Sexy,Sultry,Passionate|Rhodes,Bass Guitar,Drums,Saxophone|M1E1bP
Slow Jam 燭光夜|R&B|Intimate,Romantic,Sultry|Wurlitzer,Sub Bass,Snaps,Backing Vocals|F2C1dP
Neo Soul 溫暖午後|Neo Soul|Warm,Mellow,Relaxed|Rhodes,Bass Guitar,Drums,Backing Vocals|F2E2cC
Neo Soul 即興律動|Neo Soul,Jazz|Groovy,Playful,Quirky|Wurlitzer,Upright Bass,Brushes,Scat|F2I2cR
Neo Soul 自我療癒|Neo Soul,R&B|Soothing,Hopeful,Letting Go|Rhodes,Clean Guitar,Drums,Harmonies|F2C2dC
Neo Soul 嘻哈鼓點|Neo Soul,Hip Hop|Chill,Groovy,Nostalgic|Rhodes,Sampler,Bass Guitar,Vinyl Crackle|M4I2cL
經典靈魂・南方|Soul|Passionate,Gritty,Powerful|Hammond Organ,Horn Section,Bass Guitar,Drums|M1E20R
經典靈魂・深情慢歌|Soul,Ballad|Sorrowful,Passionate,Longing|Piano,String Orchestra,Bass Guitar,Backing Vocals|F1E10C
Philly Soul 費城|Soul,Disco|Elegant,Uplifting,Romantic|String Orchestra,Vibraphone,Bass Guitar,Drums|C1R30P
北方靈魂・徹夜舞廳|Soul,Motown|Energetic,Joyful,Retro|Tambourine,Horn Section,Piano,Bass Guitar|M1P40R
藍調靈魂・酒吧|Soul,Blues|Melancholic,Gritty,Passionate|Electric Guitar,Hammond Organ,Bass Guitar,Drums|M1E20R
復古靈魂・新唱法|Soul,Pop|Retro,Bittersweet,Bold|Brass Section,Upright Piano,Bass Guitar,Drums|F1R2dR
迷幻靈魂|Soul,Psychedelic Rock|Psychedelic,Groovy,Intense|Electric Guitar,Clavinet,String Orchestra,Congas|M2I20R
Motown 經典|Motown|Cheerful,Romantic,Retro|Tambourine,Bass Guitar,Piano,Horn Section|M1R30C
Motown 女子三重唱|Motown,Pop|Sweet,Innocent,Flirty|Tambourine,Bass Guitar,Vibraphone,Backing Vocals|C1R30C
Motown 心碎舞曲|Motown,Soul|Bittersweet,Heartbroken,Energetic|Piano,Bass Guitar,Drums,String Orchestra|M1E30C
Funk 硬派律動|Funk|Groovy,Gritty,Powerful|Slap Bass,Clavinet,Horn Section,Drums|M4P30R
P-Funk 太空放克|Funk|Psychedelic,Whimsical,Groovy|Synth Bass,Talkbox,Clavinet,Crowd Chants|C4P30R
Funk 吉他刷扣|Funk,Soul|Groovy,Fun,Cheerful|Clean Guitar,Bass Guitar,Drums,Brass Section|M4P30R
Minneapolis 放克|Funk,Synth Pop|Sexy,Bold,Groovy|Analog Synth,Drum Machine,Clean Guitar,Synth Bass|M1P4aP
Funk Rock 放克搖滾|Funk,Rock|Wild,Groovy,Rebellious|Slap Bass,Distorted Guitar,Drums,Cowbell|M4P3bR
Jazz Funk 爵士放克|Funk,Jazz Fusion|Groovy,Elegant,Playful|Rhodes,Slap Bass,Drums,Saxophone|M6I30C
現代 Funk Pop|Funk,Pop|Fun,Groovy,Confident|Slap Bass,Clean Guitar,Horn Section,Claps|M1R3dP
Synth Funk 夜遊|Funk,City Pop|Urban,Retro,Flirty|Slap Bass,Analog Synth,Clean Guitar,Saxophone|F1R3aP
Disco Soul 女王|Disco,Soul|Confident,Festive,Triumphant|String Orchestra,Bass Guitar,Drums,Backing Vocals|F1P30P
Disco Funk 鏡球|Disco,Funk|Festive,Groovy,Euphoric|Slap Bass,Clavinet,Horn Section,Congas|D1P30P
福音・教堂讚美|Gospel|Sacred,Joyful,Rousing|Gospel Choir,Hammond Organ,Piano,Claps|C1E3dR
福音・靜默禱告|Gospel,Ballad|Sacred,Serene,Grateful|Grand Piano,Gospel Choir,Organ,Harmonies|F1E1dC
當代福音 R&B|Gospel,R&B|Grateful,Uplifting,Spiritual|Rhodes,Bass Guitar,Drums,Gospel Choir|M1E2dP
福音靈魂・老唱片|Gospel,Soul|Spiritual,Passionate,Nostalgic|Hammond Organ,Tambourine,Upright Piano,Backing Vocals|M1E20R
Doo-Wop 街角和聲|Doo-Wop|Innocent,Romantic,Nostalgic|Harmonies,Upright Bass,Snaps,Piano|C1E20C
Doo-Wop 青春舞會|Doo-Wop,Pop|Cheerful,Innocent,Retro|Harmonies,Saxophone,Upright Piano,Drums|M1R30L
Afrobeats 夏夜|Afrobeats|Carefree,Groovy,Flirty|Percussion,Synth Bass,Pluck Synth,Shaker|M4R3dP
Afrobeats 情歌慢搖|Afrobeats,R&B|Romantic,Tender,Exotic|Nylon Guitar,Percussion,Sub Bass,Backing Vocals|D1C2dP
Amapiano 木鼓低音|Afrobeats,Deep House|Hypnotic,Groovy,Chill|Shaker,Sub Bass,Piano,Percussion|M4P3dP
Afro Soul 靈魂融合|Afrobeats,Neo Soul|Warm,Spiritual,Hopeful|Rhodes,Djembe,Bass Guitar,Horn Section|F2E2dC`,

        '爵士・藍調': `
搖擺舞廳之夜|Swing,Big Band|Joyful,Playful,Retro|Horn Section,Upright Bass,Brushes,Clarinet|F1P40R
大樂團黃金年代|Big Band,Jazz|Nostalgic,Rousing,Elegant|Horn Section,Trumpet,Trombone,Drums|M3R40C
Bebop 飛快即興|Bebop|Energetic,Intense,Bold|Saxophone,Trumpet,Upright Bass,Drums|M6I50R
酷派爵士深夜|Cool Jazz|Mellow,Reflective,Lonely|Muted Trumpet,Upright Bass,Brushes,Piano|M2I20C
柔順爵士兜風|Smooth Jazz|Relaxed,Romantic,Urban|Saxophone,Rhodes,Fretless Bass,Drum Machine|F1R2bP
融合爵士炫技|Jazz Fusion|Energetic,Intense,Confident|Electric Guitar,Slap Bass,Synthesizer,Drums|M6I4aC
吉普賽爵士小酒館|Gypsy Jazz|Playful,Passionate,Rustic|Acoustic Guitar,Violin,Upright Bass,Accordion|M3I40A
Acid Jazz 律動|Acid Jazz,Funk|Groovy,Energetic,Urban|Hammond Organ,Bass Guitar,Drums,Horn Section|F4R3bP
沙發音樂雞尾酒|Lounge|Chill,Elegant,Flirty|Vibraphone,Rhodes,Bongos,Upright Bass|F2C20P
Bossa Nova 午後|Bossa Nova|Relaxed,Romantic,Airy|Nylon Guitar,Shaker,Upright Bass,Flute|F2C20A
散拍鋼琴沙龍|Ragtime|Playful,Retro,Cheerful|Upright Piano|M4030L
紐奧良街頭遊行|Dixieland|Festive,Joyful,Energetic|Clarinet,Trumpet,Trombone,Banjo|M4P40R
三角洲藍調獨白|Delta Blues|Lonely,Gritty,Sorrowful|Slide Guitar,Harmonica|M1E10L
芝加哥電藍調|Chicago Blues|Gritty,Passionate,Intense|Electric Guitar,Harmonica,Bass Guitar,Drums|M1I30R
深夜爵士酒吧|Jazz|Sultry,Intimate,Melancholic|Piano,Upright Bass,Brushes,Saxophone|F2E10R
女伶爵士情歌|Jazz,Ballad|Romantic,Bittersweet,Elegant|Grand Piano,Upright Bass,Brushes,String Orchestra|F2E10C
擬聲吟唱即興|Bebop,Jazz|Playful,Quirky,Energetic|Scat,Piano,Upright Bass,Drums|F4I40R
爵士鋼琴三重奏|Jazz|Elegant,Mellow,Reflective|Grand Piano,Upright Bass,Brushes|M2I20C
雨夜薩克斯風|Smooth Jazz,Jazz|Melancholic,Longing,Sultry|Saxophone,Piano,Rain Sounds,Upright Bass|M2E10C
電搖擺復古派對|Electro Swing|Retro,Fun,Energetic|Clarinet,Sampler,Drum Machine,Brass Section|F4P4dP
藍調搖滾公路|Blues,Rock|Passionate,Gritty,Energetic|Electric Guitar,Hammond Organ,Bass Guitar,Drums|M1R30R
慢板藍調傷心夜|Blues|Heartbroken,Regretful,Tired|Electric Guitar,Piano,Bass Guitar,Drums|M1E10R
爵士華爾滋|Jazz,Waltz|Dreamy,Romantic,Elegant|Piano,Upright Bass,Brushes,Vibraphone|F2I20C
拉丁爵士熱夜|Jazz,Latin|Passionate,Sultry,Energetic|Congas,Timbales,Trumpet,Piano|M3P40R
黑色電影爵士|Cool Jazz,Cinematic|Dark,Mysterious,Suspenseful|Muted Trumpet,Double Bass,Brushes,Vibraphone|M3I10C
顫音琴午夜|Cool Jazz,Lounge|Dreamy,Floating,Calm|Vibraphone,Upright Bass,Brushes|F2C20C
哈蒙德風琴靈魂爵士|Jazz,Soul|Groovy,Uplifting,Warm|Hammond Organ,Electric Guitar,Drums,Saxophone|M4R30R
福音藍調吶喊|Blues,Gospel|Spiritual,Passionate,Rousing|Gospel Choir,Piano,Hammond Organ,Tambourine|C1E30R
爵士饒舌街角|Jazz Rap,Boom Bap|Urban,Chill,Nostalgic|Sampler,Upright Bass,Rhodes,Turntable Scratches|M4I2bL
新靈魂爵士呢喃|Neo Soul,Jazz|Intimate,Sultry,Dreamy|Rhodes,Bass Guitar,Drums,Backing Vocals|F2I2cC
耶誕爵士暖冬|Jazz,Swing|Festive,Cozy,Warm|Piano,Upright Bass,Brushes,Bells|M1R30C
大樂團情歌慢舞|Big Band,Ballad|Romantic,Nostalgic,Tender|Horn Section,String Orchestra,Piano,Brushes|M2E10C
咆勃小號對決|Bebop,Jazz|Intense,Fierce,Confident|Trumpet,Piano,Upright Bass,Drums|M6I50R
巴西爵士海灘|Bossa Nova,Samba|Carefree,Relaxed,Exotic|Nylon Guitar,Flute,Percussion,Rhodes|D2C30A
木吉他藍調門廊|Delta Blues,Acoustic|Rustic,Nostalgic,Relaxed|Acoustic Guitar,Harmonica,Slide Guitar|M3020A
藍調口琴火車|Chicago Blues,Blues|Energetic,Playful,Gritty|Harmonica,Electric Guitar,Upright Bass,Snare Drum|M3R40R
爵士放克貝斯|Jazz Fusion,Funk|Groovy,Playful,Confident|Slap Bass,Clavinet,Drums,Horn Section|M4P3aC
北歐冷冽爵士|Cool Jazz,Ambient|Ethereal,Minimal,Lonely|Piano,Double Bass,Synth Pads,Trumpet|F6I1dC
咖啡館輕爵士|Jazz,Lounge|Cozy,Mellow,Cheerful|Piano,Acoustic Guitar,Upright Bass,Brushes|F1C20C
搖擺女聲三重唱|Swing,Doo-Wop|Cheerful,Retro,Sweet|Harmonies,Clarinet,Upright Bass,Brushes|F4R40L
低吟男聲爵士|Jazz,Swing|Romantic,Elegant,Warm|String Orchestra,Horn Section,Piano,Upright Bass|M1R20C
紐奧良葬禮銅管|Dixieland,Gospel|Bittersweet,Letting Go,Uplifting|Tuba,Trumpet,Trombone,Snare Drum|C3E20R
爵士長笛晨光|Jazz,Bossa Nova|Airy,Peaceful,Hopeful|Flute,Nylon Guitar,Upright Bass,Shaker|F2C20C
都會夜車 Fusion|Jazz Fusion,City Pop|Urban,Nostalgic,Dreamy|Rhodes,Fretless Bass,Saxophone,Electronic Drums|F2R3aP
藍調鋼琴 Boogie|Blues,Ragtime|Fun,Happy,Groovy|Upright Piano,Upright Bass,Brushes,Harmonica|M4P40R
靈魂藍調深情|Blues,Soul|Passionate,Bittersweet,Longing|Hammond Organ,Electric Guitar,Horn Section,Bass Guitar|F1E20R
吉普賽搖擺舞會|Gypsy Jazz,Swing|Joyful,Energetic,Festive|Acoustic Guitar,Violin,Clarinet,Upright Bass|D4P50A
Lo-Fi 爵士黑膠|Jazz,Lo-Fi|Nostalgic,Chill,Cozy|Piano,Vinyl Crackle,Upright Bass,Brushes|F2C20L
前衛自由爵士|Jazz|Chaotic,Intense,Bold|Saxophone,Double Bass,Drums,Piano|M6I40R
散拍默片時代|Ragtime,Dixieland|Humorous,Retro,Playful|Upright Piano,Clarinet,Banjo,Tuba|M3040L`,

        '拉丁・雷鬼・世界': `
Salsa 熱舞之夜|Salsa|Passionate,Festive,Energetic|Congas,Timbales,Brass Section,Piano|D4P40R
Bachata 纏綿|Bachata|Romantic,Sexy,Bittersweet|Nylon Guitar,Bongos,Bass Guitar,Shaker|M1E3dP
阿根廷探戈|Tango|Passionate,Dramatic,Sultry|Accordion,Violin,Piano,Double Bass|D2I30C
佛朗明哥烈焰|Flamenco|Passionate,Fierce,Intense|Nylon Guitar,Claps,Cajon|F2I40R
森巴嘉年華|Samba|Festive,Joyful,Euphoric|Percussion,Shaker,Nylon Guitar,Crowd Chants|C4P50R
Cumbia 小鎮舞會|Cumbia|Happy,Playful,Rustic|Accordion,Congas,Bass Guitar,Shaker|M4P30R
墨西哥街頭樂隊|Mariachi|Festive,Passionate,Bold|Trumpet,Violin,Nylon Guitar,Acoustic Guitar|M3E30R
Reggaeton 夜店|Reggaeton|Sexy,Energetic,Confident|808 Bass,Drum Machine,Synthesizer,Ad-libs|M4P3dP
拉丁流行情歌|Latin,Pop|Romantic,Passionate,Tender|Nylon Guitar,Percussion,Piano,String Orchestra|M1R3cP
根源雷鬼陽光|Reggae|Relaxed,Peaceful,Spiritual|Clean Guitar,Bass Guitar,Drums,Organ|M1C20R
Ska 跳躍銅管|Ska|Cheerful,Energetic,Fun|Horn Section,Clean Guitar,Bass Guitar,Drums|M4P50R
Dancehall 派對|Dancehall|Energetic,Flirty,Bold|Drum Machine,Synth Bass,Ad-libs,Sampler|F4P3dP
Dub 迴聲空間|Dub|Hypnotic,Psychedelic,Chill|Bass Guitar,Drums,Sound Effects,Organ|M6I20L
Afrobeat 長篇律動|Afrobeat|Groovy,Energetic,Hypnotic|Horn Section,Congas,Electric Guitar,Bass Guitar|M3I40R
Afrobeats 夏日|Afrobeats|Happy,Flirty,Carefree|Pluck Synth,Percussion,808 Bass,Vocal Chops|M4R3dP
寶萊塢歌舞|Bollywood|Festive,Joyful,Exotic|Sitar,Tabla,String Orchestra,Backing Vocals|D3P40P
寶萊塢深情對唱|Bollywood,Ballad|Romantic,Longing,Dramatic|Tabla,Flute,String Orchestra,Sitar|D2E20P
中東沙漠之夜|Middle Eastern|Mysterious,Exotic,Haunting|Oud,Percussion,Violin,Chant|F2I30C
肚皮舞鼓點|Middle Eastern,Dance Pop|Exotic,Sexy,Energetic|Oud,Tambourine,Percussion,Synthesizer|F4P4dP
夏威夷海風|Hawaiian|Peaceful,Carefree,Airy|Ukulele,Steel Guitar,Ocean Waves|F1C20A
波卡啤酒節|Polka|Festive,Humorous,Happy|Accordion,Tuba,Clarinet,Snare Drum|C4P40R
法朵海港思念|Fado|Longing,Sorrowful,Homesick|Nylon Guitar,12-String Guitar|F2E10A
加勒比鋼鼓海灘|Latin,Reggae|Carefree,Happy,Exotic|Steel Drums,Bass Guitar,Shaker,Congas|M4C30R
電子探戈都會|Tango,Downtempo|Urban,Sultry,Dark|Accordion,Sampler,Synth Bass,Electronic Drums|F6I3cP
新佛朗明哥吉他|Flamenco,Latin|Romantic,Mellow,Elegant|Nylon Guitar,Bongos,Fretless Bass,Shaker|M2C30C
Salsa 浪漫情歌|Salsa,Ballad|Romantic,Bittersweet,Sentimental|Piano,Congas,Trumpet,Bass Guitar|M1E3bP
森巴搖滾街頭|Samba,Rock|Energetic,Rousing,Wild|Electric Guitar,Percussion,Bass Guitar,Drums|M4P40R
Cumbia 電子迷幻|Cumbia,Electro|Psychedelic,Quirky,Groovy|Accordion,Synthesizer,Drum Machine,Cowbell|M6I3dL
墨西哥情歌小夜曲|Mariachi,Ballad|Romantic,Tearful,Longing|Nylon Guitar,Violin,Trumpet,Harmonies|M2E20A
拉丁陷阱暗巷|Reggaeton,Trap|Dark,Menacing,Urban|808 Bass,Drum Machine,Lead Synth,Ad-libs|M4R3dP
雷鬼情人搖滾|Reggae,R&B|Romantic,Chill,Sweet|Rhodes,Bass Guitar,Drums,Backing Vocals|F1C2aC
Ska 龐克衝撞|Ska,Punk|Rebellious,Energetic,Chaotic|Distorted Guitar,Trumpet,Trombone,Drums|M4P5bR
Dub Techno 深霧|Dub,Techno|Hypnotic,Dark,Floating|Sub Bass,Synth Pads,Drum Machine,Sound Effects|M6I4dC
非洲鼓圈慶典|Afrobeat|Festive,Rousing,Spiritual|Djembe,Shaker,Chant,Claps|C3030R
西非吉他晴空|Afrobeat,Folk|Optimistic,Happy,Warm|Clean Guitar,Djembe,Bass Guitar,Harmonies|M3030R
印度西塔冥想|Bollywood,Meditation|Meditative,Spiritual,Exotic|Sitar,Tabla|M6C10A
阿拉伯市集|Middle Eastern,Folk|Exotic,Playful,Festive|Oud,Tambourine,Flute,Percussion|M3030R
夏威夷草裙舞|Hawaiian,Folk|Romantic,Dreamy,Gentle|Steel Guitar,Ukulele,Upright Bass,Harmonies|F2C20L
安地斯排笛高原|Latin,Folk|Peaceful,Rustic,Wistful|Pan Flute,Nylon Guitar,Percussion|M2C20A
古巴老城頌樂|Latin,Salsa|Nostalgic,Warm,Romantic|Nylon Guitar,Upright Bass,Bongos,Trumpet|M3E30L
巴西熱帶流行|Samba,Pop|Cheerful,Sweet,Carefree|Nylon Guitar,Percussion,Rhodes,Flute|F4R30P
拉丁搖滾吉他魂|Latin,Rock|Passionate,Powerful,Groovy|Electric Guitar,Congas,Timbales,Hammond Organ|M2R30R
雷鬼流行海灘|Reggae,Pop|Carefree,Fun,Relaxed|Ukulele,Bass Guitar,Drums,Steel Drums|M4R3dP
巴爾幹銅管狂歡|Polka,Folk|Wild,Festive,Energetic|Brass Section,Tuba,Accordion,Drums|C4P50R
東歐婚禮舞曲|Folk,Polka|Festive,Bittersweet,Joyful|Clarinet,Violin,Accordion,Double Bass|M3040R
法朵現代流行|Fado,Pop|Bittersweet,Hopeful,Longing|Nylon Guitar,Piano,String Orchestra|F2E2dC
土耳其迷幻搖滾|Middle Eastern,Psychedelic Rock|Psychedelic,Exotic,Intense|Electric Guitar,Oud,Organ,Drums|M6I30L
澳洲原野迴響|Ambient,Folk|Mysterious,Spiritual,Hypnotic|Didgeridoo,Percussion,Field Recordings|M6I10R
蒙古草原喉音|Folk,Cinematic|Majestic,Powerful,Haunting|Throat Singing,Fiddle,Percussion|M2G20R
熱帶浩室拉丁風|Tropical House,Latin|Happy,Uplifting,Carefree|Marimba,Pluck Synth,Nylon Guitar,Electronic Drums|F4R3dP`,

        '中國風・東方': `
古風琴簫和鳴|Guofeng|Ethereal,Serene,Wistful|Guqin,Xiao|F2I10A
國風流行情歌|Guofeng,C-Pop|Romantic,Bittersweet,Longing|Guzheng,Piano,String Orchestra,Dizi|F2R2dP
國風電子舞曲|Guofeng,EDM|Energetic,Uplifting,Bold|Guzheng,Supersaw,Electronic Drums,Pipa|F2P4dP
國風嘻哈|Chinese Traditional,Hip Hop|Confident,Aggressive,Bold|Pipa,808 Bass,Drum Machine,Chinese Drums|M4R3dP
嗩吶國風搖滾|Chinese Traditional,Rock|Powerful,Rousing,Defiant|Suona,Distorted Guitar,Drums,Bass Guitar|M3G4dR
戲腔流行|Chinese Opera,C-Pop|Dramatic,Passionate,Nostalgic|Erhu,Yueqin,Piano,Drums|F2R3dP
京劇鑼鼓|Chinese Opera|Dramatic,Intense,Energetic|Gong,Chinese Drums,Erhu,Yueqin|M3I30R
武俠江湖|Chinese Traditional,Cinematic|Heroic,Epic,Intense|Xiao,Chinese Drums,Erhu,Guqin|M3G30P
俠客獨行|Guofeng,Folk|Lonely,Heroic,Reflective|Xiao,Acoustic Guitar,Guqin|M3E20A
宮廷盛宴|Chinese Traditional,Orchestral|Majestic,Festive,Elegant|Guzheng,Sheng,Yangqin,Chinese Drums|C2G30P
深宮怨|Guofeng,Ballad|Sorrowful,Lonely,Longing|Pipa,Erhu,String Orchestra|F2E10C
江南煙雨|Chinese Traditional|Dreamy,Gentle,Wistful|Dizi,Guzheng,Rain Sounds,Pipa|F2C20C
禪寺鐘聲|Chinese Traditional,Meditation|Meditative,Sacred,Serene|Guqin,Bells,Xiao|M6C10A
古琴獨奏|Chinese Traditional|Reflective,Minimal,Calm|Guqin|M2I10A
二胡訴衷腸|Chinese Traditional|Sad,Tearful,Sentimental|Erhu,Yangqin|F2E10A
琵琶戰曲|Chinese Traditional|Tense,Fierce,Intense|Pipa,Chinese Drums|M3G40R
竹笛牧歌|Chinese Traditional,Folk|Rustic,Cheerful,Peaceful|Dizi,Yangqin,Ruan|K1C30A
嗩吶喜慶|Chinese Traditional|Festive,Joyful,Energetic|Suona,Gong,Chinese Drums,Cymbals|C4P40R
葫蘆絲雲南風情|Chinese Traditional,Folk|Exotic,Gentle,Romantic|Hulusi,Ruan,Percussion|F2C20A
古箏流水|Chinese Traditional,New Age|Peaceful,Soothing,Airy|Guzheng,Xiao,Chimes|F2C10C
古風戀歌對唱|Guofeng,Ballad|Romantic,Tender,Bittersweet|Guzheng,Erhu,Piano,String Orchestra|D2E20P
沙場邊塞|Guofeng,Cinematic|Epic,Determined,Dark|Chinese Drums,Suona,String Orchestra,Timpani|M3G30P
春節賀歲|Chinese Traditional,Pop|Festive,Happy,Cheerful|Suona,Chinese Drums,Gong,Yangqin|C1P40P
水墨新世紀|Chinese Traditional,Ambient|Ethereal,Minimal,Floating|Guqin,Synth Pads,Xiao|F6C10C
古風 Lo-Fi|Guofeng,Lo-Fi|Chill,Nostalgic,Mellow|Guzheng,Vinyl Crackle,Drum Machine,Rhodes|F2C2dL
國風 R&B|Guofeng,R&B|Romantic,Sultry,Dreamy|Pipa,Rhodes,808 Bass,Snaps|F2R2dP
國風陷阱|Guofeng,Trap|Dark,Menacing,Aggressive|Erhu,808 Bass,Drum Machine,Gong|M4R4dP
東方未來電子|Chinese Traditional,Synthwave|Sci-Fi,Retro,Dreamy|Guzheng,Analog Synth,Arpeggio,Electronic Drums|F6I3eP
絲路駝鈴|Chinese Traditional,Middle Eastern|Exotic,Mysterious,Nostalgic|Pipa,Oud,Percussion,Bells|M2I20C
敦煌飛天|Guofeng,New Age|Ethereal,Sacred,Majestic|Pipa,Harp,Choir,Dizi|F2I20C
仙俠飄渺|Guofeng,Cinematic|Ethereal,Mysterious,Hopeful|Xiao,Guzheng,Choir,String Orchestra|F2G20P
黃梅小調|Chinese Opera,Folk|Playful,Sweet,Flirty|Dizi,Erhu,Yangqin,Yueqin|D5030A
崑曲水磨腔|Chinese Opera|Elegant,Ethereal,Melancholic|Dizi,Sheng,Pipa|F2I10A
粵劇流行對唱|Chinese Opera,Cantopop|Nostalgic,Sentimental,Bittersweet|Erhu,Yangqin,Piano,Bass Guitar|D3R2bC
茶館說書|Chinese Traditional,Folk|Humorous,Playful,Nostalgic|Ruan,Spoken Word,Percussion|M3030R
和風櫻花|Japanese Traditional|Wistful,Peaceful,Gentle|Koto,Shakuhachi|F2C10A
三味線疾走|Japanese Traditional,Rock|Energetic,Fierce,Intense|Shamisen,Taiko,Distorted Guitar,Drums|M3P5dP
和太鼓祭典|Japanese Traditional|Festive,Rousing,Powerful|Taiko,Shamisen,Flute,Crowd Chants|C4P40R
尺八禪風|Japanese Traditional,Meditation|Meditative,Minimal,Serene|Shakuhachi|M6C10A
和風 Future Bass|Japanese Traditional,Future Bass|Dreamy,Energetic,Euphoric|Koto,Supersaw,Vocal Chops,Electronic Drums|F2R4eP
忍者暗夜|Japanese Traditional,Cinematic|Dark,Suspenseful,Tense|Shakuhachi,Taiko,Shamisen,String Orchestra|M3G30P
京都庭園|Japanese Traditional,Ambient|Serene,Peaceful,Reflective|Koto,Chimes,Field Recordings|F2C10C
韓國宮廷國樂|Korean Traditional|Majestic,Elegant,Calm|Flute,Percussion,Gong|F2I10A
韓國農樂鼓舞|Korean Traditional,Folk|Festive,Energetic,Rustic|Percussion,Gong,Suona,Crowd Chants|C4P40R
韓風國樂流行|Korean Traditional,K-Pop|Energetic,Confident,Fierce|Percussion,Synth Bass,Electronic Drums,Flute|M4R4dP
韓國說唱悲歌|Korean Traditional,Ballad|Sorrowful,Passionate,Dramatic|Percussion,String Orchestra|F3E10R
草原馬頭琴|Chinese Traditional,Folk|Homesick,Rustic,Uplifting|Fiddle,Throat Singing,Acoustic Guitar|M2E20A
藏地高原|Chinese Traditional,New Age|Spiritual,Sacred,Ethereal|Chant,Bells,Dizi,Synth Pads|F2I10C
台灣歌謠古早味|Taiwanese Folk|Nostalgic,Homesick,Bittersweet|Yueqin,Erhu,Acoustic Guitar|F3E20L
中國風交響|Chinese Traditional,Orchestral|Epic,Majestic,Passionate|Erhu,Guzheng,String Orchestra,Timpani|C2G30P`,

        '古典・配樂・遊戲': `
巴洛克大鍵琴|Baroque|Elegant,Playful,Airy|Harpsichord,Violin,Cello,Recorder|C2I30C
巴洛克管風琴聖堂|Baroque|Sacred,Majestic,Dramatic|Pipe Organ|C6G20R
弦樂四重奏|Chamber Music|Elegant,Reflective,Melancholic|String Quartet|F2I20C
木管室內樂|Chamber Music,Classical|Playful,Airy,Cheerful|Flute,Oboe,Clarinet,Bassoon|F2030C
鋼琴獨奏夜曲|Piano Solo,Classical|Melancholic,Romantic,Intimate|Grand Piano|F2E10C
歌劇詠嘆調|Opera|Dramatic,Passionate,Sorrowful|Opera Vocals,String Orchestra,Harp|F3G10C
聖詠合唱|Choral|Sacred,Spiritual,Ethereal|Choir,Pipe Organ|C2E10R
新古典鋼琴弦樂|Neoclassical|Reflective,Melancholic,Hopeful|Upright Piano,Cello,Violin|F2I10C
極簡主義脈動|Minimalism|Hypnotic,Minimal,Calm|Marimba,Piano,Vibraphone,Arpeggio|F6I30C
維也納華爾滋|Waltz,Orchestral|Elegant,Romantic,Joyful|String Orchestra,French Horn,Harp,Woodwinds|D2R30C
軍樂進行曲|March|Rousing,Triumphant,Determined|Brass Section,Snare Drum,Piccolo,Cymbals|C1G30R
史詩電影配樂|Cinematic,Orchestral|Epic,Heroic,Powerful|String Orchestra,Brass Section,Timpani,Choir|C2G30P
懸疑驚悚配樂|Cinematic|Suspenseful,Ominous,Tense|Pizzicato Strings,Piano,Synth Pads,Sound Effects|F6I20P
愛情電影主題曲|Cinematic,Ballad|Romantic,Bittersweet,Tearful|Piano,String Orchestra,Oboe|F2E10P
恐怖片音樂盒|Cinematic,Dark Ambient|Spooky,Sinister,Haunting|Music Box,Children's Choir,Sound Effects,Cello|K6I10P
奇幻冒險配樂|Cinematic,Celtic|Whimsical,Heroic,Hopeful|Tin Whistle,Harp,String Orchestra,French Horn|C3G30P
科幻太空配樂|Cinematic,Ambient|Sci-Fi,Mysterious,Ethereal|Synth Pads,Pipe Organ,String Orchestra,Analog Synth|M6G1eP
預告片震撼|Trailer Music|Epic,Intense,Menacing|Risers,Taiko,Brass Section,Choir|C6G30P
預告片情感堆疊|Trailer Music,Cinematic|Inspiring,Hopeful,Dramatic|Piano,String Orchestra,Risers,Timpani|F2G20P
8-bit 冒險|Chiptune,Video Game Music|Fun,Quirky,Energetic|8-bit Synth,Arpeggio|K4P4aL
RPG 村莊|Video Game Music,Folk|Peaceful,Rustic,Cozy|Ocarina,Acoustic Guitar,Flute,Harp|F3C20C
RPG 魔王戰|Video Game Music,Symphonic Metal|Menacing,Epic,Fierce|Distorted Guitar,Pipe Organ,Choir,Drums|M3G50P
遊戲主選單|Video Game Music,Orchestral|Hopeful,Dreamy,Majestic|Piano,String Orchestra,Celesta,French Horn|F2G20P
動漫熱血主題曲|Anime,Pop Rock|Energetic,Determined,Inspiring|Electric Guitar,Drums,String Orchestra,Bass Guitar|M3R5dP
動漫日常配樂|Anime|Playful,Cheerful,Quirky|Pizzicato Strings,Glockenspiel,Recorder,Acoustic Guitar|F4030C
動漫完結篇片尾|Anime,Ballad|Bittersweet,Nostalgic,Letting Go|Piano,Acoustic Guitar,String Orchestra|F2E2dP
音樂劇開場大合唱|Musical Theatre|Rousing,Joyful,Bold|Brass Section,Piano,Drums,Choir|C3R40P
音樂劇抒情獨唱|Musical Theatre,Ballad|Vulnerable,Longing,Hopeful|Piano,String Orchestra,Clarinet|F3E20C
古典交響樂章|Classical,Orchestral|Majestic,Dramatic,Powerful|String Orchestra,Woodwinds,Brass Section,Timpani|C2G30C
浪漫派鋼琴協奏|Classical|Romantic,Passionate,Dramatic|Grand Piano,String Orchestra,French Horn|F2G20C
大提琴無伴奏|Classical,Baroque|Reflective,Melancholic,Intimate|Cello|M2I10A
小提琴炫技|Classical|Passionate,Fierce,Confident|Violin,Piano|F2I40C
豎琴仙境|Classical,New Age|Dreamy,Ethereal,Whimsical|Harp,Flute,Celesta|F2C10C
安魂彌撒|Choral,Orchestral|Sorrowful,Sacred,Dark|Choir,String Orchestra,Timpani,Pipe Organ|C2G10C
童聲聖誕頌歌|Choral|Innocent,Sacred,Festive|Children's Choir,Bells,Harp,Organ|K1E20C
西部片配樂|Cinematic,Americana|Gritty,Lonely,Suspenseful|Whistling,Harmonica,Electric Guitar,Trumpet|M3G20R
諜報片配樂|Cinematic,Big Band|Suspenseful,Retro,Confident|Brass Section,Electric Guitar,Bongos,Double Bass|M3R30P
戰爭片悲壯|Cinematic,Orchestral|Heroic,Sorrowful,Epic|Trumpet,Snare Drum,String Orchestra,Choir|C3G10P
動畫電影童話|Cinematic,Musical Theatre|Whimsical,Innocent,Childlike|Celesta,Woodwinds,Harp,String Orchestra|K3R30P
賽博龐克配樂|Cinematic,Synthwave|Sci-Fi,Dark,Urban|Analog Synth,Synth Bass,Electronic Drums,Arpeggio|M6I3eP
遊戲地下城|Video Game Music,Dark Ambient|Ominous,Spooky,Mysterious|Pipe Organ,Harpsichord,Sound Effects,Cello|M6I20P
16-bit 懷舊冒險|Video Game Music,Chiptune|Retro,Nostalgic,Optimistic|8-bit Synth,Synth Bass,Electronic Drums,Arpeggio|M303bL
賽車遊戲極速|Video Game Music,Eurodance|Energetic,Euphoric,Intense|Supersaw,Electric Guitar,Electronic Drums,Synth Bass|M4P5bP
開放世界探索|Video Game Music,Ambient|Peaceful,Ethereal,Airy|Piano,Violin,Synth Pads|F2C10C
格鬥遊戲對決|Video Game Music,Hard Rock|Aggressive,Fierce,Defiant|Distorted Guitar,Slap Bass,Drums,Lead Synth|M4P4bP
新古典電子融合|Neoclassical,Ambient|Dreamy,Melancholic,Floating|Piano,Synth Pads,String Quartet,Glitch|F6I2dC
極簡鋼琴循環|Minimalism,Piano Solo|Minimal,Meditative,Hopeful|Upright Piano|F6I20C
輕歌劇喜鬧|Opera,Musical Theatre|Humorous,Playful,Cheerful|Opera Vocals,Woodwinds,Pizzicato Strings,Piano|D5030C
中世紀宮廷舞曲|Classical,Folk|Playful,Festive,Rustic|Recorder,Mandolin,Tambourine,Harp|C3030A
管弦搖滾史詩|Orchestral,Rock|Epic,Triumphant,Powerful|Electric Guitar,String Orchestra,Drums,Choir|M2G40P`,

        '氛圍・Lo-Fi・療癒': `
宇宙氛圍漂浮|Ambient|Floating,Ethereal,Sci-Fi|Synth Pads,Analog Synth|F6C1eC
黑暗氛圍廢墟|Dark Ambient|Dark,Ominous,Empty|Synth Pads,Sound Effects,Field Recordings,Sub Bass|M6I10C
新世紀心靈|New Age|Spiritual,Peaceful,Hopeful|Piano,Synth Pads,Pan Flute,Chimes|F2C10C
冥想頌缽|Meditation|Meditative,Serene,Spiritual|Bells,Chimes,Humming|F6C10A
深層睡眠|Ambient,Meditation|Sleepy,Soothing,Floating|Synth Pads,Piano,Ocean Waves|F6C10C
讀書專注 Lo-Fi|Lo-Fi,Lo-Fi Hip Hop|Chill,Calm,Mellow|Rhodes,Drum Machine,Vinyl Crackle,Bass Guitar|F0C2dL
咖啡廳午後|Lo-Fi,Jazz|Cozy,Mellow,Warm|Piano,Acoustic Guitar,Vinyl Crackle,Brushes|F4C2dL
雨天窗邊|Lo-Fi|Melancholic,Reflective,Cozy|Piano,Rain Sounds,Vinyl Crackle|F2C1dL
海浪療癒|New Age,Ambient|Soothing,Peaceful,Serene|Ocean Waves,Harp,Synth Pads|F2C10C
Lo-Fi 嘻哈深夜|Lo-Fi Hip Hop|Nostalgic,Lonely,Chill|Sampler,Drum Machine,Tape Hiss,Rhodes|M4C2dL
搖籃曲晚安|Lullaby|Sleepy,Gentle,Tender|Music Box,Humming,Harp|F1C10A
瑜伽晨間|Meditation,New Age|Peaceful,Airy,Uplifting|Hang Drum,Flute,Synth Pads|F6C10C
Spa 溫泉放鬆|New Age|Relaxed,Soothing,Serene|Harp,Flute,Chimes,Field Recordings|F0C10C
森林自然聲景|Ambient,New Age|Peaceful,Rustic,Airy|Field Recordings,Flute,Acoustic Guitar|F2C10A
手碟靜心|Meditation|Meditative,Hypnotic,Calm|Hang Drum|F6C10A
鋼琴療癒|Piano Solo,New Age|Soothing,Gentle,Hopeful|Grand Piano|F2C10C
Lo-Fi 吉他房間|Lo-Fi,Bedroom Pop|Dreamy,Intimate,Nostalgic|Clean Guitar,Tape Hiss,Drum Machine,Synth Pads|M4I2dL
蒸氣波商場|Vaporwave|Retro,Nostalgic,Empty|Sampler,Synthesizer,Saxophone,Drum Machine|M6I2aL
Chillwave 夏末|Chillwave|Dreamy,Wistful,Nostalgic|Analog Synth,Synth Pads,Drum Machine,Clean Guitar|M2I3dL
緩拍沙發夜|Downtempo|Chill,Sultry,Urban|Rhodes,Synth Bass,Electronic Drums,Vocal Chops|F2C2cP
Trip Hop 迷霧|Trip Hop|Dark,Mysterious,Hypnotic|Sampler,Turntable Scratches,Sub Bass,String Orchestra|F2I2bL
氛圍吉他晨霧|Ambient,Post-Rock|Ethereal,Hopeful,Airy|Clean Guitar,Synth Pads,Cello|M6I10C
太空站黑暗氛圍|Dark Ambient,Ambient|Sci-Fi,Ominous,Lonely|Analog Synth,Sub Bass,Sound Effects|M6I1eC
西藏頌缽梵音|Meditation,New Age|Sacred,Spiritual,Meditative|Bells,Chant,Throat Singing|M6C10A
脈輪冥想|Meditation|Meditative,Exotic,Ethereal|Sitar,Tabla,Synth Pads|F6C10C
音樂盒童年|Lullaby,Ambient|Nostalgic,Childlike,Innocent|Music Box,Toy Piano,Celesta|K2C10L
木吉他安眠曲|Lullaby,Acoustic|Sleepy,Tender,Warm|Nylon Guitar,Humming|M1C10A
雨夜 Lo-Fi 爵士|Lo-Fi,Jazz|Melancholic,Mellow,Intimate|Rhodes,Rain Sounds,Upright Bass,Brushes|F2C1dL
黑膠週日早晨|Lo-Fi,Soul|Warm,Relaxed,Nostalgic|Wurlitzer,Vinyl Crackle,Bass Guitar,Drums|M4C20L
Lo-Fi 鋼琴日記|Lo-Fi,Piano Solo|Reflective,Bittersweet,Intimate|Upright Piano,Tape Hiss|F2I1dL
日系 Lo-Fi 街景|Lo-Fi,City Pop|Nostalgic,Urban,Dreamy|Rhodes,Saxophone,Tape Hiss,Field Recordings|F2C2aL
極光北國氛圍|Ambient,Neoclassical|Ethereal,Majestic,Lonely|Piano,Violin,Synth Pads|F6I10C
深海潛行|Ambient,Dark Ambient|Mysterious,Floating,Dark|Sub Bass,Synth Pads,Sound Effects,Ocean Waves|M6I10C
風鈴庭院|New Age,Japanese Traditional|Serene,Peaceful,Airy|Chimes,Koto,Field Recordings,Shakuhachi|F2C10A
營火星空|Acoustic,Ambient|Cozy,Rustic,Nostalgic|Acoustic Guitar,Harmonica,Field Recordings|M1C20A
夢幻流行雲端|Dream Pop,Ambient|Dreamy,Floating,Ethereal|Synth Pads,Clean Guitar,Drum Machine,Harmonies|F2I2dC
豎琴天使聖光|New Age,Choral|Sacred,Ethereal,Hopeful|Harp,Choir,Synth Pads|C2C10C
凱爾特療癒|New Age,Celtic|Soothing,Rustic,Dreamy|Harp,Tin Whistle,Synth Pads,Fiddle|F2C20C
排笛高山冥想|New Age,Meditation|Meditative,Airy,Calm|Pan Flute,Synth Pads,Chimes|M6C10C
陶笛田野風|New Age,Folk|Rustic,Innocent,Peaceful|Ocarina,Acoustic Guitar,Field Recordings|F2C20A
工作專注電子|Ambient,Minimalism|Minimal,Calm,Optimistic|Arpeggio,Synth Pads,Pluck Synth|F6C3dC
馬林巴輕盈早晨|New Age,Minimalism|Airy,Cheerful,Optimistic|Marimba,Glockenspiel,Acoustic Guitar|F0C30C
寶寶童聲搖籃曲|Lullaby|Sleepy,Innocent,Sweet|Celesta,Glockenspiel,Children's Choir|K1C10C
下雪夜晚鋼琴|Neoclassical,Ambient|Wistful,Cozy,Gentle|Upright Piano,Cello,Tape Hiss|F2I10L
Lo-Fi 遊戲懷舊|Lo-Fi,Chiptune|Nostalgic,Playful,Retro|8-bit Synth,Drum Machine,Vinyl Crackle,Rhodes|M0C2dL
深夜電台 Lo-Fi|Lo-Fi Hip Hop,R&B|Romantic,Intimate,Chill|Rhodes,808 Bass,Vinyl Crackle,Vocal Chops|F4C2dL
熱帶海島發呆|Ambient,Hawaiian|Carefree,Relaxed,Peaceful|Ukulele,Ocean Waves,Steel Guitar,Shaker|F1C20A
呼吸練習引導|Meditation,Ambient|Calm,Soothing,Meditative|Synth Pads,Spoken Word,Chimes|F5C10C
管鐘教堂靜默|Ambient,Choral|Sacred,Serene,Reflective|Tubular Bells,Choir,Pipe Organ|C6I10R
雷雨夜氛圍|Dark Ambient,Lo-Fi|Gloomy,Reflective,Calm|Rain Sounds,Synth Pads,Piano,Field Recordings|F6C10L`
    };

    const list = (text) => text.split(',').map(s => s.trim()).filter(Boolean);
    return Object.fromEntries(Object.entries(RAW).map(([category, block]) => [category,
        block.split('\n').map(line => line.trim()).filter(Boolean).map(line => {
            const [name, genre, mood, instruments, code = ''] = line.split('|').map(s => s.trim());
            return {
                name,
                genre: list(genre || ''),
                mood: list(mood || ''),
                instruments: list(instruments || ''),
                voice: VOICE[code[0]] || 'Male vocal',
                lyricStyle: LYRIC[code[1]] || '',
                songVibe: VIBE[code[2]] || '',
                bpm: BPM[code[3]] || '',
                era: ERA[code[4]] || '',
                production: PRODUCTION[code[5]] || ''
            };
        })
    ]));
})();
