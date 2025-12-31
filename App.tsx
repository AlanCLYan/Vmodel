
import React, { useState, useCallback, useRef } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  BrainCircuit, 
  Activity, 
  Database, 
  Globe2,
  ChevronRight,
  Loader2,
  Download,
  Image as ImageIcon
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { VStep, VModelScenario } from './types';
import { DEFAULT_STEPS, CONNECTIONS } from './constants';
import VModel from './components/VModel';
import { generateVModel } from './services/geminiService';

const App: React.FC = () => {
  const [steps, setSteps] = useState<VStep[]>(DEFAULT_STEPS);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [inputPrompt, setInputPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [scenarioName, setScenarioName] = useState<string>("智慧運輸系統工程基礎");
  
  const vModelRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    try {
      const result = await generateVModel(inputPrompt);
      setSteps(result.steps);
      setScenarioName(result.name);
      setInputPrompt('');
    } catch (err: any) {
      setError(err.message || "生成失敗，請確認網路連線或 API 金鑰。");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setSteps(DEFAULT_STEPS);
    setScenarioName("智慧運輸系統工程基礎");
    setError(null);
  }, []);

  const exportAsPng = async () => {
    if (!vModelRef.current) return;
    
    setExporting(true);
    try {
      // 導出邏輯：去背 PNG
      // 確保導出時的寬度能容納所有文字而不產生省略號
      const dataUrl = await toPng(vModelRef.current, {
        backgroundColor: null, // 透明背景
        cacheBust: true,
        pixelRatio: 2, // 提高解析度
        style: {
          padding: '40px',
        }
      });
      
      const link = document.createElement('a');
      link.download = `V-Model-${scenarioName.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('導出失敗:', err);
      setError("圖片導出失敗，請再試一次。");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-200">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">V-Model Master</span>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleReset}
              className="hidden md:flex items-center px-4 py-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              重置範例
            </button>
            <button 
              onClick={exportAsPng}
              disabled={exporting}
              className="flex items-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-all active:scale-95 disabled:opacity-50"
            >
              {exporting ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {exporting ? '處理中...' : '導出去背 PNG'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider animate-pulse">
            <Activity className="w-3 h-3 mr-2" />
            系統生命週期工程視覺化
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
            {scenarioName}
          </h1>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto font-medium">
            探索設計、驗證與營運在次世代智慧運輸系統中的交匯點。
          </p>
        </header>

        {/* AI Input Section */}
        <section className="max-w-3xl mx-auto mb-20">
          <form onSubmit={handleGenerate} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col md:flex-row gap-3 p-2 bg-white rounded-2xl shadow-2xl border border-slate-200">
              <input 
                type="text"
                placeholder="描述一個 ITS 概念（例如：『高鐵 2.0』或『城市無人機物流』）..."
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                className="flex-1 bg-transparent px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none text-base md:text-lg"
              />
              <button 
                disabled={loading}
                className="flex items-center justify-center px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Sparkles className="w-5 h-5 mr-2" />
                )}
                {loading ? 'AI 思考中...' : '生成 V 模型'}
              </button>
            </div>
            {error && <p className="mt-3 text-sm text-red-500 text-center font-medium">{error}</p>}
          </form>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {["高鐵 2.0 系統", "智慧港口物流", "自駕計程車隊", "共享電動單車系統"].map(tag => (
              <button 
                key={tag}
                onClick={() => setInputPrompt(tag)}
                className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 hover:bg-slate-200 transition-colors uppercase"
              >
                {tag}
              </button>
            ))}
          </div>
        </section>

        {/* Visualization Area */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 px-4">
            <h2 className="text-2xl font-bold flex items-center text-slate-800">
              <ImageIcon className="w-6 h-6 mr-3 text-indigo-600" />
              系統架構 V-Model (左右對應)
            </h2>
            <div className="hidden md:flex space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
              <span>← 左側：定義與設計</span>
              <span className="text-slate-200">|</span>
              <span>右側：驗證與營運 →</span>
            </div>
          </div>

          <section className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-x-auto min-h-[900px]">
             {/* 此區域會被導出為 PNG，確保 V 模型在桌面版是寬版佈局 */}
            <div className="min-w-[1200px]">
              <VModel ref={vModelRef} steps={steps} connections={CONNECTIONS} />
            </div>
          </section>
        </div>

        {/* Knowledge Footer */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20 border-t border-slate-200 pt-16">
          <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-sm">
              <Database className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">端邊網雲協同</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              現代 ITS 系統整合了物聯網元件（端）、即時處理節點（邊）與中央管理平台（雲），確保低延遲的安全性與高效運作。
            </p>
            <div className="flex items-center text-indigo-600 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform cursor-pointer">
              了解更多 <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">有限資源最佳化</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              無論是分配機場旅客時間或是平衡電動車隊的電力負荷，智慧科技透過動態排程優化有限的城市資源。
            </p>
            <div className="flex items-center text-emerald-600 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform cursor-pointer">
              數據分析 <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          </div>

          <div className="space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-all duration-500 shadow-sm">
              <Globe2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">具韌性的基礎設施</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              V 模型確保資安、隱私與電網韌性在設計階段就已納入考慮，而非事後補救，從而建立真正穩固的城市網絡。
            </p>
            <div className="flex items-center text-slate-900 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform cursor-pointer">
              願景展望 <ChevronRight className="w-3 h-3 ml-1" />
            </div>
          </div>
        </footer>
      </main>

      <div className="bg-slate-900 py-6 text-center">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em]">
          專為先進交通系統與工程驗證設計 | Designed by ITS V-Model Master
        </p>
      </div>
    </div>
  );
};

export default App;
