// "use client";
// import { DUMMY_NEWS } from "@/dummy-news";
import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";
export default async function NewsPage() {

  const news = await getAllNews();
  console.log("🚀 ~ page.js:8 ~ NewsPage ~ news:", news);

  // const [news, setNews] = useState();
  // const [isLoading, setIsLoading] = useState();
  // const [error, setError] = useState();

  // const response = await fetch("http://localhost:8080/news");

  // if (!response.ok) {
    // setError("Failed to fetch news");
    // setIsLoading(false);
    // throw new Error("Failed to fetch news");
  // }
  // const news = await response.json();


  // useEffect(() => {
  //   async function fetchNews() {

  //     setIsLoading(false);
  //     setNews(data);
  //   }

  //   fetchNews();
  // }, []);

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  // let newsContent;
  // if (news && news.length > 0) {
  //   newsContent = <NewsList news={news} />;
  // }

  return (
    <>
      <h1>News Page</h1>
      {/* <NewsList news={DUMMY_NEWS} /> */}
      {/* {newsContent} */}
      <NewsList news={news} />
    </>
  );
}
