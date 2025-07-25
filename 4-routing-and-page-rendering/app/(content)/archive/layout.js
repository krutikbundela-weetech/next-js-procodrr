import React from 'react'

export default function ArchiveLayout({children,archive,latest}) {
  return (
    <>
      <h1>News Archive</h1>
      <section id="archive-filter">{archive}</section>
      <section id="archive-latest">{latest}</section>
    </>
  );
}
