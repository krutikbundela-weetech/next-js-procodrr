import { DUMMY_NEWS } from "@/dummy-news";
import { notFound } from "next/navigation";
import React from "react";

export default function ImagePage({ params: id }) {
  const newsItem = DUMMY_NEWS.find((news) => news.id === id.id);

  if (!newsItem) {
    notFound();
  }

  // it will be shown on reload of the page for the same path

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}
