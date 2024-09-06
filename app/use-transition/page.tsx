"use client";

import { memo, useState, useTransition } from "react";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
    // startTransition(() => {
    //   setCurrentPage(newPage);
    // });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-x-4 p-4">
        <button
          className={currentPage === 1 ? "font-bold" : ""}
          onClick={() => {
            changePage(1);
          }}
        >
          ページ1
        </button>
        <button
          className={currentPage === 2 ? "font-bold" : ""}
          onClick={() => {
            changePage(2);
          }}
        >
          ページ2
        </button>
        <button
          className={`${currentPage === 3 ? "font-bold" : ""}  ${isPending ? "opacity-50" : ""}`}
          onClick={() => {
            changePage(3);
          }}
        >
          ページ3（激重）
        </button>
      </div>
      <div className="border border-gray-200 p-4">
        {currentPage === 1 && <FastPage pageNumber={1} />}
        {currentPage === 2 && <FastPage pageNumber={2} />}
        {currentPage === 3 && <SlowPage />}
      </div>
    </div>
  );
}

// レンダリングに少なくとも1秒かかるコンポーネント
const SlowPage = memo(function SlowPage() {
  return (
    <ul>
      {Array.from({ length: 1000 }, (_, i) => (
        <SlowListItem key={i} index={i} />
      ))}
    </ul>
  );
});
const SlowListItem = ({ index }: { index: number }) => {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {}
  return <li>#{index + 1}</li>;
};

const FastPage = ({ pageNumber }: { pageNumber: number }) => {
  return <p>現在のページは{pageNumber}</p>;
};
