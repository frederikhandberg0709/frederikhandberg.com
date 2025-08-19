import { ProcessedNostrContent } from "@/types/content";
import { SequentialContentProcessor } from "@/utils/content/sequentialProcessor";
import { useMemo } from "react";

export function useContentAnalysis(content: string): ProcessedNostrContent {
  return useMemo(() => {
    return SequentialContentProcessor.process(content);
  }, [content]);
}
