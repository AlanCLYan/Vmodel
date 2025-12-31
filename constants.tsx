
import React from 'react';
import { 
  Users, 
  Settings, 
  Layout, 
  Code, 
  Search, 
  CheckCircle, 
  Rocket 
} from 'lucide-react';
import { VStep, Connection } from './types';

export const DEFAULT_STEPS: VStep[] = [
  {
    id: 1,
    title: "1. 使用者需求 (User requirements)",
    side: "left",
    level: 0,
    color: "bg-blue-600",
    description: "定義營運痛點與系統目標。",
    cases: [
      { label: "樟宜機場 FAST", description: "解決人工查驗瓶頸；消除國籍不平等待遇；將旅客時間導向消費。" },
      { label: "電動公車智慧充電", description: "因應2030公車電動化；解決能源分配不均；避免台電超約罰款。" }
    ]
  },
  {
    id: 2,
    title: "2. 功能確認 (Function identification)",
    side: "left",
    level: 1,
    color: "bg-cyan-600",
    description: "確定系統必須提供的具體功能規格。",
    cases: [
      { label: "樟宜機場 FAST", description: "整合自助報到、託運、安檢、通關全流程自動化；採用臉部與虹膜辨識。" },
      { label: "電動公車智慧充電", description: "AI 最佳化充電排程；車隊監控與跨場站資訊流通；支援 V2G 反向供電。" }
    ]
  },
  {
    id: 3,
    title: "3. 系統設計 (System design)",
    side: "left",
    level: 2,
    color: "bg-teal-600",
    description: "定義技術架構、層次與遵循之國際標準。",
    cases: [
      { label: "樟宜機場 FAST", description: "「端邊網雲」架構；單一生物識別身分憑證；遵循 ICAO 國際護照規範。" },
      { label: "電動公車智慧充電", description: "採用 CCS1+N 國際通用標準；公車視為移動式儲能設備；智慧管理中樞。" }
    ]
  },
  {
    id: 4,
    title: "4. 系統建置 (System implementation)",
    side: "center",
    level: 3,
    color: "bg-indigo-700",
    description: "軟硬體實作、設備部署與平台開發。",
    cases: [
      { label: "樟宜機場 FAST", description: "部署自助報到機、智慧安檢機；開發 AI 模型訓練平台與安全數據交換平台。" },
      { label: "電動公車智慧充電", description: "由運研所開發 AIoT 整合技術；於北士科中興巴士充電站建立驗證場域。" }
    ]
  },
  {
    id: 5,
    title: "5. 系統測試 (System test)",
    side: "right",
    level: 2,
    color: "bg-teal-600",
    description: "測試各模組功能、效能與系統相容性。",
    cases: [
      { label: "樟宜機場 FAST", description: "測試辨識之防偽性；驗證分散式運算在人流尖峰時的即時調度能力。" },
      { label: "電動公車智慧充電", description: "測試跨廠牌公車與充電樁相容性；模擬用電緊迫時系統自動調度電力反應。" }
    ]
  },
  {
    id: 6,
    title: "6. 系統驗證 (System validation)",
    side: "right",
    level: 1,
    color: "bg-cyan-600",
    description: "確認系統是否達成最初設計的量化成效目標。",
    cases: [
      { label: "樟宜機場 FAST", description: "實測達成 10-15 秒快速通關；符合 ISO27001 資安規範及個資保護。" },
      { label: "電動公車智慧充電", description: "人力成本節省 30-50%、契約容量降 30-50%；電池壽命延長約 20%。" }
    ]
  },
  {
    id: 7,
    title: "7. 商轉營運 (System operation)",
    side: "right",
    level: 0,
    color: "bg-blue-600",
    description: "系統正式上線並發揮長期社會與經濟影響力。",
    cases: [
      { label: "樟宜機場 FAST", description: "成為全球智慧機場服務典範；流程重塑提升旅客航廈內消費體驗。" },
      { label: "電動公車智慧充電", description: "支持 2050 淨零排放；榮獲 APEC ESCI 金獎，展現數位科技輸出潛力。" }
    ]
  }
];

export const CONNECTIONS: Connection[] = [
  { from: 1, to: 7, label: "接受度驗證 (目標與成效)" },
  { from: 2, to: 6, label: "功能對應 (規格與實證)" },
  { from: 3, to: 5, label: "架構驗證 (設計與測試)" }
];

export const getIcon = (id: number) => {
  switch (id) {
    case 1: return <Users className="w-5 h-5 md:w-6 h-6" />;
    case 2: return <Settings className="w-5 h-5 md:w-6 h-6" />;
    case 3: return <Layout className="w-5 h-5 md:w-6 h-6" />;
    case 4: return <Code className="w-5 h-5 md:w-6 h-6" />;
    case 5: return <Search className="w-5 h-5 md:w-6 h-6" />;
    case 6: return <CheckCircle className="w-5 h-5 md:w-6 h-6" />;
    case 7: return <Rocket className="w-5 h-5 md:w-6 h-6" />;
    default: return <Users className="w-5 h-5 md:w-6 h-6" />;
  }
};
