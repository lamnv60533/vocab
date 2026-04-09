// conjugation-rules.js
// Rule card content for each form (Phase 1: te, nai, ta, potential)

const CONJUGATION_RULES = [
  {
    id: 'te',
    name: 'て-form',
    nameVi: 'Thể て',
    usageVi: 'Nối động từ ("và rồi"), yêu cầu lịch sự (〜てください), đang làm (〜ています)',
    patterns: [
      {
        group: 'Nhóm 1 (Động từ う)',
        rule: 'Tra bảng biến đổi âm cuối',
        table: [
          { from: 'き (く)',  to: 'いて',  ex: 'か<b>き</b>ます → か<b>いて</b>' },
          { from: 'ぎ (ぐ)',  to: 'いで',  ex: 'およ<b>ぎ</b>ます → およ<b>いで</b>' },
          { from: 'し (す)',  to: 'して',  ex: 'はな<b>し</b>ます → はな<b>して</b>' },
          { from: 'ち (つ)',  to: 'って',  ex: 'ま<b>ち</b>ます → ま<b>って</b>' },
          { from: 'り (る)',  to: 'って',  ex: 'つく<b>り</b>ます → つく<b>って</b>' },
          { from: 'に (ぬ)',  to: 'んで',  ex: 'し<b>に</b>ます → し<b>んで</b>' },
          { from: 'び (ぶ)',  to: 'んで',  ex: 'あそ<b>び</b>ます → あそ<b>んで</b>' },
          { from: 'み (む)',  to: 'んで',  ex: 'よ<b>み</b>ます → よ<b>んで</b>' },
          { from: 'い (う)',  to: 'って',  ex: 'か<b>い</b>ます → か<b>って</b>' },
        ],
        note: '⚠️ Ngoại lệ: いきます → <b>いって</b> (không phải いいて)',
      },
      {
        group: 'Nhóm 2 (Động từ る)',
        rule: 'Bỏ ます, thêm て',
        ex: 'た<b>べます</b> → たべ<b>て</b>　/　み<b>ます</b> → み<b>て</b>',
      },
      {
        group: 'Nhóm 3 (Bất quy tắc)',
        rule: 'Học thuộc',
        ex: 'し<b>ます</b> → <b>して</b>　/　き<b>ます</b> → <b>きて</b>',
      },
    ],
  },
  {
    id: 'nai',
    name: 'ない-form',
    nameVi: 'Thể phủ định (ない)',
    usageVi: 'Phủ định thể thông thường ("không làm"), cấm đoán (〜ないでください)',
    patterns: [
      {
        group: 'Nhóm 1 (Động từ う)',
        rule: 'Bỏ âm masu-stem, thêm hàng あ + ない',
        table: [
          { from: 'き (く)',  to: 'かない',  ex: 'か<b>き</b>ます → か<b>かない</b>' },
          { from: 'ぎ (ぐ)',  to: 'がない',  ex: 'およ<b>ぎ</b>ます → およ<b>がない</b>' },
          { from: 'し (す)',  to: 'さない',  ex: 'はな<b>し</b>ます → はな<b>さない</b>' },
          { from: 'ち (つ)',  to: 'たない',  ex: 'ま<b>ち</b>ます → ま<b>たない</b>' },
          { from: 'り (る)',  to: 'らない',  ex: 'つく<b>り</b>ます → つく<b>らない</b>' },
          { from: 'び (ぶ)',  to: 'ばない',  ex: 'あそ<b>び</b>ます → あそ<b>ばない</b>' },
          { from: 'み (む)',  to: 'まない',  ex: 'よ<b>み</b>ます → よ<b>まない</b>' },
          { from: 'い (う)',  to: '<b>わ</b>ない',  ex: 'か<b>い</b>ます → か<b>わない</b> ⚠️' },
        ],
        note: '⚠️ Động từ うう (hàng わ): い → わ, không phải あ',
      },
      {
        group: 'Nhóm 2 (Động từ る)',
        rule: 'Bỏ ます, thêm ない',
        ex: 'た<b>べます</b> → たべ<b>ない</b>　/　み<b>ます</b> → み<b>ない</b>',
      },
      {
        group: 'Nhóm 3 (Bất quy tắc)',
        rule: 'Học thuộc',
        ex: 'し<b>ます</b> → <b>しない</b>　/　き<b>ます</b> → <b>こない</b>',
      },
    ],
  },
  {
    id: 'ta',
    name: 'た-form',
    nameVi: 'Thể quá khứ (た)',
    usageVi: 'Diễn đạt hành động đã hoàn thành ("đã làm"), liệt kê hành động quá khứ',
    patterns: [
      {
        group: 'Nhóm 1 (Động từ う)',
        rule: 'Giống thể て nhưng て→た, で→だ',
        table: [
          { from: 'き (く)',  to: 'いた',  ex: 'か<b>き</b>ます → か<b>いた</b>' },
          { from: 'ぎ (ぐ)',  to: 'いだ',  ex: 'およ<b>ぎ</b>ます → およ<b>いだ</b>' },
          { from: 'し (す)',  to: 'した',  ex: 'はな<b>し</b>ます → はな<b>した</b>' },
          { from: 'ち/り/い', to: 'った',  ex: 'ま<b>ち</b>ます → ま<b>った</b>' },
          { from: 'に/び/み', to: 'んだ',  ex: 'よ<b>み</b>ます → よ<b>んだ</b>' },
        ],
        note: '⚠️ Ngoại lệ: いきます → <b>いった</b>',
      },
      {
        group: 'Nhóm 2 (Động từ る)',
        rule: 'Bỏ ます, thêm た',
        ex: 'た<b>べます</b> → たべ<b>た</b>　/　み<b>ます</b> → み<b>た</b>',
      },
      {
        group: 'Nhóm 3 (Bất quy tắc)',
        rule: 'Học thuộc',
        ex: 'し<b>ます</b> → <b>した</b>　/　き<b>ます</b> → <b>きた</b>',
      },
    ],
  },
  {
    id: 'potential',
    name: 'Thể tiềm năng',
    nameVi: 'Thể tiềm năng (〜できる)',
    usageVi: 'Diễn đạt khả năng ("có thể làm"), dùng với が thay vì を',
    patterns: [
      {
        group: 'Nhóm 1 (Động từ う)',
        rule: 'Bỏ âm masu-stem, thêm hàng え + る',
        table: [
          { from: 'き (く)',  to: 'ける',  ex: 'か<b>き</b>ます → か<b>ける</b>' },
          { from: 'ぎ (ぐ)',  to: 'げる',  ex: 'およ<b>ぎ</b>ます → およ<b>げる</b>' },
          { from: 'し (す)',  to: 'せる',  ex: 'はな<b>し</b>ます → はな<b>せる</b>' },
          { from: 'ち (つ)',  to: 'てる',  ex: 'ま<b>ち</b>ます → ま<b>てる</b>' },
          { from: 'り (る)',  to: 'れる',  ex: 'つく<b>り</b>ます → つく<b>れる</b>' },
          { from: 'び (ぶ)',  to: 'べる',  ex: 'あそ<b>び</b>ます → あそ<b>べる</b>' },
          { from: 'み (む)',  to: 'める',  ex: 'よ<b>み</b>ます → よ<b>める</b>' },
          { from: 'い (う)',  to: 'える',  ex: 'か<b>い</b>ます → か<b>える</b>' },
        ],
      },
      {
        group: 'Nhóm 2 (Động từ る)',
        rule: 'Bỏ ます, thêm られる',
        ex: 'た<b>べます</b> → たべ<b>られる</b>　/　み<b>ます</b> → み<b>られる</b>',
      },
      {
        group: 'Nhóm 3 (Bất quy tắc)',
        rule: 'Học thuộc',
        ex: 'し<b>ます</b> → <b>できる</b>　/　き<b>ます</b> → <b>こられる</b>',
      },
    ],
  },
];
