
import React, { useState, forwardRef } from 'react';
import { VStep, Connection } from '../types';
import StepCard from './StepCard';

interface VModelProps {
  steps: VStep[];
  connections: Connection[];
}

const VModel = forwardRef<HTMLDivElement, VModelProps>(({ steps, connections }, ref) => {
  const [activeId, setActiveId] = useState<number | null>(null);

  // 根據 ID 找到對應步驟，確保佈局對齊
  const stepMap = (id: number) => steps.find(s => s.id === id);

  // 定義 V 字型的行對應 (左 vs 右)
  const rows = [
    { leftId: 1, rightId: 7, label: "接受度驗證 (目標與成效)" },
    { leftId: 2, rightId: 6, label: "功能對應 (規格與實證)" },
    { leftId: 3, rightId: 5, label: "架構驗證 (設計與測試)" }
  ];

  return (
    <div ref={ref} className="relative py-20 px-4 min-w-[800px] bg-transparent">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* V 型上方三列佈局 */}
        {rows.map((row, index) => {
          const leftStep = stepMap(row.leftId);
          const rightStep = stepMap(row.rightId);
          
          return (
            <div key={index} className="relative grid grid-cols-2 gap-x-40 items-center">
              {/* 左側步驟 */}
              <div className="flex justify-end pr-4" style={{ paddingRight: `${(2 - index) * 60}px` }}>
                {leftStep && (
                  <div className="w-full max-w-sm">
                    <StepCard step={leftStep} activeId={activeId} onHover={setActiveId} />
                  </div>
                )}
              </div>

              {/* 中間連接線 */}
              <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none">
                <div className="w-1/3 border-t-2 border-dashed border-indigo-200 relative">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white border border-indigo-100 px-3 py-0.5 rounded-full text-[10px] text-indigo-500 font-bold shadow-sm whitespace-nowrap z-20">
                    {row.label}
                  </div>
                </div>
              </div>

              {/* 右側步驟 */}
              <div className="flex justify-start pl-4" style={{ paddingLeft: `${(2 - index) * 60}px` }}>
                {rightStep && (
                  <div className="w-full max-w-sm">
                    <StepCard step={rightStep} activeId={activeId} onHover={setActiveId} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* V 型底部的頂點：系統建置 */}
        <div className="flex justify-center pt-8">
          {stepMap(4) && (
            <div className="relative w-full max-w-sm">
              {/* 垂直導引線 */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-16 w-0.5 bg-gradient-to-b from-indigo-200 to-indigo-600"></div>
              <StepCard step={stepMap(4)!} activeId={activeId} onHover={setActiveId} />
            </div>
          )}
        </div>
      </div>

      {/* 視覺裝飾 V 型路徑 */}
      <div className="absolute inset-0 pointer-events-none opacity-5 -z-10 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M150 50 L500 700 L850 50" stroke="#4F46E5" strokeWidth="80" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
});

export default VModel;
