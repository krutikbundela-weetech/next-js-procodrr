import Link from "next/link";

const services = async (props) => {
  console.log("Default Props", props);
  //   {
  //     "params": {
  //         "status": "halted",
  //         "value": null,
  //         "reason": null,
  //         "_debugInfo": null
  //     },
  //     "searchParams": {
  //         "status": "halted",
  //         "value": null,
  //         "reason": null,
  //         "_debugInfo": null
  //     }
  // }
  console.log("Search Params", await props.searchParams); // {}
  console.log("Params", await props.params); // {}

  // /?name=John&age=30
  // console.log("Search Params", props.searchParams); // {name: "John", age: "30"}
  return (
    <>
      <div>All services (Nested Routings - /services/web-dev)</div>
      <p>
        <Link href="services/web-dev">web development</Link>
      </p>
      <p>
        <Link href="services/app-dev">app development</Link>
      </p>
      <p>
        <Link href="services/wordpress">wordpress</Link>
      </p>
      <p>
        <Link href="services/seo">SEO</Link>
      </p>
    </>
  );
};

export default services;
