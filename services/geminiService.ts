
import { GoogleGenAI, Type } from "@google/genai";
import { VModelScenario } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateVModel(prompt: string): Promise<VModelScenario> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `請針對以下智慧運輸系統（ITS）或工程概念，創建一個詳細的 7 步驟系統開發 V 模型： "${prompt}"。
    V 模型必須遵循 1-7 的結構，且每個步驟的 title 必須包含中英雙語，格式為「數字. 中文名稱 (English Name)」，必須嚴格遵守以下英文術語：
    1: 1. 使用者需求 (User requirements)
    2: 2. 功能確認 (Function identification)
    3: 3. 系統設計 (System design)
    4: 4. 系統建置 (System implementation)
    5: 5. 系統測試 (System test)
    6: 6. 系統驗證 (System validation)
    7: 7. 商轉營運 (System operation)
    
    請為每個步驟提供兩個具體的應用案例說明。除了括號內的英文名稱外，所有輸出的描述、案例標籤與內容必須使用「繁體中文」。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.INTEGER },
                title: { type: Type.STRING },
                side: { type: Type.STRING, enum: ["left", "right", "center"] },
                level: { type: Type.INTEGER },
                description: { type: Type.STRING },
                color: { type: Type.STRING },
                cases: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      description: { type: Type.STRING }
                    },
                    required: ["label", "description"]
                  }
                }
              },
              required: ["id", "title", "side", "level", "description", "color", "cases"]
            }
          }
        },
        required: ["name", "description", "steps"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("AI 回應格式錯誤，請再試一次。");
  }
}
