"use client";

import { startTransition, useRef, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useDrag } from "~/lib/client/useDrag";

/**
 * 移動可能コントロールパネル的なやつ
 */
export const Panel = () => {
    // 折りたたみ状態を管理するstate
    const [isHidden, setIsHidden] = useState(false);

    // 折りたたみボタンのクリックハンドラ
    const handleCollapseToggle = () => {
        startTransition(() => {
            setIsHidden((prev) => !prev);
        });
    };

    // 編集機能コンポーネントを移動可能にするための諸々をカスタムフックから取得
    const editorRef = useRef<HTMLDivElement>(null);
    const { position, handleDragStart } = useDrag({ ref: editorRef });

    return (
        <div //
            className="card fixed bg-base-200/80 backdrop-blur-sm shadow-xl max-w-md z-10 w-100"
            ref={editorRef}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="card-body gap-0">
                {/* ヘッダ部 */}
                <div //
                    onMouseDown={handleDragStart}
                    className="flex justify-between items-center -mt-3 cursor-move"
                >
                    {/* タイトル */}
                    <div //
                        className="card-title text-base-content"
                        style={{ userSelect: "none" }}
                    >
                        🎨 Panel
                    </div>
                    {/* 開閉ボタン */}
                    <button //
                        type="button"
                        onClick={handleCollapseToggle}
                        className="btn btn-ghost btn-sm btn-circle"
                        title={isHidden ? "エディタを開く" : "エディタを折りたたむ"}
                        aria-label={isHidden ? "Expand editor" : "Collapse editor"}
                    >
                        {isHidden ? <FaChevronDown size={16} /> : <FaChevronUp size={16} />}
                    </button>
                </div>

                {/* ボディ部（ボタン類） */}
                <div className={`grid transition ${isHidden ? "grid-rows-[0fr] opacity-0 mt-0" : "grid-rows-[1fr] opacity-100 mt-4"}`}>
                    <div className="overflow-hidden">
                        <div className="divider text-xs my-auto">controls</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
