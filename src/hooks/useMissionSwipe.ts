import { useEffect, useRef } from "react";
import type { MouseEvent, PointerEvent, RefObject } from "react";

const swipeDistance = 48;
const wheelGestureGap = 80;

export function useMissionSwipe(
  viewportRef: RefObject<HTMLDivElement | null>,
  enabled: boolean,
  step: (direction: -1 | 1) => void,
) {
  const touchStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!enabled || !viewport) return;

    let lastWheelAt = -Infinity;
    let horizontal = false;
    let distance = 0;
    let stepped = false;
    let previousDelta = 0;

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || (event.deltaX === 0 && event.deltaY === 0)) return;

      const mode = event.deltaMode;
      const pixelsPerUnit = mode === 1 ? 16 : mode === 2 ? viewport.clientWidth : 1;
      const delta = event.deltaX * pixelsPerUnit;
      const magnitude = Math.abs(delta);
      const mostlyHorizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY);

      // A fresh stroke can interrupt the previous stroke before its momentum ends.
      const newStroke = stepped && mostlyHorizontal && magnitude >= 8 && (
        Math.sign(delta) !== Math.sign(distance) ||
        (Math.abs(previousDelta) <= 8 && magnitude >= 3 * Math.abs(previousDelta))
      );
      if (event.timeStamp - lastWheelAt > wheelGestureGap || newStroke) {
        horizontal = mostlyHorizontal;
        distance = 0;
        stepped = false;
      }
      lastWheelAt = event.timeStamp;
      previousDelta = delta;
      if (!horizontal || !mostlyHorizontal) return;

      if (event.cancelable) event.preventDefault();
      if (stepped) return;

      distance += delta;
      if (Math.abs(distance) >= swipeDistance) {
        stepped = true;
        step(distance > 0 ? 1 : -1);
      }
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [enabled, step, viewportRef]);

  return {
    onPointerDown(event: PointerEvent<HTMLDivElement>) {
      suppressClick.current = false;
      if (event.pointerType !== "touch") return;
      touchStart.current = event.isPrimary
        ? { id: event.pointerId, x: event.clientX, y: event.clientY }
        : null;
    },
    onPointerUp(event: PointerEvent<HTMLDivElement>) {
      const start = touchStart.current;
      if (!start || start.id !== event.pointerId) return;
      touchStart.current = null;

      const x = event.clientX - start.x;
      const y = event.clientY - start.y;
      if (Math.abs(x) < swipeDistance || Math.abs(x) <= Math.abs(y)) return;

      suppressClick.current = true;
      step(x < 0 ? 1 : -1);
    },
    onPointerCancel() {
      touchStart.current = null;
    },
    onClickCapture(event: MouseEvent<HTMLDivElement>) {
      if (!suppressClick.current || event.detail === 0) return;
      suppressClick.current = false;
      event.preventDefault();
      event.stopPropagation();
    },
  };
}
