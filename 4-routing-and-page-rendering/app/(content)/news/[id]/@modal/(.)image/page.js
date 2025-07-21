// import { DUMMY_NEWS } from "@/dummy-news";
import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";
import React from "react";

export default async function InterceptedImagePage({ params: id }) {
  // const newsItem = DUMMY_NEWS.find((news) => news.id === id.id);

  const newsItem = await getNewsItem(id.id);

  if (!newsItem) {
    notFound();
  }

  //@ parallel route will be ignored so (.) still work
  // This page is used to intercept the image request and display it in fullscreen
  // it will be shown via a image link in the news detail page

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
