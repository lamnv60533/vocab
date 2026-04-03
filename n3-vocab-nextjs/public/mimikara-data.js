const MIMIKARA_VOCAB = [
  // --- người ---
  { kanji: '男性', reading: 'だんせい', meaning: 'đàn ông', example: 'その男性は背が高いです。', exampleMeaning: 'Người đàn ông đó cao.', category: 'noun' },
  { kanji: '女性', reading: 'じょせい', meaning: 'phụ nữ', example: '彼女は優秀な女性です。', exampleMeaning: 'Cô ấy là người phụ nữ xuất sắc.', category: 'noun' },
  { kanji: '高齢', reading: 'こうれい', meaning: 'cao tuổi', example: '日本は高齢社会になっています。', exampleMeaning: 'Nhật Bản đang trở thành xã hội cao tuổi.', category: 'noun' },
  { kanji: '年上', reading: 'としうえ', meaning: 'lớn tuổi', example: '彼は私より三歳年上です。', exampleMeaning: 'Anh ấy hơn tôi ba tuổi.', category: 'noun' },
  { kanji: '目上', reading: 'めうえ', meaning: 'người trên', example: '目上の人には敬語を使います。', exampleMeaning: 'Dùng kính ngữ với người trên.', category: 'noun' },
  { kanji: '先輩', reading: 'せんぱい', meaning: 'tiền bối', example: '先輩にアドバイスをもらいました。', exampleMeaning: 'Tôi nhận được lời khuyên từ tiền bối.', category: 'noun' },
  { kanji: '後輩', reading: 'こうはい', meaning: 'hậu bối', example: '後輩に仕事のやり方を教えました。', exampleMeaning: 'Tôi đã dạy hậu bối cách làm việc.', category: 'noun' },
  { kanji: '上司', reading: 'じょうし', meaning: 'cấp trên', example: '上司に報告しました。', exampleMeaning: 'Tôi đã báo cáo với cấp trên.', category: 'noun' },
  { kanji: '相手', reading: 'あいて', meaning: 'đối thủ', example: '試合の相手はとても強かったです。', exampleMeaning: 'Đối thủ trong trận đấu rất mạnh.', category: 'noun' },
  { kanji: '知り合い', reading: 'しりあい', meaning: 'người quen', example: '彼は父の知り合いです。', exampleMeaning: 'Anh ấy là người quen của bố tôi.', category: 'noun' },
  { kanji: '友人', reading: 'ゆうじん', meaning: 'bạn bè', example: '大学時代の友人に会いました。', exampleMeaning: 'Tôi đã gặp người bạn thời đại học.', category: 'noun' },
  { kanji: '仲', reading: 'なか', meaning: 'mối quan hệ', example: '二人の仲はとても良いです。', exampleMeaning: 'Mối quan hệ của hai người rất tốt.', category: 'noun' },

  // --- cuộc đời ---
  { kanji: '生年月日', reading: 'せいねんがっぴ', meaning: 'ngày tháng năm sinh', example: '生年月日を教えてください。', exampleMeaning: 'Hãy cho tôi biết ngày tháng năm sinh của bạn.', category: 'noun' },
  { kanji: '誕生', reading: 'たんじょう', meaning: 'sự ra đời', example: '新しいアイデアが誕生しました。', exampleMeaning: 'Một ý tưởng mới đã ra đời.', category: 'noun' },
  { kanji: '年', reading: 'とし', meaning: 'năm, tuổi', example: '年をとるごとに経験が増えます。', exampleMeaning: 'Theo năm tháng, kinh nghiệm ngày càng tăng.', category: 'noun' },
  { kanji: '出身', reading: 'しゅっしん', meaning: 'xuất thân, quê quán', example: 'ご出身はどちらですか？', exampleMeaning: 'Bạn quê ở đâu?', category: 'noun' },
  { kanji: '故郷', reading: 'こきょう', meaning: 'quê hương', example: '故郷に帰りたいです。', exampleMeaning: 'Tôi muốn về quê hương.', category: 'noun' },
  { kanji: '成長', reading: 'せいちょう', meaning: 'sự trưởng thành', example: '子供はとても成長しました。', exampleMeaning: 'Đứa trẻ đã trưởng thành rất nhiều.', category: 'verb' },
  { kanji: '成人', reading: 'せいじん', meaning: 'người trưởng thành', example: '来年、成人式に参加します。', exampleMeaning: 'Năm sau tôi sẽ tham dự lễ trưởng thành.', category: 'noun' },

  // --- học tập & công việc ---
  { kanji: '合格', reading: 'ごうかく', meaning: 'trúng tuyển, thi đỗ', example: '大学の試験に合格しました。', exampleMeaning: 'Tôi đã đỗ kỳ thi đại học.', category: 'verb' },
  { kanji: '進学', reading: 'しんがく', meaning: 'học lên', example: '大学に進学するつもりです。', exampleMeaning: 'Tôi định học lên đại học.', category: 'verb' },
  { kanji: '退学', reading: 'たいがく', meaning: 'bỏ học', example: '彼は病気で退学してしまいました。', exampleMeaning: 'Anh ấy đã bỏ học vì bệnh.', category: 'verb' },
  { kanji: '就職', reading: 'しゅうしょく', meaning: 'có việc làm', example: '大きな会社に就職しました。', exampleMeaning: 'Tôi đã có việc ở một công ty lớn.', category: 'verb' },
  { kanji: '退職', reading: 'たいしょく', meaning: 'nghỉ việc', example: '来月、退職するつもりです。', exampleMeaning: 'Tôi định nghỉ việc vào tháng sau.', category: 'verb' },
  { kanji: '失業', reading: 'しつぎょう', meaning: 'thất nghiệp', example: '不景気で失業してしまいました。', exampleMeaning: 'Tôi đã mất việc vì kinh tế khó khăn.', category: 'verb' },
  { kanji: '残業', reading: 'ざんぎょう', meaning: 'làm thêm giờ', example: '毎日残業しています。', exampleMeaning: 'Tôi làm thêm giờ mỗi ngày.', category: 'verb' },
  { kanji: '生活', reading: 'せいかつ', meaning: 'sinh hoạt', example: '東京で一人で生活しています。', exampleMeaning: 'Tôi đang sống một mình ở Tokyo.', category: 'verb' },
  { kanji: '通勤', reading: 'つうきん', meaning: 'đi làm', example: '毎日電車で通勤しています。', exampleMeaning: 'Tôi đi làm bằng tàu điện mỗi ngày.', category: 'verb' },
  { kanji: '学歴', reading: 'がくれき', meaning: 'bằng cấp', example: '学歴より実力が大切だと思います。', exampleMeaning: 'Tôi nghĩ thực lực quan trọng hơn bằng cấp.', category: 'noun' },
  { kanji: '給料', reading: 'きゅうりょう', meaning: 'lương', example: '今月の給料が入りました。', exampleMeaning: 'Lương tháng này đã vào.', category: 'noun' },
  { kanji: '面接', reading: 'めんせつ', meaning: 'phỏng vấn', example: '明日、面接があります。', exampleMeaning: 'Ngày mai tôi có phỏng vấn.', category: 'noun' },
  { kanji: '休憩', reading: 'きゅうけい', meaning: 'nghỉ ngơi', example: '少し休憩しましょう。', exampleMeaning: 'Hãy nghỉ một chút.', category: 'verb' },

  // --- di chuyển ---
  { kanji: '観光', reading: 'かんこう', meaning: 'tham quan', example: '友達と京都を観光しました。', exampleMeaning: 'Tôi đã tham quan Kyoto với bạn bè.', category: 'verb' },
  { kanji: '帰国', reading: 'きこく', meaning: 'về nước', example: '来月、帰国する予定です。', exampleMeaning: 'Tôi dự định về nước vào tháng sau.', category: 'verb' },
  { kanji: '帰省', reading: 'きせい', meaning: 'về quê', example: 'お盆に実家へ帰省しました。', exampleMeaning: 'Tôi đã về quê vào dịp Obon.', category: 'verb' },
  { kanji: '帰宅', reading: 'きたく', meaning: 'về nhà', example: '昨日は夜遅く帰宅しました。', exampleMeaning: 'Hôm qua tôi về nhà rất muộn.', category: 'verb' },

  // --- hoạt động ---
  { kanji: '参加', reading: 'さんか', meaning: 'tham gia', example: '会議に参加しました。', exampleMeaning: 'Tôi đã tham gia cuộc họp.', category: 'verb' },
  { kanji: '出席', reading: 'しゅっせき', meaning: 'có mặt, tham gia', example: '全員が出席しました。', exampleMeaning: 'Tất cả mọi người đều có mặt.', category: 'verb' },
  { kanji: '欠席', reading: 'けっせき', meaning: 'vắng mặt', example: '病気で授業を欠席しました。', exampleMeaning: 'Tôi đã vắng mặt vì bệnh.', category: 'verb' },
  { kanji: '遅刻', reading: 'ちこく', meaning: 'đi muộn', example: '電車が遅れて遅刻しました。', exampleMeaning: 'Tàu trễ nên tôi đến muộn.', category: 'verb' },
  { kanji: '化粧', reading: 'けしょう', meaning: 'trang điểm', example: '毎朝化粧をします。', exampleMeaning: 'Tôi trang điểm mỗi sáng.', category: 'verb' },
  { kanji: '計算', reading: 'けいさん', meaning: 'kế toán', example: '計算が間違っていました。', exampleMeaning: 'Phép tính đã sai.', category: 'verb' },
  { kanji: '計画', reading: 'けいかく', meaning: 'kế hoạch', example: '旅行の計画を立てました。', exampleMeaning: 'Tôi đã lập kế hoạch du lịch.', category: 'noun' },
  { kanji: '成功', reading: 'せいこう', meaning: 'thành công', example: 'プロジェクトが成功しました。', exampleMeaning: 'Dự án đã thành công.', category: 'verb' },
  { kanji: '失敗', reading: 'しっぱい', meaning: 'thất bại', example: '失敗から学ぶことが大切です。', exampleMeaning: 'Học hỏi từ thất bại là điều quan trọng.', category: 'verb' },
  { kanji: '準備', reading: 'じゅんび', meaning: 'chuẩn bị', example: 'パーティーの準備をしています。', exampleMeaning: 'Tôi đang chuẩn bị cho bữa tiệc.', category: 'verb' },
  { kanji: '整理', reading: 'せいり', meaning: 'chỉnh lý, chỉnh sửa', example: '部屋を整理しました。', exampleMeaning: 'Tôi đã dọn dẹp phòng.', category: 'verb' },
  { kanji: '注文', reading: 'ちゅうもん', meaning: 'đặt hàng, gọi món', example: 'ランチを注文しました。', exampleMeaning: 'Tôi đã gọi bữa trưa.', category: 'verb' },
  { kanji: '貯金', reading: 'ちょきん', meaning: 'tiết kiệm', example: '毎月少しずつ貯金しています。', exampleMeaning: 'Tôi tiết kiệm một ít mỗi tháng.', category: 'verb' },
  { kanji: '徹夜', reading: 'てつや', meaning: 'thức đêm', example: '試験のために徹夜しました。', exampleMeaning: 'Tôi đã thức đêm để ôn thi.', category: 'verb' },
  { kanji: '引っ越し', reading: 'ひっこし', meaning: 'chuyển nhà', example: '来月、新しいアパートに引っ越しします。', exampleMeaning: 'Tháng sau tôi sẽ chuyển đến căn hộ mới.', category: 'verb' },

  // --- cơ thể ---
  { kanji: '身長', reading: 'しんちょう', meaning: 'chiều cao', example: '彼の身長は180センチです。', exampleMeaning: 'Chiều cao của anh ấy là 180 cm.', category: 'noun' },
  { kanji: '体重', reading: 'たいじゅう', meaning: 'cân nặng', example: '体重が少し増えました。', exampleMeaning: 'Cân nặng tăng một chút.', category: 'noun' },
  { kanji: 'けが', reading: 'けが', meaning: 'vết thương', example: 'サッカーでけがをしてしまいました。', exampleMeaning: 'Tôi đã bị thương khi chơi bóng đá.', category: 'noun' },

  // --- xã hội ---
  { kanji: '会', reading: 'かい', meaning: 'hội nghị', example: '同窓会に参加しました。', exampleMeaning: 'Tôi đã tham gia buổi họp lớp.', category: 'noun' },
  { kanji: '趣味', reading: 'しゅみ', meaning: 'sở thích', example: '趣味は読書と映画鑑賞です。', exampleMeaning: 'Sở thích của tôi là đọc sách và xem phim.', category: 'noun' },
  { kanji: '興味', reading: 'きょうみ', meaning: 'hứng thú', example: '日本文化にとても興味があります。', exampleMeaning: 'Tôi rất hứng thú với văn hóa Nhật.', category: 'noun' },
  { kanji: '思い出', reading: 'おもいで', meaning: 'nhớ lại, nhớ về', example: '子供のころの楽しい思い出があります。', exampleMeaning: 'Có những kỷ niệm vui thời thơ ấu.', category: 'noun' },
  { kanji: '冗談', reading: 'じょうだん', meaning: 'đùa cợt', example: '冗談を言わないでください。', exampleMeaning: 'Đừng nói đùa.', category: 'noun' },
  { kanji: '目的', reading: 'もくてき', meaning: 'mục đích', example: '留学の目的は何ですか？', exampleMeaning: 'Mục đích đi du học là gì?', category: 'noun' },
  { kanji: '約束', reading: 'やくそく', meaning: 'hứa, hẹn', example: '約束を守ってください。', exampleMeaning: 'Hãy giữ lời hứa.', category: 'verb' },
  { kanji: 'おしゃべり', reading: 'おしゃべり', meaning: 'nói, tán gẫu', example: '友達とカフェでおしゃべりしました。', exampleMeaning: 'Tôi đã tán gẫu với bạn ở quán cà phê.', category: 'noun' },
  { kanji: '遠慮', reading: 'えんりょ', meaning: 'ngại ngần', example: '遠慮しないでたくさん食べてください。', exampleMeaning: 'Đừng ngại, hãy ăn thật nhiều.', category: 'verb' },
  { kanji: '我慢', reading: 'がまん', meaning: 'chịu đựng', example: '痛みを我慢しました。', exampleMeaning: 'Tôi đã chịu đựng cơn đau.', category: 'verb' },
  { kanji: '迷惑', reading: 'めいわく', meaning: 'làm phiền', example: '人に迷惑をかけないでください。', exampleMeaning: 'Đừng làm phiền người khác.', category: 'na-adjective' },
  { kanji: '希望', reading: 'きぼう', meaning: 'hi vọng', example: '将来の希望を話しました。', exampleMeaning: 'Tôi đã nói về hy vọng tương lai.', category: 'verb' },
  { kanji: '夢', reading: 'ゆめ', meaning: 'giấc mơ', example: '医者になるのが夢です。', exampleMeaning: 'Ước mơ của tôi là trở thành bác sĩ.', category: 'noun' },
  { kanji: '賛成', reading: 'さんせい', meaning: 'tán thành', example: '彼の意見に賛成しました。', exampleMeaning: 'Tôi đã tán thành ý kiến của anh ấy.', category: 'verb' },
  { kanji: '反対', reading: 'はんたい', meaning: 'phản đối', example: 'その計画に反対しました。', exampleMeaning: 'Tôi đã phản đối kế hoạch đó.', category: 'verb' },
  { kanji: '想像', reading: 'そうぞう', meaning: 'tưởng tượng', example: '想像もできなかったことが起きました。', exampleMeaning: 'Điều không thể tưởng tượng đã xảy ra.', category: 'verb' },
  { kanji: '努力', reading: 'どりょく', meaning: 'nỗ lực', example: '目標のために毎日努力しています。', exampleMeaning: 'Tôi nỗ lực mỗi ngày vì mục tiêu.', category: 'verb' },

  // --- thiên nhiên & môi trường ---
  { kanji: '太陽', reading: 'たいよう', meaning: 'mặt trời', example: '太陽が輝いています。', exampleMeaning: 'Mặt trời đang tỏa sáng.', category: 'noun' },
  { kanji: '地球', reading: 'ちきゅう', meaning: 'trái đất', example: '地球温暖化が問題です。', exampleMeaning: 'Nóng lên toàn cầu là vấn đề.', category: 'noun' },
  { kanji: '温度', reading: 'おんど', meaning: 'nhiệt độ', example: '温度を確認してください。', exampleMeaning: 'Hãy kiểm tra nhiệt độ.', category: 'noun' },
  { kanji: '湿度', reading: 'しつど', meaning: 'độ ẩm', example: '今日は湿度が高いです。', exampleMeaning: 'Hôm nay độ ẩm cao.', category: 'noun' },
  { kanji: '湿気', reading: 'しっけ', meaning: 'hơi ẩm', example: '夏は湿気が多いです。', exampleMeaning: 'Mùa hè nhiều hơi ẩm.', category: 'noun' },
  { kanji: '梅雨', reading: 'つゆ', meaning: 'mùa mưa', example: '梅雨の季節は雨が多いです。', exampleMeaning: 'Mùa mưa có nhiều mưa.', category: 'noun' },
  { kanji: 'かび', reading: 'かび', meaning: 'nấm mốc', example: 'お風呂にかびが生えました。', exampleMeaning: 'Nấm mốc mọc trong phòng tắm.', category: 'noun' },
  { kanji: '暖房', reading: 'だんぼう', meaning: 'hệ thống sưởi', example: '冬に暖房をつけます。', exampleMeaning: 'Vào mùa đông bật hệ thống sưởi.', category: 'noun' },

  // --- đồ vật & vật liệu ---
  { kanji: '皮', reading: 'かわ', meaning: 'vỏ, da', example: 'りんごの皮をむいた。', exampleMeaning: 'Tôi đã gọt vỏ táo.', category: 'noun' },
  { kanji: '缶', reading: 'かん', meaning: 'can, bình, lon', example: '缶ビールを買いました。', exampleMeaning: 'Tôi đã mua bia lon.', category: 'noun' },
  { kanji: '画面', reading: 'がめん', meaning: 'màn hình', example: 'スマホの画面が割れた。', exampleMeaning: 'Màn hình điện thoại bị vỡ.', category: 'noun' },
  { kanji: '洗剤', reading: 'せんざい', meaning: 'chất tẩy rửa', example: '洗剤で食器を洗います。', exampleMeaning: 'Tôi rửa bát đĩa bằng chất tẩy rửa.', category: 'noun' },

  // --- truyền thông & văn hóa ---
  { kanji: '番組', reading: 'ばんぐみ', meaning: 'chương trình', example: '好きな番組を録画する。', exampleMeaning: 'Tôi ghi lại chương trình yêu thích.', category: 'noun' },
  { kanji: '記事', reading: 'きじ', meaning: 'ký sự, ghi chép', example: '新聞の記事を読む。', exampleMeaning: 'Đọc bài báo trên báo.', category: 'noun' },
  { kanji: '作者', reading: 'さくしゃ', meaning: 'tác giả', example: 'この小説の作者は有名です。', exampleMeaning: 'Tác giả của tiểu thuyết này nổi tiếng.', category: 'noun' },
  { kanji: '作品', reading: 'さくひん', meaning: 'tác phẩm', example: '素晴らしい作品だと思います。', exampleMeaning: 'Tôi nghĩ đó là tác phẩm tuyệt vời.', category: 'noun' },
  { kanji: 'ごちそう', reading: 'ごちそう', meaning: 'chiêu đãi', example: 'ごちそうをありがとうございます。', exampleMeaning: 'Cảm ơn vì đã chiêu đãi.', category: 'noun' },

  // --- xã hội & địa điểm ---
  { kanji: '近所', reading: 'きんじょ', meaning: 'hàng xóm', example: '近所の人と仲が良いです。', exampleMeaning: 'Tôi thân với hàng xóm.', category: 'noun' },
  { kanji: '警察', reading: 'けいさつ', meaning: 'cảnh sát', example: '警察に連絡しました。', exampleMeaning: 'Tôi đã liên lạc với cảnh sát.', category: 'noun' },
  { kanji: '犯人', reading: 'はんにん', meaning: 'tội phạm', example: '犯人が捕まりました。', exampleMeaning: 'Tội phạm đã bị bắt.', category: 'noun' },
  { kanji: '小銭', reading: 'こぜに', meaning: 'tiền lẻ', example: '小銭がなくて困りました。', exampleMeaning: 'Tôi bối rối vì không có tiền lẻ.', category: 'noun' },
  { kanji: '制服', reading: 'せいふく', meaning: 'đồng phục', example: '学校の制服を着ます。', exampleMeaning: 'Tôi mặc đồng phục trường.', category: 'noun' },

  // --- địa lý & địa điểm ---
  { kanji: '底', reading: 'そこ', meaning: 'đáy', example: 'バッグの底に財布があります。', exampleMeaning: 'Ví tiền ở đáy túi.', category: 'noun' },
  { kanji: '地下', reading: 'ちか', meaning: 'dưới đất', example: '地下に駐車場があります。', exampleMeaning: 'Có bãi đậu xe ở tầng hầm.', category: 'noun' },
  { kanji: '寺', reading: 'てら', meaning: 'chùa', example: '古いお寺を見学しました。', exampleMeaning: 'Tôi đã tham quan ngôi chùa cổ.', category: 'noun' },
  { kanji: '道路', reading: 'どうろ', meaning: 'đường quốc lộ', example: '道路工事で渋滞しました。', exampleMeaning: 'Tắc đường vì thi công đường.', category: 'noun' },
  { kanji: '坂', reading: 'さか', meaning: 'dốc', example: 'この坂は急です。', exampleMeaning: 'Dốc này rất dốc.', category: 'noun' },
  { kanji: '煙', reading: 'けむり', meaning: 'khói', example: '煙が目に入りました。', exampleMeaning: 'Khói vào mắt tôi.', category: 'noun' },
  { kanji: '灰', reading: 'はい', meaning: 'tàn tro', example: '火が消えて灰になりました。', exampleMeaning: 'Lửa tắt và thành tàn tro.', category: 'noun' },
];
