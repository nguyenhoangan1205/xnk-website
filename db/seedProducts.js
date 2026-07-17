// Dữ liệu sản phẩm mẫu (4 nhóm x 2 sản phẩm), đầy đủ 4 ngôn ngữ VI/EN/ZH/JA.
// Đây chỉ là dữ liệu demo để xem giao diện — hãy thay bằng sản phẩm thật qua trang quản trị (/admin).
module.exports = [
  {
    categorySlug: "nong-san",
    priceMin: 550, priceMax: 650, currency: "USD", unit: "ton", moq: "5 tấn / 5 tons",
    image: null,
    translations: {
      vi: { name: "Gạo trắng hạt dài 5% tấm", shortDesc: "Gạo trắng chất lượng cao, xuất khẩu.", description: "Gạo trắng hạt dài, tỷ lệ tấm 5%, độ ẩm dưới 14%, đóng bao 25kg/50kg theo yêu cầu. Nguồn gốc Đồng bằng sông Cửu Long, sản lượng ổn định quanh năm." },
      en: { name: "Long-Grain White Rice 5% Broken", shortDesc: "High-quality white rice for export.", description: "Long-grain white rice, 5% broken ratio, moisture below 14%, packed in 25kg/50kg bags upon request. Sourced from the Mekong Delta with stable year-round supply." },
      zh: { name: "长粒白米（碎米率5%）", shortDesc: "高品质出口白米。", description: "长粒白米，碎米率5%，水分低于14%，可按需求装袋25公斤/50公斤。产自湄公河三角洲，全年供应稳定。" },
      ja: { name: "長粒白米（砕米率5%）", shortDesc: "高品質な輸出用白米。", description: "長粒白米、砕米率5%、水分14%以下、ご要望に応じて25kg/50kg袋詰め。メコンデルタ産で年間を通じて安定供給。" }
    }
  },
  {
    categorySlug: "nong-san",
    priceMin: 2200, priceMax: 2600, currency: "USD", unit: "ton", moq: "1 tấn / 1 ton",
    image: null,
    translations: {
      vi: { name: "Cà phê Robusta nhân xanh", shortDesc: "Cà phê Robusta chất lượng xuất khẩu.", description: "Cà phê Robusta nhân xanh, sàng 16/18, độ ẩm 12.5%, lỗi đen vỡ dưới 5%. Thu hoạch tại Tây Nguyên, chế biến khô, đóng bao đay 60kg." },
      en: { name: "Robusta Green Coffee Beans", shortDesc: "Export-grade Robusta coffee.", description: "Robusta green coffee beans, screen 16/18, moisture 12.5%, black & broken under 5%. Grown in the Central Highlands, dry-processed, packed in 60kg jute bags." },
      zh: { name: "罗布斯塔生咖啡豆", shortDesc: "出口级罗布斯塔咖啡。", description: "罗布斯塔生咖啡豆，筛号16/18，水分12.5%，黑豆及碎豆率低于5%。产自中部高原，干法加工，60公斤麻袋包装。" },
      ja: { name: "ロブスタ生豆コーヒー", shortDesc: "輸出グレードのロブスタコーヒー。", description: "ロブスタ生豆、スクリーン16/18、水分12.5%、黒豆・欠け豆率5%未満。中部高原産、乾式精製、60kgジュート麻袋詰め。" }
    }
  },
  {
    categorySlug: "do-gia-dung",
    priceMin: 3.5, priceMax: 12, currency: "USD", unit: "piece", moq: "500 cái / 500 pcs",
    image: null,
    translations: {
      vi: { name: "Bộ bát đĩa gốm tráng men", shortDesc: "Bát đĩa gốm sứ họa tiết truyền thống.", description: "Bộ bát đĩa gốm tráng men cao cấp, an toàn cho lò vi sóng và máy rửa chén, họa tiết thủ công đặc trưng Việt Nam. Có thể tùy chỉnh theo mẫu khách hàng." },
      en: { name: "Glazed Ceramic Tableware Set", shortDesc: "Ceramic bowls and plates with traditional patterns.", description: "Premium glazed ceramic tableware, microwave and dishwasher safe, handcrafted patterns unique to Vietnam. Custom designs available on request." },
      zh: { name: "釉面陶瓷餐具套装", shortDesc: "传统图案陶瓷碗碟。", description: "高级釉面陶瓷餐具，可用于微波炉及洗碗机，手工绘制越南传统图案。可根据客户样式定制。" },
      ja: { name: "釉薬陶器食器セット", shortDesc: "伝統模様の陶器の茶碗と皿。", description: "高級釉薬陶器食器、電子レンジ・食洗機対応、ベトナム伝統の手描き模様。お客様のデザインに合わせたカスタムも可能。" }
    }
  },
  {
    categorySlug: "do-gia-dung",
    priceMin: 8, priceMax: 25, currency: "USD", unit: "piece", moq: "300 cái / 300 pcs",
    image: null,
    translations: {
      vi: { name: "Giỏ mây tre đan thủ công", shortDesc: "Giỏ đựng đồ bằng mây tự nhiên.", description: "Giỏ mây tre đan thủ công 100% nguyên liệu tự nhiên, thân thiện môi trường, nhiều kích cỡ. Phù hợp trang trí nội thất và đựng đồ gia dụng." },
      en: { name: "Handwoven Rattan Basket", shortDesc: "Storage basket made from natural rattan.", description: "100% natural rattan handwoven basket, eco-friendly, available in multiple sizes. Ideal for home decor and household storage." },
      zh: { name: "手工编织藤篮", shortDesc: "天然藤条收纳篮。", description: "100%天然藤条手工编织篮，环保材质，多种尺寸可选。适合家居装饰及日常收纳。" },
      ja: { name: "手編みラタンバスケット", shortDesc: "天然ラタン製の収納バスケット。", description: "100%天然ラタンを使用した手編みバスケット、環境に優しく、サイズ展開も豊富。インテリアや収納にも最適。" }
    }
  },
  {
    categorySlug: "go",
    priceMin: 280, priceMax: 350, currency: "USD", unit: "m3", moq: "20 m³",
    image: null,
    translations: {
      vi: { name: "Ván ép công nghiệp phủ phim", shortDesc: "Ván ép phủ phim chống thấm.", description: "Ván ép phủ phim đen/nâu, chống thấm nước, chịu lực cao, ứng dụng làm coppha xây dựng. Độ dày từ 12mm đến 18mm." },
      en: { name: "Film-Faced Plywood", shortDesc: "Waterproof film-faced plywood.", description: "Black/brown film-faced plywood, water resistant, high load-bearing capacity, used for concrete formwork. Thickness from 12mm to 18mm." },
      zh: { name: "覆膜工业胶合板", shortDesc: "防水覆膜胶合板。", description: "黑色/棕色覆膜胶合板，防水，承重能力强，用于建筑模板。厚度12毫米至18毫米。" },
      ja: { name: "フィルムフェース合板", shortDesc: "防水フィルム貼り合板。", description: "黒/茶色フィルムフェース合板、防水性・高耐荷重、コンクリート型枠に使用。厚さ12mm～18mm。" }
    }
  },
  {
    categorySlug: "go",
    priceMin: 150, priceMax: 220, currency: "USD", unit: "piece", moq: "50 bộ / 50 sets",
    image: null,
    translations: {
      vi: { name: "Bàn ghế gỗ cao su ngoài trời", shortDesc: "Bộ bàn ghế gỗ cao su bền, chịu thời tiết.", description: "Bộ bàn ghế gỗ cao su tự nhiên, xử lý chống mối mọt và chịu thời tiết, phù hợp sân vườn, ban công. Có thể sơn theo màu yêu cầu." },
      en: { name: "Outdoor Rubberwood Table & Chair Set", shortDesc: "Durable weather-resistant rubberwood furniture.", description: "Natural rubberwood table and chair set, anti-termite and weather treated, suitable for gardens and balconies. Custom finishes available." },
      zh: { name: "户外橡胶木桌椅套装", shortDesc: "耐用防风雨橡胶木家具。", description: "天然橡胶木桌椅套装，经防白蚁和防风雨处理，适用于花园及阳台。可根据需求定制颜色。" },
      ja: { name: "屋外用ゴムの木テーブル・チェアセット", shortDesc: "耐候性に優れたゴムの木家具。", description: "天然ゴムの木製テーブル・チェアセット、防蟻・耐候処理済み、庭やバルコニーに最適。カラーオーダーも可能。" }
    }
  },
  {
    categorySlug: "thiet-bi-cong-nghiep",
    priceMin: 4500, priceMax: 9000, currency: "USD", unit: "piece", moq: "1 máy / 1 unit",
    image: null,
    translations: {
      vi: { name: "Máy đóng gói bao bì tự động", shortDesc: "Máy đóng gói năng suất cao cho nhà máy.", description: "Máy đóng gói tự động dùng cho thực phẩm, nông sản, năng suất 30-60 gói/phút, tùy chỉnh theo trọng lượng bao bì. Bảo hành 12 tháng." },
      en: { name: "Automatic Packaging Machine", shortDesc: "High-throughput packaging machine for factories.", description: "Automatic packaging machine for food and agricultural products, output of 30-60 bags/minute, adjustable package weight. 12-month warranty." },
      zh: { name: "全自动包装机", shortDesc: "适用于工厂的高效包装机。", description: "适用于食品及农产品的全自动包装机，产量30-60袋/分钟，包装重量可调节。保修12个月。" },
      ja: { name: "全自動包装機", shortDesc: "工場向け高効率包装機。", description: "食品・農産物向け全自動包装機、生産能力30～60袋/分、包装重量調整可能。保証期間12ヶ月。" }
    }
  },
  {
    categorySlug: "thiet-bi-cong-nghiep",
    priceMin: 1200, priceMax: 3200, currency: "USD", unit: "piece", moq: "1 bộ / 1 set",
    image: null,
    translations: {
      vi: { name: "Máy nén khí trục vít công nghiệp", shortDesc: "Máy nén khí bền bỉ cho sản xuất.", description: "Máy nén khí trục vít, công suất 5.5kW-15kW, vận hành êm, tiết kiệm điện, phù hợp nhà xưởng vừa và nhỏ. Có sẵn phụ tùng thay thế." },
      en: { name: "Industrial Screw Air Compressor", shortDesc: "Reliable air compressor for manufacturing.", description: "Screw-type air compressor, 5.5kW-15kW power range, quiet operation, energy efficient, suitable for small and medium factories. Spare parts readily available." },
      zh: { name: "工业螺杆空压机", shortDesc: "适用于生产制造的可靠空压机。", description: "螺杆式空压机，功率5.5kW-15kW，运行安静，节能高效，适用于中小型工厂。备件供应充足。" },
      ja: { name: "産業用スクリュー式エアコンプレッサー", shortDesc: "製造業向けの信頼性の高いコンプレッサー。", description: "スクリュー式エアコンプレッサー、出力5.5kW～15kW、静音運転、省エネ設計で中小規模工場に最適。交換部品も豊富に用意。" }
    }
  }
];
